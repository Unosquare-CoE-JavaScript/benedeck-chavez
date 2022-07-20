const redis = require("redis");
const bodyParser = require("body-parser");
const express = require("express");

const app = express();
const client = redis.createClient();

app.use(bodyParser.json());

client.on("error", (err) => console.log("Redis Client Error", err));

client.on("connect", function () {
  console.log("Connected!");
});

client.connect();

app.get("/set-value", async (req, res) => {
  await client.set("key", "value");
  res.send("set OK");
});

app.get("/get-value", async (req, res) => {
  res.send(await client.get("key"));
});

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

app.get("/set-value-json", async (req, res) => {
  await client.set("json", JSON.stringify({ red: "rojo", blue: "azul" }));
  res.send("set-json OK");
});

app.get("/get-value-json", async (req, res) => {
  const result = await client.get("json");
  res.send({ noParsed: result, parsed: JSON.parse(result) });
});

app.get("/flushAll", async (req, res) => {
  await client.flushAll();
  res.send("flushAll OK");
});

app.get("/expValue", async (req, res) => {
  await client.setEx("expValue", 3, "this value will expire in 3 seconds");
  res.send("expValue OK");
});

app.get("/get-expValue", async (req, res) => {
  res.send(await client.get("expValue"));
});

app.listen(3000);
