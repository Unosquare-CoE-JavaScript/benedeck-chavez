const { Worker, isMainThread, workerData } = require("worker_threads");
const assert = require("assert");
const Mutex = require("./mutex");
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
  //Before this line, everything’s the same as when we weren’t using the mutex.
  //Now, we’ll initialize one, using the fifth element of our Int32Array as our lock data.
  const mutex = new Mutex(sharedInts, 4);
  mutex.exec(() => {
    //Inside the function passed to exec(), we’re in our critical section,
    // which is protected by the lock. This means we don’t need atomic operations to read or manipulate the array.
    //Instead, we can just operate on it like any other TypedArray.
    const a = sharedInts[i];
    for (let j = 0; j < 1_000_000; j++) {}
    const b = sharedInts[3];
    sharedInts[3] = a * b;
    assert.strictEqual(sharedInts[3], a * b);
  });
}
