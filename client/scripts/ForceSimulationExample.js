// forceLink function pushes linked node apart from one another
import {nodes, links} from './Data.js';

let width = 1000, height = 600

const compute_node_size = (nodes, width, height) => {
    return ((width + height) / nodes.length) / nodes.length
}

console.log(compute_node_size(nodes, width, height))

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

d3.selectAll('rect').attr('width', 10)

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
        .attr('x', d => d.x)
        .attr('y', d => d.y)
        .attr('dy', d => 5)
}

function ticked() {
    updateLinks()
    updateNodes()
}

var simulation = d3.forceSimulation(nodes)
    .force('charge', d3.forceManyBody())
    .force('overlap', d3.forceCollide())
    .force('center', d3.forceCenter(width/2, height/2))
    .force('link', d3.forceLink().links(links).distance(100))
    .on('tick', ticked);

function updateLinks() {
    var u = d3.select('.links') // select DOM element
        .selectAll('line')
        .data(links)    // merge the array of data to the DOM element

    u.enter()   // from here we can add missing DOM element to bind with the data
        .append('line') // add missing line for each data points
        .merge(u)
        .attr('stroke', '#ccc')
        .attr('stroke-width', 5)
        .attr('x1', d => d.source.x)    // for each data point we draw line on the coordinate from source to target
        .attr('y1', d => d.source.y)
        .attr('x2', d => d.target.x)
        .attr('y2', d => d.target.y)
}
