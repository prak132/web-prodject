from flask import redirect, session

from app.static.python.mongodb import read, update
from . import internal


@internal.route("/logout-of-schoology")
def logout_from_schoology2():
    try:
        session.pop("schoologyEmail")
    except ValueError:
        pass
    try:
        session.pop("schoologyName")
    except ValueError:
        pass
    try:
        session.pop("token")
    except ValueError:
        pass
    try:
        session.pop("request_token")
    except ValueError:
        pass
    try:
        session.pop("request_token_secret")
    except ValueError:
        pass
    try:
        session.pop("access_token_secret")
    except ValueError:
        pass
    try:
        session.pop("access_token")
    except ValueError:
        pass
    user = read.find_user(username=session["username"])

    update.logout_from_schoology(user.id, user.schoology[0])
    return redirect("/settings")
