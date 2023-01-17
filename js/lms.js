function expand(message) {
}


function replaceURLs(message) {
    if (!message) return message;

    if (!message.includes('http')) {
        console.log('returned. no link detected');
        return message;
    }
    if (message.includes('href="http')) {
        console.log('returned. recursive detected');
        return message;
    }

    const urlRegex = /(((https?:\/\/)|(www\.))[^\s]+)/g;

    return message.replace(urlRegex, function (url) {
        let hyperlink = url;

        if (!hyperlink.match('^https?://')) hyperlink = 'http://' + hyperlink;

        hyperlink = hyperlink.replace('<p>', '');
        hyperlink = hyperlink.replace('</p>', '');

        return `<a target="_blank"
                   class="
                   underline 
                   decoration-yellow-500 decoration-[0.25rem] 
                   motion-safe:transition-all motion-safe:duration-200 
                   hover:decoration-[0.5rem] focus:decoration-[0.5rem] hover:decoration-yellow-500/50 focus:decoration-yellow-500/50 
               " href="${hyperlink}">${hyperlink}</a>`;
    });
}

let modal = document.getElementById('courseModal');

// set up templates
let templateLists = modal.getElementsByClassName('scroll');

let screens = modal.getElementsByClassName('CoursePage');

// set up button
let btn = document.getElementById('create');

for (const screen of screens)
    screen.className +=
        ' relative px-4 w-full max-w-2xl relative bg-gray-200 rounded-lg shadow dark:bg-gray-700 text-black dark:text-white';

for (const h3 of modal.getElementsByTagName('h3'))
    h3.className +=
        ' flex justify-between items-start p-5 rounded-t border-b border-gray-300 dark:border-gray-600 text-xl font-semibold text-gray-900 lg:text-2xl dark:text-white';

for (const list of templateLists) list.classList.add('scroll');

btn.onclick = function () {
    console.log('button clicked');
    modal.style.display = 'block';

    screens[0].style.top = '-1000px';
    screens[0].style.animation = '0.5s movein';

    for (let screen of screens) {
        screen.style.display = 'none';
        screen.style.animationFillMode = 'forwards';
        screen.style.webkitAnimationFillMode = 'forwards';
    }

    screens[0].style.display = 'block';
};

window.onclick = function (event) {
    if (event.target === modal) modal.style.display = 'none';
};

// set up close button
for (let close of modal.getElementsByClassName('close')) {
    close.className += ' material-icons dark:text-white';
    close.innerHTML = 'close';
    close.onclick = () => (modal.style.display = 'none');
}

// set up course stuff
let courseName = document.getElementById('course-name');
let courseTeacher = document.getElementById('course-teacher');

for (const element of modal.getElementsByClassName('CoursePage'))
    element.className +=
        ' hidden overflow-visible fixed right-0 left-0 top-4 z-50 justify-center items-center h-72 md:inset-0';

function lms(subtemplate) {
    document.getElementById('create-course-status').innerHTML = 'Creating course...';

    const xhttp = new XMLHttpRequest();
    xhttp.open('POST', '/lms', true);
    xhttp.setRequestHeader('Content-type', 'application/json');
    xhttp.send(
        JSON.stringify({
            name: document.getElementById('course-name').value,
            teacher: document.getElementById('course-teacher').value,
            avatar: 'https://app.schoology.com/sites/all/themes/schoology_theme/images/course-default.svg',
            template: subtemplate
        })
    );
}

function skipTemplates() {
    screens[0].style.display = 'none';
    customize(null, user + "'s class");
    const h1 = document.getElementById('change-if-skip-templates');
    h1.innerHTML = h1.innerHTML.replace('Step 3: ', '');
}

const pageCounters = modal.getElementsByClassName('pageCount');

for (const i in pageCounters) {
    pageCounters[i].className += ' flex items-center p-6 space-x-2 absolute bottom-0';
    for (let j = 0; j < 3; j++) {
        if (j == i)
            pageCounters[i].innerHTML +=
                "<div class='rounded-full w-2 h-2 bg-gray-400 dark:bg-gray-500'></div>";
        else
            pageCounters[i].innerHTML +=
                "<div class='rounded-full w-2 h-2 bg-gray-300 dark:bg-gray-400'></div>";
    }

    try {
        pageCounters[i].setAttribute('style', 'transform: translate(300%)');
    } catch (e) {
    }
}

/*

To course a new template, add a new dictionary and put the parameters:

name (e.g. Science)
icon (e.g. science.svg)
description (e.g. Physics, Chemistry, Biology)

as demonstrated below.

*/
const templates = [
    {
        name: 'Science',
        icon: 'science.svg',
        subtemplates: [
            'Introduction to Science',
            'Physics',
            'Chemistry',
            'Biology',
            'Astronomy',
            'Life Science',
            'Earth Science',
            'Physical Science',
            'Physical Geography',
            'Computer Science',
            'Programming',
            'Coding'
        ]
    },

    {
        name: 'Mathematics',
        icon: 'math.svg',
        subtemplates: [
            'K-8th Math',
            'Pre-Algebra',
            'Algebra I',
            'Algebra II',
            'Pre-Calculus A/B/AB',
            'Calculus AB/BC',
            'AP Statistics',
            'AP Calculus',
            'Competitive Math'
        ]
    },

    {
        name: 'History',
        icon: 'history.svg',
        subtemplates: [
            'Social Studies',
            'World History I/II',
            'US History',
            'AP World History',
            'AP US History'
        ]
    },

    {
        name: 'Art',
        icon: 'art.svg',
        subtemplates: ['Visual Arts', 'Music', 'Drama']
    },

    {
        name: 'Language',
        icon: 'language.svg',
        subtemplates: ['English', 'Latin', 'Spanish', 'French', 'Mandarin', 'German']
    },

    {
        name: 'Sports',
        icon: 'sport.svg',
        subtemplates: [
            'PE',
            'Basketball',
            'Soccer',
            'Ice Hockey',
            'Volleyball',
            'Track and Field',
            'Football',
            'Tennis',
            'Dance'
        ]
    }
];

for (const template of templates) {
    let button = document.createElement('div');
    button.className =
        'createSelectButton text-white bg-gray-500 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 text-2xl';
    button.onclick = () => chooseTemplate(template);

    // TODO: fix duplicate code fragments
    let imageSpan = document.createElement('span');
    imageSpan.style.float = 'left';

    let image = document.createElement('img');
    image.style.float = 'right';
    image.height = 20;
    image.width = 20;
    image.src = 'static/images/icons/' + template.icon;
    imageSpan.appendChild(image);

    button.appendChild(imageSpan);

    let templateName = document.createElement('span');
    templateName.innerHTML = template.name;
    button.appendChild(templateName);

    let next = document.createElement('span');
    next = document.createElement('img');
    next.style.float = 'right';
    next.height = 20;
    next.width = 20;
    next.src = 'static/images/icons/next.svg';
    button.appendChild(next);

    button.appendChild(document.createElement('br'));

    let description = document.createElement('span');
    description.classList.add('text-gray-300', 'text-xl');

    for (let i = 0; i < Math.min(template.subtemplates.length, 4); i++)
        description.innerHTML += template.subtemplates[i] + ', ';

    if (template.subtemplates.length > 4) description.innerHTML += 'etc.';
    else
        description.innerHTML = description.innerHTML.substring(
            0,
            description.innerHTML.length - 2
        );

    button.appendChild(description);

    //smalltemplateLists[0].appendChild(button);
    templateLists[0].appendChild(button);
}

function chooseTemplate(template) {
    screens[0].style.display = 'none';
    screens[1].style.display = 'block';

    templateLists[1].innerHTML = '';
    for (const subtemplate of template.subtemplates) {
        let button = document.createElement('div');
        button.className =
            'createSelectButton text-white bg-gray-500 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 text-2xl';
        button.onclick = function () {
            const name = template.name;
            customize(name, subtemplate);
        };

        let imageSpan = document.createElement('span');
        imageSpan.style.float = 'left';

        let image = document.createElement('img');
        image.style.float = 'right';
        image.height = 20;
        image.width = 20;
        image.src = 'static/images/icons/' + template.icon;
        imageSpan.appendChild(image);

        button.appendChild(imageSpan);

        let templateName = document.createElement('span');
        templateName.innerHTML = subtemplate;
        button.appendChild(templateName);

        let next = document.createElement('span');
        next = document.createElement('img');
        next.style.float = 'right';
        next.height = 20;
        next.width = 20;
        next.src = 'static/images/icons/next.svg';
        next.alt = 'Next';
        button.appendChild(next);

        templateLists[1].appendChild(button);
    }
}

function customize(template, subtemplate) {
    screens[1].style.display = 'none';
    screens[2].style.display = 'block';

    courseName.placeholder = subtemplate;
    courseTeacher.placeholder = user;

    document.getElementById('create-course').onsubmit = () => lms(subtemplate);

    document.getElementById('import-schoology').onclick = importSchoology;
    document.getElementById('import-classroom').onclick = importGClassroom;
    document.getElementById('import-canvas').onclick = importCanvas;
}

function importGClassroom() {
    screens[2].style.display = 'none';
    screens[4].style.display = 'block';
    const status = document.getElementById('create-course-status2');
    const input = document.getElementById('google-course-id');
    const teacher = document.getElementById('google-course-teacher');

    // todo: maybe this needs regex instead of whatever this is
    const index = input.value.indexOf('classroom.google.com/c/');

    if (index === -1) {
        status.style.color = 'red';
        status.innerHTML = 'Invalid Course Link!';
        return;
    }

    let endIndex;
    for (endIndex = index + 22; endIndex < input.value.length; endIndex++) {
        if (isNaN(parseInt(input.value.charAt(endIndex)))) break;
    }

    if (endIndex - index < 1) {
        status.style.color = 'red';
        status.innerHTML = 'Invalid Course Link!';
        return;
    }

    const id = input.value.substring(index, endIndex);

    status.innerHTML;
    status.innerHTML = 'Creating course...';

    const xhttp = new XMLHttpRequest();
    xhttp.open('POST', '/api/v1/internal/createGcourse', true);
    xhttp.setRequestHeader('Content-type', 'application/json');
    xhttp.addEventListener('load', googleCourseReq);
    xhttp.send(
        JSON.stringify({
            link: input.value,
            teacher: teacher.value
        })
    );
}

function importCanvas() {
    screens[2].style.display = 'none';
    screens[5].style.display = 'block';
    const status = document.getElementById('create-course-status2');
    const input = document.getElementById('canvas-course-id');
    const teacher = document.getElementById('canvas-course-teacher');

    // todo: maybe this needs regex instead of whatever this is
    const index = input.value.indexOf('/course/');

    if (index === -1) {
        status.style.color = 'red';
        status.innerHTML = 'Invalid Course Link!';
        return;
    }

    let endIndex;
    for (endIndex = index + 22; endIndex < input.value.length; endIndex++) {
        if (isNaN(parseInt(input.value.charAt(endIndex)))) break;
    }

    if (endIndex - index < 1) {
        status.style.color = 'red';
        status.innerHTML = 'Invalid Course Link!';
        return;
    }

    const id = input.value.substring(index, endIndex);

    status.innerHTML;
    status.innerHTML = 'Creating course...';

    const xhttp = new XMLHttpRequest();
    xhttp.open('POST', '/api/v1/internal/createCanvascourse', true);
    xhttp.setRequestHeader('Content-type', 'application/json');
    xhttp.addEventListener('load', canvasCourseReq);
    xhttp.send(
        JSON.stringify({
            link: input.value,
            teacher: teacher.value
        })
    );
}

function importSchoology() {
    console.log('hi');
    screens[2].style.display = 'none';
    screens[3].style.display = 'block';

    const status = document.getElementById('create-course-status2');
    const input = document.getElementById('schoology-course-id');
    const teacher = document.getElementById('schoology-course-teacher');

    // todo: maybe this needs regex instead of whatever this is
    const index = input.value.indexOf('.schoology.com/course/');

    if (index === -1) {
        status.style.color = 'red';
        status.innerHTML = 'Invalid Course Link!';
        return;
    }

    let endIndex;
    for (endIndex = index + 22; endIndex < input.value.length; endIndex++) {
        if (isNaN(parseInt(input.value.charAt(endIndex)))) break;
    }

    if (endIndex - index < 1) {
        status.style.color = 'red';
        status.innerHTML = 'Invalid Course Link!';
        return;
    }

    const id = input.value.substring(index, endIndex);

    status.innerHTML;
    status.innerHTML = 'Creating course...';

    const xhttp = new XMLHttpRequest();
    xhttp.open('POST', '/api/v1/internal/createSchoologyCourse', true);
    xhttp.setRequestHeader('Content-type', 'application/json');
    xhttp.addEventListener('load', schoologyCourseReq);
    xhttp.send(
        JSON.stringify({
            link: input.value,
            teacher: teacher.value
        })
    );
}

function schoologyCourseReq() {
    const status = document.getElementById('create-course-status2');
    if (this.responseText === '1') {
        status.style.color = 'red';
        status.innerHTML =
            'You have not connected your schoology account! Please connect a schoology account to import courses from Schoology.';
    } else {
        status.style.color = 'green';
        status.innerHTML = 'Course created!';
    }
}

function googleCourseReq() {
    const status = document.getElementById('create-course-status2');
    if (this.responseText === '1') {
        status.style.color = 'red';
        status.innerHTML =
            'You have not connected your google account! Please connect a schoology account to import courses from Schoology.';
    } else {
        status.style.color = 'green';
        status.innerHTML = 'Course created!';
    }
}

function canvasCourseReq() {
    const status = document.getElementById('create-course-status2');
    if (this.responseText === '1') {
        status.style.color = 'red';
        status.innerHTML =
            'You have not connected your canvas account! Please connect a schoology account to import courses from Schoology.';
    } else {
        status.style.color = 'green';
        status.innerHTML = 'Course created!';
    }
}

function updateCanvasLink(link) {
    document.getElementById('canvas-course-id').value = link;
    document.getElementById('clist').style.display = 'none';
    document.getElementById('canvas-create-course').style.display = 'block';
}

function updateGoogleLink(link, teacher) {
    document.getElementById('google-course-id').value = link;
    document.getElementById('google-course-teacher').value = teacher;
    document.getElementById('glist').style.display = 'none';
    document.getElementById('google-create-course').style.display = 'block';
}

function updateSchoologyLink(link) {
    document.getElementById('schoology-course-id').value = link;
    document.getElementById('slist').style.display = 'none';
    document.getElementById('schoology-create-course').style.display = 'block';
}

function changeSearch() {
    let value = document.getElementById('search_input').value;
    console.log(value);
    if (value.length > 0) {
        document.getElementById('search_items').innerHTML = `
<li>
<div class="py-2.5 rounded-lg mx-auto block px-4 py-2 mx-2 dark:hover:text-white">
                <svg class="inline w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
</svg>
    Searching...
</div>
</li>
            `;
        const request = $.ajax({
            type: 'POST',
            url: '/api/v1/internal/search-within_user',
            data: JSON.stringify({
                search: value
            }),

            contentType: 'application/json; charset=utf-8'
        });
        request.done((data) => {
            document.getElementById('search_items').innerHTML = '';
            let temp_arr = [];
            if (data === '0') {
                document.getElementById('search_items').innerHTML += `
                    <li>
                            <div class="py-2.5 rounded-lg mx-auto block px-4 py-2 mx-2 dark:hover:text-white">
                        <svg class="inline w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
</svg>
                        No Results Found
                            </div>
                        </li>`;
            } else {
                let datas = data.split('•');
                for (let i = 0; i < datas.length; i++) {
                    temp_arr.push(datas[i]);
                    if (i % 4 === 3) {
                        let pic = `<img src="${temp_arr[3]}" class="inline-block w-10 h-10 rounded-full">`;
                        switch (temp_arr[0]) {
                            case 'document':
                                pic = `<i class="material-icons">description</i>`;
                                break;
                            case 'NebDoc':
                                pic = `<i class="material-icons">draft</i>`;
                                break;
                            case 'event':
                                pic = `<i class="material-icons">event</i>`;
                                break;
                            case 'assignment':
                                pic = `<i class="material-icons">assignment</i>`;
                                break;
                            case 'chat':
                                pic = `<i class="material-icons">forum</i>`;
                                break;
                            case 'announcement':
                                pic = `<i class="material-icons">campaign</i>`;
                                break;
                        }

                        document.getElementById('search_items').innerHTML += `
                    <li>
                        <span class="truncate py-2.5 rounded-lg mx-auto block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 mx-2 dark:hover:text-white" style="text-align:left;">
                ${pic}
                ${temp_arr[1]} <span class="text-gray-500 ml-2">${temp_arr[2]}</span></span>
                    </li>
`;
                    }
                }
            }
        });

        document.getElementById('search_items').innerHTML = '';
    }
}

keyUpDelay('#search', 1000, changeSearch);
