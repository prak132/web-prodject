from flask import session

from . import internal


@internal.route("/schoology-callback")
def close():
    session["token"] = "authorized"
    return "<script>window.close();</script>"
