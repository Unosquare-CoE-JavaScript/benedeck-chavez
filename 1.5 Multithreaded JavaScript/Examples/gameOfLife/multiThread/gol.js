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
const SIZE = 1000;

const THREADS = 5; // must be a divisor of SIZE

const imageOffset = 2 * SIZE * SIZE;
const syncOffset = imageOffset + 4 * SIZE * SIZE;

const isMainThread = !!self.window;

if (isMainThread) {
  const gridCanvas = document.getElementById("gridcanvas");
  gridCanvas.height = SIZE;
  gridCanvas.width = SIZE;

  const ctx = gridCanvas.getContext("2d");
  const iterationCounter = document.getElementById("iteration");

  //The SharedArrayBuffer ends 16 bytes later than the syncOffset, since we need 4 bytes for synchronization for each of our four threads.
  const sharedMemory = new SharedArrayBuffer(
    syncOffset + // data + imageData
      THREADS * 4 // synchronization
  );
  const imageData = new ImageData(SIZE, SIZE);
  const cells = new Uint8Array(sharedMemory, 0, imageOffset);
  const sharedImageBuf = new Uint32Array(sharedMemory, imageOffset);
  const sharedImageBuf8 = new Uint8ClampedArray(
    sharedMemory,
    imageOffset,
    4 * SIZE * SIZE
  );
  for (let x = 0; x < SIZE; x++) {
    for (let y = 0; y < SIZE; y++) {
      // 50% chance of cell being alive
      const cell = Math.random() < 0.5 ? 0 : 1;
      cells[SIZE * x + y] = cell;
      sharedImageBuf[SIZE * x + y] = cell ? BLACK : WHITE;
    }
  }
  imageData.data.set(sharedImageBuf8);
  ctx.putImageData(imageData, 0, 0);
  const chunkSize = SIZE / THREADS;
  for (let i = 0; i < THREADS; i++) {
    const worker = new Worker("thread-gol.js", { name: `gol- worker-${i}` });
    worker.postMessage({
      range: [0, chunkSize * i, SIZE, chunkSize * (i + 1)],
      sharedMemory,
      i,
    });
  }
  const coordWorker = new Worker("thread-gol.js", {
    name: "gol- coordination",
  });
  coordWorker.postMessage({ coord: true, sharedMemory });
  let iteration = 0;
  coordWorker.addEventListener("message", () => {
    imageData.data.set(sharedImageBuf8);
    ctx.putImageData(imageData, 0, 0);
    iterationCounter.innerHTML = ++iteration;
    window.requestAnimationFrame(() => coordWorker.postMessage({}));
  });
} else {
  let sharedMemory;
  let sync;
  let sharedImageBuf;
  let cells;
  let nextCells;
  self.addEventListener("message", initListener);
  function initListener(msg) {
    const opts = msg.data;
    sharedMemory = opts.sharedMemory;
    sync = new Int32Array(sharedMemory, syncOffset);
    self.removeEventListener("message", initListener);
    if (opts.coord) {
      self.addEventListener("message", runCoord);
      cells = new Uint8Array(sharedMemory);
      nextCells = new Uint8Array(sharedMemory, SIZE * SIZE);
      sharedImageBuf = new Uint32Array(sharedMemory, imageOffset);
      runCoord();
    } else {
      runWorker(opts);
    }
  }
  function runWorker({ range, i }) {
    const grid = new Grid(SIZE, sharedMemory);
    while (true) {
      Atomics.wait(sync, i, 0);
      grid.iterate(...range);
      Atomics.store(sync, i, 0);
      Atomics.notify(sync, i);
    }
  }

  function runCoord() {
    for (let i = 0; i < THREADS; i++) {
      Atomics.store(sync, i, 1);
      Atomics.notify(sync, i);
    }
    for (let i = 0; i < THREADS; i++) {
      Atomics.wait(sync, i, 1);
    }
    const oldCells = cells;
    cells = nextCells;
    nextCells = oldCells;
    for (let x = 0; x < SIZE; x++) {
      for (let y = 0; y < SIZE; y++) {
        sharedImageBuf[SIZE * x + y] = cells[SIZE * x + y] ? BLACK : WHITE;
      }
    }
    self.postMessage({});
  }
}
