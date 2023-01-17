import time
from datetime import datetime

from flask import jsonify, request, session

from app.routes.main.utils import private_endpoint
from app.static.python.mongodb import read
from app.static.python.utils.colors import getColor
from . import internal


@internal.route("/get_schoology_messages", methods=["POST"])
@private_endpoint
def get_schoology_messages():
    sc = read.getSchoologyAuth(session["id"])
    start_at = int(request.form.get("start"))
    end_at = int(request.form.get("start")) + 5
    sc.limit = end_at + 1
    try:
        messages = sc.get_inbox_messages()
    except:
        time.sleep(15)
        messages = sc.get_inbox_messages()
    newMessages = []
    for message in messages[start_at:end_at]:
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
        info["message"] = info["message"][:100] + "..." * (len(info["message"]) > 100)
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
        info["updated"] = datetime.fromtimestamp(int(message["last_updated"])).strftime(
            "%m/%d/%Y, %H:%M:%S"
        )
        newMessages.append(info)

    return jsonify(newMessages)
