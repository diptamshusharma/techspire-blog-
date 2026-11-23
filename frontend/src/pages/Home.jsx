import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import BlogCard from "../components/BlogCard";

const API_URL = "http://localhost:5000/api/blogs";

const Home = () => {
  let [blogs, setBlogs] = useState([]); // the list of blog posts
  let [loading, setLoading] = useState(true); // true while we wait for the backend
  let [error, setError] = useState(""); // error message (empty means no error)
  let navigate = useNavigate();

  // useEffect + fetch (Chapters 35 and 36 - "not yet covered" in the guide)
  // The empty array [] at the end means: run this only once, when the page first appears.
  useEffect(() => {
    const getBlogs = async () => {
      try {
        const response = await fetch(API_URL); // ask the backend for all posts
        const data = await response.json();
        if (!response.ok) {
          throw new Error(data.message);
        }
        setBlogs(data); // saving the data in state makes React show it
      } catch (err) {
        setError("Could not load blog posts. Is the backend running? " + err.message);
      }
      setLoading(false);
    };

    getBlogs();
  }, []);

  return (
    <div>
      <section className="hero">
        <h1>Welcome to TechSphere</h1>
        <p>
          Read, write and share blog posts about AI, programming, gadgets and the latest in
          technology.
        </p>
        <button className="btn btn-primary" onClick={() => navigate("/create")}>
          Add New Blog
        </button>
      </section>

      {/* Ternaries decide what to show (Chapter 19) */}
      {loading ? (
        <p className="message">Loading blog posts...</p>
      ) : error ? (
        <p className="message error">{error}</p>
      ) : blogs.length === 0 ? (
        <p className="message">No blog posts yet. Click "Add New Blog" to write the first one!</p>
      ) : (
        <div className="blog-grid">
          {/* .map() turns each blog object into a BlogCard (Chapters 12 and 14) */}
          {blogs.map((blog) => (
            <BlogCard
              key={blog._id}
              id={blog._id}
              title={blog.title}
              author={blog.author}
              category={blog.category}
              description={blog.description}
              createdAt={blog.createdAt}
            ></BlogCard>
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;
