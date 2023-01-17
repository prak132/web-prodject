import flask

from .. import v1

internal = flask.Blueprint(
    "internal",
    __name__,
    url_prefix="/internal",
    static_folder="static",
    template_folder="templates",
)
v1.register_blueprint(internal)

# Importing routes for this blueprint

from .change_course import *
from .chat_functions import *
from .check_signin import *
from .check_signup import *
from .check_type import *
from .connect_to_schoology import *
from .connected_to_schoology import *
from .create_avatar import *
from .create_chat import *
from .create_course import *
from .create_course_resource import *
from .create_integration import *
from .create_schoology_course import *
from .create_user import *
from .delete_course import *
from .delete_user import *
from .email_exists import *
from .file_upload import *
from .file_upload_link import *
from .find_folders import *
from .generate_schoology_oauth_url import *
from .get_schoology_messages import *
from .check_verification_code import *
from .logout_of_schoology import *
from .nebulusdocs import *
from .plagarism import *
from .planner import *
from .schoology_callback import *
from .search import *
from .send_email import *
from .signin_post import *
from .signup_post import *
from .spotify_status import *
from .upload_document import *
from .username_exists import *
