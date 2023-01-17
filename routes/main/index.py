from pathlib import Path

from flask import redirect, render_template, request, send_file, session

from . import main_blueprint
from .. import babel


@babel.localeselector
def get_locale():
    if session.get("lang") == "es":
        return "es"
    else:
        return "en"


@main_blueprint.route("/", methods=["GET"])
def index():
    return render_template(
        "main/index.html",
        page="Nebulus - Learning, All In One",
        user=session.get("username"),
        email=session.get("email"),
        avatar=session.get("avatar", "/static/images/nebulusCats/v3.gif"),

    )


@main_blueprint.route("/google34d8c04c4b82b69a.html")
def googleVerification():
    # GOOGLE VERIFICATION FILE
    return render_template("utils/google34d8c04c4b82b69a.html")


@main_blueprint.route("/arc-sw.js")
def arcstuff():
    return redirect("https://arc.io/arc-sw.js")


@main_blueprint.route("/privacy-policy")
def pp():
    return redirect("https://privacypolicy.nebuluslms.repl.co/")


@main_blueprint.route("/terms-of-service")
def tos():
    return redirect(
        "https://docs.google.com/document/d/1XjNHjBRS2xJWKObo_zuQ2oPVSKQ8EK8Y_o8e77VPZf4/edit"
    )


@main_blueprint.route("/select-a-region")
def selectregion():
    return render_template(
        "main/global/select-a-region.html",
        user=session.get("username"),
        email=session.get("email"),
        avatar=session.get("avatar", "/static/images/nebulusCats/v3.gif"),
        page="Select a Region",
    )


@main_blueprint.app_errorhandler(404)
@main_blueprint.app_errorhandler(400)
def page_not_found(e):
    path = request.path
    print(path)
    if len(path.strip("/")) == 2:
        return redirect(f"/global/{path}")
    # note that we set the 404 status explicitly
    return (
        render_template(
            "errors/404.html",
            page="Not Found",
            user=session.get("username"),
            email=session.get("email"),
            avatar=session.get("avatar", "/static/images/nebulusCats/v3.gif"),
        ),
        404,
    )


@main_blueprint.app_errorhandler(500)
def internal_error(e):
    # note that we set the 500 status explicitly
    return (
        render_template(
            "errors/500.html",
            page="Nebulus is Down",
            user=session.get("username"),
            email=session.get("email"),
            avatar=session.get("avatar", "/static/images/nebulusCats/v3.gif"),
        ),
        500,
    )


@main_blueprint.route("/sw.js")
def sw():
    path = Path(__file__)
    print(path.parent.parent.parent)
    return send_file(str(path.parent.parent.parent) + "/static/js/sw.js")


@main_blueprint.route("/global/<country>", methods=["GET"])
def international(country):
    page = "Nebulus - Learning, All In One"
    spanish_country = ["ar", "co", "cr", "cu", "do", "ec", "es", "mx", "pa", "sv"]
    if country in spanish_country:
        page = "Nebulus - Aprendizaje, todo en uno"
    if country == "th":
        page = "Nebulus - การเรียนรู้ ทั้งหมดในที่เดียว"
    if country == "kr":
        page = "Nebulus - 학습, 올인원"
    if country == "cn":
        page = "难不来 - 学习，多合一"
    if country == "hk" or country == "mo" or country == "tw":
        page = "難不來 - 學習，多合一"
    if country == "jp":
        page = "Nebulus - 学習、オールインワン"
    if country == "us":
        return redirect("/")
    try:
        return render_template(
            f"main/global/{country}.html",
            page=page,
            user=session.get("username"),
            email=session.get("email"),
            avatar=session.get("avatar", "/static/images/nebulusCats/v3.gif"),
        )
    except:
        return "This country doesn't exist yet :( Contact norachai on Discord and request this country to be made."

@main_blueprint.route("/scheduler")
def scheduler():
    return render_template("scheduler.html",
                           user=session.get("username"),
                           email=session.get("email"),
                           avatar=session.get("avatar", "/static/images/nebulusCats/v3.gif"),
                           page="Scheduler", )


@main_blueprint.route("/study-planner")
def studyplanner():
    return render_template("study-planner.html",
                           user=session.get("username"),
                           email=session.get("email"),
                           avatar=session.get("avatar", "/static/images/nebulusCats/v3.gif"),
                           page="Study Planner", )


@main_blueprint.route("/lunch")
def lunchplanner():
    return render_template("lunch.html",
                           user=session.get("username"),
                           email=session.get("email"),
                           avatar=session.get("avatar", "/static/images/nebulusCats/v3.gif"),
                           page="Lunch Planner", )


@main_blueprint.route("/vacation")
def vacationmode():
    return render_template("vacation.html",
                           user=session.get("username"),
                           email=session.get("email"),
                           avatar=session.get("avatar", "/static/images/nebulusCats/v3.gif"),
                           page="Vacation Mode", )


@main_blueprint.route("/extra-curricular")
def extracurricular():
    return render_template("extra-curricular.html",
                           user=session.get("username"),
                           email=session.get("email"),
                           avatar=session.get("avatar", "/static/images/nebulusCats/v3.gif"),
                           page="Extracurricular Mode", )


@main_blueprint.route("/analysis")
def analysis():
    return render_template("analysis.html",
                           user=session.get("username"),
                           email=session.get("email"),
                           avatar=session.get("avatar", "/static/images/nebulusCats/v3.gif"),
                           page="Study Planner", )


@main_blueprint.route("/blog")
def blog():
    return render_template("blog.html",
                           user=session.get("username"),
                           email=session.get("email"),
                           avatar=session.get("avatar", "/static/images/nebulusCats/v3.gif"),
                           page="Blog", )


@main_blueprint.route("/upgrade")
def upgrade():
    return render_template("upgrade.html",
                           user=session.get("username"),
                           email=session.get("email"),
                           avatar=session.get("avatar", "/static/images/nebulusCats/v3.gif"),
                           page="Upgrade", )


@main_blueprint.route("/support")
def support():
    return render_template("support.html",
                           user=session.get("username"),
                           email=session.get("email"),
                           avatar=session.get("avatar", "/static/images/nebulusCats/v3.gif"),
                           page="Support", )
