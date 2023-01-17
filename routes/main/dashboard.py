import time
from datetime import datetime

from flask import render_template, session

from app.static.python.mongodb import read
from app.static.python.utils.colors import getColor
from . import main_blueprint, utils
from .utils import logged_in


@main_blueprint.route("/dashboard", methods=["GET"])
@logged_in
def dashboard():
    user_courses = read.get_user_courses(session.get("id"))
    sorted = read.unsorted_user_events(session["id"])
    sorted[0] = sorted[0][(-8):]
    sorted[1] = sorted[1][-12:]

    if len(user_courses) > 8:
        user_courses = list(user_courses)[-18:]
    sc = read.getSchoologyAuth(user_id=session["username"])
    if sc:
        sc.limit = 5
        try:
            messages = sc.get_inbox_messages()
        except:
            time.sleep(15)
            messages = sc.get_inbox_messages()
        newMessages = []
        for message in messages[0:5]:
            info = {}
            author = sc.get_user(message["author_id"])
            authorName = author["name_display"]
            authorPfp = author["picture_url"]
            authorEmail = author["primary_email"]
            authorSchool = sc.get_school(author["school_id"])["title"]
            authorColor = getColor(authorPfp)
            oldRecipients = message["recipient_ids"].split(",")
            recipients = []
            for recipient in oldRecipients:  # recipients:
                recipient = sc.get_user(recipient)
                school = sc.get_school(recipient["school_id"])["title"]
                color = getColor(recipient["picture_url"])
                recipients.append(
                    {
                        "name": recipient["name_display"],
                        "avatar": recipient["picture_url"],
                        "email": recipient["primary_email"],
                        "school": school,
                        "color": color,
                    }
                )

            author = {
                "name": authorName,
                "avatar": authorPfp,
                "email": authorEmail,
                "school": authorSchool,
                "color": authorColor,
            }
            info["subject"] = message["subject"]
            info["status"] = message["message_status"]
            thread = sc.get_message(message_id=message["id"])
            info["message"] = thread[-1]["message"]
            info["message"] = info["message"][:100] + "..." * (
                    len(info["message"]) > 100
            )
            newThread = []
            for threadItem in thread:
                thread_author_id = threadItem["author_id"]
                thread_author = sc.get_user(thread_author_id)
                newThread.append(
                    {
                        "message": threadItem["message"],
                        "author": thread_author["name_display"],
                        "author_pic": thread_author["picture_url"],
                        "author_email": thread_author["primary_email"],
                    }
                )
            info["thread"] = newThread
            info["recipients"] = recipients
            info["author"] = author
            info["updated"] = datetime.fromtimestamp(
                int(message["last_updated"])
            ).strftime("%m/%d/%Y, %H:%M:%S")
            newMessages.append(info)

    return render_template(
        "user/dashboard.html",
        user=session["username"],
        avatar=session.get("avatar", "/static/images/nebulusCats/v3.gif"),
        email=session["email"],
        user_courses=user_courses,
        read=read,
        page="Nebulus - Dashboard",
        announcements=sorted[0],
        events=sorted[1],
        strftime=utils.strftime,
    )
