import flask
import google.oauth2.credentials
from googleapiclient.discovery import build

from app.static.python.mongodb import read
from . import main_blueprint
from .spotify import (
    SPOTIPY_CLIENT_ID,
    SPOTIPY_CLIENT_SECRET,
    CacheHandler,
    FlaskSessionCacheHandler,
    SpotifyException,
    logged_in,
    render_template,
    request,
    session,
    spotipy,
)


def generate_redirect(url):
    if "nebulus" in url:
        if "https" not in url:
            return url.replace("http", "https") + "spotify"
    return url + "spotify"


@main_blueprint.route("/settings", methods=["GET"])
@logged_in
def settings():
    print(session.get("username"))
    the_schoology = read.getSchoology(username=session.get("username"))
    the_google_classroom = read.getClassroom(username=session.get("username"))
    googleclassroom = None
    try:
        credentials = google.oauth2.credentials.Credentials(
            **flask.session["credentials"]
        )

        service = build("people", "v1", credentials=credentials)
        profile = service.people().get("people/me", personFields="names,emailAddresses")
        print(profile)

    except:
        googleclassroom = None

    try:
        credentials = google.oauth2.credentials.Credentials(
            **flask.session["credentials"]
        )
        user_info_service = build(
            serviceName="oauth2", version="v2", credentials=credentials
        )
        user_info = user_info_service.userinfo().get().execute()
        print(user_info)
        user_info = [user_info["name"], user_info["picture"]]
        googleclassroom = user_info

    except:
        user_info = None

    canvas = session.get("canvas")

    cache_handler = FlaskSessionCacheHandler(CacheHandler)
    spotify_auth_manager = spotipy.oauth2.SpotifyOAuth(
        scope="user-read-currently-playing playlist-modify-private",
        cache_handler=cache_handler,
        show_dialog=True,
        client_id=SPOTIPY_CLIENT_ID,
        client_secret=SPOTIPY_CLIENT_SECRET,
        redirect_uri=generate_redirect(request.root_url),
    )
    spotify = spotipy.Spotify(auth_manager=spotify_auth_manager)

    if not spotify_auth_manager.validate_token(cache_handler.get_cached_token()):
        spotify = None
    else:
        try:
            spotify = spotify.current_user()
        except SpotifyException:
            spotify = None

    try:
        discord = (session["discord_user"], session["discord_avatar"])
    except:
        discord = None

    return render_template(
        "user/settings.html",
        page="Nebulus - Account Settings",
        session=session,
        user=session.get("username"),
        pswHashes="*" * session.get("pswLen"),
        email=session.get("email"),
        avatar=session.get("avatar", "/static/images/nebulusCats/v3.gif"),
        schoology=the_schoology,
        classroom=the_google_classroom,
        googleclassroom=user_info,
        canvas=canvas,
        spotify=spotify,
        discord=discord,
    )
