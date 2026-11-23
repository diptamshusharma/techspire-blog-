// All blog CRUD routes live in this file.
// Every route starts with /api/blogs (set in server.js).
const express = require("express");
const Blog = require("../models/Blog");

const router = express.Router();

// Fail fast instead of waiting for Mongoose's 10-second query buffer.
router.use((req, res, next) => {
  if (Blog.db.readyState !== 1) {
    return res.status(503).json({
      message: "Database is not connected. Check the backend MongoDB configuration.",
    });
  }
  next();
});

// READ ALL: GET /api/blogs
// Returns every blog post, newest first
router.get("/", async (req, res) => {
  try {
    const blogs = await Blog.find().sort({ createdAt: -1 });
    res.json(blogs);
  } catch (error) {
    res.status(500).json({ message: "Could not get blog posts: " + error.message });
  }
});

// READ ONE: GET /api/blogs/:id
// Returns a single blog post that matches the id in the URL
router.get("/:id", async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) {
      return res.status(404).json({ message: "Blog post not found" });
    }
    res.json(blog);
  } catch (error) {
    res.status(500).json({ message: "Could not get the blog post: " + error.message });
  }
});

// CREATE: POST /api/blogs
// Saves a new blog post using the data in the request body
router.post("/", async (req, res) => {
  try {
    const newBlog = await Blog.create(req.body);
    res.status(201).json(newBlog);
  } catch (error) {
    // 400 = the data sent by the user was not valid (for example a missing title)
    res.status(400).json({ message: "Could not create the blog post: " + error.message });
  }
});

// UPDATE: PUT /api/blogs/:id
// Changes an existing blog post
router.put("/:id", async (req, res) => {
  try {
    // new: true  -> return the updated post
    // runValidators: true -> keep the "required" rules when updating
    const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!updatedBlog) {
      return res.status(404).json({ message: "Blog post not found" });
    }
    res.json(updatedBlog);
  } catch (error) {
    res.status(400).json({ message: "Could not update the blog post: " + error.message });
  }
});

// DELETE: DELETE /api/blogs/:id
// Removes a blog post from the database
router.delete("/:id", async (req, res) => {
  try {
    const deletedBlog = await Blog.findByIdAndDelete(req.params.id);
    if (!deletedBlog) {
      return res.status(404).json({ message: "Blog post not found" });
    }
    res.json({ message: "Blog post deleted" });
  } catch (error) {
    res.status(500).json({ message: "Could not delete the blog post: " + error.message });
  }
});

module.exports = router;
