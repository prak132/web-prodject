from flask import redirect, session

from . import main_blueprint


@main_blueprint.route("/logout", methods=["GET"])
def logout():
    print(session["username"], "logged out")
    session.clear()
    return redirect("/")
    '''
    return """
    <script>navigator.serviceWorker.getRegistrations().then(function(registrations) {
 for(let registration of registrations) {
      registration.unregister()
    } })
    window.location.replace("/");
</script>
    """
    '''
