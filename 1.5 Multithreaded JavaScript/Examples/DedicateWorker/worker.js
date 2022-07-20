console.log("hello from worker.js");

//The self identifier is an alias for globalThis inside a web worker
// where the otherwise familiar window isn’t available.

self.onmessage = (msg) => {
  console.log("message from main", msg.data);
  postMessage("message sent from worker");
};
