const DEFAULT_VALUE =
{
    'x_ratio': 1,
    'y_ratio': 2,
    'min_val': 75,
    'max_val': 130,
    'gamma': 0.5,
    'img_scale': 1,
    'blend_ratio': 0.5
};
const ID = {
    slider: 'slider_img',
    slider_text: 'slider_img_text',
    sel: 'sel_area',
    div_art: 'div_art',
    step1: 'step1btn',
    step2: 'step2btn',
    step3: 'step3btn',
    page2: 'page2',
    url: 'input_file_url',
};
const slider_p_text = [
    'image scale: '
];

// ---------------------------

var app,
    img = new Image(),
    is_first = true;

