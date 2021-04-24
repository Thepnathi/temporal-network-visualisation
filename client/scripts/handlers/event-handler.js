const disableVerticesLabels = document.getElementById("verticeLabelBtn");
const disableEdgesLabels = document.getElementById("edgeLabelBtn");

disableVerticesLabels.addEventListener("click", function() {
    d3.select("svg").remove()
    initialiseData()
    if (verticeLabelSwitch == true) {
        verticeLabelSwitch = false;
    } else {
        verticeLabelSwitch = true;

    }
    initialiseTemporalGraphNetwork(startTime, endTime, verticeLabelSwitch)
});

disableEdgesLabels.addEventListener("click", function() {
    d3.select("svg").remove()
    initialiseData()
    if (edgeLabelSwitch == true) {
        edgeLabelSwitch = false;
    } else {
        edgeLabelSwitch = true;

    }
    initialiseTemporalGraphNetwork(startTime, endTime, edgeLabelSwitch)
});

sliderStart.oninput = function() {
    d3.select("svg").remove()
    initialiseData()
    let value = this.value;
    startTime = value;
    document.getElementById("sliderStartValue").innerHTML = value;
    initialiseTemporalGraphNetwork(startTime, endTime)
}

sliderEnd.oninput = function() {
    d3.select("svg").remove()
    initialiseData()
    let value = this.value;
    endTime = value;
    document.getElementById("sliderEndValue").innerHTML = value;
    initialiseTemporalGraphNetwork(startTime, endTime)
}
