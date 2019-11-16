function setSelArea() {
    var div = document.getElementById('sel_area'),
        x1 = 0, y1 = 0, x2 = 0, y2 = 0,
        is_click = false;
    function reCalc() {
        var x3 = Math.min(x1, x2);
        var x4 = Math.max(x1, x2);
        var y3 = Math.min(y1, y2);
        var y4 = Math.max(y1, y2);
        div.style.left = x3 + 'px';
        div.style.top = y3 + 'px';
        div.style.width = x4 - x3 + 'px';
        div.style.height = y4 - y3 + 'px';
    }
    onmousedown = function (e) {
        var rect = app.elem.cns[0].getBoundingClientRect();
        x1 = e.clientX
        y1 = e.clientY
        
        if (!(x1 >= rect.left && x1 <= rect.right && y1 >= rect.top && y1 <= rect.bottom)) 
            return
        x1 = e.clientX + window.scrollX;
        y1 = e.clientY + window.scrollY;
        is_click = true
    };
    onmousemove = function (e) {
        if (!is_click) return
        div.hidden = 0;
        x2 = e.clientX + window.scrollX;
        y2 = e.clientY + window.scrollY;
        reCalc();
    };
    onmouseup = function (e) {
        if (!is_click) return
        is_click = false
        var rect = app.elem.cns[0].getBoundingClientRect();
        var x3 = Math.min(x1, x2) - rect.left - window.scrollX;
        var x4 = Math.max(x1, x2) - rect.left - window.scrollX;
        var y3 = Math.min(y1, y2) - rect.top - window.scrollY;
        var y4 = Math.max(y1, y2) - rect.top - window.scrollY;

        app.elem.setCns(2, x4 - x3, y4 - y3)
        app.elem.ctx[1].clearRect(0, 0, app.elem.getCnsWidth(2), app.elem.getCnsHeight(2))
        app.elem.ctx[1].drawImage(app.elem.cns[0], x3, y3, x4 - x3, y4 - y3, 0, 0, x4 - x3, y4 - y3)
        app.edgeDetect()
    }; 
}