from flask import flash, request

from app.static.python.cdn.upload_document import upload_document
from . import internal


@internal.route("/upload-document", methods=["POST"])
def upload_file():
    print("arrived")
    course = request.form.get("course")
    folder = request.form.get("folder")
    # check if the post request has the file part
    if "file" not in request.files:
        flash("No file part")
        return "no-file"
    file = request.files["file"]
    print(file)
    # If the user does not select a file, the browser submits an
    # empty file without a filename.
    validation = upload_document(file, course, folder)
    if validation == "0":
        flash("no-file")

    return validation
