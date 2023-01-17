from flask import request

from app.static.python.mongodb.create import createChat

from . import internal


@internal.route("/create-chat", methods=["POST"])
def create_chat():
    data = request.get_json()
    createChat(data)
    return "success"
