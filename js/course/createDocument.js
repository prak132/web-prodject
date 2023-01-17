function uploadLink() {
    let request = $.ajax({
        type: 'POST',
        url: '/api/v1/internal/upload_file_link',
        data: {
            link: document.getElementById('thelink').value,
            course: document.getElementById('course_id').innerText,
            folder: '0'
        }
    });
    request.done(function (data) {
        alert(data);
    });
}

function uploadFile() {
    alert('Uploaded');

    const formData = new FormData();
    let fileupload = document.getElementById('file');
    formData.append('file', fileupload.files[0]);
    formData.append('course', document.getElementById('course_id').innerText);
    formData.append('folder', '0');

    let request = $.ajax({
        type: 'POST',
        url: '/api/v1/internal/upload-document',
        processData: false,
        contentType: false,
        data: formData
    });

    request.done(function (data) {
        alert('Uploaded :)');
        alert(data);
    });
}
