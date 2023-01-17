document.addEventListener('load', function () {
    const datepicker = document.getElementsByClassName('datepicker')[0];
    datepicker.classList.remove('z-20');
    datepicker.classList.add('z-50');
});

function createAssignment() {
    let assignment = {
        title: document.getElementById('assignmentname').value,
        points: document.getElementById('points').value,
        due:
            document.getElementById('duedate').value +
            ' ' +
            document.getElementById('duetime').value,
        course: document.getElementById('course_id').innerText,
        description: document.getElementById('description').value
    };
    $.ajax({
        type: 'POST',
        url: '/api/v1/internal/create-assignment',
        data: JSON.stringify(assignment),
        dataType: 'json',
        contentType: 'application/json',
        done: function (data) {
            alert('Successfully created assignment');
        },
        error: function (error) {
            alert(error);
        }
    });
}
