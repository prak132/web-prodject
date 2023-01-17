import flask

from .. import api_blueprint

v1 = flask.Blueprint(
    "v1",
    __name__,
    url_prefix="/v1",
    static_folder="static",
    template_folder="templates",
)
api_blueprint.register_blueprint(v1)

# Importing routes for this blueprint

from .internal import *
