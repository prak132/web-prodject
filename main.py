"""
App entrypoint.
"""
import os
import platform

from dotenv import load_dotenv

load_dotenv()
from app.routes import init_app, socketio

app = init_app()
app.secret_key = os.getenv("MONGOPASS")

# Debug mode logs errors in more detail. Best used for testing, not production
debug = False
if __name__ == "__main__":
    if platform.system().lower() == "linux":  # linux - used for VPS (like DigitalOcean)
        debug = False
        port = 80
        host = "0.0.0.0"
        protocol = "s"
    else:  # macos (darwin) or windows (windows)
        port = 8080
        host = "localhost"
        protocol = ""

    print(str(app.url_map).replace("Map([", " ", 1).replace("])", "\n"), sep="\n")
    print(f"Started Running: http{protocol}://{host}:{port}")
    socketio.run(app, host=host, port=port)
