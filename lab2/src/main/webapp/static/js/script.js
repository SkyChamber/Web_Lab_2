/* check y input */
const y_value_input = document.querySelector("#y_value");
const submit_button = document.querySelector("#true_submit_button");
const message_place = document.querySelector("#y_message");
y_value_input.addEventListener('input', validateX);
y_value_input.addEventListener('input', validateY);
y_value_input.addEventListener('input', validateR);

function validateY(){
    let text = y_value_input.value;
    let number_text = Number(text);
    if ( text==="" || isNaN(number_text) || !isFinite(number_text) || number_text < -5 || number_text > 3){
        if (text===""){
                    submit_button.disabled = true;
                } else {
                    submit_button.disabled = true;
                    message_place.innerHTML = "<p>Illegal value<br>enter from -5 to 3</p>";
                }
    } else {
        submit_button.disabled = false;
        message_place.innerHTML = "";
    }
}

validateY();
/* --- end --- */

const x_value_input = document.querySelector("#x_value");

function validateX(){
    let x_text = x_value_input.value;
    let number_text = Number(x_text);
    if ( x_text===""){
        submit_button.disabled = true;
    } else {
        submit_button.disabled = false;
    }
}

/* check r input */
const r_value_input = document.querySelector("#r_value");
const r_message_place = document.querySelector("#r_message");
r_value_input.addEventListener('input', validateX);
r_value_input.addEventListener('input', validateY);
r_value_input.addEventListener('input', validateR);



function validateR(){
    let r_text = r_value_input.value;
    let r_number_text = Number(r_text);
    if ( r_text==="" || isNaN(r_number_text) || !isFinite(r_number_text) || r_number_text < 2 || r_number_text > 5){
        if (r_text===""){
                    submit_button.disabled = true;
                } else {
                    submit_button.disabled = true;
                    r_message_place.innerHTML = "<p>Illegal value<br>enter from 2 to 5</p>";
                }
    } else {
        submit_button.disabled = false;
        r_message_place.innerHTML = "";
        redraw_canvas(r_number_text)
    }
}

validateR();
/* --- end --- */

const x_value = document.querySelector("#x_value");
function setX(number){
    x_value.value = number;
}


/* --- draw onto canvas --- */
const canvas = document.getElementById("big_canvas");
const context = canvas.getContext("2d");
const canvas_scale = 30;
context.translate(canvas.width/2, canvas.height/2);
context.scale(1,-1);
redraw_canvas(1);

canvas.addEventListener("click", function(e) {
    getCursorPosition(canvas, e)
});



function getCursorPosition(canvas, event) {
    let r_text = r_value_input.value;
    let r_number_text = Number(r_text);
    if ( r_text==="" || isNaN(r_number_text) || !isFinite(r_number_text) || r_number_text < 2 || r_number_text > 5){
        alert("Ошибка, Значение R отсутствует или некорректен");
        return;
    } else {
        const rect = canvas.getBoundingClientRect();

        // calculate click place
        let x = (event.clientX - rect.left) - canvas.width/2;
        let y = canvas.height/2 - (event.clientY - rect.top);

        // normalise click place
        x = x / canvas_scale;
        y = y / canvas_scale;

        let form = document.querySelector("#place_for_form > form");
        form.querySelector("#x_value").value = x.toFixed(2);
        form.querySelector("#y_value").value = y.toFixed(2);
        form.submit();
    }
}

function redraw_axes(){
    context.fillStyle = "rgb(1, 1, 1)"

    // y - axe
    context.beginPath();
    context.moveTo(0, -canvas.height/2 + 1);
    context.lineTo(0, canvas.height/2 - 1);
    context.closePath();
    context.stroke();

    // x - axe
    context.beginPath();
    context.moveTo(-canvas.width/2 + 1, 0);
    context.lineTo(canvas.width/2 - 1, 0);
    context.closePath();
    context.stroke();
}
function redraw_labels(r_value){
    context.fillStyle = "rgb(1, 1, 1)"

    // left
    context.beginPath();
    context.moveTo(-Math.floor(r_value * canvas_scale), -5);
    context.lineTo(-Math.floor(r_value * canvas_scale), 5);
    context.stroke();

    // half-left
    context.beginPath();
    context.moveTo(-Math.floor(r_value/2 * canvas_scale), -5);
    context.lineTo(-Math.floor(r_value/2 * canvas_scale), 5);
    context.stroke();

    // right
    context.beginPath();
    context.moveTo(Math.floor(r_value * canvas_scale), -5);
    context.lineTo(Math.floor(r_value * canvas_scale), 5);
    context.stroke();

    // half-right
    context.beginPath();
    context.moveTo(Math.floor(r_value/2 * canvas_scale), -5);
    context.lineTo(Math.floor(r_value/2 * canvas_scale), 5);
    context.stroke();

    // top
    context.beginPath();
    context.moveTo(-5, Math.floor(r_value * canvas_scale));
    context.lineTo(5, Math.floor(r_value * canvas_scale));
    context.stroke();

    // half-top
    context.beginPath();
    context.moveTo(-5, Math.floor(r_value/2 * canvas_scale));
    context.lineTo(5, Math.floor(r_value/2 * canvas_scale));
    context.stroke();

    // bottom
    context.beginPath();
    context.moveTo(-5, -Math.floor(r_value * canvas_scale));
    context.lineTo(5, -Math.floor(r_value * canvas_scale));
    context.stroke();

    // half-bottom
    context.beginPath();
    context.moveTo(-5, -Math.floor(r_value/2 * canvas_scale));
    context.lineTo(5, -Math.floor(r_value/2 * canvas_scale));
    context.stroke();
}
function redraw_points(){
    context.save();
    for (let point of items){
        switch (point[2]){
            case 1:
                context.fillStyle = "#ff0000";
                break;
            case 1.5:
                context.fillStyle = "#ff7f00";
                break;
            case 2:
                context.fillStyle = "#ffff00";
                break;
            case 2.5:
                context.fillStyle = "#00ff00";
                break;
            case 3:
                context.fillStyle = "#0000ff";
                break;
            default:
                context.fillStyle = "#8f00ff";
        }
        context.beginPath(); //Start path
        context.arc(point[0] * canvas_scale, point[1] * canvas_scale,
            4, 0, Math.PI * 2
        );
        context.fill();
    }
    context.restore();
}
function redraw_canvas(r_value){

    context.clearRect(-canvas.width/2, -canvas.height/2, canvas.width, canvas.height);

    context.fillStyle = "rgb(51, 153, 255)";

    // 1 quarter
    context.beginPath();
    context.moveTo(0, Math.floor(r_value/2 * canvas_scale));
    context.lineTo(Math.floor(r_value * canvas_scale), 0);
    context.lineTo(0, 0);
    context.closePath();
    context.fill();

    // 2 quarter
    context.beginPath();
    context.moveTo(0, Math.floor(r_value * canvas_scale));
    context.lineTo(- Math.floor(r_value/2 * canvas_scale), Math.floor(r_value * canvas_scale));
    context.lineTo(- Math.floor(r_value/2 * canvas_scale), 0);
    context.lineTo(0,0);
    context.closePath();
    context.fill();

    // 4 quarter
    context.beginPath();
    context.arc(0,0, Math.floor(r_value/2 * canvas_scale), Math.PI*3/2, Math.PI*2);
    context.moveTo(0,0);
    context.lineTo(Math.floor(r_value/2 * canvas_scale), 0);
    context.lineTo(0, -Math.floor(r_value/2 * canvas_scale));
    context.closePath();
    context.fill();

    // axes
    redraw_axes();

    // labels
    redraw_labels(r_value);

    //points
    redraw_points();
}
/* --- end --- */
