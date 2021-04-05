let width = 1000, height = 600

let nodes = [
    {name: 'Bank', coordinates: [200, 50]},
    {name: 'Liverpool Street', coordinates: [100, 100]},
    {name: 'St. Pauls', coordinates: [300, 150]},
    {name: 'Westferry', coordinates: [350, 200]},
    {name: 'Canary Wharf', coordinates: [350, 200]},
    {name: 'heron Quays', coordinates: [350, 200]},
]

let links = [
    {source: 0, target: 1, weight: "8:00"},
    {source: 0, target: 2, weight: "9:00"},
    {source: 3, target: 4, weight: "33"}
]


function convert(lat, lon){
    let y = ((-1 * lat) + 90) * (height / 180);
    let x = (lon + 180) * (width / 360);
    return [x, y]
}

let res = convert(51.512884,-0.091397)

export { nodes, links }