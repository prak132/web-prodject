import os

import flask
import google.oauth2.credentials
import google_auth_oauthlib.flow
import requests
from flask import redirect, render_template, request, session
from googleapiclient.discovery import build

from . import main_blueprint
from .utils import logged_in

# -*- coding: utf-8 -*-

os.environ["OAUTHLIB_RELAX_TOKEN_SCOPE"] = "None"
os.environ["OAUTHLIB_INSECURE_TRANSPORT"] = "1"

CLIENT_SECRETS_FILE = "app/static/python/credentials.json"
SCOPES = [
    "https://www.googleapis.com/auth/classroom.courses.readonly",
    "https://www.googleapis.com/auth/classroom.rosters.readonly",
    "https://www.googleapis.com/auth/classroom.coursework.me",
    "https://www.googleapis.com/auth/classroom.coursework.me.readonly",
    "https://www.googleapis.com/auth/classroom.coursework.students",
    "https://www.googleapis.com/auth/classroom.coursework.students.readonly",
    "https://www.googleapis.com/auth/classroom.announcements",
    "https://www.googleapis.com/auth/classroom.announcements.readonly",
    "https://www.googleapis.com/auth/classroom.guardianlinks.students.readonly",
    "https://www.googleapis.com/auth/classroom.guardianlinks.me.readonly",
    "https://www.googleapis.com/auth/classroom.push-notifications",
    "https://www.googleapis.com/auth/userinfo.profile",
    "https://www.googleapis.com/auth/classroom.profile.photos",
]
API_SERVICE_NAME = "classroom"
API_VERSION = "v1"


@main_blueprint.route("/gclassroom")
@logged_in
def gtest_api_request():
    if "credentials" not in flask.session:
        return flask.redirect("/gclassroom/authorize")
    try:
        # Load credentials from the session.
        credentials = google.oauth2.credentials.Credentials(
            **flask.session["credentials"]
        )

        service = build("classroom", "v1", credentials=credentials)

        # Call the Classroom API

        results = service.courses().list(pageSize=10).execute()
        courses = results.get("courses", [])
        # Save credentials back to session in case access token was refreshed.
        # ACTION ITEM: In a production app, you likely want to save these
        #              credentials in a persistent database instead.
        flask.session["credentials"] = credentials_to_dict(credentials)
    except:  # TokenExpired
        return flask.redirect("/gclassroom/authorize")
    credentials = google.oauth2.credentials.Credentials(**flask.session["credentials"])
    user_info_service = build(
        serviceName="oauth2", version="v2", credentials=credentials
    )
    user_info = None
    user_info = user_info_service.userinfo().get().execute()
    print(user_info)
    user_info = [user_info["name"], user_info["picture"]]
    return render_template("connections/connectClassroom.html", data=user_info)
    # return flask.jsonify(courses)


@main_blueprint.route("/gclassroom/authorize")
@logged_in
def authorize():
    print(flask.request.args.get("state"), flask.session.get("_google_authlib_state_"))

    # Create flow instance to manage the OAuth 2.0 Authorization Grant Flow steps.
    flow = google_auth_oauthlib.flow.Flow.from_client_secrets_file(
        CLIENT_SECRETS_FILE, scopes=SCOPES
    )

    # The URI created here must exactly match one of the authorized redirect URIs
    # for the OAuth 2.0 client, which you configured in the API Console. If this
    # value doesn't match an authorized URI, you will get a 'redirect_uri_mismatch'
    # error.
    flow.redirect_uri = request.root_url + "gclassroom/oauth2callback"
    if "http://beta.nebulus.ml" in flow.redirect_uri:
        flow.redirect_uri = str(flow.redirect_uri).replace(
            "http://beta.nebulus.ml", "https://beta.nebulus.ml"
        )
    print(request.root_url.replace("http", "https") + "gclassroom/oauth2callback")
    authorization_url, state = flow.authorization_url(
        # Enable offline access so that you can refresh an access token without
        # re-prompting the user for permission. Recommended for web server apps.
        access_type="offline",
        # Enable incremental authorization. Recommended as a best practice.
        include_granted_scopes="true",
    )

    # Store the state so the callback can verify the auth server response.
    session["state"] = state
    session["redirect_url_g"] = authorization_url
    return redirect(authorization_url)


@main_blueprint.route("/gclassroom/oauth2callback")
@logged_in
def oauth2callback():
    # Specify the state when creating the flow in the callback so that it can
    # verified in the authorization server response.
    state = flask.session["state"]

    flow = google_auth_oauthlib.flow.Flow.from_client_secrets_file(
        CLIENT_SECRETS_FILE, scopes=SCOPES, state=state
    )
    # flow.redirect_uri = flask.url_for('gclassroom/oauth2callback', _external=True)
    flow.redirect_uri = flask.url_for("main_blueprint.oauth2callback", _external=True)
    print(flow.redirect_uri)
    # Use the authorization server's response to fetch the OAuth 2.0 tokens.
    # authorization_response = flask.request.url
    authorization_response = (
        session["redirect_url_g"] + "&code=" + request.args.get("code")
    )
    if "http://beta.nebulus.ml" in authorization_response:
        authorization_response = authorization_response.replace("http", "https")
    # flow.fetch_token(authorization_response=authorization_response)
    flow.fetch_token(authorization_response=authorization_response)
    # Store credentials in the session.
    # ACTION ITEM: In a production app, you likely want to save these
    #              credentials in a persistent database instead.
    credentials = flow.credentials
    flask.session["credentials"] = credentials_to_dict(credentials)

    # return flask.redirect(flask.url_for("main_blueprint.g_classroom_auth"))
    return flask.redirect(flask.url_for("main_blueprint.gtest_api_request"))


@main_blueprint.route("/gclassroom/revoke")
@logged_in
def revoke():
    if "credentials" not in flask.session:
        return redirect("/settings")

    credentials = google.oauth2.credentials.Credentials(**flask.session["credentials"])

    revoke = requests.post(
        "https://oauth2.googleapis.com/revoke",
        params={"token": credentials.token},
        headers={"content-type": "application/x-www-form-urlencoded"},
    )

    status_code = getattr(revoke, "status_code")
    if status_code == 200:
        return redirect("/settings")
    else:
        return redirect("/settings")


@main_blueprint.route("/gclassroom/clear")
@logged_in
def clear_credentials():
    if "credentials" in flask.session:
        del flask.session["credentials"]
    return redirect("/settings")


def credentials_to_dict(credentials):
    return {
        "token": credentials.token,
        "refresh_token": credentials.refresh_token,
        "token_uri": credentials.token_uri,
        "client_id": credentials.client_id,
        "client_secret": credentials.client_secret,
        "scopes": credentials.scopes,
    }
