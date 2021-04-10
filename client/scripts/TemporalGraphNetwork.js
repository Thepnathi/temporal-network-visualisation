import {mouseoverVertex, mouseoutVertex} from './MouseHandler.js';
import {drag} from './Drag.js';
// import {nodes, links} from './Data.js';

let nodes = [
    {name: 'Bank', coordinates: [200, 50]},
    {name: 'Liverpool Street', coordinates: [100, 100]},
    {name: 'St. Pauls', coordinates: [300, 150]},
]

let links = [
    {source: 0, target: 1, start: 800, end: 810, color: "red"},
    {source: 1, target: 0, start: 805, end: 809, color: "red"},
    {source: 0, target: 2, start: 805, end: 809, color: "red"},
    {source: 2, target: 0, start: 805, end: 809, color: "red"},
]
//sort links by source, then target
links.sort(function(a,b) {
    if (a.source > b.source) {return 1;}
    else if (a.source < b.source) {return -1;}
    else {
        if (a.target > b.target) {return 1;}
        if (a.target < b.target) {return -1;}
        else {return 0;}
    }
});

for (var i=0; i<links.length; i++) {
    if (i != 0 &&
        links[i].source == links[i-1].source &&
        links[i].target == links[i-1].target) {
            links[i].linknum = links[i-1].linknum + 1;
        }
    else {links[i].linknum = 1;};
};

console.log(links)
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

svg.append("defs").selectAll("marker")
    .data(["end"])      // Different link/path types can be defined here
    .enter()
        .append("svg:marker")  
            .attr("id", String)
            .attr("viewBox", "0 -5 10 10")
            .attr("refX", 15)
            .attr("refY", 0.5)
            .attr("markerWidth", 10)
            .attr("markerHeight", 10)
            .attr("orient", "auto")
    .append("path")
        .attr("d", "M0,-5L10,0L0,5");

// Initialise the force simulation settings
const simulation = d3.forceSimulation(nodes)
        .force('link', d3.forceLink()
            .links(links)
            .distance(d => 100) // Distance between two edges or links
            .strength(0.1))     
        .force('charge', d3.forceManyBody().strength(-300)) // strength() attraction (+) or repulsion (-)
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

// let addEdgesLabel = svg.selectAll(".edge") 
//         .append("text")
//         .attr("fill", "Black")
//         .attr("font-size", 12)
//         .attr("font-weight", 100)
//         .attr("dy", ".30em")
//         .attr("text-anchor", "middle")

var thing = svg.append("g")
        .attr("id", "thing")
        .style("fill", "navy")

thing.append("text")
        .style("font-size", "20px")
    .append("textPath")
        .attr("xlink:href", "#dayam")
        .attr("startOffset", "50%")	
        .text("Super")

thing.append("use")
        .attr("xlink:href", "#dayam")
        .style("stroke", "black")
        .style("fill", "none");

function tick() {
    // We only want to add the edge within the time range
    addEdges                // We disable the edge if it is not within the time window 
        .attr("d", function(d) {
            var dx = d.target.x - d.source.x,
                dy = d.target.y - d.source.y,
                dr = 75/d.linknum; 
            return "M" + d.source.x + "," + d.source.y + "A" + dr + "," + dr + " 0 0,1 " + d.target.x + "," + d.target.y;
        });

    // addEdgesLabel
    //     .append("textPath")
    //     .attr("xlink:href", function(d) {
    //         return "#" + d.source.name + "-" + d.target.name
    //     })
    //     .text(function(d) {
    //         return d.start
    //     })
        
    addVertices.attr("transform", d => "translate(" + d.x + "," + d.y + ")");
}

// This function checks if the link data start time and end time is within the specified time range
const checkTimeRange = (start, end) => (start >= startTimeRange && start <= endTimeRange && end >= startTimeRange && end <= endTimeRange) ? true : false;
