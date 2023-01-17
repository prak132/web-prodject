function createAnnouncement() {
    let name = document.getElementById('announcementname').value;
    let teacher = document.getElementById('author').value;
    const announcement = {
        title: name,
        content: document.getElementById('message').value,
        author: teacher,
        author_pic: document.querySelector('#navbar button logo').getAttribute('image'),
        course: document.getElementById('course_id').innerText
    };

    $.ajax({
        type: 'POST',
        url: '/api/v1/internal/create-announcement',
        data: JSON.stringify(announcement),
        dataType: 'json',
        contentType: 'application/json',
        done: function (data) {
            alert('Successfully created announcement');

            const iframeDoc = document.getElementsByTagName('iframe')[0].contentDocument;
            let announcement = iframeDoc.getElementsByClassName(
                'block p-6 ml-4 my-4 bg-white rounded-lg ' +
                'border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700'
            )[0];
            announcement.getElementsByTagName('h3')[0].innerHTML = name === '' ? teacher : name;
        },
        error: function (error) {
            alert(error);
        }
    });
}
