# Redis Caching

https://redis.io/docs/
Redis is an open source (BSD licensed), in-memory data structure store used as a database, cache, message broker, and streaming engine. Redis provides data structures such as strings, hashes, lists, sets, sorted sets with range queries, bitmaps, hyperloglogs, geospatial indexes, and streams. Redis has built-in replication, Lua scripting, LRU eviction, transactions, and different levels of on-disk persistence, and provides high availability via Redis Sentinel and automatic partitioning with Redis Cluster.

Cache server - is an intermediary between nodejs and the database, this server will check if a query has already been sent, if so, the latest data obtained from the database will be sent, otherwise it will search the database and will store the result to have it available if the same query is executed again

And we need to make sure that any time we write some amount of data, we clear any data stored on the cache server that is related to the record that we just wrote or updated.

- You can essentially think of it as a small database that runs in your machine's memory and allows you to read and write data very, very quickly.

- Is a data store that operates only in memory.

- And that means that once it's shut down or restarted or something like that, all the data that its inside there is instantly deleted and erased.

```js script
const redis = require("redis");
const redisUrl = "redis://127.0.0.1:6379";
const client = redis.createClient(redisUrl);
client.set("hi", "there");
client.get("hi", (err, value) => console.log(value)); //'there'
client.get("hi", console.log); //null 'there'
```

# set, get String Example

```js script
app.get("/set-value", async (req, res) => {
  await client.set("key", "value");
  res.send("set OK");
});

app.get("/get-value", async (req, res) => {
  res.send(await client.get("key"));
});
```

# set, get hash String Example

```js script
app.get("/set-hash", async (req, res) => {
  await client.hSet("spanish", "red", "rojo");
  await client.hSet("spanish", "blue", "azul");

  await client.hSet("german", "red", "rot");
  await client.hSet("spanish", "blue", "blau");
  res.send("hSet OK");
});

app.get("/get-hash/:langue", async (req, res) => {
  res.send(await client.hGetAll(req.params.langue));
});
```

# set, get json String Example

```js script
app.get("/set-value-json", async (req, res) => {
  await client.set("json", JSON.stringify({ red: "rojo", blue: "azul" }));
  res.send("set-json OK");
});

app.get("/get-value-json", async (req, res) => {
  const result = await client.get("json");
  res.send({ noParsed: result, parsed: JSON.parse(result) });
});
```

# flushAll Example

```js script
app.get("/flushAll", async (req, res) => {
  await client.flushAll();
  res.send("flushAll OK");
});
```

# flushAll Example

```js script
app.get("/expValue", async (req, res) => {
  await client.setEx("expValue", 3, "this value will expire in 3 seconds");
  res.send("expValue OK");
});

app.get("/get-expValue", async (req, res) => {
  res.send(await client.get("expValue"));
});
```
