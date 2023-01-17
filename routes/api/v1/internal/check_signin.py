import re

from flask import request, session

from app.static.python.mongodb import read
from . import internal

regex = r"\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b"


@internal.route("/check-signin", methods=["POST"])
def checkSignin():
    json = request.get_json()
    validation = read.check_password_username(
        json.get("username"), json.get("password")
    )

    if validation.split("-")[0] == "true" and validation.split("-")[1] == "true":
        if re.fullmatch(regex, json.get("username")):
            # If the username is an email, then we need to get the username from the database
            user = read.find_user(email=json.get("username"))

        else:
            # If the username is not an email, then we need to get the email from the database
            user = read.find_user(username=json.get("username"))

        session["username"] = user.username
        session["pswLen"] = len(json.get("password"))
        session["email"] = user.email
        session["avatar"] = user.avatar.avatar_url
        session["id"] = user.id

    return validation
