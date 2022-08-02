class Grid {
  constructor(size, buffer, paint = () => {}) {
    const sizeSquared = size * size;
    this.buffer = buffer;
    this.size = size;
    this.cells = new Uint8Array(this.buffer, 0, sizeSquared);
    this.nextCells = new Uint8Array(this.buffer, sizeSquared, sizeSquared);
    this.paint = paint;
  }

  getCell(x, y) {
    const size = this.size;
    const sizeM1 = size - 1;
    x = x < 0 ? sizeM1 : x > sizeM1 ? 0 : x;
    y = y < 0 ? sizeM1 : y > sizeM1 ? 0 : y;
    return this.cells[size * x + y];
  }

  //The set of neighbors coordinates are used in the algorithm to look at neighboring cells in eight directions.
  //We’ll keep this array handy because we’ll need to use it for every cell.
  static NEIGHBORS = [
    [-1, -1],
    [-1, 0],
    [-1, 1],
    [0, -1],
    [0, 1],
    [1, -1],
    [1, 0],
    [1, 1],
  ];
  iterate(minX, minY, maxX, maxY) {
    const size = this.size;

    for (let x = minX; x < maxX; x++) {
      for (let y = minY; y < maxY; y++) {
        const cell = this.cells[size * x + y];
        let alive = 0;
        for (const [i, j] of Grid.NEIGHBORS) {
          alive += this.getCell(x + i, y + j);
        }
        const newCell = alive === 3 || (cell && alive === 2) ? 1 : 0;
        this.nextCells[size * x + y] = newCell;
        this.paint(newCell, x, y);
      }
    }
    const cells = this.nextCells;
    this.nextCells = this.cells;
    this.cells = cells;
  }
}

/*The iterate() method takes in a range to operate on in the form
of minimum X and Y values (inclusive) and maximum X and Y values (exclusive). 
For our single-threaded example, it will always be (0, 0, size, size), 
but putting a range here will make it easier to split up when we move to a multithreaded implementation, 
where we’ll use these X and Y boundaries to divide the whole grid into sections for each thread to work on. */

// We assign some constants for the black-and-white pixels we’ll draw to the screen and set the size (actually, the width) of the grid we’re using.
const BLACK = 0xff000000;
const WHITE = 0xffffffff;
const SIZE = 10;

const iterationCounter = document.getElementById("iteration"); //We grab an iteration counter and canvas element from the HTML
const gridCanvas = document.getElementById("gridcanvas");
gridCanvas.height = SIZE;
gridCanvas.width = SIZE;
const ctx = gridCanvas.getContext("2d");
const data = ctx.createImageData(SIZE, SIZE); // We’ll use an ImageData instance to modify the pixels on the canvas directly, via a Uint32Array.
const buf = new Uint32Array(data.data.buffer);

function paint(cell, x, y) {
  // This paint() function will be used both in initialization of the grid and on each iteration
  // to modify the buffer backing the ImageData instance. If a cell is alive, it’ll paint it black.
  // Otherwise, it’ll paint it white.
  buf[SIZE * x + y] = cell ? BLACK : WHITE;
}

// Now we create the grid instance, passing in the size, an ArrayBuffer big enough to hold both cells and nextCells, and our paint() function.
const grid = new Grid(SIZE, new ArrayBuffer(2 * SIZE * SIZE), paint);
for (let x = 0; x < SIZE; x++) {
  // To initialize the grid, we’ll loop over all the cells and assign each one a random dead or alive state.
  // At the same time, we’ll pass the result to our paint() function to ensure that the image is updated.
  for (let y = 0; y < SIZE; y++) {
    const cell = Math.random() < 0.5 ? 0 : 1;
    grid.cells[SIZE * x + y] = cell;
    paint(cell, x, y);
  }
}

//Whenever an ImageData is modified, we need to add it back to the canvas, so we’re doing it here now that we’re done initializing.
ctx.putImageData(data, 0, 0);

let iteration = 0;
function iterate(...args) {
  grid.iterate(...args);
  ctx.putImageData(data, 0, 0);
  iterationCounter.innerHTML = ++iteration;
  window.requestAnimationFrame(() => iterate(...args));
}

iterate(0, 0, SIZE, SIZE);
