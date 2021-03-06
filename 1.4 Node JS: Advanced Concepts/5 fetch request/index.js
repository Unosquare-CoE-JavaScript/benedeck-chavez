// POST a new blog
fetch("/api/blogs", {
  method: "POST",
  credentials: "same-origin",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    title: "My Title",
    content: "My Content",
  }),
});

// GET blogs
fetch("/api/blogs", {
  method: "GET",
  credentials: "same-origin",
  headers: {
    "Content-Type": "application/json",
  },
});
