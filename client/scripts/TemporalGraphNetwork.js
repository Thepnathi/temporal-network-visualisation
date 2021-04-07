import {mouseoverVertex, mouseoutVertex} from './MouseHandler.js';
import {drag} from './Drag.js';
import {nodes, links} from './Data.js';

// Time sliders
// Add color key/legend to show the tube line
// Nice to add arrows

let width = 1600, height = 800;

export let defaultCircleRadius = 8, defaultFontSize = 15;
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

// Initialise the force simulation settings
const simulation = d3.forceSimulation(nodes)
        .force('link', d3.forceLink()
            .links(links)
            .distance(d => 40) // Distance between two edges or links
            .strength(0.1))     
        .force('charge', d3.forceManyBody().strength(-50)) // strength() attraction (+) or repulsion (-)
        .force('overlap', d3.forceCollide()) // prevent vertex overlap one another
        .force('center', d3.forceCenter(width/2, height/2)) // center the graph 
        .on('tick', tick);    // add vertices and edges elements to canvas

// Initiase the edge settings and passed in the edges or links dataset
let addEdges = svg.selectAll(".edge")
        .data(links)
        .enter()
            .append("g")
            .attr("class", "edge")
                .append("line")
                .attr("class", d => d.source.name + "-" + d.target.name + "-connection")
                .attr("stroke-width", 3);

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

// For each edge class we will append a text
let addEdgesLabel = svg.selectAll(".edge") 
        .append("text")
        .attr("fill", "Black")
        .attr("font-size", 12)
        .attr("font-weight", 100)
        .attr("dy", ".30em")
        .attr("text-anchor", "middle")

function tick() {
    // We only want to add the edge within the time range
    addEdges                // We disable the edge if it is not within the time window 
        .attr("x1", d => d.source.x)
        .attr("y1", d => d.source.y)
        .attr("x2", d => d.target.x)
        .attr("y2", d => d.target.y)
        .attr("stroke", function(d) {
            if (checkTimeRange(d.start, d.end)) {
                if (d.hasOwnProperty('color')) {
                    return d.color
                } 
                return "#ccc"
            }
            return "white"
        })
        .attr("stroke-opacity", d => (checkTimeRange(d.start, d.end)) ? 1 : 0.0) // we make the line invisible if its not within the time range
        .attr("stroke-width", 3);

    addEdgesLabel          // We disable any labels 
        .attr("x", d => (d.source.x + d.target.x)/2)
        .attr("y", d => (d.source.y + d.target.y)/2)
        .attr("class", d => d.source.name + " to " + d.target.name + "-connection")
        .text(d => (checkTimeRange(d.start, d.end)) ? d.start + " to " + d.end: null);
        
    addVertices.attr("transform", d => "translate(" + d.x + "," + d.y + ")");
}

// This function checks if the link data start time and end time is within the specified time range
const checkTimeRange = (start, end) => (start >= startTimeRange && start <= endTimeRange && end >= startTimeRange && end <= endTimeRange) ? true : false;
