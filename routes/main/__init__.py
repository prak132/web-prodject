from flask import Blueprint

main_blueprint = Blueprint(
    "main_blueprint",
    __name__,
    template_folder="../../templates",
    static_folder="../../static",
    url_prefix="/",
)
# Importing routes for this blueprint

from .about import *
from .calendar import *
from .canvas import *
from .chat import *
from .connections import *
from .course import *
from .dashboard import *
from .discord import *
from .files import *
from .gclassroom import *
from .index import *
from .lms import *
from .logout import *
from .music import *
from .notepad import *
from .planner import *
from .points import *
from .pricing import *
from .profile import *
from .schoology import *
from .settings import *
from .signin import *
from .signup import *
from .soon import *
from .spotify import *
from .study import *
from .utils import *
