// d3js is about binding data object to DOM elements
// Chart.js is better for building graphs and charts. 
// Whearas we have to do more with D3js, but it is more powerful since you can build things from scratch.

// select elem in DOM selectAll()
d3.select('.abc')
  .selectAll('p')
  .data([1, 2, 3])  // array of objects or pass data
  .enter()          // holds data to missing point
  .append('p')      // add missing element to each data point
  .text(data => data);          // for each p we add a text. In our example we are just displaying data

var width = 300, height = 300

class ForceLayoutExample {
    constructor(htmlElement, data) {
        this.htmlElement = htmlElement;
        this.data = data;
    }

    drawForceLayout() {
        var simulation = d3.forceSimulation(nodes)  // this function joins node arrays to circle elements
        .force('charge', d3.forceManyBody().strength(-50)) // element attract or repel one another
        .force('overlap', d3.forceCollide()) // prevents element overlapping
        .force('center', d3.forceCenter(width / 2, height /2)) // attracts elements towards a centre point
        .on('tick', this.ticked);   //  ticked is called for each simulation iteraton
    }

    ticked() {
        var u = d3.select('svg')
            .selectAll('circle')
            .data(nodes);

        u.enter()
            .append('circle')
            .attr('r', 10)
            .merge(u)
            .attr('cx', function(d) {
                return d.x
            })
            .attr('cy', function(d) {
                return d.y
            })

        u.exit().remove()
    }
}