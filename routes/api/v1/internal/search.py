# TODO
from flask import request, session

from app.static.python.mongodb import read
from . import internal


@internal.route("/search-object", methods=["POST"])
def search_object():
    data = request.get_json()
    results = read.search(data["keyword"], session["username"])
