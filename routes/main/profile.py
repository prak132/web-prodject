from flask import render_template, session

from app.static.python.mongodb import read
from . import main_blueprint
from .utils import logged_in


@main_blueprint.route("/profile")
@logged_in
def profile():
    return render_template(
        "user/profile.html",
        page="Nebulus - Profile",
        user=session.get("username"),
        email=session.get("email"),
        avatar=session.get("avatar", "/static/images/nebulusCats/v3.gif"),
        read=read,
    )


@main_blueprint.route("/community/profile/<id>")
def pubProfile(id):
    return render_template(
        "user/profile.html",
        user=session.get("username"),
        email=session.get("email"),
        avatar=session.get("avatar", "/static/images/nebulusCats/v3.gif"),
        # page=f"{session.get('username')} - Nebulus",
        # db=db,
    )
