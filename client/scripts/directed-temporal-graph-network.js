const width = windowWidth()*0.9;
const height = windowHeight()*0.9;   
const pageTitle = "London Underground Network";

var nodes;
var links;
initialiseData()
let startTime = getStartTimeRange(links);
let endTime = getEndTimeRange(links);

const defaultCircleRadius = 9;
const largerCircleRadius = defaultCircleRadius*2;
const defaultVertexFontSize = defaultCircleRadius*2;
const largerVertexFontSize = defaultVertexFontSize*2;

const labelFontSize = defaultVertexFontSize * 0.5;
const markerWidth = 4;
const markerHeight = 4;

let verticeLabelSwitch = true;
let edgeLabelSwitch = true;

const updateGraphNetworkTitle = d3.select("#temporal-graph-network-title").text(pageTitle)

// Initialise the time range slider
function updateSlider(links) {
    let updateStartLabel = d3.select("#sliderStartValue").text(startTime)
    let updateSliderStart = d3.select("#sliderStart")
        .attr("min", startTime)
        .attr("max", endTime)
        .attr("value", startTime)
    let updateEndLabel = d3.select("#sliderEndValue").text(endTime)
    let updateSliderEnd = d3.select("#sliderEnd")
        .attr("min", startTime)
        .attr("max", endTime)
        .attr("value", endTime)
}

updateSlider(links)

function temporalGraphNetwork(nodes, links, enableVerticeLabel, enableEdgeLabel) {
        // Initialise the SVG canvas for d3.js
    const svg = d3.select("#visualisation")
        .append("svg")
                .attr("width", width)
                .attr("height", height)

    userDashboard(svg, startTime, endTime, nodes.length, links.length)

        // Create the arrow head
    svg.append("defs").selectAll("marker")
        .data(["end"])      // Different link/path types can be defined here
        .enter()
        .append("svg:marker")  
                .attr("id", String)
                .attr("viewBox", "0 -5 10 10")
                .attr("refX", 20)
                .attr("refY", -1)
                .attr("markerWidth", markerWidth)
                .attr("markerHeight", markerHeight)
                .attr("orient", "auto")
                .attr("fill", "black")
        .append("path")
        .attr("d", "M0,-5L10,0L0,5");

    const simulation = d3.forceSimulation(nodes)
        .force('link', d3.forceLink()
        .links(links)
        .distance(d => 50) // The length of the edges or links
        .strength(0.1))     
        .force('charge', d3.forceManyBody().strength(-100)) // strength() attraction (+) or repulsion (-)
        .force('overlap', d3.forceCollide()) // prevent vertex overlap one another
        .force('center', d3.forceCenter(width/2, height/2)) // center the graph 
        .on('tick', tick);    // add vertices and edges elements to canvas

    let addEdges = svg.append("g")
        .attr("id", "edges")
        .selectAll("path")
        .data(links)
        .enter()
        .append("path")
        .attr("class","edge")
        .attr("id", d => d.source.name + " to " + d.target.name + ":" + d.start + "-" + d.end)
        .attr("marker-end", "url(#end)");

    let addVertices = svg.selectAll(".vertex")
        .data(nodes)
        .enter()
        .append("g")
        .attr("class", "vertex")
        .on("mouseover", mouseoverVertex) // trigger mouse hover over events
        .on("mouseout", mouseoutVertex)
        .call(drag(simulation)) // iInvokes callback function on the selection

    addVertices.append("circle")   // Append circle elem for each data
        .attr("r", defaultCircleRadius) // This needs to be scalable depending on network size

    addVertices.append("text") // Append text elem for each data
        .attr("dx", 10) // Position text off from circle
        .attr("dy", ".30em")
        .attr("font-size", defaultVertexFontSize)
        .attr("font-weight", 400)
        .attr("opacity", 0.5)
        .text(d => enableVerticeLabel ? d.name : "")

    let addLabels = svg.append("g")
        .attr("id", "labels")
        .style("fill", "black")
        .selectAll("text")
        .data(links)
        .enter()
        .append("text")
        .attr("class", "label")
        .attr("dy", -2)
        .attr("font-size", labelFontSize)
                .append("textPath")

    function tick() {
        addEdges 
                .attr("d", function(d) {
                var dr = 75/d.linknum; 
                return "M" + d.source.x + "," + d.source.y + "A" + dr + "," + dr + " 0 0,1 " + d.target.x + "," + d.target.y;
                });
        addLabels
                .attr("xlink:href", d => "#" + d.source.name + " to " + d.target.name + ":" + d.start + "-" + d.end)
                .attr("startOffset", "40%")	
                .text(d => enableEdgeLabel ? d.start : "")

        addVertices
                .attr("fill", d => d.color)
                .attr("transform", d => "translate(" + d.x + "," + d.y + ")")
     }
}

function initialiseTemporalGraphNetwork(startTime, endTime) {
        let updatedLinks = links.filter(link => link.start >= startTime && link.end <= endTime)
        temporalGraphNetwork(nodes, updatedLinks, verticeLabelSwitch, edgeLabelSwitch) 
}

initialiseTemporalGraphNetwork(startTime, endTime)
