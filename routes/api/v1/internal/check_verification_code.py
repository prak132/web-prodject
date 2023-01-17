from flask import session, request

from . import internal


@internal.route("/check-verification-code", methods=["POST"])
def check_email_code():
    # var = jsonify(next(request.form.items())[0])["value"]
    var = request.get_json()["value"]
    return str(var == str(session["verificationCode"])).lower()

# testing
