let width = 1000, height = 600

let nodes = [
    {name: 'Bank', coordinates: [200, 50]},
    {name: 'Liverpool Street', coordinates: [100, 100]},
    {name: 'St. Pauls', coordinates: [300, 150]},

    {name: 'Station A', coordinates: [300, 150]},
    {name: 'Station B', coordinates: [300, 150]},
    {name: 'Station C', coordinates: [300, 150]},
    {name: 'Station D', coordinates: [300, 150]},
]

let links = [
    {source: 0, target: 1, start: 800, end: 810, color: "red"},
    {source: 1, target: 0, start: 805, end: 809, color: "red"},
    {source: 0, target: 2, start: 805, end: 809, color: "red"},
    {source: 2, target: 0, start: 805, end: 809, color: "red"},

    {source: 3, target: 4, start: 805, end: 809, color: "red"},
    {source: 4, target: 5, start: 805, end: 809, color: "red"},
    {source: 5, target: 6, start: 805, end: 809, color: "red"},
]
//sort links by source, then target
links.sort(function(a,b) {
    if (a.source > b.source) {return 1;}
    else if (a.source < b.source) {return -1;}
    else {
        if (a.target > b.target) {return 1;}
        if (a.target < b.target) {return -1;}
        else {return 0;}
    }
});

for (var i=0; i<links.length; i++) {
    if (i != 0 &&
        links[i].source == links[i-1].source &&
        links[i].target == links[i-1].target) {
            links[i].linknum = links[i-1].linknum + 1;
        }
    else {links[i].linknum = 1;};
};


function convert(lat, lon){
    let y = ((-1 * lat) + 90) * (height / 180);
    let x = (lon + 180) * (width / 360);
    return [x, y]
}

let res = convert(51.512884,-0.091397)

export { nodes, links }