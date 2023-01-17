"""Check folder or document"""

from app.static.python.mongodb import read
from . import internal
from ....main.utils import private_endpoint


@internal.route("/connect-type/<id>", methods=["POST"])
@private_endpoint
def connect_schoology_route(id):
    type = read.check_type(id)
    return type
