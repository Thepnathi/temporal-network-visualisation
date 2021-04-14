import {mouseoverVertex, mouseoutVertex} from './MouseHandler.js';
import {drag} from './Drag.js';
import {nodes, links} from './Data.js';


console.log(links)
let width = 1600, height = 800;

export let defaultCircleRadius = 10, defaultFontSize = 18;
export let largerCircleRadius = defaultCircleRadius*2, largerFontSize = defaultFontSize*2;

let startTimeRange = 800, endTimeRange = 820

// Initialise the SVG canvas for d3.js
const svg = d3.select("#visualisation")
        .append("svg")
        .attr("width", width)
        .attr("height", height)

let userDisplay = svg.append("g")
        .attr("class", "information")

userDisplay.append("text")
        .attr("fill", "Black")
        .attr("font-size", 24)
        .attr("font-weight", 100)
        .attr("x", 50)
        .attr("y", 50)
        .text("Showing time window from " + startTimeRange + " to " + endTimeRange)

// document.getElementById("clickMe").onclick = doFunction;

//- Using an anonymous function:
document.getElementById("rangeButton").onclick = function () { alert('hello!'); };

svg.append("defs").selectAll("marker")
    .data(["end"])      // Different link/path types can be defined here
    .enter()
        .append("svg:marker")  
            .attr("id", String)
            .attr("viewBox", "0 -5 10 10")
            .attr("refX", 15)
            .attr("refY", 0.5)
            .attr("markerWidth", 7)
            .attr("markerHeight", 7)
            .attr("orient", "auto")
    .append("path")
        .attr("d", "M0,-5L10,0L0,5");

// Initialise the force simulation settings
const simulation = d3.forceSimulation(nodes)
        .force('link', d3.forceLink()
            .links(links)
            .distance(d => 50) // Distance between two edges or links
            .strength(0.1))     
        .force('charge', d3.forceManyBody().strength(-200)) // strength() attraction (+) or repulsion (-)
        .force('overlap', d3.forceCollide()) // prevent vertex overlap one another
        .force('center', d3.forceCenter(width/2, height/2)) // center the graph 
        .on('tick', tick);    // add vertices and edges elements to canvas

// Initiase the edge settings and passed in the edges or links dataset
let addEdges = svg.append("g").selectAll("path")
        .data(links)
        .enter()
            .append("path")
            .attr("class","edge")
            // .attr("id", d => d.source.name + "-" + d.target.name)
            .attr("id", "dayam")
            .attr("marker-end", function(d) { return "url(#end)"; });
            
// Initiase the vertices settings and passed in the vertices or nodes dataset
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
        .attr("font-size", defaultFontSize)
        .text(d => d.name)

var thing = svg.append("g")
        .attr("id", "thing")
        .style("fill", "navy")

thing.append("text")
        .style("font-size", "20px")
    .append("textPath")
        .attr("xlink:href", "#dayam")
        .attr("startOffset", "50%")	
        .text("Super")

function tick() {
    // We only want to add the edge within the time range
    addEdges                // We disable the edge if it is not within the time window 
        .attr("d", function(d) {
            var dx = d.target.x - d.source.x,
                dy = d.target.y - d.source.y,
                dr = 75/d.linknum; 
            return "M" + d.source.x + "," + d.source.y + "A" + dr + "," + dr + " 0 0,1 " + d.target.x + "," + d.target.y;
        });

    addVertices.attr("transform", d => "translate(" + d.x + "," + d.y + ")");
}

// This function checks if the link data start time and end time is within the specified time range
const checkTimeRange = (start, end) => (start >= startTimeRange && start <= endTimeRange && end >= startTimeRange && end <= endTimeRange) ? true : false;
