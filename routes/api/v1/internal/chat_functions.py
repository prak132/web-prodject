import datetime
import json

import flask
import requests
from flask import request, session
from flask.json import jsonify
from flask_socketio import emit, join_room, leave_room
from pandas import *

from app.static.python.classes import User
from app.static.python.mongodb import create, delete, read, update
# from app.static.python.school import get_school
from . import internal
from .... import socketio


def get_school():
    # xls = ExcelFile("..../static/school_db.xlsx")
    # xls = ExcelFile("./school_db.xlsx")
    # ls = ExcelFile("/school_db.xlsx")
    xls = ExcelFile("school_db.xlsx")
    df = xls.parse(xls.sheet_names[0])
    # print(df.transpose().to_dict())
    schools = []
    df = df.transpose().to_dict()
    for i in range(0, len(df)):
        schools.append(
            [str(df[i]["Unnamed: 3"]) + "  (" + str(df[i]["Unnamed: 15"]) + ", " + str(df[i]["Unnamed: 16"]) + ")", i])
    # print(schools)
    return schools


regex = r"\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b"


@socketio.event(namespace="/chat")
def user_status_change(data):
    print(data)
    if data["chatType"] == "chat":
        update.set_status(session["id"], data["status"])
        socketio.emit(
            "user_status_change", {"status": data["status"], "userID": session["id"]}
        )


@socketio.event(namespace="/chat")
def new_message(json_data):
    if json_data["chatType"] == "chat":
        chatID = json_data["chatID"]
        del json_data["chatID"], json_data["chatType"]
        json_data["sender"] = session["id"]
        json_data["content"] = json_data["content"].replace("\n", "<br>")
        message = create.sendMessage(json_data, chatID)
        chat = read.getChat(chatID)
        chat.lastEdited = datetime.datetime.now()
        chat.save()
        send_date = message.send_date.strftime("%m/%d/%Y at %I:%M:%S %p")
        sender = read.find_user(id=json_data["sender"])
        print("user sent a message")
        emit(
            "new_message",
            {
                "author": [sender.id, sender.username, sender.avatar.avatar_url],
                "content": json_data["content"],
                "id": message.id,
                "send_date": send_date,
                "chatID": chatID,
            },
            room=chatID,
        )
    else:
        # TODO: Create message for communities
        pass


@socketio.event(namespace="/chat")
def user_joined(json_data):
    if json_data["chatType"] == "chat":
        chatID = json_data["chatID"]
        join_room(chatID)
        update.joinChat(json_data["user_id"], chatID)
        user = read.find_user(pk=json_data["user"])
        emit(
            "user joined",
            {
                "user": [user.id, user.username, user.avatar.avatar_url],
                "msg": f"{user.username} has joined",
            },
            room=chatID,
        )
    else:
        pass


@socketio.event(namespace="/chat")
def user_left(json_data):
    if json_data["chatType"] == "chat":
        chatID = json_data["chatID"]
        leave_room(chatID)
        update.leaveChat(json_data["user_id"], chatID)
        user = read.find_user(id=json_data["user"])
        emit(
            "user left",
            {
                "user": [user.id, user.username, user.avatar.avatar_url],
                "msg": f"{user.username} has left",
            },
            room=chatID,
        )
    else:
        pass


@socketio.event(namespace="/chat")
def user_loaded(json_data):
    print("loaded user")
    chats = [x.id for x in read.find_user(pk=session["id"]).chats]
    for chat in chats:
        join_room(chat)

    user = read.find_user(pk=session["id"])
    user.chatProfile.sid = request.sid
    user.save()
    join_room(request.sid)

    emit("user_loaded", {"msg": "User loaded into rooms"})


@socketio.event(namespace="/chat")
def user_unloaded(json_data):
    print("unloaded user")
    chats = [x.id for x in read.find_user(pk=session["id"]).chats]
    for chat in chats:
        leave_room(chat)

    emit("user_unloaded", {"msg": "User unloaded from rooms"})


@socketio.event(namespace="/chat")
def message_edited(json_data):
    print("message edited: " + json_data)
    if json_data["chatType"] == "chat":
        chatID = json_data["chatID"]
        del json_data["chatID"], json_data["chatType"]
        update.editMessage(chatID, json_data["message_id"], json_data["content"])
        emit("message edited", {"new_content": json_data["content"]}, room=chatID)
    else:
        # TODO: Edit message for communities
        pass


@socketio.event(namespace="/chat")
def message_deleted(json_data):
    if json_data["chatType"] == "chat":
        chatID = json_data["chatID"]
        del json_data["chatID"], json_data["chatType"]
        delete.deleteMessage(message_id=json_data["messageID"], chat_id=chatID)
        emit("message deleted", {"message_id": json_data["messageID"]}, room=chatID)
    else:
        # TODO: Edit message for communities
        pass


@socketio.event(namespace="/chat")
def new_chat(data):
    data = {
        "owner": session["id"],
        "members": [session["id"], *data["members"]],
    }

    print(data)
    chat = create.createChat(data)
    chat = {
        "id": chat.id,
        "avatar": {"avatar_url": chat.avatar.avatar_url},
        "title": chat.title,
        "lastEdited": chat.lastEdited,
        "owner": session["id"],
        "members": [session["id"], *data["members"]],
    }

    sid_list = []

    for x, member in enumerate(chat["members"]):
        if len(chat["members"]) == 2:
            print(member)
            user_dict = User.objects.only(
                "id", "chatProfile", "username", "avatar.avatar_url"
            ).get(pk=member)

            print(user_dict)
            user_dict = json.loads(user_dict.to_json())
            chat["members"][x] = user_dict
            sid_list.append(user_dict["chatProfile"]["sid"])
            chat["owner"] = list(
                filter(lambda x: x["_id"] == chat["owner"], chat["members"])
            )[0]

        else:
            sid_list.append(
                User.objects.only("chatProfile.sid").get(pk=member).chatProfile.sid
            )

    print(sid_list)

    for sid in sid_list:
        if sid:
            socketio.emit("new_chat", chat, room=sid)


@internal.route("/get_schools", methods=["POST"])
def get_schools():
    from flask import jsonify
    return jsonify(get_school())


@internal.route("/change-status", methods=["POST"])
def changeStatus():
    json_data = request.get_json()
    return update.changeStatus(session["id"], **json_data)


@internal.route("/get-embed", methods=["GET"])
def get_embed():
    from bs4 import BeautifulSoup

    link = flask.request.args.get("link")
    try:
        request = requests.get(link)
    except:
        return "invalid"
    soup = BeautifulSoup(request.content, "html.parser")
    try:
        title = soup.find("meta", property="og:title")["content"]
    except:
        title = ""
    try:
        url = soup.find("meta", property="og:url")["content"]
    except:
        url = ""
    try:
        descrip = soup.find("meta", property="og:description")["content"]
    except:
        descrip = ""
    try:
        site = soup.find("meta", property="og:site_name")["content"]
    except:
        site = ""
    try:
        if "youtube.com/watch" in link:
            location = link.index("v=")
            id = link[location + 2: location + 14]
            image = """
            
           <iframe width="560" height="315" src="https://www.youtube.com/embed/${id}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>"""

        if "youtu.be/" in link:
            location = link.index("/")
            id = link[location + 1: location + 13]
            image = """
            
           <iframe width="560" height="315" src="https://www.youtube.com/embed/${id}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>"""

        else:
            image = soup.find("meta", property="og:image")["content"]
    except:
        image = ""
    try:
        color = soup.find("meta", property="theme-color")["content"]
    except:
        color = ""
    if (
            title != ""
            or url != ""
            or color != ""
            or image != ""
            or site != ""
            or descrip != ""
    ):
        embed = f"""
        <div style="border-style: none none none solid; border-width:3px; border-color:{color}" class="block p-6 max-w-sm bg-white rounded-lg border border-gray-200 shadow-md hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
        <a href="{url}"><h5 class="mb-2 text-md hover:underline font-bold tracking-tight text-black dark:text-white">{site}</h5></a>
        <a href="{link}"><h5 class="mb-2 text-xl hover:underline font-bold tracking-tight text-sky-500">{title}</h5></a>
        <p class="font-normal text-gray-700 dark:text-gray-400">{descrip}</p>
        <img src="{image}" style="width:90%; margin:auto; margin-top:10px;">
        </div>
        """
    else:
        embed = ""

    print(embed)

    return embed


@internal.route("/friend-request", methods=["POST"])
def friendRequest():
    json_data = request.get_json()
    return create.sendFriendRequest(session["id"], json_data["reciever_id"])


@internal.route("/block", methods=["POST"])
def block():
    json_data = request.get_json()
    return update.blockUser(json_data["user_id"], json_data["other_id"])


@internal.route("/mute", methods=["POST"])
def mute():
    json_data = request.get_json()
    return update.muteChat(session["id"], json_data["chat_id"])


@socketio.event(namespace="/chat")
def join_a_room(data):
    join_room(data["id"])


@internal.route("/fetch-chats", methods=["POST"])
def fetchChats():
    data = request.get_json()
    current_index = data["index"]
    chats = read.loadChats(
        session["id"],
        current_index,
        10,
        ["id", "title", "avatar.avatar_url", "members", "lastEdited", "owner"],
    )
    print(current_index, chats)
    print("im fetching chats")
    return jsonify(chats)


@internal.route("/get-chat", methods=["POST"])
def getChat():
    import datetime

    print(read.find_user(pk=session["id"]).password)

    data = request.get_json()
    chatID = data["chatID"]
    print(chatID)
    chat = json.loads(read.getChat(chatID).to_json())
    chat["messages"] = list(reversed(chat["messages"]))[:20]

    for message in chat["messages"]:
        message["sender"] = json.loads(
            User.objects.only("id", "username", "avatar.avatar_url")
                .get(pk=message["sender"])
                .to_json()
        )
        message["send_date"] = datetime.datetime.fromtimestamp(
            message["send_date"]["$date"] / 1000
        ).strftime("%m/%d/%Y at %I:%M:%S %p")

    for n, member in enumerate(chat["members"]):
        chat["members"][n] = json.loads(
            (
                User.objects.only(
                    "id", "username", "chatProfile", "avatar.avatar_url"
                ).get(pk=member)
            ).to_json()
        )
    chat["members"] = sorted(chat["members"], key=lambda x: x["username"])

    return jsonify(chat)


@internal.route("/fetch-messages", methods=["POST"])
def fetchMessages():
    data = request.get_json()
    print(data)
    chatID = data["chatID"]
    chat = json.loads(read.getChat(chatID).to_json())
    if len(chat["messages"]) < data["current_index"] + 20:
        print(len(chat["messages"]))
        chat["messages"] = list(reversed(chat["messages"]))[
                           data["current_index"]: len(chat["messages"])
                           ]
    else:
        chat["messages"] = list(reversed(chat["messages"]))[
                           data["current_index"]: (data["current_index"] + 30)
                           ]

    for message in chat["messages"]:
        message["sender"] = json.loads(
            User.objects.only("id", "username", "avatar.avatar_url")
                .get(pk=message["sender"])
                .to_json()
        )
        message["send_date"] = datetime.datetime.fromtimestamp(
            message["send_date"]["$date"] / 1000
        ).strftime("%m/%d/%Y at %I:%M:%S %p")

    print(len(chat["messages"]))

    return jsonify(chat["messages"])


@internal.route("/get-friends", methods=["GET"])
def get_friends():
    friends = read.get_friends(session["id"])
    return str(friends)


@internal.route("/get-blocks", methods=["GET"])
def get_blocked():
    blocked = read.get_blocks(session["id"])
    return str(blocked)
