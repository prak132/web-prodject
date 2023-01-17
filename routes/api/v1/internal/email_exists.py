from flask import request

from app.static.python.classes.User import User
from . import internal


@internal.route("/email-exists", methods=["POST"])
def email_exists():
    user = request.form.get("email")
    print(user)
    user = User.objects(email=user)
    print(user)
    print(len(user) == 1)

    return str(len(user) == 1)
