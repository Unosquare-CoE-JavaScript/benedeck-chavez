const mongoose = require("mongoose");
const redis = require("redis");
const keys = require("../config/keys");
const client = redis.createClient(keys.redisURL);
client.connect();
const exec = mongoose.Query.prototype.exec;

mongoose.Query.prototype.cache = function (options = {}) {
  this.useCache = true;
  this.hashKey = JSON.stringify(options.key || "");

  return this;
};

mongoose.Query.prototype.exec = async function () {
  if (!this.useCache) {
    return await exec.apply(this, arguments);
  }

  const key = JSON.stringify(
    Object.assign({}, this.getQuery(), {
      collection: this.mongooseCollection.name,
    })
  );

  const cacheValue = await client.hGet(this.hashKey, key);

  if (cacheValue) {
    console.log("Return from Redis");
    const doc = JSON.parse(cacheValue);
    return Array.isArray(doc)
      ? doc.map((d) => new this.model(d))
      : new this.model(doc);
  }

  const result = await exec.apply(this, arguments);

  await client.hSet(this.hashKey, key, JSON.stringify(result));
  await client.expire(this.hashKey, 60);
  console.log("Return from DB");
  return result;
};

async function clearHash(hashKey) {
  try {
    await client.del(JSON.stringify(hashKey));
  } catch (error) {}
}

Object.assign(module.exports, { clearHash });
