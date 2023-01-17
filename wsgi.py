from main import app, socketio
import platform

debug = False
if __name__ == "__main__":
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
