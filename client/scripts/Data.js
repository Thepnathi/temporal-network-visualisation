let width = 1000, height = 600

// const nodes = [
//     {name: 'Bank', coordinates: [51.512884, -0.091397]},
//     {name: 'Liverpool Street', coordinates: [51.517372, -0.083182]},
//     {name: 'St. Pauls', coordinates: [51.514936, -0.097567]},
// ]

const nodes = [
    {name: 'Bank', coordinates: [200, 50]},
    {name: 'Liverpool Street', coordinates: [100, 100]},
    {name: 'St. Pauls', coordinates: [300, 150]},
]


const links = [
    {source: 0, target: 1},
    {source: 0, target: 2},
]

function convert(lat, lon){
    let y = ((-1 * lat) + 90) * (height / 180);
    let x = (lon + 180) * (width / 360);
    return [x, y]
}

let res = convert(51.512884,-0.091397)

let sw = false

// for (let i = 0; i < nodes.length; i++) {
//     let lat = nodes[i].coordinates[0];
//     let lon = nodes[i].coordinates[1];
//     nodes[i].coordinates = convert(lat, lon)
//     nodes[i].coordinates[0] += 50
//     nodes[i].coordinates[1] += 50
// }

console.log(nodes)
export { nodes, links }