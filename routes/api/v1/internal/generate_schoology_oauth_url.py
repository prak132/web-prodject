from flask import request

from app.routes.main.utils import private_endpoint
from app.static.python.extensions.integrations.schoology import generate_schoology_url
from . import internal


@internal.route("/generate-schoology-oauth-url", methods=["GET"])
@private_endpoint
def generate_url_signin():
    return generate_schoology_url(request.url_root)
