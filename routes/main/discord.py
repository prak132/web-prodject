import json

import requests
from flask import Flask, redirect, render_template, request, session
from flask_discord import DiscordOAuth2Session

from . import main_blueprint

app = Flask(__name__)
app.config["DISCORD_CLIENT_ID"] = 955153343020429343  # Discord client ID.
app.config[
    "DISCORD_CLIENT_SECRET"
] = "6ApEyUtWUsp1SwuXlrRn3e_lNB6IqfSO"  # Discord client secret.
app.config["DISCORD_REDIRECT_URI"] = "null"


def generate_redirect(url):
    if "nebulus" in url:
        if "https" not in url:
            return url.replace("http", "https") + "discord/receive"
    return url + "discord/receive"


def exchange_code(code, url):
    data = {
        "client_id": 955153343020429343,
        "client_secret": "6ApEyUtWUsp1SwuXlrRn3e_lNB6IqfSO",
        "grant_type": "authorization_code",
        "code": code,
        "redirect_uri": generate_redirect(url),
    }
    headers = {"Content-Type": "application/x-www-form-urlencoded"}
    r = requests.post(
        "https://discord.com/api/v8/oauth2/token",
        data=data,
        headers=headers,
        verify=False,
    )
    # r.raise_for_status()
    return r.json()


global baseUrl
baseUrl = "https://discordapp.com/api"


def getHeaders(access_token):
    return {
        "Authorization": "{} {}".format("Bearer", access_token),
        # "user-agent" : "DiscordBackup/0.0.1"
    }


def getRequest(access_token, endpoint, asJson=True, additional=None):
    url = f"{baseUrl}/{endpoint}"
    req = requests.get(url, headers=getHeaders(access_token))

    if asJson:
        return json.loads(req.text)
    else:
        return req.text


def getMe(access_token):  # this works
    endpoint = "users/@me"
    return getRequest(access_token, endpoint)


@main_blueprint.route("/discord")
def discord_auth():
    app.config["DISCORD_REDIRECT_URI"] = generate_redirect(request.root_url)
    discordAuth = DiscordOAuth2Session(app)

    return discordAuth.create_session()


@main_blueprint.route("/discord/receive")
def recieve():
    if "code" in request.args:
        try:
            code = request.args["code"]
            data = exchange_code(code, request.root_url)
            access_token = data["access_token"]
            data = getMe(access_token)

            avatar_link = (
                f"https://cdn.discordapp.com/avatars/{data['id']}/{data['avatar']}.png"
            )

            user = f"{data['username']}#{data['discriminator']}"

            data = [user, int(data["id"]), avatar_link]
            session["discord_code"] = code
            session["discord_access_token"] = access_token
            session["discord_avatar"] = avatar_link
            session["discord_user"] = user
            session["discord_id"] = data[1]

            return render_template("connections/connectDiscord.html", data=data)

        except Exception as e:
            print(e)

            return redirect("/discord")

    else:
        return redirect("/discord")
    resp = flask.make_response(redirect("/"))
    resp.set_cookie("login", str(data[0]))
    resp.set_cookie("id", str(data[1]))
    resp.set_cookie("avatar", str(data[2]))
    return resp
