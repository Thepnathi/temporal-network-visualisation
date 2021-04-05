// forceLink function pushes linked node apart from one another
import {nodes, links} from './Data.js';

let width = 1000, height = 600

console.log("Hello There")

const drag = simulation => { // Drag sim is not working
    const dragstarted = event => {
        if (!event.active) simulation.alphaTarget(0.3).restart();
        event.subject.fx = event.subject.x;
        event.subject.fy = event.subject.y;
    }

    const dragged = event => {
        event.subject.fx = event.x;
        event.subject.fy = event.y;
    }

    const dragended = event => {
        if (!event.active) simulation.alphaTarget(0);
        event.subject.fx = null;
        event.subject.fy = null;
    }

    return d3.drag()
        .on("start", dragstarted)
        .on("drag", dragged)
        .on("end", dragended)
}

const svg = d3.select("#graph")
            .append("svg")
                .attr('width', width)
                .attr('height', height)
                .attr('id', 'Temporal-Graph-Network')
            .append("g")
                .attr("class", "nodes")
            .append("g")
                .attr("class", "links")
            .append("g")
                .attr("class", "labels")

function updateNodes() {
    let node = d3.select('.nodes') 
        .selectAll('text')
        .data(nodes)
        .on("mouseover", function (d) {
            console.log("mouseover")            // This is currently not working, likely to do with line and node on top of each other
            d3.select(this).select('text')
                .text(function(d) {
                    return "Hello There"
                })
                .attr('font-size', 30)
        })
        .call(drag(simulation));

    node.enter()
        .append('text')
        .text(d => d.name)
        .merge(node)
        .attr('font-size', 20)
        .attr('text-anchor', 'middle')
        .attr('x', function(d) {
            d.x = d.coordinates[0]
            return d.x
        })
        .attr('y', function(d) {
            d.y = d.coordinates[1]
            return d.y
        })
        .attr('dy', d => 5)
}

function ticked() {
    updateNodes()
    addLabels()
    updateLinks()
}

function addLabels() {
    let d = d3.select('.labels')
            .selectAll("text")
            .data(links)

        d.enter()
            .append('text')
            .text(d => d.time)
            .merge(d)
            .attr('font-size', 20)
            .attr('x', function(d) {
                return (d.source.x + d.target.x) / 2
            })
            .attr('y', function(d) {
                return (d.source.y + d.target.y) / 2
            })
}

function updateLinks() {
    let u = d3.select('.links') // select DOM element
        .selectAll('line')
        .data(links)    // merge the array of data to the DOM element

    u.enter()   // from here we can add missing DOM element to bind with the data
        .append('line') // add missing line for each data points
        .merge(u) // merge the selection together
        .attr('stroke', '#ccc')
        .attr('stroke-width', 3)
        .attr('x1', function(d) {       // for each data point we draw line on the coordinate from source to target
            return d.source.x
        })    
        .attr('y1', function(d) {
            return d.source.y
        })
        .attr('x2', function(d) {
            return d.target.x
        })
        .attr('y2', function(d) {
            return d.target.y
        })
}

const simulation = d3.forceSimulation(nodes)
    // .force('charge', d3.forceManyBody())         // We need these when not ploting graph with coordinates
    // .force('overlap', d3.forceCollide())
    // .force('center', d3.forceCenter(width/2, height/2))
    .force('link', d3.forceLink().links(links))
    .on('tick', ticked);