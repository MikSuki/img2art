const DEFAULT_VALUE =
{
    'x_ratio': 1,
    'y_ratio': 2,
    'min_val': 75,
    'max_val': 130,
    'gamma': 0.5,
    'img_scale': 1,
    'blend_ratio': 0.5
}
const slider_id = 'slider_v'
const slider_p_text = [
    'x-ratio: ',
    'y-ratio: ',
    'min value: ',
    'max value: ',
    'image scale: '
]


// ---------------------------

var app,
    img = new Image(),
    is_first = true;

