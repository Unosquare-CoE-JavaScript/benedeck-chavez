self.onmessage = ({ data: { buffer, name } }) => {
  postMessage("ready"); //Post message back to parent thread to signal readiness.
  const view = new Int32Array(buffer);
  console.log(`Worker ${name} started`);
  const result = Atomics.wait(view, 0, 0); //Wait for notification on the 0th entry.
  console.log(`Worker ${name} awoken with ${result}`);
};
