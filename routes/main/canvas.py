from flask import redirect, render_template, request, session

from app.static.python.extensions.integrations.canvas import connectCanvas

from . import main_blueprint
from .utils import logged_in


@main_blueprint.route("/canvas", methods=["GET"])
@logged_in
def canvasConnect():
    # Open OAuth authorization webpage. Give time to authorize.
    return render_template("connections/connectCanvas.html")


@main_blueprint.route("/canvas", methods=["POST"])
@logged_in
def canvasConnect2():
    a = connectCanvas(request.form.get("link"), request.form.get("key"))
    if a != False:
        session["canvas"] = str(a)
        session["canvas_key"] = request.form.get("key")
        session["canvas_link"] = request.form.get("link")
    else:
        return redirect("/canvas")
    return render_template("connections/connectCanvas.html", done=str(a))
