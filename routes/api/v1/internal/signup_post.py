from flask import request, session

from app.static.python.mongodb import create
from . import internal


@internal.route("/signup", methods=["POST"])
def signup_post():
    data = request.get_json()
    cats = {
        1: "black_cat.png",
        2: "blue_cat.png",
        3: "green_cat.png",
        4: "pink_cat.png",
        5: "yellow_cat.png",
        6: "blurple_cat.png",
        7: "red_cat.png",
        8: "100_cat.png",
        9: "river_cat.png",
        10: "cake_cat.png",
        11: "ocean_cat.png",
        12: "mountains.png",
        13: "pizza.png",
        14: "popTart.png",
        15: "v3.gif",
        16: "v2.gif",
        17: "newBlue.png",
        18: "newGreen.png",
        19: "newJade.png",
        20: "newPink.png",
        21: "newRed.png",
        22: "newYellow.png",
        23: "ukraine.png",
        24: "pride.png",
    }
    data["avatar"] = cats[int(data["avatar"].replace("cat", ""))]
    validation = create.create_user(data)
    if validation[0] == "0":
        session["username"] = validation[1].username
        session["email"] = validation[1].email
        session["pswLen"] = len(data.get("password"))
        session["id"] = validation[1].id
    return validation[0]
