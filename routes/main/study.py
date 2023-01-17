from flask import render_template, session

from . import main_blueprint


@main_blueprint.route("/study", methods=["GET"])
def study():
    return render_template(
        "tools/study.html",
        page="Nebulus - Study Session",
        user=session.get("username"),
        email=session.get("email"),
        avatar=session.get("avatar", "/static/images/nebulusCats/v3.gif"),
    )
