process.on("message", (message) => {
  //child process is listening for messages by the parent process
  console.log(message);
  wait(5000);
  process.send("End wait");
  process.exit(); // make sure to use exit() to prevent orphaned processes
});

const wait = (ms) => {
  const start = Date.now();
  while (Date.now() - start < ms) {}
};
