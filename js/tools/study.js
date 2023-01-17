const inputs = document.querySelectorAll('#time input');
const labels = document.querySelectorAll('#time span');
const config = document.getElementById('config');
const timer = document.getElementById('timer');
const timerEnd = document.getElementById('timerEnd');
const display = document.getElementById('timerDisplay');
const start = document.getElementById('start');
const timerName = document.getElementById('timerName');
const pauseButton = document.getElementById('pause');
const popupButton = document.getElementById('popup');

const pauseClasses = ['bg-yellow-300', 'border-yellow-400', 'hover:bg-yellow-500'];
const resumeClasses = ['bg-green-500', 'border-green-700', 'hover:bg-green-800'];

let hours, minutes, seconds, interval;
let paused = false;
let timerStarted = localStorage.getItem('currentTimer') !== null;
let bypassUnload = false;
let isPopup = localStorage.getItem('popup') !== null;
const updateVariable = document.getElementById('updateVariable');
updateVariable.classList.add('hidden');

window.addEventListener('beforeunload', () => {
    if (interval) clearInterval(interval);

    if (bypassUnload) {
        bypassUnload = false;
        return;
    }
    localStorage.removeItem('popup');
    localStorage.removeItem('currentTimer');
    localStorage.removeItem('originalTimer');
    localStorage.removeItem('startTimer');
});

if (localStorage.getItem('popup')) {
    popupButton.innerHTML = 'open_in_browser';
    document.getElementById('navbar').classList.add('hidden');
}

function loadTimer() {
    if (interval) clearInterval(interval);

    const currentTimer = localStorage.getItem('currentTimer');
    if (!currentTimer) {
        onTimerEnd();
        configure();
        return;
    }
    const data = currentTimer.split('\n');
    timerName.innerHTML = data[0];
    paused = parseInt(data[1]) === 1;
    hours = parseInt(data[2]);
    minutes = parseInt(data[3]);
    seconds = parseInt(data[4]) + isPopup;

    if (hours < 0) {
        onTimerEnd();
        return;
    }

    config.classList.add('hidden');
    timer.classList.remove('hidden');

    subtractTime();

    if (paused) pause();
    else resume();
}

const saveTimer = () =>
    localStorage.setItem(
        'currentTimer',
        [timerName.innerHTML, paused + 0, hours, minutes, seconds].join('\n')
    );

if (localStorage.getItem('currentTimer')) loadTimer();

document.addEventListener('keydown', () => {
    let focused = false;

    if (document.activeElement === document.getElementById('name')) focused = true;
    else
        for (let i = 0; i < 3; i++) {
            if (document.activeElement === inputs[i]) {
                focused = true;
                break;
            }
        }

    if (!focused) inputs[2].focus();
});

for (let i = 0; i < 3; i++) {
    inputs[i].oninput = () => {
        inputs[i].value = inputs[i].value.replaceAll('-', '');
        if (inputs[i].value.length >= 2) inputs[i].value = inputs[i].value.substring(0, 2);

        const max = parseInt(inputs[i].getAttribute('max'));
        if (max < 99 && parseInt(inputs[i].value) > max) inputs[i].value = max + '';

        if (parseInt(inputs[i].value) !== 1) {
            if (!labels[i].innerHTML.endsWith('s')) labels[i].innerHTML += 's';
        } else {
            if (labels[i].innerHTML.endsWith('s'))
                labels[i].innerHTML = labels[i].innerHTML.substring(
                    0,
                    labels[i].innerHTML.length - 1
                );
        }

        start.disabled = disableTimer();
    };

    inputs[i].addEventListener('keyup', (e) => {
        if (e.key === 'Enter') start.click();
    });
}

start.disabled = disableTimer();

function disableTimer() {
    for (let i = 0; i < 3; i++) {
        if (inputs[i].value !== '' && parseInt(inputs[i].value) > 0) return false;
    }
    return true;
}

document.getElementById('start').onclick = function () {
    timerStarted = true;

    hours = parseInt(inputs[0].value);
    minutes = parseInt(inputs[1].value);
    seconds = parseInt(inputs[2].value) + 1;

    timerName.innerHTML = document.getElementById('name').value;

    if (!seconds) seconds = 1;
    if (!minutes) minutes = 0;
    if (!hours) hours = 0;

    config.classList.add('hidden');
    timer.classList.remove('hidden');

    subtractTime();
    resume();

    localStorage.setItem('originalTimer', hours * 3600 + minutes * 60 + seconds + '');
};

pauseButton.onclick = () => {
    if (paused) resume();
    else pause();
};

document.getElementById('cancel').onclick = () => {
    if (!confirm('Are you sure you want to cancel the timer?')) return;

    onTimerEnd();
    configure();
};

document.getElementById('restart').onclick = configure;

function resume() {
    paused = false;
    interval = setInterval(subtractTime, 1000);
    pauseButton.classList.remove(...resumeClasses);
    pauseButton.classList.add(...pauseClasses);
    pauseButton.innerHTML = 'Pause';
}

function pause() {
    paused = true;
    clearInterval(interval);
    pauseButton.classList.remove(...pauseClasses);
    pauseButton.classList.add(...resumeClasses);
    pauseButton.innerHTML = 'Resume';
}

function configure() {
    for (let i = 0; i < 3; i++) inputs[i].value = '';

    config.classList.remove('hidden');
    timerEnd.classList.add('hidden');
    start.disabled = disableTimer();
}

function subtractTime() {
    seconds--;

    if (hours === minutes && minutes === seconds && seconds === 0) onTimerEnd();

    if (seconds < 0) {
        seconds = 59;
        minutes--;

        if (minutes < 0) {
            minutes = 59;
            hours--;
        }
    }

    display.innerHTML = padWith0(minutes) + ':' + padWith0(seconds);
    if (hours > 0) display.innerHTML = hours + ':' + display.innerHTML;

    saveTimer();
}

function onTimerEnd() {
    timerStarted = false;
    localStorage.removeItem('currentTimer');
    localStorage.removeItem('originalTimer');
    localStorage.removeItem('startTimer');
    timer.classList.add('hidden');
    timerEnd.classList.remove('hidden');

    if (interval) clearInterval(interval);
}

popupButton.onclick = () => {
    bypassUnload = true;
    if (!isPopup && !localStorage.getItem('popup')) {
        if (timerStarted) saveTimer();

        localStorage.setItem('popup', 'true');
        window.open('/study', 'Study Timer', 'width=600,height=600');
    } else {
        saveTimer();
        localStorage.removeItem('popup');
        window.close();
    }
};

let popupInterval = setInterval(() => {
    if (
        (popupButton.innerHTML.includes('new') && !localStorage.getItem('popup')) ||
        (popupButton.innerHTML.includes('browser') && localStorage.getItem('popup'))
    ) {
        if (config.classList.contains('invisible')) {
            loadTimer();
            config.classList.remove('invisible');
            timer.classList.remove('invisible');
            timerEnd.classList.remove('invisible');
            popupButton.classList.remove('invisible');
        }
    } else {
        config.classList.add('invisible');
        timer.classList.add('invisible');
        timerEnd.classList.add('invisible');
        popupButton.classList.add('invisible');
    }
}, 200);
