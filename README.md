# Temporal Graph Network Visualisation

Currently working on a graph network slider. The slider will allow for displaying the nodes and vertices based of the availability at the given time.

## How to Use This

Dependency
The only dependency is the d3 library. I am currently using version 6 of the minified web version - https://d3js.org/d3.v6.min.js

## How To Run
This is the development guide to start the server. On the terminal ensure you are in the directory and run the command below:

```python
python -m http.server 8000
```

This will start a local server. This way we can avoid Cross-Origin issues with working with web files.

## Errors on The Browser Console
```
Unchecked runtime.lastError: Could not establish connection. Receiving end does not exist. 
```
This is likely to cause by Chrome extension. Disabling the extension will help.

## Important Documentation

The d3-force library allows us to simulate the physical force of the graph.

The d3-force README describes this as:
This module implements a velocity Verlet numerical integrator for simulating physical forces on particles. The simulation is simplified: it assumes a constant unit time step Δt = 1 for each step, and a constant unit mass m = 1 for all particles. As a result, a force F acting on a particle is equivalent to a constant acceleration a over the time interval Δt, and can be simulated simply by adding to the particle’s velocity, which is then added to the particle’s position.
