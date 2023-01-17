from flask import render_template, session

from . import main_blueprint


@main_blueprint.route("/pricing", methods=["GET"])
def pricing():
    return render_template(
        "main/pricing.html",
        page="Pricing - Nebulus",
        user=session.get("username"),
        email=session.get("email"),
        avatar=session.get("avatar", "/static/images/nebulusCats/v3.gif"),
    )
