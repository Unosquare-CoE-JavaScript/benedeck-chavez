console.log("red.js");
//Instantiate the shared worker
const worker = new SharedWorker("shared-worker.js");

//Note the worker.port property for communications
worker.port.onmessage = (event) => {
  console.log("EVENT", event.data);
};

// Prevent memory leak
window.addEventListener("beforeunload", () => {
  worker.port.postMessage("close");
});
