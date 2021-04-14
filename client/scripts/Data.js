let width = 1000, height = 600

export const COLOURS = ["#DF72C6", "#08B5F4", "#D5AB36", "#1F399B", "#1AB0D7", "#583974",
                    "#FF08D6","#26145D","#7FE902","#9DFFCF","#F8A781","#FA6455","#7CD291",
                    "#DCE51D", "#328BFE","#9EBBD6","#CCE3A6","#B6CA34","#E59776","#000000"]
                    
export const randomNumber = (maxNum) => Math.floor(Math.random() * maxNum)
let nodes = [
    {name: 'Bank', coordinates: [200, 50], color: COLOURS[randomNumber(COLOURS.length)]},
    {name: 'Liverpool Street', coordinates: [100, 100], color: COLOURS[randomNumber(COLOURS.length)]},
    {name: 'St. Pauls', coordinates: [300, 150], color: COLOURS[randomNumber(COLOURS.length)]},

    {name: 'Station A', coordinates: [300, 150], color: COLOURS[randomNumber(COLOURS.length)]},
    {name: 'Station B', coordinates: [300, 150], color: COLOURS[randomNumber(COLOURS.length)]},
    {name: 'Station C', coordinates: [300, 150], color: COLOURS[randomNumber(COLOURS.length)]},
    {name: 'Station D', coordinates: [300, 150], color: COLOURS[randomNumber(COLOURS.length)]},
]

let links = [
    {source: 0, target: 1, start: 800, end: 810, color: "red"},
    {source: 1, target: 0, start: 805, end: 809, color: "red"},
    {source: 0, target: 2, start: 805, end: 809, color: "red"},
    {source: 2, target: 0, start: 805, end: 809, color: "red"},

    {source: 3, target: 4, start: 805, end: 809, color: "red"},
    {source: 4, target: 5, start: 810, end: 815, color: "red"},
    {source: 5, target: 6, start: 816, end: 820, color: "red"},
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