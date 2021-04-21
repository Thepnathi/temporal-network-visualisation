// Display the information to user

function userDashboard(svg, startTimeRange, endTimeRange) {
    let userDisplay = svg.append("g")
        .attr("class", "information")

    userDisplay.append("text")
            .attr("fill", "Black")
            .attr("font-size", 24)
            .attr("font-weight", 100)
            .attr("x", 50)
            .attr("y", 50)
            .text("Time window from " + startTimeRange + " to " + endTimeRange)
}

export {userDashboard}