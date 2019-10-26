class Elem {
    constructor() {
        var cns = [],
            ctx = []
        for (let i = 0; i < 2; ++i) {
            cns.push(document.getElementById('cns' + (i + 1).toString()))
            ctx.push(cns[i].getContext('2d'))
        }
        this.cns = cns
        this.ctx = ctx
    }
    // ---------------
    // canvas func
    // ---------------
    getCnsWidth() {
        return this.cns[0].width
    }

    getCnsHeight() {
        return this.cns[0].height
    }

    setCns(w, h) {
        var scale = this.callConfig().img_scale
        for (let i = 0; i < 2; ++i) {
            this.cns[i].width = w * scale
            this.cns[i].height = h * scale
        }
    }

    getCtx(index) {
        return this.ctx[index - 1]
    }

    rendImg(index, img) {
        var scale = this.callConfig().img_scale
        this.ctx[index - 1].drawImage(img, 0, 0, img.width * scale, img.height * scale)
    }

    rendImgData(index, imgData) {
        this.ctx[index - 1].putImageData(imgData, 0, 0)
    }
    // ---------------
    // slider func
    // ---------------
    chgPText(i) {
        var v = document.getElementById(slider_id + i).value
        v = i == 5 ? v / 100 : v
        document.getElementById(slider_id + i + '_text').innerHTML = slider_p_text[i - 1] + v
    }

    chgPTextToDEFA() {
        var vals = [
            DEFAULT_VALUE.x_ratio,
            DEFAULT_VALUE.y_ratio,
            DEFAULT_VALUE.min_val,
            DEFAULT_VALUE.max_val,
            DEFAULT_VALUE.img_scale
        ]

        for (let i = 0; i < 5; ++i) {
            let v = vals[i]
            document.getElementById(slider_id + (i + 1) + '_text').innerHTML = slider_p_text[i] + v
            document.getElementById(slider_id + (i + 1)).value = i == 4 ? v * 100 : v
        }
    }

    // set at app construct
    callConfig() { }
}

class Config {
    constructor() { }

    set() {
        this.x_ratio = document.getElementById(slider_id + 1).value
        this.y_ratio = document.getElementById(slider_id + 2).value
        this.min_val = document.getElementById(slider_id + 3).value
        this.max_val = document.getElementById(slider_id + 4).value
        this.img_scale = document.getElementById(slider_id + 5).value / 100
    }

    reset() {
        this.x_ratio = DEFAULT_VALUE.x_ratio
        this.y_ratio = DEFAULT_VALUE.y_ratio
        this.min_val = DEFAULT_VALUE.min_val
        this.max_val = DEFAULT_VALUE.max_val
        this.gamma = DEFAULT_VALUE.gamma
        this.img_scale = DEFAULT_VALUE.img_scale
        this.blend_ratio = DEFAULT_VALUE.blend_ratio
        this.callElem().chgPTextToDEFA()
    }

    // set at app construct
    callElem() { }
}

class App {
    constructor() {
        this.elem = new Elem(0, 0)
        this.config = new Config()
        this.elem.callConfig = function () { return this }
            .bind(this.config)
        this.config.callElem = function () { return this }
            .bind(this.elem)
        this.init()        
    }

    init() {
        this.config.reset()
    }

    start() {
        var imgData1, imgData2;

        this.elem.setCns(img.width, img.width)
        this.elem.rendImg(1, img)
        imgData1 = this.elem.getCtx(1).getImageData(0, 0, this.elem.getCnsWidth(), this.elem.getCnsHeight());
        imgData2 = this.elem.getCtx(1).getImageData(0, 0, this.elem.getCnsWidth(), this.elem.getCnsHeight());
        // Gaussian blur
        StackBlur.imageDataRGBA(imgData2, 0, 0, this.elem.getCnsWidth(), this.elem.getCnsHeight(), 8);
        // invert pic2
        invert(imgData2)
        // blend img1 & img2
        blend(imgData1, imgData2)
        // limit brightness & turn to luma
        adjustLevel(imgData1)
        // convert art pic
        this.toArt(imgData1)
        this.elem.rendImgData(2, imgData1)
    }

    restart() {
        this.config.set()
        setTimeout(() => this.start(), 0)
    }

    reset() {
        this.config.reset()
        setTimeout(() => this.start(), 0)
    }

    toArt(imgData) {
        var div_art = document.getElementById('div_art'),
            w = this.elem.getCnsWidth(),
            h = this.elem.getCnsHeight(),
            x_ratio = ~~this.config.x_ratio,
            y_ratio = ~~this.config.y_ratio;

        var avg = 0,
            list = [];
        for (let i = 0; i < 256; ++i) {
            list.push(0)
        }
        for (let i = 0; i < imgData.data.length; i += 4) {
            avg += imgData.data[i]
            ++list[imgData.data[i]]
        }
        avg /= (imgData.data.length / 4)

        div_art.innerHTML = ''
        for (let j = 0; j < h; j += y_ratio) {
            let div = document.createElement('div'),
                str = '';
            for (let i = 0; i < w; i += x_ratio) {
                if (imgData.data[(i + j * w) * 4 + 3] == 0)
                    continue
                let d = get_pixel(i, j)
                if (d >= avg) {
                    str += '&nbsp;'
                    continue
                }
                else {
                    str += '8'
                    continue
                }
            }
            div.innerHTML = str
            div_art.appendChild(div)
        }

        function get_pixel(x, y) {
            var data = 0
            for (let i = x; i < x + x_ratio; ++i)
                for (let j = y; j < y + y_ratio; ++j)
                    data += imgData.data[(i + j * w) * 4]
            return data / (x_ratio * y_ratio)
        }
    }
}


window.onload = () => {
    img.crossOrigin = '';
    img.onload = function () {
        if (is_first) {
            app = new App()
            is_first = false
        }
        setTimeout(() => app.start(), 0)
    }
}
