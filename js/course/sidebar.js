const sidebarLinks = document.getElementsByClassName('space-y-2')[0].getElementsByTagName('a');

for (const a of sidebarLinks) {
    a.href += '?iframe=true';
    a.onclick = () => {
        window.history.pushState(null, '', a.href.replace('?iframe=true', ''));

        for (const link of sidebarLinks) {
            if (link === a) continue;

            link.style.pointerEvents = 'auto';
            link.style.cursor = 'pointer';
            link.classList.remove('dark:bg-gray-600', 'light:bg-gray-600');
        }

        let title = a.href
            .substring(a.href.indexOf(document.documentURI))
            .split('/')[5]
            .replace('?iframe=true', '');
        title = title[0].toUpperCase() + title.substring(1);
        pageTitle.innerHTML = title;
        setCreateButton(title);

        a.style.pointerEvents = 'none';
        a.style.cursor = 'default';
        a.classList.add('dark:bg-gray-600', 'light:bg-gray-600');

        sessionStorage.setItem('{{ course_id }}', title);
    };
}

function setCreateButton(title) {
    for (const a of actions) a.innerHTML = '';

    switch (title.toLowerCase()) {
        case 'documents':
            actions[0].innerHTML = 'Upload File';
            actions[0].onclick = () => openModal('createDocument');
            actions[1].innerHTML = 'Post Link';
            actions[1].onclick = () => openModal('postLink');
            actions[2].innerHTML = 'Create Assignment';
            actions[2].onclick = () => openModal('createAssignment');
            break;

        case 'announcements':
            actions[0].innerHTML = 'Create Announcement';
            actions[0].onclick = () => openModal('createAnnouncement');
            break;

        case 'textbook':
            actions[0].innerHTML = 'Create Textbook';
            actions[0].onclick = () => openModal('createTextbook');
            break;
    }

    let hideButton = true;
    for (const a of actions) {
        if (a.innerHTML !== '') {
            a.innerHTML =
                '<span class="material-icons mr-1.5" style="vertical-align: bottom">add</span>' +
                a.innerHTML;
            a.parentElement.classList.remove('hidden');
            hideButton = false;
        } else a.parentElement.classList.add('hidden');
    }

    createButton.style.display = hideButton ? 'none' : 'block';
}
