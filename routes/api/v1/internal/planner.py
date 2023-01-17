from json import loads

from flask import request, session

from app.routes.main import private_endpoint
from app.static.python.mongodb import read, update
from . import internal


@internal.route("/planner/load")
@private_endpoint
def getPlanner():
    return read.getPlanner(session["id"])


@internal.route("/planner/save", methods=["POST"])
@private_endpoint
def savePlanner():
    data = next(request.form.items())[0]
    return update.savePlanner(loads(data), session["id"])


@internal.route("/planner/saveConfig", methods=["POST"])
@private_endpoint
def saveConfig():
    data = next(request.form.items())[0]
    return update.saveConfig(loads(data), session["id"])
