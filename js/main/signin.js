let main, reset, code;

function resetScreen() {
    main.classList.toggle('hidden');
    reset.classList.toggle('hidden');
    usernameInput.value = username.value;
}

function selectChanged() {
    document.getElementById('schoolName').innerText =
        'Your ' + document.getElementById('selection').value + ' account';
    document.getElementById('schoolInput').placeholder =
        'Your ' + document.getElementById('selection').value + ' Username';
    document.getElementById('typeHere').style.display = 'block';
}

function SSO() {
    if (document.getElementById('sso').innerText.includes('SSO')) {
        document.getElementById('signin_form').style.display = 'none';
        document.getElementById('sso').innerHTML = 'Return to Log In';
        document.getElementById('signin_form2').style.display = 'block';
        document.getElementById('schoologyy').style.display = 'none';
    } else {
        document.getElementById('signin_form').style.display = 'block';
        document.getElementById('signin_form2').style.display = 'none';
        document.getElementById('sso').innerHTML =
            '<span class="material-icons-outlined md-36">key</span> SSO Login';
        document.getElementById('schoologyy').style.display = 'block';
    }
}

function Schoology() {
    if (document.getElementById('schoologyy').innerText.includes('Schoology')) {
        document.getElementById('signin_form').style.display = 'none';
        document.getElementById('schoologyy').innerHTML = 'Return to Log In';
        document.getElementById('signin_form3').style.display = 'block';
        document.getElementById('launchBTN').style.display = 'block';
        document.getElementById('sso').style.display = 'none';
    } else {
        document.getElementById('signin_form').style.display = 'block';
        document.getElementById('signin_form3').style.display = 'none';
        document.getElementById('schoologyy').innerHTML = 'Schoology Login';
        document.getElementById('launchBTN').style.display = 'none';
        document.getElementById('sso').style.display = 'block';
    }
}

$('#confirmBTN').on('click', function () {
    const $this = $(this);
    $this.button('loading');
    setTimeout(function () {
        const request = $.ajax({
            type: 'POST',
            url: '/api/v1/internal/signin-with-schoology',
            data: {
                link: 'https://' + document.getElementById('domain').value + '.schoology.com/'
            }
        });

        request.done(function (data) {
            $this.button('reset');
            let resp = document.getElementById('resp');
            if (data === '1') {
                resp.style.color = 'red';
                resp.innerHTML =
                    'Login Failed. Reason: Clicked Deny on Schoology or closed Schoology popup window. Make sure Popups are enabled on your browser. Click Authorize again and click Approve this time!';
                document.getElementById('auth').style.display = 'inline';
                document.getElementById('connectbtn').style.display = 'none';
            } else if (data === '2') {
                resp.style.color = 'red';
                resp.innerHTML =
                    'Login Failed. Reason: Your account is not connected to Schoology. Please signin normally and then connect your schoology account to signin with Schoology.';
                document.getElementById('auth').style.display = 'inline';
                document.getElementById('connectbtn').style.display = 'none';
            } else {
                resp.style.color = 'green';
                resp.innerHTML = 'Successfully linked the Schoology Account <b>' + data + '</b>!';
                //window.location.replace("/settings");
            }
        });
    }, 1000);
});

function startSchoology() {
    let domain = document.getElementById('domain').value;
    const request = $.ajax({
        type: 'GET',
        url: '/api/v1/internal/generate-schoology-oauth-url',
        data: {}
    });

    let newwindow2;
    request.done(
        (data) =>
            (newwindow2 = window.open(
                data.replace('bins', domain),
                'Authorize with Schoology2',
                'height=400,width=800'
            ))
    );

    document.getElementById('launchBTN').style.display = 'none';
    document.getElementById('confirmBTN').style.display = 'none';
    document.getElementById('selectdomain').style.display = 'none';

    function checkIfDone() {
        const request = $.ajax({
            type: 'GET',
            url: '/api/v1/internal/check-schoology-connection',
            data: {}
        });

        request.done((data) => {
            if (data === 'False') checkIfDone();
        });
    }

    checkIfDone();
    document.getElementById('confirmBTN').style.display = 'block';
}

function confirmSchoology() {
    const request = $.ajax({
        type: 'POST',
        url: '/api/v1/internal/signin-with-schoology',
        data: {
            link: 'https://' + document.getElementById('domain').value + '.schoology.com/'
        }
    });
    request.done(function (data) {
        document.getElementById('confirmBTN').style.display = 'none';
        if (data === '1' || data === '2') {
            document.getElementById('launchBTN').style.display = 'block';
            document.getElementById('error').style.display = 'block';
            if (data === '1')
                document.getElementById('error').innerHTML =
                    'Login Failed. Reason: Clicked Deny on Schoology or closed Schoology popup window. Make sure Popups are enabled on your browser. Click Authorize again and click Approve this time!';
            else
                document.getElementById('error').innerHTML =
                    'Login Failed. Reason: Your account is not connected to Schoology. Please signin normally and then connect your schoology account to signin with Schoology.';
        } else {
            let email = data.split('•')[1];
            let name = data.split('•')[0];
            document.getElementById('confirmation').style.display = 'block';
            document.getElementById('name').innerHTML = name;
            document.getElementById('email').innerHTML = email;

            window.location.href = '/dashboard';
        }
    });
}

const RED_BORDER = [
    'bg-red-50',
    'border',
    'border-red-500',
    'text-red-900',
    'placeholder-red-700',
    'text-sm',
    'rounded-lg',
    'focus:ring-red-500',
    'focus:border-red-500',
    'block',
    'w-full',
    'p-2.5',
    'dark:bg-red-100',
    'dark:border-red-400'
];
const GREEN_BORDER = [
    'g-green-50',
    'border',
    'border-green-500',
    'text-green-900',
    'placeholder-green-700',
    'text-sm',
    'rounded-lg',
    'focus:ring-green-500',
    'focus:border-green-500',
    'block',
    'w-full',
    'p-2.5',
    'dark:bg-green-100',
    'dark:border-green-400'
];
let username, password;

window.addEventListener('load', function () {
    username = document.getElementById('usrname');
    password = document.getElementById('psw');
    main = document.getElementById('main');
    reset = document.getElementById('reset');
    code = document.getElementById('resetCode');

    let loginButton = document.getElementById('log_in');
    loginButton.style.color = 'gray';
    loginButton.style.backgroundColor = '#006097';
    loginButton.disabled = true;

    function checkCredentials() {
        const errorUsername = document.getElementsByClassName('error-msg');
        const errorPassword = document.getElementsByClassName('password-error-msg');

        if (username.value === '') {
            errorUsername.innerHTML = 'Hey! Please enter a username!';
            username.classList.add(...RED_BORDER);
        } else errorUsername.innerHTML = '';

        if (password.value === '') {
            errorPassword.innerHTML = 'Hey! Please enter a password!';
            password.classList.add(...RED_BORDER);
        } else errorPassword.innerHTML = '';

        if (username.value === '' && password.value === '') return false;

        const xhttp = new XMLHttpRequest();
        xhttp.open('POST', '/api/v1/internal/check-signin', true);
        xhttp.setRequestHeader('Content-type', 'application/json');
        xhttp.addEventListener('load', reqListener1);
        xhttp.send(
            JSON.stringify({
                username: username.value,
                password: password.value
            })
        );
    }

    keyUpDelay('#usrname, #psw', 500, checkCredentials);
});

function reqListener1() {
    const usernameError = document.getElementById('error');
    const passwordError = document.getElementById('password-error');
    const usernameErrorMsg = document.getElementById('error-msg');
    const passwordErrorMsg = document.getElementById('password-error-msg');

    if (this.responseText.split('-')[0] === 'true') {
        usernameError.style.color = 'green';
        usernameError.innerHTML = '<p class="material-icons">check_circle</p>';
        usernameErrorMsg.style.color = 'green';
        usernameErrorMsg.innerHTML = 'Correct Username!';

        username.classList.remove(...RED_BORDER);
        username.classList.add(...GREEN_BORDER);
    }
    if (this.responseText.split('-')[1] === 'true') {
        passwordError.style.color = 'green';
        passwordError.innerHTML = '<p class="material-icons">check_circle</p>';
        passwordErrorMsg.style.color = 'green';
        passwordErrorMsg.innerHTML = 'Correct Password!';

        password.classList.remove(...RED_BORDER);
        password.classList.add(...GREEN_BORDER);
    }

    if (this.responseText.split('-')[0] === 'false' && username.value !== '') {
        usernameError.style.color = 'red';
        usernameError.innerHTML = '<p class="material-icons">error</p>';
        usernameErrorMsg.style.color = 'red';
        usernameErrorMsg.innerHTML = 'Incorrect Username!';

        username.classList.remove(...GREEN_BORDER);
        username.classList.add(...RED_BORDER);
    }
    if (this.responseText.split('-')[1] === 'false' && password.value !== '') {
        passwordError.style.color = 'red';
        passwordError.innerHTML = '<p class="material-icons">error</p>';
        passwordErrorMsg.style.color = 'red';
        passwordErrorMsg.innerHTML = 'Incorrect Password!';
        password.classList.remove(...GREEN_BORDER);
        password.classList.add(...RED_BORDER);
    }

    if (this.responseText.split('-')[1] === 'true' && this.responseText.split('-')[0] === 'true') {
        let loginButton = document.getElementById('log_in');
        let usernameInput = username;
        let passwordInput = password;
        loginButton.disabled = false;
        loginButton.style.color = '#eff6ff';
        loginButton.style.backgroundColor = '3';
        loginButton.classList.add('hover:bg-blue-800');
        // usernameInput.disabled = true;
        // passwordInput.disabled = true;
    }
}

function loginUser() {
    const xhttp = new XMLHttpRequest();
    xhttp.open('POST', '/api/v1/internal/sign-in', true);
    xhttp.setRequestHeader('Content-type', 'application/json');
    xhttp.addEventListener('load', reqListener2);
    xhttp.send(
        JSON.stringify({
            username: username.value,
            password: password.value
        })
    );
}

function getRedirectParam() {
    let qd = {};
    if (location.search)
        location.search
            .substr(1)
            .split('&')
            .forEach(function (item) {
                let s = item.split('='),
                    k = s[0],
                    v = s[1] && decodeURIComponent(s[1]); //  null-coalescing / short-circuit
                //(k in qd) ? qd[k].push(v) : qd[k] = [v]
                (qd[k] = qd[k] || []).push(v); // null-coalescing / short-circuit
            });
    console.log(qd);
    if (qd['redirect']) {
        return qd['redirect'][0];
    }
    return '/dashboard';
}

function reqListener2() {
    if (this.responseText === 'true') {
        let status = document.getElementById('fail');
        status.style.color = 'yellowgreen';
        status.innerHTML = 'Login Successful. Logging you in...';
        window.location.href = getRedirectParam();
    } else {
        let status = document.getElementById('fail');
        status.style.color = 'red';
        status.innerHTML =
            'Oh no! A super rare bug occured on our end! Please contact support immediately!';
    }
}
