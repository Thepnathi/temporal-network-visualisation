import {defaultCircleRadius, largerCircleRadius, defaultVertexFontSize, largerVertexFontSize} from './TemporalGraphNetwork.js';

export function mouseoverVertex() {
    d3.select(this).select("circle").transition()
        .duration(500)
        .attr("r", largerCircleRadius)
    d3.select(this).select("text").transition() // shift the text more towards right side
        .duration(500)
        .attr("dx", 20)
        .attr("dy", ".40em")
        .attr("font-size", largerVertexFontSize)
}

export function mouseoutVertex() {
    d3.select(this).select("circle").transition()
        .duration(500)
        .attr("r", defaultCircleRadius)
    d3.select(this).select("text").transition()
        .duration(500)
        .attr("dx", 10)
        .attr("dy", ".30em")
        .attr("font-size", defaultVertexFontSize)
}