console.log("hello from main.js");
//Instantiation of a new dedicated worker.
const worker = new Worker("worker.js");

worker.onmessage = (msg) => {
  //A message handler is attached to the worker.
  console.log("message received from worker", msg.data);
};

//A message is passed into the worker.
worker.postMessage("message sent to worker");
console.log("hello from end of main.js");
