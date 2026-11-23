// A schema describes what a blog post looks like in MongoDB.
const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  category: { type: String, required: true },
  description: { type: String, required: true },
  content: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }, // filled in automatically
});

// The model is what we use in the routes to talk to the "blogs" collection
const Blog = mongoose.model("Blog", blogSchema);

module.exports = Blog;
