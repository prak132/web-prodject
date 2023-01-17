import codecs
import random

from flask import session, request, current_app
from flask_mail import Message
from threading import Thread
from pathlib import Path

from app.routes.main import private_endpoint
from app.static.python.mongodb import read
from . import internal
from .... import mail


def send_async_email(app, msg):
    with app.app_context():
        mail.send(msg)


def send_email(subject, recipients, message):
    msg = Message(
        subject,
        sender=f"Nebulus <help.nebulus@gmail.com>",
        recipients=recipients,
    )

    msg.html = message
    print("sending email")
    mail.send(msg)
    app = current_app._get_current_object()
    Thread(target=send_async_email, args=(app, msg)).start()


@internal.route("/signup-email", methods=["POST"])
@private_endpoint
def signup_email():
    data = request.get_json()

    code = random.randint(10000000, 99999999)
    session["verificationCode"] = str(code)
    print(code)

    current_dir = Path(__file__)
    root_path = [p for p in current_dir.parents if p.parts[-1] == "ProjectNebulus"][
        0
    ]

    htmlform = (
        str(codecs.open(str(root_path)+"/app/templates/utils/email.html", "r").read())
            .replace("123456", str(code))
            .replace("Nicholas Wang", data["username"])
    )

    send_email(f"Your Nebulus Email Verification Code", [data["email"]], htmlform)

    return "success"


@internal.route("/reset-email", methods=["POST"])
@private_endpoint
def reset_email():
    data = request.get_json()
    try:
        email = read.find_user(username=data["username"]).email
    except KeyError:
        return "0"

    code = random.randint(10000000, 99999999)
    session["verificationCode"] = str(code)
    print(code)

    current_dir = Path(__file__)

    root_path = [p for p in current_dir.parents if p.parts[-1] == "ProjectNebulus"][
        0
    ]

    htmlform = (
        str(codecs.open(str(root_path)+"/app/templates/utils/email.html", "r").read())
            .replace("123456", str(code))
            .replace("Nicholas Wang", data["username"])
            .replace("signed up", "requested a password reset")
            .replace("sign up", "do so")
            .replace("Signup", "Reset")
    )

    send_email(f"Your Nebulus Password Reset Code", [email], htmlform)

    return "success"
