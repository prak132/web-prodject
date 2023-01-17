import datetime

import requests
from flask import render_template, request, session
from flask_cors import cross_origin

from app.static.python.classes import Course, User
from app.static.python.mongodb import create, read
from . import main_blueprint, utils
from .utils import logged_in, private_endpoint


@main_blueprint.route("/course/<id>")
def course_home(**kwargs):
    return course_page("course", id=kwargs["id"])


@main_blueprint.route("/course/<id>/<page>")
@logged_in
def course_page(page, **kwargs):
    user = User.objects(username=session.get("username"))[0]
    course_id = kwargs["id"]
    course = Course.objects(pk=course_id)[0]
    if (user not in course.authorizedUsers):
        return (
            render_template(
                "errors/404.html",
                page="404 Not Found",
                user=session.get("username"),
                email=session.get("email"),
                avatar=session.get("avatar", "/static/images/nebulusCats/v3.gif"),
            ),
            404,
        )
    iframeSrc = "/course/" + course_id + "/"
    if not request.args.get("iframe"):
        if page == "course":
            page = "documents"

        iframeSrc += page + "?iframe=true"
        page = "course"

        return render_template(
            f"courses/{page}.html",
            today=datetime.date.today(),
            page="Nebulus - " + course.name,
            iframe=iframeSrc,
            course=course,
            course_id=course_id,
            user=session.get("username"),
            email=session.get("email"),
            avatar=session.get("avatar", "/v3.gif"),
            disableArc=(page != "course"),
            events=[],
            # read.sort_course_events(session["id"], int(course_id))[1],d.sort_course_events(session["id"], int(course_id))[1],
            strftime=utils.strftime,
            read=read
        )




@main_blueprint.route("/createCourse", methods=["POST"])
@private_endpoint
def createCourse():
    create.create_course(request.get_json())
    return "0"


@main_blueprint.route("/getResource/<courseID>/<documentID>")
@private_endpoint
@cross_origin()
def getResource(courseID, documentID):
    courses = list(
        filter(lambda c: c.id == courseID, read.get_user_courses(session["id"]))
    )
    if not len(courses) or not len(
        [user for user in courses[0].authorizedUsers if user.id == session["id"]]
    ):
        return render_template("errors/404.html"), 404

    documents = list(filter(lambda d: d.id == documentID, courses[0].documents))
    if not len(documents):
        return render_template("errors/404.html"), 404

    req = requests.get(documents[0].url)
    return req.content


def search(word):
    API_KEY = "ae81dea0-30bd-4397-9ba3-d58726256214"
    r = requests.get(
        f"https://dictionaryapi.com/api/v3/references/collegiate/json/{word}?{API_KEY}"
    )
    return r.json()


@main_blueprint.route("/course/<id>/extensions/dict/search", methods=["POST"])
def search_word(id):
    word = request.form["word"]
    word = word.lower()
    definition = search(word)
    try:
        shortdef = definition[0]["shortdef"][0]
        shortdef = shortdef[0].upper() + shortdef[1:]
        partofspeech = definition[0]["fl"]
        word = word[0].upper() + word[1:]
    except IndexError:
        return f"<h1>No definition found for '{word}'</h1>"
    return render_template(
        "courses/extensions/dict_results.html",
        definition=shortdef,
        word=word,
        partofspeech=partofspeech,
    )


@main_blueprint.route("/course/<id>/extensions/<extension>")
@logged_in
def course_page_ex(id, extension):
    try:
        return render_template(f"courses/extensions/{extension}.html")
    except Exception as e:
        return render_template("errors/404.html")
