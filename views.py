from flask import Flask, render_template
import overtime as ot
from graph_network_visualisation import DiTemporalGraphNetwork_Visualisation
import json

app = Flask(__name__)

@app.route("/")
def home():
    return "This is Flask server hosting Overtime dataset."

@app.route("/temporal")
def temporal_network():
    return render_template("dir-temporal-graph-network.html")

@app.route("/dataset")
def dataset():
    underground = ot.TemporalDiGraph('UndergroundLine', data=ot.CsvInput('./data/mini_underground_all.csv'))
    visual = DiTemporalGraphNetwork_Visualisation(underground)
    res = visual.parse_graph_to_json()
    return res

app.run()
