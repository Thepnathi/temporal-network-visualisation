# Temporal Graph Network Visualisation

Currently working on a graph network slider. The slider will allow for displaying the nodes and vertices based of the availability at the given time.

# D3 Graph Network Examples

Bidirected graph

https://observablehq.com/@d3/mobile-patent-suits?collection=@d3/d3-force

Force Directed Graph - With Drag

https://observablehq.com/@d3/force-directed-graph

## Important Documentation


The d3-force library allows us to simulate the physical force of the graph.

The d3-force README describes this as:
This module implements a velocity Verlet numerical integrator for simulating physical forces on particles. The simulation is simplified: it assumes a constant unit time step Δt = 1 for each step, and a constant unit mass m = 1 for all particles. As a result, a force F acting on a particle is equivalent to a constant acceleration a over the time interval Δt, and can be simulated simply by adding to the particle’s velocity, which is then added to the particle’s position.

https://github.com/d3/d3-force/blob/master/README.md