// forceLink function pushes linked node apart from one another

let width = 1000, height = 600

var nodes = [
    {name: 'Bank'},
    {name: 'Liverpool Street'},
    {name: 'St. Pauls'},
    {name: 'Chancery Lane'},
    {name: 'E'},
    {name: 'Oxford Circus'},
    {name: 'Warren Street'},
    {name: 'Euston'},
    {name: 'Kings Cross St Pancras'}
   ]

var links = [
    {source: 0, target: 1},
    {source: 0, target: 2},
    {source: 0, target: 3},
    {source: 5, target: 6},
    {source: 6, target: 7},
    {source: 7, target: 8}
]

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

var simulation = d3.forceSimulation(nodes)
    .force('charge', d3.forceManyBody())
    .force('overlap', d3.forceCollide())
    .force('center', d3.forceCenter(width/2, height/2))
    .force('link', d3.forceLink().links(links).distance(100))
    .on('tick', this.ticked);


function updateLinks() {
    var u = d3.select('.links') // select DOM element
        .selectAll('line')
        .data(links)    // merge the array of data to the DOM element

    u.enter()   // from here we can add missing DOM element to bind with the data
        .append('line') // add missing line for each data points
        .merge(u)
        .attr('x1', d => d.source.x)    // for each data point we draw line on the coordinate from source to target
        .attr('y1', d => d.source.y)
        .attr('x2', d => d.target.x)
        .attr('y2', d => d.target.y)
}

function updateNodes() {
    u = d3.select('.nodes') 
        .selectAll('text')
        .data(nodes)
        .call(drag(simulation));

    u.enter()
        .append('text')
        .text(d => d.name)
        .merge(u)
        .attr('x', d => d.x)
        .attr('y', d => d.y)
        .attr('dy', d => 5)

}

function ticked() {
    updateLinks()
    updateNodes()
}

draw()