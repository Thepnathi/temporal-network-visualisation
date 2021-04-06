import {drag} from './Drag.js';
// import {mouseoverVertex, mouseoutVertex} from './MouseListener.js';
import {nodes, links} from './Data.js';

let width = 1000, height = 600;
let defaultCircleRadius = 8, defaultFontSize = 15;
let largerCircleRadius = 16, largerFontSize = 30;

// Initialise the SVG canvas for d3.js
const svg = d3.select("#visualisation")
        .append("svg")
        .attr("width", width)
        .attr("height", height);

// Initialise the force simulation settings
const simulation = d3.forceSimulation(nodes)
        .force('link', d3.forceLink()
            .links(links)
            .distance(d => 40) // Distance between two edges or links
            .strength(0.1))     
        .force('charge', d3.forceManyBody().strength(-75)) // strength() attraction (+) or repulsion (-)
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
                .attr("stroke", "#ccc")
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
        .attr("dy", ".30em")
        .attr("text-anchor", "middle")

function tick() {
    addEdges
        .attr("x1", d => d.source.x)
        .attr("y1", d => d.source.y)
        .attr("x2", d => d.target.x)
        .attr("y2", d => d.target.y);

    addEdgesLabel
        .attr("x", d => (d.source.x + d.target.x)/2)
        .attr("y", d => (d.source.y + d.target.y)/2)
        .attr("class", d => d.source.name + "-" + d.target.name + "-connection")
        .text(d => d.start + "-" + d.end)

    addVertices.attr("transform", d => "translate(" + d.x + "," + d.y + ")");
}

// ##################################################################
// # Transition for mouse hover
// ##################################################################

function mouseoverVertex() {
    console.log("Mouse over")
    d3.select(this).select("circle").transition()
        .duration(500)
        .attr("r", largerCircleRadius)
    d3.select(this).select("text").transition() // shift the text more towards right side
        .duration(500)
        .attr("dx", 20)
        .attr("dy", ".40em")
        .attr("font-size", largerFontSize)
}

function mouseoutVertex() {
    d3.select(this).select("circle").transition()
        .duration(500)
        .attr("r", defaultCircleRadius)
    d3.select(this).select("text").transition()
        .duration(500)
        .attr("dx", 10)
        .attr("dy", ".30em")
        .attr("font-size", defaultFontSize)
}
