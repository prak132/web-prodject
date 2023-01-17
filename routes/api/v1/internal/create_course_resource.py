from datetime import datetime

from flask import request

from . import internal

log_data = True


@internal.route("/create-announcement", methods=["POST"])
def create_announcement():
    """
    Create an announcement.
    """
    from app.static.python.mongodb.create import createAnnouncement

    data = request.get_json()

    if log_data:
        print(data)

    createAnnouncement(data)
    return "success", 200


@internal.route("/create-assignment", methods=["POST"])
def create_assignment():
    """
    Create an assignment.
    """
    from app.static.python.mongodb.create import createAssignment

    # Get the data from the request.
    data = request.get_json()
    data["points"] = int(data["points"])
    data["due"] = datetime.strptime(data["due"], "%m/%d/%Y %I:%M %p")

    if log_data:
        print(data)

    # Create the assignment.
    createAssignment(data)

    # Return the success message.
    return "success"


@internal.route("/create-folder", methods=["POST"])
def create_folder():
    from app.static.python.mongodb.create import createFolder

    createFolder(request.json())
    return "success", 200
