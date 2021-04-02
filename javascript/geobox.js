
// Append an SVG element to the body, and assign "map" as its ID
const svg = d3.select("body")
              .append("svg")
              .attr('width', 1000)
              .attr('height', 800)
              .attr("id", "map")

// Get the height and width, in pixels for the SVG element in the document

let lato = [20.590247430104906, 41.855404161133606]

const {height, width} = document.getElementById("map").getBoundingClientRect()

console.log(height, width)
// create a new projection function
// Turns lattitude and logitude pair to a pair of X, Y coordinates on SVG
const projection = d3.geoAlbers()
// Abjust the projection to fit the width and height of the SVG element
projection.rotate(-75).fitExtent(
  [
    [0, 0], 
    [width, height],
  ]
)
// Rotate describes how much the point must rotate relative to its original position. 
// There is no right value. Chosen by trail or error to user liking.

// fitExtent describes the minimum and maximum coordinates that the output needs to be bound to.
// [0,0] is the min and [width, height] is the max. Takes features as second arg.

// Create a GeoPath function from the projection
const path = d3.geoPath().projection(projection)

res = path(lato)

console.log(res)

// // Append paths to the SVG, and describe its 'd' atttribute using the geo-path function
// svg.append('g')
//   .selectAll('path')
//   // Here, "features" is the GeoJSON snippet that we saw earlier
//   .data(features.features)
//   .enter()
//   .append("path")
//   .attr("d", (feature) => path(feature)) 