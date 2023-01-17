"""Find Folders"""

from app.routes.main.utils import private_endpoint
from app.static.python.mongodb import read
from . import internal


@internal.route("/find-folders/<id>", methods=["POST"])
@private_endpoint
def connect_schoology(id):
    courseid = id
    folders = read.get_folders(courseid)
    string = "0"
    for i in folders:
        string += " • "
        string += str(i._id)
    return string
