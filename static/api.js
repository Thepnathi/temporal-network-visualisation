var vertices;
var edges;

async function getDataset() {
    let response = await fetch("http://localhost:5000/dataset");
    let result = await response.json();
    edges = result.edges;
    vertices = result.nodes;
    return result;
}

async function dealDataset() {
    const data = await getDataset();
    let verticeMap = {}
    for (var i = 0; i < vertices.length; i++) {
        verticeMap[vertices[i]] = i
    }
    console.log(verticeMap)
    for (var i = 0; i < edges.length; i++) {
        edges[i].source = verticeMap[edges[i].source];
        edges[i].target = verticeMap[edges[i].target];
    }
    console.log(edges)

}

dealDataset()
