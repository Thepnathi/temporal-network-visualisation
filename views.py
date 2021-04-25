from flask import Flask, render_template
import overtime as ot
from graph_network_visualisation import DiTemporalGraphNetwork_Visualisation
import json

app = Flask(__name__)

@app.route("/")
def home():
    return "Main Main"

@app.route("/visualisation")
def about():
    return render_template("visualisation.html")

@app.route("/temporal")
def temporal_network():
    return render_template("dir-temporal-graph-network.html")

@app.route("/dataset")
def dataset():
    central = ot.TemporalDiGraph('CentralLine', data=ot.CsvInput('./data/central-inbound.csv'))
    visual = DiTemporalGraphNetwork_Visualisation(central)
    res = visual.parse_graph_to_json()
    return res

app.run()
