import {mouseoverVertex, mouseoutVertex} from './MouseHandler.js';
import {drag} from './Drag.js';
import {nodes, links} from './Data.js';

let width = 800, height = 600;

const defaultCircleRadius = 8
const largerCircleRadius = defaultCircleRadius*2
const defaultVertexFontSize = 18
const largerVertexFontSize = defaultVertexFontSize*2;
const labelFontSize = defaultVertexFontSize * 0.8

let startTimeRange = 800, endTimeRange = 820

// ==================================================
// SVG Canvas
// ==================================================

// Initialise the SVG canvas for d3.js
const svg = d3.select("#visualisation")
        .append("svg")
        .attr("width", width)
        .attr("height", height)

// Create the arrow head
svg.append("defs").selectAll("marker")
        .data(["end"])      // Different link/path types can be defined here
        .enter()
        .append("svg:marker")  
                .attr("id", String)
                .attr("viewBox", "0 -5 10 10")
                .attr("refX", 18)
                .attr("refY", -1)
                .attr("markerWidth", 8)
                .attr("markerHeight", 8)
                .attr("orient", "auto")
                .attr("fill", "#888888")
        .append("path")
        .attr("d", "M0,-5L10,0L0,5");

// Display the information to user
let userDisplay = svg.append("g")
        .attr("class", "information")

userDisplay.append("text")
        .attr("fill", "Black")
        .attr("font-size", 24)
        .attr("font-weight", 100)
        .attr("x", 50)
        .attr("y", 50)
        .text("Time window from " + startTimeRange + " to " + endTimeRange)

//- Using an anonymous function:
// document.getElementById("rangeButton").onclick = function () { alert('hello!'); };

// ==================================================
// D3 Force Simulation initialisation
// ==================================================

const simulation = d3.forceSimulation(nodes)
        .force('link', d3.forceLink()
            .links(links)
            .distance(d => 60) // The length of the edges or links
            .strength(0.1))     
        .force('charge', d3.forceManyBody().strength(-200)) // strength() attraction (+) or repulsion (-)
        .force('overlap', d3.forceCollide()) // prevent vertex overlap one another
        .force('center', d3.forceCenter(width/2, height/2)) // center the graph 
        .on('tick', tick);    // add vertices and edges elements to canvas


// ==================================================
// Edges and links initialisation
// ==================================================

let addEdges = svg.append("g")
        .attr("id", "edges")
        .selectAll("path")
        .data(links)
        .enter()
              .append("path")
              .attr("class","edge")
              .attr("id", d => d.source.name + " to " + d.target.name)
              .attr("marker-end", "url(#end)");

// ==================================================
// Vertices or nodes initialisation
// ==================================================

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
        .attr("font-weight", 600)
        .text(d => d.name)

// ==================================================
// Labels or weights initialisation 
// ==================================================

let addLabels = svg.append("g")
        .attr("id", "labels")
        .style("fill", "black")
        .selectAll("text")
        .data(links)
        .enter()
            .append("text")
            .attr("class", "label")
            .attr("font-size", labelFontSize)
                .append("textPath")

// The tick function will run through all of our dataset
// so we can apply the each data to the vertices, edges and labels.
function tick() {
        addEdges 
                .attr("d", function(d) {
                var dx = d.target.x - d.source.x,
                        dy = d.target.y - d.source.y,
                        dr = 75/d.linknum; 
                return "M" + d.source.x + "," + d.source.y + "A" + dr + "," + dr + " 0 0,1 " + d.target.x + "," + d.target.y;
                });

        addLabels
                .attr("xlink:href", d => "#" + d.source.name + " to " + d.target.name)
                .attr("startOffset", "40%")	
                .text(d => d.start)


        addVertices.attr("transform", d => "translate(" + d.x + "," + d.y + ")");
}

// This function checks if the link data start time and end time is within the specified time range
const checkTimeRange = (start, end) => (start >= startTimeRange && start <= endTimeRange && end >= startTimeRange && end <= endTimeRange) ? true : false;

export {defaultCircleRadius, largerCircleRadius, defaultVertexFontSize, largerVertexFontSize}