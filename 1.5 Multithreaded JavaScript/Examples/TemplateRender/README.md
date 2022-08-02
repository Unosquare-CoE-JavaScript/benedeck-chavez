# Template-render

The file **server.js** starts off by instantiating the Fastify web framework, as well as a worker pool with four workers.

Two routes have been introduced to the application.

- /main and will perform the rendering of the request in the main thread. This represents a single-threaded application.

- GET /offload, where the rendering work will be offloaded to a separate worker thread.

In a real-world application, the file **template.js** might be used for reading template files from disk and substituting values, exposing a complete list of templates. For this simple example just a single template renderer is exported and a single hard-coded template is used.

Run the following commands to run the server and then to launch a benchmark against it:

```js
# Terminal 1
 node server.js

# Terminal 2
npx autocannon -d 60 http://localhost:3000/main
npx autocannon -d 60 http://localhost:3000/offload
```
