const http = require("node:http");

const hostname = "127.0.0.1";
const port = 3000;

const wait = (ms) => {
  const start = Date.now();
  while (Date.now() - start < ms) {}
};

const server = http.createServer();

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});

// add additional listener
server.on("request", function (req, res) {
  if (req.url === "/block-server") {
    res.statusCode = 200;
    wait(5000);
    res.setHeader("Content-Type", "text/plain");
    res.end("Blocked Request!\n");
  }

  if (req.url === "/fast-one") {
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/plain");
    res.end("I am unblocked now!\n");
  }
});
