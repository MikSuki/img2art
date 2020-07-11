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

function handleUrl() {
    let url = document.getElementById(ID.url).value;
    img.src = url;
    document.getElementById(ID.url).onkeydown = function(){
        this.style.color = 'black';
    }
}

function useEample1() {
    img.src = 'example1.jpg';
}

function useEample2() {
    img.src = 'example2.png';
}
