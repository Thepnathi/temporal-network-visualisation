var vertices;
var edges;

async function getDataset() {
    let response = await fetch("http://localhost:5000/dataset");
    let result = await response.json();
    edges = result.edges;
    vertices = result.nodes;
    return result;
}

async function initialiseData() {
    vertices = [
        {name: 'Bank'},
        {name: 'Liverpool Street'},
        {name: 'St. Pauls'},
    
        {name: 'Station A'},
        {name: 'Station B'},
        {name: 'Station C'},
        {name: 'Station D'},
    ]
    
    edges = [
        {source: 0, target: 1, start: 800, end: 805, color: "red"},
        {source: 0, target: 1, start: 801, end: 805, color: "red"},
        {source: 0, target: 1, start: 802, end: 805, color: "red"},
        {source: 0, target: 1, start: 803, end: 805, color: "red"},
        {source: 0, target: 1, start: 804, end: 805, color: "red"},
        {source: 0, target: 1, start: 830, end: 835, color: "red"},
        {source: 0, target: 1, start: 806, end: 810, color: "red"},
        {source: 1, target: 0, start: 800, end: 805, color: "red"},
        {source: 0, target: 2, start: 805, end: 809, color: "red"},
        {source: 2, target: 0, start: 805, end: 809, color: "red"},
    
        {source: 3, target: 4, start: 805, end: 809, color: "red"},
        {source: 4, target: 5, start: 810, end: 815, color: "red"},
        {source: 5, target: 6, start: 816, end: 820, color: "red"},

        {source: 3, target: 4, start: 900, end: 910, color: "red"},
        {source: 4, target: 5, start: 920, end: 930, color: "red"},
        {source: 5, target: 6, start: 915, end: 930, color: "red"},

    ]
    let verticeMap = {}
    for (var i = 0; i < vertices.length; i++) {
        verticeMap[vertices[i]] = i
    }

    for (var i = 0; i < edges.length; i++) {
        edges[i].source = verticeMap[edges[i].source];
        edges[i].target = verticeMap[edges[i].target];
    }

    tempVertices = []
    for (var i = 0; i < vertices.length; i++) {
        tempVertices.push({"name": vertices[i]});
    }
    vertices = tempVertices;

    edges.sort(function(a,b) {
        if (a.source > b.source) {return 1;}
        else if (a.source < b.source) {return -1;}
        else {
            if (a.target > b.target) {return 1;}
            if (a.target < b.target) {return -1;}
            else {return 0;}
        }
    });
    
    for (var i=0; i < edges.length; i++) {
        if (i != 0 &&
            edges[i].source == edges[i-1].source &&
            edges[i].target == edges[i-1].target) {
                edges[i].linknum = edges[i-1].linknum + 1;
            }
        else {edges[i].linknum = 1;};
    };

    totalColor = COLOURS.length - 1;
    indexColor = 0;
    for (var i = 0; i < vertices.length; i++) {
        if (indexColor == totalColor) {
            indexColor = 0;
        }
        vertices[i].color = COLOURS[indexColor];
        indexColor += 1;
    }

    return true;
}

