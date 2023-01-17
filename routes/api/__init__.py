from flask import Blueprint

api_blueprint = Blueprint(
    "api",
    __name__,
    url_prefix="/api",
    template_folder="templates",
    static_folder="static",
)

# Importing routes for this blueprint

from .v1 import *
from .developers import *

# from app.routes.api import graphql
