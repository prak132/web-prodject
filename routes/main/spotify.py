import uuid

import spotipy
from flask import redirect, render_template, request, session
from spotipy import CacheHandler, SpotifyException

from . import main_blueprint
from .utils import logged_in

# In order to get Spotipy to work, you must install the latest version with cloning the repo with the following command:
# pip3 install git+https://github.com/plamere/spotipy
SPOTIPY_CLIENT_ID = "9eb38c31d84b43e5a2557a6f98c5a064"
SPOTIPY_CLIENT_SECRET = "eddbab5eb3b2434694af122a8f99bf87"


# SPOTIPY_REDIRECT_URI = "http://localhost:8080/spotify"


def generate_redirect(url):
    if "nebulus" in url:
        if "https" not in url:
            return url.replace("http", "https") + "spotify"
    return url + "spotify"


class FlaskSessionCacheHandler(CacheHandler):
    """
    A cache handler that stores the token info in the session framework
    provided by Django.
    Read more at https://docs.djangoproject.com/en/3.2/topics/http/sessions/
    """

    def __init__(self, request):
        """
        Parameters:
            * request: HttpRequest object provided by Django for every
            incoming request
        """
        self.request = request

    def get_cached_token(self):
        token_info = None
        try:
            token_info = session["token_info"]
        except KeyError:
            print("Spotify token not found in the session")

        return token_info

    def save_token_to_cache(self, token_info):
        try:
            session["token_info"] = token_info
        except Exception as e:
            print("Error saving token to cache: " + str(e))


def get_spotify_auth():
    try:
        if "uuid" not in session.keys() or "token_info" not in session.keys():
            return 0

        cache_handler = FlaskSessionCacheHandler(CacheHandler)
        SPOTIPY_REDIRECT_URI = generate_redirect(request.root_url)
        auth_manager = spotipy.oauth2.SpotifyOAuth(
            scope="user-read-currently-playing playlist-modify-private app-remote-control streaming",
            cache_handler=cache_handler,
            show_dialog=True,
            client_id=SPOTIPY_CLIENT_ID,
            client_secret=SPOTIPY_CLIENT_SECRET,
            redirect_uri=SPOTIPY_REDIRECT_URI,
        )

        if not auth_manager.validate_token(cache_handler.get_cached_token()):
            return 1

        spotify = spotipy.Spotify(auth_manager=auth_manager)
        return spotify

    except SpotifyException as e:
        if "not registered" in str(e):
            return 3


@main_blueprint.route("/spotify")
@logged_in
def spotify_route():
    if not session.get("uuid"):
        # Step 1. Visitor is unknown, give random ID
        session["uuid"] = str(uuid.uuid4())

    cache_handler = FlaskSessionCacheHandler(CacheHandler())
    SPOTIPY_REDIRECT_URI = generate_redirect(request.root_url)
    auth_manager = spotipy.oauth2.SpotifyOAuth(
        scope="user-read-currently-playing playlist-modify-private app-remote-control streaming",
        cache_handler=cache_handler,
        show_dialog=True,
        client_id=SPOTIPY_CLIENT_ID,
        client_secret=SPOTIPY_CLIENT_SECRET,
        redirect_uri=SPOTIPY_REDIRECT_URI,
    )

    if request.args.get("code"):
        # Step 3. Being redirected from Spotify auth page
        auth_manager.get_access_token(request.args.get("code"))
        return redirect("/spotify")

    if not auth_manager.validate_token(cache_handler.get_cached_token()):
        # Step 2. Display sign in link when no token
        auth_url = auth_manager.get_authorize_url()
        return redirect(auth_url)

    # Step 4. Signed in, display data
    spotify = spotipy.Spotify(auth_manager=auth_manager)
    return render_template(
        "connections/connectSpotify.html", spotify=spotify, auth=False
    )


@main_blueprint.route("/spotify/sign_out")
def spotify_sign_out():
    try:
        # Remove the CACHE file (.cache-test) so that a new user can authorize.
        session.pop("token_info")
        session.pop("uuid")
    except OSError as e:
        print(f"Error: {e.filename} - {e.strerror}.")
    return redirect("/spotify")


@main_blueprint.route("/spotify/playlists")
def spotify_playlists():
    if "uuid" not in session.keys() or "token_info" not in session.keys():
        return 2
    cache_handler = FlaskSessionCacheHandler(CacheHandler())
    SPOTIPY_REDIRECT_URI = generate_redirect(request.root_url)
    auth_manager = spotipy.oauth2.SpotifyOAuth(
        scope="user-read-currently-playing playlist-modify-private app-remote-control streaming",
        cache_handler=cache_handler,
        show_dialog=True,
        client_id=SPOTIPY_CLIENT_ID,
        client_secret=SPOTIPY_CLIENT_SECRET,
        redirect_uri=SPOTIPY_REDIRECT_URI,
    )

    if not auth_manager.validate_token(cache_handler.get_cached_token()):
        return redirect("/spotify")

    spotify = spotipy.Spotify(auth_manager=auth_manager)
    return spotify.current_user_playlists()


@main_blueprint.route("/spotify/currently_playing")
def currently_playing():
    return str(get_currently_playing())


def pause_spotify():
    spotify = get_spotify_auth()

    if spotify == 0:
        return 2
    elif spotify == 1:
        return redirect("/spotify")

    spotify.pause_playback()


def next_spotify():
    spotify = get_spotify_auth()

    if spotify == 0:
        return 2
    elif spotify == 1:
        return redirect("/spotify")

    spotify.next_track()


def prev_spotify():
    spotify = get_spotify_auth()

    if spotify == 0:
        return 2
    elif spotify == 1:
        return redirect("/spotify")

    spotify.previous_track()


def loop_spotify():
    spotify = get_spotify_auth()

    if spotify == 0:
        return 2
    elif spotify == 1:
        return redirect("/spotify")

    spotify.repeat("track")


def skip_spotify():
    spotify = get_spotify_auth()

    if spotify == 0:
        return 2
    elif spotify == 1:
        return redirect("/spotify")


def loop1_spotify():
    spotify = get_spotify_auth()

    if spotify == 0:
        return 2
    elif spotify == 1:
        return redirect("/spotify")

    spotify.repeat("context")


def loop2_spotify():
    spotify = get_spotify_auth()

    if spotify == 0:
        return 2
    elif spotify == 1:
        return redirect("/spotify")

    spotify.repeat("off")


def shuffle_spotify():
    spotify = get_spotify_auth()

    if spotify == 0:
        return 2
    elif spotify == 1:
        return redirect("/spotify")

    spotify.shuffle("true")


def shuffle2_spotify():
    spotify = get_spotify_auth()

    if spotify == 0:
        return 2
    elif spotify == 1:
        return redirect("/spotify")

    spotify.shuffle("false")


def get_currently_playing():
    spotify = get_spotify_auth()

    if spotify == 0:
        return [2]
    elif spotify == 1:
        return [3]

    track = spotify.current_user_playing_track()
    if track is not None:
        timestamp = int(track["progress_ms"] // 1000)
        total = int(track["item"]["duration_ms"] // 1000)
        name = track["item"]["name"]
        artists = []
        explicit = track["item"]["explicit"]
        for i in track["item"]["artists"]:
            artists.append(i["name"])
        image = track["item"]["album"]["images"][0]["url"]
        album = track["item"]["album"]["name"]

        playing = track["is_playing"]
        return [name, artists, album, explicit, image, playing, timestamp, total]

    return [1]


def resume_spotify():
    spotify = get_spotify_auth()

    if spotify == 0:
        return 2
    elif spotify == 1:
        return redirect("/spotify")

    spotify.start_playback()


@main_blueprint.route("/spotify/current_user")
def spotify_current_user():
    cache_handler = FlaskSessionCacheHandler(CacheHandler)
    SPOTIPY_REDIRECT_URI = generate_redirect(request.root_url)
    auth_manager = spotipy.oauth2.SpotifyOAuth(
        scope="user-read-currently-playing playlist-modify-private app-remote-control streaming",
        cache_handler=cache_handler,
        show_dialog=True,
        client_id=SPOTIPY_CLIENT_ID,
        client_secret=SPOTIPY_CLIENT_SECRET,
        redirect_uri=SPOTIPY_REDIRECT_URI,
    )

    if not auth_manager.validate_token(cache_handler.get_cached_token()):
        return redirect("/spotify")
    spotify = spotipy.Spotify(auth_manager=auth_manager)

    return spotify.current_user()
