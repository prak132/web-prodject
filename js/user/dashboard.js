const greeting = document.getElementsByTagName('h1')[0];

function updateTime() {
    let hour = new Date().getHours();

    let text = null;

    if (hour < 11) text = 'Morning,';
    else if (hour > 17) text = 'Evening,';

    if (text !== null)
        greeting.innerHTML = greeting.innerHTML.replace(greeting.innerHTML.split(' ')[1], text);
}

updateTime();
setInterval(updateTime, 1000 * 60);
