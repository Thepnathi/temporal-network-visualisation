function mouseoverVertex() {
    d3.select(this).select("circle").transition() // Transition the radius of circle to bigger size
        .duration(500)
        .attr("r", largerCircleRadius)
    d3.select(this).select("text").transition() // shift the text more towards right side
        .duration(500)
        .attr("dx", 20)
        .attr("dy", ".40em")
        .attr("font-size", largerVertexFontSize)
}

function mouseoutVertex() {
    d3.select(this).select("circle").transition()   // Reverse back to original circle radius
        .duration(500)
        .attr("r", defaultCircleRadius)
    d3.select(this).select("text").transition()     // Reverse font size to original
        .duration(500)
        .attr("dx", 10)
        .attr("dy", ".30em")
        .attr("font-size", defaultVertexFontSize)
}
