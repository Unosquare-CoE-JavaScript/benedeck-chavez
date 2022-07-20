# Event Loop

When Node.js starts, it initializes the event loop, processes the provided input script which may make async API calls, schedule timers, then begins processing the event loop.

- Event loop is an endless loop, which waits for tasks, executes them and then sleeps until it receives more tasks.
- The event loop executes tasks from the event queue only when the call stack is empty i.e. there is no ongoing task.
- The event loop allows us to use callbacks and promises.
- The event loop executes the tasks starting from the oldest first.

```js script
const pendingTimers = [];
const pendingOSTasks = [];
const pendingOperations = [];

// New timers, tasks, operations are recorded from myFile running
myFile.runContents();

function shouldContinue() {
  // Check one: Any pending setTimeout, setInterval, setImmediate?
  // Check two: Any pending OS tasks? (Like server listening to port)
  // Check three: Any pending long running operations? (Like fs module)
  return (
    pendingTimers.length || pendingOSTasks.length || pendingOperations.length
  );
}

// Entire body executes in one 'tick'
while (shouldContinue()) {
  // 1) Node looks at pendingTimers and sees if any functions
  // are ready to be called.  setTimeout, setInterval
  // 2) Node looks at pendingOSTasks and pendingOperations
  // and calls relevant callbacks
  // 3) Pause execution. Continue when...
  //  - a new pendingOSTask is done
  //  - a new pendingOperation is done
  //  - a timer is about to complete
  // 4) Look at pendingTimers. Call any setImmediate
  // 5) Handle any 'close' events
}

// exit back to terminal
```

Node.js uses two kinds of threads: a main thread handled by the event loop and several auxiliary threads in the worker pool.

The event loop is the mechanism that takes callbacks (functions) and registers them to be executed at some point in the future. It operates in the same thread as the proper JavaScript code. **When a JavaScript operation blocks the thread, the event loop is blocked as well.**

```js script
const http = require("node:http");

const hostname = "127.0.0.1";
const port = 3000;

const wait = (ms) => {
  const start = Date.now();
  while (Date.now() - start < ms) {}
};

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  wait(5000);
  res.setHeader("Content-Type", "text/plain");
  res.end("Hello, World!\n");
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});

/*
ab -c 4 -n 4 http://127.0.0.1:3000/

Concurrency Level:      4
Time taken for tests:   8.010 seconds
Complete requests:      4
Failed requests:        0
Total transferred:      460 bytes
HTML transferred:       56 bytes
Requests per second:    0.50 [#/sec] (mean)
Time per request:       8010.268 [ms] (mean)
Time per request:       2002.567 [ms] (mean, across all concurrent requests)
Transfer rate:          0.06 [Kbytes/sec] received
*/
```

If a thread is taking a long time to execute a callback (Event Loop) or a task (Worker), we call it "blocked". While a thread is blocked working on behalf of one client, it cannot handle requests from any other clients.

- Observation 1: do not confuse blocking code and infinite loop, a blocking code is generally a long operation (more than a few milliseconds).
- Observation 2: try to differentiate long operations and operations that will slow down or block the Event-loop. Some long operations can be handled asynchronously without disturbing your app (like database access).
- Observation 3: long response time of your application does not necessarily mean you have a blocking task (it can be related to long DB access, external API calls, etc).

# Libuv thread pool

This library is also used, together with the back logic of Node, to manage a special thread pool called the libuv thread pool.

And this thread pool has a size limit, by default, Node.js has access to only 4 threads, so you can parallelize only 4 operations at the same time.
This value can be customized with the variable UV_THREADPOOL_SIZE.
In any case, every operation that uses the thread pool behind the scenes is a potential performance bottleneck.

When the thread pool completes a task, a callback function is called which handles the error(if any) or does some other operation. This callback function is sent to the event queue. When the call stack is empty, the event goes through the event queue and sends the callback to the call stack.

```js script
process.env.UV_THREADPOOL_SIZE = 4; //Here you can change the size of libuv thread pool

const crypto = require("crypto"); //crypto module use libuv thread pool
const start = Date.now();

function cryptoEnumConstruction(crypto, start) {
  return (num) =>
    crypto.pbkdf2("a", "b", 100000, 512, "sha512", () => {
      console.log(num, ":", Date.now() - start);
    });
}

let cryptoEnum = cryptoEnumConstruction(crypto, start);

// First 4 in the libuv thread pool
// This 4 will have almost the same time when finish
cryptoEnum(1); // Ex. 434
cryptoEnum(2); // Ex. 444
cryptoEnum(3); // Ex. 444
cryptoEnum(4); // Ex. 444
// You will notice a pause before the other 4 complete
// Second 4 in the libuv thread pool
// This 4 will have almost the same time when finish
cryptoEnum(5); // Ex. 860
cryptoEnum(6); // Ex. 861
cryptoEnum(7); // Ex. 861
cryptoEnum(8); // Ex. 861
```

#### There are operations that does use a different thread like making a http request from Node JS to other site, this thread is manage by the SO of the machine

```js script
const https = require("https");

const start = Date.now();

function doRequest() {
  https
    .request("https://www.google.com", (res) => {
      res.on("data", () => {});
      res.on("end", () => {
        console.log(Date.now() - start);
      });
    })
    .end();
}

doRequest(); // 213
doRequest(); // 228
doRequest(); // 234
doRequest(); // 240
//There is don't visible pause like in libuv thread pool
doRequest(); // 241
```
