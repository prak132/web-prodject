from flask import request

from app.routes.main.spotify import get_currently_playing
from app.routes.main.spotify import (
    loop1_spotify,
    loop2_spotify,
    loop_spotify,
    next_spotify,
    pause_spotify,
    prev_spotify,
    resume_spotify,
    shuffle2_spotify,
    shuffle_spotify,
)
from app.static.python.music.musixmatch import Musixmatch
from . import internal


def convert(secs):
    part1 = str(secs // 60)
    part2 = str(secs % 60)
    if len(part2) == 1:
        part2 = "0" + part2
    return f"{part1}:{part2}"


@internal.route("/spotify-status", methods=["POST"])
def spotify_status():
    song = get_currently_playing()
    if song[0] == 1:
        return "1"  # Spotify Not Detected

    elif song[0] == 2:
        return "2"  # Spotify Isn't Connected

    elif song[0] == 3:
        return "3"  # Spotify Not Registered in Developer Dashboard

    elif len(song) == 8:
        # TODO: support advertisements, returns 500 currently
        name, artists2, album, explicit, image, playing, timestamp, total = song
        if explicit:
            explicit = '<i class="material-icons">explicit</i>'
        else:
            explicit = ""
        artists = ""
        count = 0
        for i in artists2:
            artists += i
            count += 1
            if count != len(artists2):
                artists += ", "
        ratio = round(timestamp / total * 100)
        timestamp = convert(timestamp)
        total = convert(total)
        if not playing:
            if not request.form.get("paused"):
                playing = (
                    '<i onclick="sendRQ(\'/api/v1/internal/spotify/pause\')" style="font-size:48px !important;" '
                    'class="material-icons">pause_circle</i> '
                )
            else:
                playing = '<i onclick="sendRQ(\'/api/v1/internal/spotify/resume\')" style="margin-left:20px;color:white;" class="material-icons">play</i>'
        else:
            if not request.form.get("paused"):
                playing = (
                    '<i onclick="sendRQ(\'/api/v1/internal/spotify/pause\')" style="font-size:48px !important;" '
                    'class="material-icons">pause_circle</i> '
                )
            else:
                playing = (
                    '<i onclick="sendRQ(\'/api/v1/internal/spotify/resume\')" style="margin-left:20px;color:white;" '
                    'class="material-icons">pause</i> '
                )
        string = (
                name
                + " • "
                + artists
                + " • "
                + album
                + " • "
                + str(explicit)
                + " • "
                + image
                + " • "
                + str(playing)
                + " • "
                + str(timestamp)
                + " • "
                + str(total)
                + " • "
                + str(ratio)
        )
    else:
        string = "You aren't listening to anything!"
    return string


@internal.route("/spotify/skip-f", methods=["POST"])
def spotifyskipf():
    next_spotify()
    return "Success"


@internal.route("/spotify/skip-b", methods=["POST"])
def spotifyskipb():
    prev_spotify()
    return "Success"


@internal.route("/spotify/shuffle", methods=["POST"])
def spotifyshuffle():
    shuffle_spotify()
    return "Success"


@internal.route("/spotify/stopshuffle", methods=["POST"])
def spotifystopshuffle():
    shuffle2_spotify()
    return "Success"


@internal.route("/spotify/loop_small", methods=["POST"])
def spotifyloop():
    loop_spotify()
    return "Success"


@internal.route("/spotify/loop_big", methods=["POST"])
def spotifyloop1():
    loop1_spotify()
    return "Success"


@internal.route("/spotify/loop_big", methods=["POST"])
def spotifystoploop():
    loop2_spotify()
    return "Success"


@internal.route("/spotify/pause", methods=["POST"])
def spotifypause():
    pause_spotify()
    return "Success"


@internal.route("/spotify/resume", methods=["POST"])
def spotifyresume():
    resume_spotify()
    return "Success"


@internal.route("/get_lyrics")
def get_lyrics():
    musixmatch = Musixmatch("bbd8cc3d9f6c1444e01d9d66b44f0f49")
    artist = request.args.get("artist")
    song = request.args.get("song")
    try:
        result = musixmatch.track_search(
            q_track=f"{song}",
            q_artist=f"{artist}",
            page_size=1,
            page=1,
            s_track_rating="desc",
        )
        # print(result)
        result1 = result["message"]["body"]["track_list"][0]["track"]["track_id"]
        result2 = result["message"]["body"]["track_list"][0]["track"]["commontrack_id"]
        # print(result1)
        # print(result2)
    except:
        return "Search Failed"

    try:
        result = musixmatch.track_lyrics_get(
            track_id=int(result1), commontrack_id=int(result2)
        )
        # result = musixmatch.track_richsync_get(track_id=int(result1))
        result = result["message"]["body"]["lyrics"]["lyrics_body"].replace(
            "\n", "<br>"
        )
        # print(result)
    except:
        return "Lyric Finding Failed"

    return str(result)
