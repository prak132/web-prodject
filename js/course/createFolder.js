function createFolder() {
    const foldername = document.getElementById('foldername').value;
    const folderstatus = document.getElementById('folderstatus').value;
    if (foldername === '') {
        folderstatus.style.color = 'red';
        folderstatus.innerHTML = 'Please enter a folder name';
        return;
    }
    const foldercolor = document.getElementById('color-picker').value;
    console.log(foldername);
}
