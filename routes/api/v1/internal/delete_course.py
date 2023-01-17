from flask import request

from app.static.python.mongodb import delete
from . import internal


@internal.route("/delete-course", methods=["POST"])
def delete_course_route():
    data = request.json()
    delete.delete_course(data["id"])
    return "success"
