// forceLink function pushes linked node apart from one another
import {nodes, links} from './Data.js';

let width = 1000, height = 600

console.log("Hello There")

const drag = simulation => {
    const dragstarted = event => {
        if (!event.active) simulation.alphaTarget(0.3).restart();
        event.subject.fx = event.subject.x;
        event.subject.fy = event.subject.y;
    }

    const dragged = event => {
        event.subject.fx = event.x;
        event.subject.fy = event.y;
    }

    const dragended = event => {7
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
                .call(d3.zoom().on("zoom", () => {
                    svg.attr("transform", d3.event.transform)
                }))
            .append("g")
                .attr("class", "nodes")
            .append("g")
                .attr("class", "links")

function updateNodes() {
    let u = d3.select('.nodes') 
        .selectAll('text')
        .data(nodes)
        .call(drag(simulation));

    u.enter()
        .append('text')
        .text(d => d.name)
        .merge(u)
        .attr('font-size', 15)
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
    updateLinks()
    updateNodes()
}

const simulation = d3.forceSimulation(nodes)
    .force('charge', d3.forceManyBody())
    .force('overlap', d3.forceCollide())
    // .force('center', d3.forceCenter(width/2, height/2))
    .force('link', d3.forceLink().links(links).distance(100))
    .on('tick', ticked);

function updateLinks() {
    let u = d3.select('.links') // select DOM element
        .selectAll('line')
        .data(links)    // merge the array of data to the DOM element

    u.enter()   // from here we can add missing DOM element to bind with the data
        .append('line') // add missing line for each data points
        .merge(u)
        .attr('stroke', '#ccc')
        .attr('stroke-width', 5)
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
