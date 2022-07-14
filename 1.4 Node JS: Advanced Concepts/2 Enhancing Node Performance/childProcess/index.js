const http = require("node:http");
const { fork } = require("child_process");

const hostname = "127.0.0.1";
const port = 3000;

function getTime() {
  const today = new Date();
  const time =
    today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();

  return time;
}

const server = http.createServer();

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});

// add additional listener
server.on("request", function (req, res) {
  if (req.url === "/block-server") {
    const childProcess = fork(__dirname + "/forkedChild.js"); //the first argument to fork() is the name of the js file to be run by the child process

    childProcess.send("start wait " + getTime()); //send method is used to send message to child process through IPC

    childProcess.on("message", (message) => {
      //on("message") method is used to listen for messages send by the child process
      res.setHeader("Content-Type", "text/plain");
      res.end(message + " Blocked Request!\n");
    });
  }

  if (req.url === "/fast-one") {
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/plain");
    res.end("I am unblocked now!\n");
  }
});
