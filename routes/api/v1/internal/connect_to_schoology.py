from flask import request, session

from app.static.python.extensions.integrations.schoology import (
    create_schoology,
    create_schoology_auth,
    generate_auth,
)
from app.static.python.mongodb import read, update
from . import internal

auth = None
key = "eb0cdb39ce8fb1f54e691bf5606564ab0605d4def"
secret = "59ccaaeb93ba02570b1281e1b0a90e18"


@internal.route("/get-schoology", methods=["POST"])
def user_connect_to_schoology_route():
    global auth
    session["token"] = None
    request_token = session["request_token"]
    request_token_secret = session["request_token_secret"]
    access_token_secret = session["access_token_secret"]
    access_token = session["access_token"]
    auth = generate_auth(
        authorize=True,
        key=key,
        secret=secret,
        domain=request.form.get("link"),
        three_legged=True,
        request_token=request_token,
        request_token_secret=request_token_secret,
        access_token=access_token,
        access_token_secret=access_token_secret,
    )
    return auth.request_authorization()

@internal.route('/connect-to-schoology', methods=['POST'])
def connect_to_schoology():
    auth.authorize()
    if not auth.authorized:
        return "error!!!"
    data = request.form
    request_token = auth.request_token
    request_token_secret = auth.request_token_secret
    access_token_secret = auth.access_token_secret
    access_token = auth.access_token
    session["request_token"] = request_token
    session["request_token_secret"] = request_token_secret
    session["access_token_secret"] = access_token_secret
    session["access_token"] = access_token
    sc = create_schoology_auth(auth)
    session["Schoologyname"] = sc.get_me().name_display
    session["Schoologyemail"] = sc.get_me().primary_email
    session["Schoologydomain"] = data["link"]
    session["Schoologyid"] = sc.get_me().id
    if (
            read.check_duplicate_schoology(session["Schoologyemail"])
            == "true"
    ):
        return "2"
    schoology = {
        "Schoology_request_token": request_token,
        "Schoology_request_secret": request_token_secret,
        "Schoology_access_token": access_token,
        "Schoology_access_secret": access_token_secret,
        "schoologyName": session["Schoologyname"],
        "schoologyEmail": session["Schoologyemail"],
        "schoologyDomain": session["Schoologydomain"],
        "apikey": data["key"],
        "apisecret": data["secret"],
    }
    update.schoologyLogin(session["id"], schoology)
    return str(sc.get_me().name_display + "•" + sc.get_me().primary_email)
