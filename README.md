# Temporal Graph Network Visualisation

Currently working on a graph network slider. The slider will allow for displaying the nodes and vertices based of the availability at the given time.

## How to Use This

Dependency
Requirement 
Steps 

## Features

For the visualisation tool to work. We want to pass the dataset as objects from the backend. Here are the list of parameters:

* Graph network name
* Graph network node objects
* Graph network link objects

London Underground as an example
https://en.wikipedia.org/wiki/London_Underground
Ideally we want the connections to be different colour based on the lines.

* Dynamic window size - We will need to consider about the dynamic width and height of the graph window
* Dynamic node circle and text size - Consider the size of the nodes and vertices depending on how large the graph is going to be
* Dynamic vertex size
* Dynamic time slider 
* Extra add zoom
* Extra add circle to each node
* Add colour field in the dataset. Draw each network by different colours

## D3 Graph Network Examples

Bidirected graph

https://observablehq.com/@d3/mobile-patent-suits?collection=@d3/d3-force

Force Directed Graph - With Drag

https://observablehq.com/@d3/force-directed-graph

## How To Run
This is the development guide to start the server. On the terminal ensure you are in the directory and run the command below:

''' python
python -m http.server 8000
'''

This will start a local server. This way we can avoid Cross-Origin issues with working with web files.

## Errors on The Browser Console
'''
Unchecked runtime.lastError: Could not establish connection. Receiving end does not exist. 
'''
This is likely to cause by Chrome extension. Disabling the extension will help.

## Important Documentation


The d3-force library allows us to simulate the physical force of the graph.

The d3-force README describes this as:
This module implements a velocity Verlet numerical integrator for simulating physical forces on particles. The simulation is simplified: it assumes a constant unit time step Δt = 1 for each step, and a constant unit mass m = 1 for all particles. As a result, a force F acting on a particle is equivalent to a constant acceleration a over the time interval Δt, and can be simulated simply by adding to the particle’s velocity, which is then added to the particle’s position.

https://github.com/d3/d3-force/blob/master/README.md

### Learning D3.js

https://www.d3indepth.com/
