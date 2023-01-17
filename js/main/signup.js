const HAS_NUMBER = /\d/;
const EMAIL_REGEX =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const VALID_USERNAME_REGEX = /^[A-Za-z][a-zA-Z0-9\.\-_]{2,31}$/;
let email_valid = false;
let validPassword = false;

function createUser() {
    console.log(document.getElementById('chosen').value);
    const request = $.ajax({
        type: 'POST',
        url: '/api/v1/internal/create-user',
        data: JSON.stringify({
            email: document.getElementById('email').value,
            username: document.getElementById('username').value,
            password: document.getElementById('password').value,
            age: document.getElementById('bday').value,
            language: document.getElementById('languages').value,
            theme: document.getElementById('theme').value,
            avatar: document.getElementById('chosen').innerText
        }),

        contentType: 'application/json; charset=utf-8',
        dataType: 'json'
    });

    request.done((data) => (window.location.href = '/dashboard'));
}

function next(num) {
    if (num === 1) {
        if (
            checks[0].innerText === 'check' &&
            checks[1].innerText === 'check' &&
            checks[2].innerText === 'check' &&
            checks[3].innerText === 'check'
        ) {
            const request = $.ajax({
                type: 'POST',
                url: '/api/v1/internal/signup-email',
                contentType: 'application/json',
                data: JSON.stringify({
                    email: document.getElementById('email').value,
                    username: document.getElementById('username').value
                })
            });
            document.getElementById('step' + num.toString()).style.display = 'none';
            document.getElementById('step' + (num + 1).toString()).style.display = 'block';
        } else alert("You can't move on yet!");
    } else if (num === 2) {
        console.log(checks);
        if (checks[4].innerHTML.includes('check') && checks[5].innerHTML.includes('check')) {
            document.getElementById('step' + num.toString()).style.display = 'none';
            document.getElementById('step' + (num + 1).toString()).style.display = 'block';
        } else alert("You can't move on yet!");
    } else if (num === 3) createUser();
}

function prev(num) {
    if (num !== 1) {
        setTimeout(function () {
            document.getElementById('step' + num.toString()).style.display = 'none';
            document.getElementById('step' + (num - 1).toString()).style.display = 'block';
            document.getElementsByClassName('ease-in duration-75')[num * 2 - 2].innerHTML =
                '<svg style="display: inline-block;" class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16l-4-4m0 0l4-4m-4 4h18"></path></svg> Previous';
        }, 1000);
    } else location.reload();
}

function validate(email) {
    return EMAIL_REGEX.test(email);
}

let username,
    validationIcons,
    password,
    passwordConfirm,
    email,
    bday,
    verification,
    errorMessages,
    checks;

window.addEventListener('load', function () {
    username = document.getElementById('username');
    validationIcons = document.getElementsByClassName('validation-icon');
    password = document.getElementById('password');
    passwordConfirm = document.getElementById('confirm-password');
    email = document.getElementById('email');
    bday = document.getElementById('bday');
    verification = document.getElementById('verification');
    errorMessages = document.getElementsByClassName('errormsg');
    checks = document.getElementsByClassName('validation-icon');

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

    for (let i = 1; i < 23; i++) {
        document.getElementsByClassName('cat' + i.toString())[0].onclick = function () {
            document
                .getElementsByClassName(document.getElementById('chosen').innerText)[0]
                .classList.remove('pfp_selected');
            document.getElementById('chosen').innerText = 'cat' + i.toString();
            document.getElementsByClassName('cat' + i.toString())[0].classList.add('pfp_selected');
        };
    }
    const r_l = ',<.>/?;:\'"\\|[{]}=+-_`!@#$%^&*()_+';

    function changeUser() {
        let usernameStatus = errorMessages[1];
        const usrname = username.value;
        usernameStatus.style.color = 'red';
        usernameStatus.innerHTML = '<br>';
        if (!usrname) {
            usernameStatus.innerHTML = 'Please enter a username!';
            validationIcons[1].style.color = 'red';
            validationIcons[1].innerHTML = '<i class="material-icons">close</i>';
            usrname.classList.add(...RED_BORDER);
            return false;
        }
        if (usrname.length < 3) {
            usernameStatus.innerHTML = 'Your username must be at least 3 characters long!';
            validationIcons[1].style.color = 'red';
            validationIcons[1].innerHTML = '<i class="material-icons">close</i>';
            username.classList.add(...RED_BORDER);
            return false;
        }
        if (usrname.length > 32) {
            usernameStatus.innerHTML = 'Your username must be less than 32 characters long!';
            validationIcons[1].style.color = 'red';
            validationIcons[1].innerHTML = '<i class="material-icons">close</i>';
            username.classList.add(...RED_BORDER);
            return false;
        }

        if (VALID_USERNAME_REGEX.test(usrname)) {

            const request = $.ajax({
                type: 'POST',
                url: '/api/v1/internal/check-signup-user',
                data: {
                    username: usrname
                }
            });

            request.done(function (data) {
                if (data === 'false') {
                    validationIcons[1].style.color = 'red';
                    validationIcons[1].innerHTML = '<i class="material-icons">close</i>';
                    usernameStatus.innerHTML = 'This username already exists!';
                    username.classList.remove(...GREEN_BORDER);
                    username.classList.add(...RED_BORDER);
                    return false;
                } else {
                    validationIcons[1].style.color = 'green';
                    validationIcons[1].innerHTML = '<i class="material-icons">check</i>';
                    username.classList.remove(...RED_BORDER);
                    username.classList.add(...GREEN_BORDER);
                    usernameStatus.innerHTML = '<br>';
                }
            });
        } else {
            usernameStatus.innerHTML = 'Your username may only contain letters, numbers, underscores, dashes, and spaces!';
            validationIcons[1].style.color = 'red';
            validationIcons[1].innerHTML = '<i class="material-icons">close</i>';
            username.classList.add(...RED_BORDER);
            return false;
        }
    }

    function changeEmail() {
        const value = email.value;

        let emailStatus = errorMessages[0];
        emailStatus.style.color = 'red';
        emailStatus.innerHTML = '<br>';

        if (email.value === '') {
            validationIcons[0].style.color = 'red';
            validationIcons[0].innerHTML = '<i class="material-icons">close</i>';
            emailStatus.innerHTML = 'Please enter an email!';
            email.classList.add(...RED_BORDER);
            return false;
        }
        if (validate(value) === false && value !== '') {
            validationIcons[0].style.color = 'red';
            validationIcons[0].innerHTML = '<i class="material-icons">close</i>';
            emailStatus.innerHTML = 'Please enter a valid email!';
            email.classList.add(...RED_BORDER);
            return false;
        }

        // alert(validate(value) && checkEmailExists(value));
        // return true;
        const request = $.ajax({
            type: 'POST',
            url: '/api/v1/internal/check-signup-email',
            data: {
                email: value
            }
        });

        request.done(function (data) {
            console.log(data);
            if (data === 'false') {
                validationIcons[0].style.color = 'red';
                validationIcons[0].innerHTML = '<i class="material-icons">close</i>';
                emailStatus.innerHTML = 'This email already exists!';
                email.classList.remove(...GREEN_BORDER);
                email.classList.add(...RED_BORDER);
                return false;
            } else {
                validationIcons[0].style.color = 'green';
                validationIcons[0].innerHTML = '<i class="material-icons">check</i>';
                email.classList.remove(...RED_BORDER);
                email.classList.add(...GREEN_BORDER);
                emailStatus.innerHTML = '<br>';
            }
        });
    }

    function confirmDate() {
        let status = errorMessages[5];
        status.style.color = 'red';
        status.innerHTML = '<br>';
        let value = bday.value;
        if (value !== '') {
            validationIcons[5].style.color = 'green';
            validationIcons[5].innerHTML = '<i class="material-icons">check</i>';
            bday.classList.remove(...RED_BORDER);
            bday.classList.add(...GREEN_BORDER);
            email_valid = true;
        } else {
            validationIcons[5].style.color = 'red';
            validationIcons[5].innerHTML = '<i class="material-icons">close</i>';
            status.innerHTML = 'Invalid Birthday';
            bday.classList.remove(...GREEN_BORDER);
            bday.classList.add(...RED_BORDER);
            email_valid = false;
        }
    }

    function confirmVerification() {
        let status = errorMessages[4];
        status.style.color = 'red';
        status.innerHTML = '<br>';
        const request = $.ajax({
            type: 'POST',
            url: '/api/v1/internal/check-verification-code',
            contentType: 'application/json',
            data: JSON.stringify({value: verification.value})
        });
        request.done(function (data) {
            if (data === 'true') {
                validationIcons[4].style.color = 'green';
                validationIcons[4].innerHTML = '<i class="material-icons">check</i>';
                verification.classList.remove(...RED_BORDER);
                verification.classList.add(...GREEN_BORDER);
                email_valid = true;
            } else {
                validationIcons[4].style.color = 'red';
                validationIcons[4].innerHTML = '<i class="material-icons">close</i>';
                status.innerHTML = 'Incorrect Confirmation';
                verification.classList.remove(...GREEN_BORDER);
                verification.classList.add(...RED_BORDER);
                email_valid = false;
            }
        });
    }

    function confirmPassword() {
        let status = errorMessages[3];
        status.style.color = 'red';
        status.innerHTML = '<br>';
        let value = passwordConfirm.value;
        let value2 = password.value;
        if (value === '') {
            validationIcons[3].style.color = 'red';
            validationIcons[3].innerHTML = '<i class="material-icons">close</i>';
            status.innerHTML = 'Please confirm your password!';
            passwordConfirm.classList.remove(...GREEN_BORDER);
            passwordConfirm.classList.add(...RED_BORDER);
            email_valid = false;
            return false;
        }
        if (value === value2 && value !== '') {
            validationIcons[3].style.color = 'green';
            validationIcons[3].innerHTML = '<i class="material-icons">check</i>';
            passwordConfirm.classList.remove(...RED_BORDER);
            passwordConfirm.classList.add(...GREEN_BORDER);
            email_valid = true;
        } else {
            validationIcons[3].style.color = 'red';
            validationIcons[3].innerHTML = '<i class="material-icons">close</i>';
            status.innerHTML = 'Two Passwords do not Match';
            passwordConfirm.classList.remove(...GREEN_BORDER);
            passwordConfirm.classList.add(...RED_BORDER);
            email_valid = false;
        }
    }

    if (localStorage.getItem('email') !== null) email.value = localStorage.getItem('email');

    function checkPassword() {
        validPassword = false;

        let status = errorMessages[2];
        status.style.color = 'red';
        status.innerHTML = '<br>';
        const value = password.value;
        if (value === '') {
            // User hasn't entered a password
            status.innerHTML = 'Please enter a password!';
            password.classList.remove(...GREEN_BORDER);
            password.classList.add(...RED_BORDER);
            validationIcons[2].style.color = 'red';
            validationIcons[2].innerHTML = '<i class="material-icons">close</i>';
            return false;
        }
        if (value.length < 6) {
            status.innerHTML = 'Password must be at least 6 characters long';
            password.classList.remove(...GREEN_BORDER);
            password.classList.add(...RED_BORDER);
            validationIcons[2].style.color = 'red';
            validationIcons[2].innerHTML = '<i class="material-icons">close</i>';
            return false;
        } else if (!HAS_NUMBER.test(value))
            status.innerHTML = 'Password must include at least 1 number';
        else {
            let hasSpecialCharacter = false;

            for (let i = 0; i < value.length; i++) {
                if (r_l.includes(value[i])) {
                    hasSpecialCharacter = true;
                    break;
                }
            }

            if (!hasSpecialCharacter) {
                status.innerHTML = 'Password must include at least 1 special character!';
                password.classList.remove(...GREEN_BORDER);
                password.classList.add(...RED_BORDER);
                validationIcons[2].style.color = 'red';
                validationIcons[2].innerHTML = '<i class="material-icons">close</i>';
            } else {
                validPassword = true;
                password.classList.remove(...RED_BORDER);
                password.classList.add(...GREEN_BORDER);
                validationIcons[2].style.color = 'green';
                validationIcons[2].innerHTML = '<i class="material-icons">check</i>';
            }
        }
    }

    email.onkeyup = changeEmail;
    (password.onkeyup = checkPassword), confirmPassword;
    passwordConfirm.onkeyup = confirmPassword;
    username.onkeyup = changeUser;
    bday.onkeyup = confirmDate;
    bday.onclick = confirmDate;
    keyUpDelay('#verification', 1000, confirmVerification);
});

function signUp() {
    console.log(validPassword);
    console.log(email_valid);

    let status = document.getElementById('status');
    status.style.color = 'red';
    status.innerHTML = '<br>';

    if (email.value === '') status.innerHTML = 'Please enter an email!';
    else if (username.value === '') status.innerHTML = 'Please enter a username!';
    else if (password.value === '') status.innerHTML = 'Please enter a password!';
    else if (document.getElementById('confirm').value === '')
        status.innerHTML = 'Please confirm your password!';
    else if (password.value !== document.getElementById('confirm').value)
        status.innerHTML = 'Passwords do not match!';
    else if (!email_valid) status.innerHTML = 'Please enter a valid email!';
    else if (!validPassword) status.innerHTML = 'Please enter a valid password!';
    else if (!(validPassword && email_valid))
        status.innerHTML = 'Please enter a valid email and password!';

    let submit = document.getElementById('submit');
    submit.disabled = true;
    submit.style.color = 'gray';
    submit.style.backgroundColor = '#006097';

    const xhttp = new XMLHttpRequest();
    xhttp.open('POST', '/signup', true);
    xhttp.setRequestHeader('Content-type', 'application/json');
    xhttp.addEventListener('load', reqListener);
    xhttp.send(
        JSON.stringify({
            username: document.querySelector('#username').value,
            password: document.querySelector('#password').value,
            email: document.querySelector('#email').value,
            age: document.querySelector('#bday').value,
            theme: document.querySelector('#themes').value,
            language: document.querySelector('#languages').value,
            avatar: document.querySelector('#chosen').value
        })
    );
}

function reqListener() {
    let status = document.getElementById('status');
    let submit = document.getElementById('submit');

    if (this.responseText === '1')
        status.innerHTML =
            'That email and username already exist! Consider <a href="/signin">signing in</a> instead.';
    else if (this.responseText === '2') status.innerHTML = 'Username already exists!';
    else if (this.responseText === '3') status.innerHTML = 'Email already exists!';
    else {
        status.style.color = 'yellowgreen';
        status.innerHTML = 'Sign up successful!';
        window.location.href = '/dashboard';
    }

    submit.disabled = false;
    submit.style.color = 'white';
    submit.style.backgroundColor = '#00a2ff';
}
