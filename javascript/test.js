let width = 1000, height = 800;

const svg = d3.select("body")
.append("svg")
.attr('width', width)
.attr('height', height)
.attr("id", "map")

  
var geojson = {"type":"FeatureCollection", "features": [
    {"type":"Feature","geometry":{"type":"Polygon","coordinates":[[[-2.6654607764398683,51.61724854430291],[-3.086082395894614,53.25815360160863],[-3.0505151266024857,54.98110391177964],[-2.023703526168841,55.804838250547114],[0.3283754561497929,53.086405538943964],[1.7711694670000782,52.48583428797007],[0.2696121416671442,50.74647492722601],[-3.4340230737523996,50.6097328391172],[-2.6654607764398683,51.61724854430291]]]},"properties":{"name":"England"},"id":"ENG"},
    {"type":"Feature","geometry":{"type":"Polygon","coordinates":[[[-7.247452903073734,55.06861884816928],[-6.270126199046532,54.09720305424429],[-6.370642394872114,52.17953201060634],[-9.66293440891312,51.511136683930474],[-10.276856404955524,52.267046946995976],[-9.78664664992922,54.3378691293158],[-7.247452903073734,55.06861884816928]]]},"properties":{"name":"Ireland"},"id":"IRL"},
    {"type":"Feature","geometry":null,"properties":{"name":"N. Ireland"},"id":"NIR"},
    {"type":"Feature","geometry":{"type":"Polygon","coordinates":[[[-2.023703526168841,55.804838250547114],[-3.0505151266024857,54.98110391177964],[-3.964439307108936,54.771068064444506],[-6.0041448808619124,56.61763322226588],[-4.989704504529879,58.628288885817824],[-3.4927863882350483,57.71266386384123],[-1.7608150140096246,57.473091725474596],[-2.023703526168841,55.804838250547114]]]},"properties":{"name":"Scotland"},"id":"SCT"},
    {"type":"Feature","geometry":{"type":"Polygon","coordinates":[[[-3.086082395894614,53.25815360160863],[-2.6654607764398683,51.61724854430291],[-4.1979461620268275,52.27908025074955],[-3.086082395894614,53.25815360160863]]]},"properties":{"name":"Wales"},"id":"WLS"}
    ]};
    

let projection = d3.geoMercator().fitExtent([[0,0], [width, height]], geojson.features);
  
var path = d3.geoPath().projection(projection);

var geoJsonPoint = {
    type: "Point",
    coordinates: [51.512884,-0.091397],
} 

let MAP_WIDTH = 1000;
let MAP_HEIGHT = 446;

function convert(lat, lon){
    var y = ((-1 * lat) + 90) * (MAP_HEIGHT / 180);
    var x = (lon + 180) * (MAP_WIDTH / 360);
    return {x:x,y:y};
}

let res = convert(51.512884,-0.091397)
console.log(res)