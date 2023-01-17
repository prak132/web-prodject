from flask import flash, request

from app.static.python.cdn.upload_avatar import upload_avatar
from . import internal


@internal.route("/create_avatar", methods=["POST"])
def create_avatar():
    """
    Create a new avatar.
    Json input:
    {
        "file": "base64 encoded image"
        "parent_object": The object that the avatar is attached to.
        "parent_id": The id of the object that the avatar is attached to.
    }
    """
    data = request.get_json()
    parent_object = data["parent_object"]

    if "file" not in request.files:
        flash("No file part")
        return "no-file"

    file = request.files["file"]

    validation = upload_avatar(file, parent_object, data["parent_id"])

    return validation
