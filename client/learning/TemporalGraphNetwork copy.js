import {nodes, links} from './Data.js.js';

export class GraphNetwork {
    constructor(name, width, height) {
        this.name = name;
        this.width = width;
        this.height = height;
    }

    // Allows vertices and edges to be dragged around
    // Force simulation setting still applies i.e. repulsion or attraction to other vertices
    drag(simulation) {
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
            .on("end", dragended);
    }
}

// use attr and style
export class TemporalGraphNetwork extends GraphNetwork {
    constructor(name, width, height, nodes, links) {
        super(name, width, height);
        this.nodes = nodes;
        this.links = links;
    }

    // Set up the SVG canvas for d3 on the div with visualisation id
    svg = d3.select("#visualisation").append("svg")
            .attr("width", this.width)
            .attr("height", this.height);

    addEdges = this.svg.selectAll(".edges")
        .data(links)
        .enter()
            .append("g")
            .attr("class", "edge")
            .append("line")
            .attr("class", d => "link class") // Replace to add class name to the edge
            .attr("stroke", "#ccc")
            .attr("stroke-width", 3);

    addVertices = this.svg.selectAll(".vertices")
            .data(nodes)
            .enter()
                .append("g")
                .attr("class", "vertex")
                .on("mouseover", this.mouseoverVertex())
                .on("mouseout", this.mouseoutVertex())
                .call(this.drag(this.simulation))
                    .append("circle")   // Append circle elem for each data
                    .attr("r", 8) // This needs to be scalable depending on network size
                        .append("text") // Append text elem for each data
                        .attr("dx", 12) // Position text off from circle
                        .attr("dy", ".30em")
                        .attr("font-size", 15)
                        .text(d => d.name)

    tick() {
        this.addEdges
            .attr("x1", d => d.source.x)
            .attr("y1", d => d.source.y)
            .attr("x2", d => d.target.x)
            .attr("y2", d => d.target.y);

        this.addVertices.attr("transform", d => "translate(" + d.x + "," + d.y + ")");
    }

    simulation = d3.forceSimulation(nodes)
        .force('link', d3.forceLink()
            .links(links)
            .distance(d => 20) // Distance between two vertices
            .strength(0.1))     
        .force('charge', d3.forceManyBody().strength(-50)) // strength() attraction (+) or repulsion (-)
        .force('overlap', d3.forceCollide()) // prevent vertex overlap one another
        .force('center', d3.forceCenter(this.width/2, this.height/2))
        .on('tick', this.tick());    // compute the vertices and edges position

    mouseoverVertex() {}                
    mouseoutVertex() {}

      
}

let a = new TemporalGraphNetwork("Temporal Graph Network",960, 500,nodes, links)