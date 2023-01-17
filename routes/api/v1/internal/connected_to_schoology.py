from flask import session

from . import internal


@internal.route("/check-schoology-connection", methods=["GET"])
def checkConnectedSchoology():
    from .....static.python.mongodb import read

    return read.checkSchoology(session["id"])
