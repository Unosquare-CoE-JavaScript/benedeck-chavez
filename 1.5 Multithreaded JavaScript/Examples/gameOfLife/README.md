The simulation works iteratively, and on each iteration, the following algorithm is performed for each cell.

1. If there are exactly 3 neighbors alive, the new cell state is alive (regardless of how it started).
2. If the cell is alive and exactly 2 neighbors are alive, the cell remains alive.
3. In all other cases, the new cell state is dead.

The grid is a square. This is a slight simplification so that there’s one less dimension to worry about.
The grid wraps around itself like a torus. This means that when we’re at an edge, and we need to evaluate a neighboring cell outside the bounds, we’ll look at the cell at the other end.

![Alt Text](../../../images/Multithreaded/NodeJS/gol-SingleThread.gif)
