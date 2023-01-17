from flask import render_template, session

from app.static.python.mongodb import read
from . import main_blueprint


@main_blueprint.route("/docs", methods=["GET"])
def docs():
    return render_template(
        "tools/docs.html",
        user=session.get("username"),
        avatar=session.get("avatar", "/static/images/nebulusCats/v3.gif"),
    )


@main_blueprint.route("/docs/document/<id>", methods=["GET"])
def document(id):
    fonts = [
        "Arial",
        "Times New Roman",
        "Comic Sans MS",
        "Pacifico",
        "Roboto",
        "Lobster",
        "Lato",
        "Montserrat",
        "Raleway",
        "Roboto Condensed",
        "Open Sans",
        "Roboto Slab",
        "Merriweather",
        "Ubuntu",
        "PT Sans",
        "PT Serif",
        "Ubuntu Condensed",
        "Droid Sans",
        "Droid Serif",
        "Roboto Mono",
        "Roboto Mono Condensed",
        "Roboto Mono Slashed",
        "Roboto Mono Slashed Condensed",
        "Roboto Mono Slashed Slashed",
        "Roboto Mono Slashed Slashed Condensed",
    ]
    return render_template(
        "tools/notepad.html",
        page="Nebulus - Notepad",
        user=session.get("username"),
        avatar=session.get("avatar", "/static/images/nebulusCats/v3.gif"),
        read=read,
        fonts=fonts,
    )
