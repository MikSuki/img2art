function handleFiles(files) {
    for (var i = 0; i < files.length; i++) {
        var file = files[i];
        var imageType = /image.*/;
        if (!file.type.match(imageType)) {
            alert('error file')
            continue;
        }
        var reader = new FileReader();
        reader.onload = (function (aImg) { return function (e) { aImg.src = e.target.result; }; })(img);
        reader.readAsDataURL(file);
    }
}

function handleUrl(){
    var url = document.getElementById('input_file_url').value
    img.src = url
    document.getElementById('input_file_url').value = ''
    console.log(url)
}
