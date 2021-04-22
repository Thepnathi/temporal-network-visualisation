var slider = document.getElementById("slider");
var selector = document.getElementById("selector");
var selectValue = document.getElementById("SelectValue");
var progressBar = document.getElementById("ProgressBar");

selectValue.innerHTML = slider.value;

slider.oninput = function() {
    selectValue.innerHTML = this.value;
    selector.style.left = this.value + "%";
    progressBar.style.width = this.value + "%";
}