const mongoose = require("mongoose");
const Blog = mongoose.model("Blog");
const clearHash = require("../middleware/cleanCache");
module.exports = (app) => {
  app.get("/api/blogs/:userId/:id", async (req, res) => {
    const blog = await Blog.findOne({
      _user: req.params.userId,
      _id: req.params.id,
    }).cache({ key: req.params.userId });

    res.send(blog);
  });

  app.get("/api/blogs/:userId", async (req, res) => {
    const blogs = await Blog.find({ _user: req.params.userId }).cache({
      key: req.params.userId,
    });

    res.send(blogs);
  });

  app.post("/api/blogs", clearHash, async (req, res) => {
    const { title, content, userId } = req.body;

    const blog = new Blog({
      title,
      content,
      _user: userId,
    });

    try {
      await blog.save();
      res.send(blog);
    } catch (err) {
      res.send(400, err);
    }
  });
};
