from flask import session, request

from . import internal
from .....routes.main import private_endpoint
from .....static.python.mongodb import update


@internal.route("sign-in", methods=["POST"])
def signin_post():
    session["logged_in"] = True
    return "true"


@internal.route("/reset-psw", methods=["POST"])
@private_endpoint
def reset_psw():
    if request.json.get("code") != session["verificationCode"]:
        return "false"

    username = request.json.get("username")
    password = request.json.get("password")
    update.resetPassword(username, password)

    return "true"
