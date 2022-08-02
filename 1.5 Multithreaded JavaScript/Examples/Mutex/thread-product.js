const { Worker, isMainThread, workerData } = require("worker_threads");
const assert = require("assert");
if (isMainThread) {
  //We’ll be using three threads and an Int32Array to hold the data, so we need it big
  //enough to hold three 32-bit integers, plus a fourth to be the shared multiplier/result.

  const shared = new SharedArrayBuffer(4 * 4);
  const sharedInts = new Int32Array(shared);
  sharedInts.set([2, 3, 5, 7]);
  for (let i = 0; i < 3; i++) {
    new Worker(__filename, { workerData: { i, shared } });
  }
} else {
  const { i, shared } = workerData;
  const sharedInts = new Int32Array(shared);
  const a = Atomics.load(sharedInts, i);

  for (let j = 0; j < 1_000_000; j++) {}
  const b = Atomics.load(sharedInts, 3);
  Atomics.store(sharedInts, 3, a * b);

  //Here, we’re checking our work. In a real-world application, there likely would be no check here,
  // but this simulates depending on the result to perform other actions, which may happen later on in the program.

  assert.strictEqual(Atomics.load(sharedInts, 3), a * b);
}
