from pathlib import Path

from flask import send_from_directory

from . import static_blueprint


@static_blueprint.route("/<folder>/<folder2>/<file>")
def static_2layer(folder, folder2, file):
    path = Path(__file__)
    return send_from_directory(
        f"{path.parent.parent.parent}/static/{folder}/{folder2}", file
    )
