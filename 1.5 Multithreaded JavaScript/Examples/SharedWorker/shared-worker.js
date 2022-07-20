//Random ID for debugging
const ID = Math.floor(Math.random() * 999999);
console.log("shared-worker.js", ID);

//Singleton list of ports
const ports = new Set();

//Connection event handler
self.onconnect = (event) => {
  const port = event.ports[0];
  ports.add(port);
  console.log("CONN", ID, ports.size);

  //Callback when a new message is received
  port.onmessage = (event) => {
    if (event.data === "close") {
      ports.delete(port);
      return;
    }
    console.log("MESSAGE", ID, event.data);

    //Messages are dispatched to each window
    for (let p of ports) {
      p.postMessage([ID, event.data]);
    }
  };
};
