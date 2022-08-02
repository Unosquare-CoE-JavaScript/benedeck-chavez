//When crossOriginIsolated is true, then SharedArrayBuffer can be used.
if (!crossOriginIsolated) {
  throw new Error("Cannot use SharedArrayBuffer");
}
const worker = new Worker("worker.js");
//Instantiates a 1 KB buffer.
const buffer = new SharedArrayBuffer(1024);
//A view into the buffer is created.
const view = new Uint8Array(buffer);
console.log("now", view[0]);
worker.postMessage(buffer);
setTimeout(() => {
  console.log("later", view[0]);
  //A modified property is read.
  console.log("prop", buffer.foo);
}, 500);
