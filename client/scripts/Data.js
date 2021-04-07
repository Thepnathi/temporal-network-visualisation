let width = 1000, height = 600

let nodes = [
    {name: 'Bank', coordinates: [200, 50]},
    {name: 'Liverpool Street', coordinates: [100, 100]},
    {name: 'St. Pauls', coordinates: [300, 150]},
    {name: 'Westferry', coordinates: [350, 200]},
    {name: 'Canary Wharf', coordinates: [350, 200]},
    {name: 'Heron Quays', coordinates: [350, 200]},
    {name: 'Westferry', coordinates: [350, 200]},
    {name: 'Canary Wharf', coordinates: [350, 200]},
    {name: 'Heron Quays', coordinates: [350, 200]},
    {name: 'Westferry', coordinates: [350, 200]},
]

// Issue with algorithm works with backward start time

let links = [
    {source: 0, target: 1, start: 800, end: 810, color: "red"},
    {source: 0, target: 2, start: 805, end: 809, color: "red"},
    {source: 3, target: 4, start: 810, end: 817, color: "turquoise"},
    {source: 4, target: 5, start: 810, end: 820, color: "turquoise"},
    {source: 4, target: 5, start: 820, end: 830, color: "turquoise"}  
]


function convert(lat, lon){
    let y = ((-1 * lat) + 90) * (height / 180);
    let x = (lon + 180) * (width / 360);
    return [x, y]
}

let res = convert(51.512884,-0.091397)

export { nodes, links }