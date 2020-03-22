function setPagin() {
    var button = $('.button');

    function switchToNext() {
        var _this = $(this);

        if (_this.hasClass('active'))
            return false;
        else if (!is_first) {
            $('.button.active').removeClass('active');
            _this.addClass('active');
        }
    }
    button.on('click', switchToNext);
}


function chgPage(i) {
    switch (i) {
        case 1:
            // document.getElementById('page1').style.display = 'block'
            // document.getElementById('page2').style.display = 'none'
            break
        case 2:
            if (is_first) {
                alert('upload an image')
                return
            }
            // document.getElementById('page1').style.display = 'none'
            // document.getElementById('page2').style.display = 'block'
            break
    }
}