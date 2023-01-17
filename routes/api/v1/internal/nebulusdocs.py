import datetime

from flask import request, session

from app.routes.main import private_endpoint
from app.static.python.mongodb import create, read
from . import internal


@internal.route("/nebulusDocuments/create", methods=["POST"])
@private_endpoint
def getDocs():
    create.createNebulusDocument(request.get_json(), session["id"])
    return "success"


@internal.route("nebulusDocuments/save", methods=["POST"])
@private_endpoint
def saveDoc():
    data = request.get_json()
    try:
        document = read.getDocument(data["id"])
    except KeyError:
        return "false"

    document.lastEdited = datetime.datetime.now()
    for key, value in data.items():
        document.setattr(key, value)
    document.save()
    return


@internal.route("nebulusDocuments/read", methods=["POST"])
@private_endpoint
def readDoc():
    the_id = request.form.get("id")


@internal.route(
    "nebulusDocuments/share", methods=["POST"]
)  # For sharing a document with another user
@private_endpoint
def shareDoc():
    pass
