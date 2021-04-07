export class Drawable {
    constructor(htmlElement, data) {
        this.htmlElement = htmlElement;
        this.data = data;
    }

    getHtmlElement = () => this.htmlElement;

    getData = () => this.data;
}

class DrawCircle extends Drawable {
    constructor(htmlElement, data) {
        super(htmlElement, data);
    }

    drawCircle() {
        const circles = d3.selectAll('circle') 
            .style('fill', 'orange')
            .attr('r', function() {
                return 10 + Math.random() * 40;
            })
    }
}

class BarGraph extends Drawable {
    constructor(htmlElement, data) {
        super(htmlElement, data);
    }

    drawBarGraph() {
        const xScale = d3
        .scaleBand()
        .domain(this.data.map((dataPoint) => dataPoint.region))
        .rangeRound([0, 250])
        .padding(0.1);            // give us ordinal scale - every item in data have same width. Uniform distribution
        const yScale = d3.scaleLinear().domain([0, 15]).range([200, 0]);            // calculate the right height for each data. Domain is min and max value for the data - translate to the coord
        const container = d3.select(this.htmlElement).classed('container', true);   // target class style
    
        const bars = container              // for this to work we will need to associated css with attr
            .selectAll('.bar') 
            .data(this.data)
            .enter()
            .append('rect')
            .classed('bar', true)
            .attr('width', xScale.bandwidth())
            .attr('height', data => 300 - yScale(data.value))
            .attr('x', data => xScale(data.region))
            .attr('y', data => yScale(data.value));
    }
}

const DUMMY_DATA = [
    {id: "d1", value:12, region:"USA"},
    {id: "d2", value:7, region:"India"},
    {id: "d3", value:12, region:"German"},
    {id: "d4", value:5, region:"UK"},
]

const example1 = new BarGraph('svg', DUMMY_DATA);
example1.drawBarGraph();
