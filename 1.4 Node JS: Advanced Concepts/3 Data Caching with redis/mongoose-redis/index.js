const bodyParser = require("body-parser");
const express = require("express");
const mongoose = require("mongoose");

const app = express();
app.use(bodyParser.json());

require("./services/cache");
require("./models/User");
require("./models/Blog");

require("./routes/blogRoutes")(app);

mongoose.connect(
  "mongodb://benedeckUnosquare:5sahhX3rlTVloCZS@cluster0-shard-00-00.fm1vg.mongodb.net:27017,cluster0-shard-00-01.fm1vg.mongodb.net:27017,cluster0-shard-00-02.fm1vg.mongodb.net:27017/blog-dev?ssl=true&replicaSet=atlas-btoh36-shard-0&authSource=admin&retryWrites=true&w=majority"
);

app.listen(3000);
