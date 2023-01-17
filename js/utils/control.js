const controlCenter = document.getElementById('control-center');
const focus = document.getElementById('focus');
const focusText = document.getElementById('focusText');

setInterval(() => {
    let original = localStorage.getItem('originalTimer');

    if (!original) {
        focus.classList.add('hidden');
        return;
    }
    original = parseInt(original);

    focus.classList.remove('hidden');
    const current = localStorage.getItem('currentTimer').split('\n');
    const secondsPast = original - (parseInt(current[2]) * 3600 + parseInt(current[3]) * 60 + parseInt(current[4]));

    let timeText = 'Focusing ' + (current[0] !== '' ? 'on ' + current[0] : '') + ' for ';
    timeText += secondsPast > 3600 ? Math.floor(secondsPast / 3600) + ':' : '';
    timeText += padWith0(Math.floor(secondsPast / 60)) + ':';
    timeText += padWith0(secondsPast % 60);

    focusText.innerHTML = timeText;
}, 1000);

function padWith0(num) {
    let string = num.toString();
    if (num < 10) string = '0' + string;
    return string;
}

for (const div of controlCenter.querySelectorAll('div > div > div'))
    div.className += ' bg-gray-300/30 dark:bg-gray-900/60 mx-2 text-left flex flex-col rounded-lg';

for (const icon of controlCenter.getElementsByTagName('i'))
    icon.className +=
        ' material-icons text-center text-sm text-white rounded-full bg-blue-600 w-5 h-5 mr-1';

for (const a of controlCenter.getElementsByTagName('a'))
    a.className +=
        ' text-gray-500 dark:text-gray-400 focus:outline-none hover:bg-blue-200 dark:hover:bg-blue-700 text-left text-sm rounded-lg p-2.5 w-36 cursor-pointer';
