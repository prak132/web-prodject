import datetime

from flask import redirect, render_template, session

from app.static.python.mongodb import read
from . import main_blueprint, utils


@main_blueprint.route("/signin", methods=["GET"])
def signin():
    if session.get("logged_in"):
        return redirect("/dashboard")

    return render_template(
        "main/signin.html",
        page="Nebulus - Log In",
        read=read,
        today=datetime.date.today(),
        strftime=utils.strftime,
    )
