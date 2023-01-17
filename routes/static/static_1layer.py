from flask import send_file

from . import static_blueprint


@static_blueprint.route("/<folder>/<file>")
def static_1layer(folder, file):
    return send_file(f"../static/{folder}/{file}")
