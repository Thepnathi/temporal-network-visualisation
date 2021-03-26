// forceLink function pushes linked node apart from one another

let width = 1000, height = 800

var nodes = [
    {name: 'Bank'},
    {name: 'B'},
    {name: 'C'},
    {name: 'D'},
    {name: 'E'}
   ]

var links = [
    {source: 0, target: 1},
    {source: 0, target: 2},
    {source: 0, target: 3},
]

function drawLayout() {
    var simululation = d3.forceSimulation(nodes)
        .force('charge', d3.forceManyBody())
        .force('overlap', d3.forceCollide())
        .force('center', d3.forceCenter(width/2, height/2))
        .force('link', d3.forceLink().links(links).distance(100))
        .on('tick', this.ticked);
}

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

drag = simululation => {

}

drawLayout()