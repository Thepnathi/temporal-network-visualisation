
const sliderStart = document.getElementById("sliderStart");
const sliderEnd = document.getElementById("sliderEnd");

sliderStart.oninput = function() {
    document.getElementById("sliderStartValue").innerHTML = this.value
    console.log(this.value)
}

sliderEnd.oninput = function() {
    console.log(this.value)
}

