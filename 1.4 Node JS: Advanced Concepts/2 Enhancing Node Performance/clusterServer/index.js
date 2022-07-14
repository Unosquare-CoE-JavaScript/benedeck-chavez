const cluster = require("node:cluster");
const http = require("node:http");
const process = require("node:process");

const hostname = "127.0.0.1";
const port = 3000;
const wait = (ms) => {
  const start = Date.now();
  while (Date.now() - start < ms) {}
};
if (cluster.isPrimary) {
  console.log(`Primary ${process.pid} is running`);

  // Fork workers.
  for (let i = 0; i < 6; i++) {
    cluster.fork();
  }

  cluster.on("exit", (worker, code, signal) => {
    console.log(`worker ${worker.process.pid} died`);
  });
} else {
  // Workers can share any TCP connection
  // In this case it is an HTTP server
  server = http.createServer();

  server.listen(port, hostname, () => {
    console.log(
      `Server running at http://${hostname}:${port}/ Worker ${process.pid}`
    );
  });

  // add additional listener
  server.on("request", function (req, res) {
    if (req.url === "/block-server") {
      console.log(`Worker ${process.pid} start block-server`);
      wait(5000);
      res.statusCode = 200;
      res.setHeader("Content-Type", "text/plain");
      res.end("Blocked Request!\n");
    }

    if (req.url === "/fast-one") {
      res.statusCode = 200;
      res.setHeader("Content-Type", "text/plain");
      res.end("I am unblocked now!\n");
    }
  });
}
