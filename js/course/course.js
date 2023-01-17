let actions, pageTitle, createButton;
window.onload = () => {
    actions = document.getElementsByClassName('link');
    pageTitle = document.getElementById('page-title');
    createButton = document.getElementById('create');

    const path = window.location.pathname.split('/');
    let saveData = path.reverse()[0];
    if (path.length < 4) saveData = 'documents';

    pageTitle.innerHTML = saveData[0].toUpperCase() + saveData.substring(1);

    for (const link of sidebarLinks) {
        if (link.innerHTML.includes(saveData)) {
            link.classList.add('dark:bg-gray-600', 'light:bg-gray-600');
            link.style.pointerEvents = 'none';
            break;
        }
    }

    for (const action of actions)
        action.classList.add(
            'block',
            'py-2',
            'px-4',
            'hover:bg-gray-100',
            'dark:hover:bg-gray-600',
            'dark:hover:text-white',
            'cursor-pointer'
        );

    setCreateButton(pageTitle.innerHTML);

    function openModal(object_id) {
        let targetEl = document.getElementById(object_id);
        const options = {
            placement: 'center',
            backdropClasses: 'bg-gray-900 bg-opacity-50 dark:bg-opacity-80 fixed inset-0 z-40'
        };
        const modal = new Modal(targetEl, options);
        modal.show();
        return true;
    }

    function closeModal(object_id) {
        let targetEl = document.getElementById(object_id);
        const options = {
            placement: 'bottom-right',
            backdropClasses: 'bg-gray-900 bg-opacity-50 dark:bg-opacity-80 fixed inset-0 z-40'
        };
        const modal = new Modal(targetEl, options);
        modal.hide();

        for (const element of document.querySelectorAll('[modal-backdrop]'))
            element.parentElement.removeChild(element);

        return true;
    }

    $('#search').click(function () {
        openModal('searchModal');
    });

    $('#upload-file').click(function () {
        alert('Uploaded');
        var formData = new FormData();
        let fileupload = document.getElementById('file');
        formData.append('file', fileupload.files[0]);
        formData.append('course', document.getElementById('course_id').innerText);
        formData.append('folder', '0');
        let request = $.ajax({
            type: 'POST',
            url: '/api/v1/internal/upload_file',
            processData: false,
            contentType: false,
            data: formData
        });

        request.done(function (data) {
            alert('Uploaded :)');
            alert(data);
        });
    });
};
