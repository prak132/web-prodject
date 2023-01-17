function changeDropdown(value) {
    document.getElementsByName('type')[0].value = value;
    document.getElementById('changeable').innerHTML =
        document.getElementsByClassName('change')[value - 1].innerHTML;
    if (value === 4) {
        document.getElementsByName('search')[0].type = 'file';
    } else {
        document.getElementsByName('search')[0].type = 'search';
    }
}
