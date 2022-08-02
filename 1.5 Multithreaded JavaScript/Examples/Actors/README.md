The net.connect() method creates a connection to the upstream port and hostname, which represents the server process, logging a message once the connection succeeds. When the server sends a message to this actor, it triggers the data event, passing in a buffer instance as the raw_data argument. This data, containing a JSON payload, is then parsed.

The actor process then invokes one of its workers, calling the requested method and passing in the arguments. Once the worker/actor is finished, the data is then sent back to the server instance. The same message ID is preserved using the id property. This value must be provided because a given actor process can receive multiple message requests at the same time and the main server process needs to know which reply correlates with which request. The returned value is also provided in the message. The process ID is also provided as metadata in the response assigned to pid so that you can visualize which program is calculating what data.

First, run the server, providing a hostname and port to use for the HTTP server, followed by a hostname and port to use for the TCP server.

```js
node server.js 127.0.0.1:8000 127.0.0.1:9000

# web: http://127.0.0.1:8000

# actor: tcp://127.0.0.1:9000
```

Next, run an actor process and give it the hostname and port for the server instance. You can do that by running the following command:

```js
node actor.js 127.0.0.1:9000
```

You should see a message printed from both the server and the worker process that a connection was established. Next, run the curl command again in a separate terminal window:

```js
curl http://localhost:8000/99999 --output -
{"id":2,"value":21081376.519967034,"pid":10049}
```
