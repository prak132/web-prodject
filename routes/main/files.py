from flask import render_template, session

from app.static.python.mongodb import read
from . import main_blueprint


@main_blueprint.route("/files", methods=["GET"])
def files():
    return render_template(
        "tools/files.html",
        page="Nebulus - Files",
        user=session.get("username"),
        avatar=session.get("avatar", "/static/images/nebulusCats/v3.gif"),
        read=read,
    )
