import { useState, useEffect } from "react";
import { useParams, useNavigate, NavLink } from "react-router-dom";

const API_URL = "http://localhost:5000/api/blogs";

const BlogDetail = () => {
  let params = useParams(); // params.id comes from the route path /blog/:id (Chapter 30)
  let navigate = useNavigate();
  let [blog, setBlog] = useState(null); // null until the post is loaded
  let [loading, setLoading] = useState(true);
  let [error, setError] = useState("");

  // Load the single blog post when the page opens (useEffect + fetch)
  useEffect(() => {
    const getBlog = async () => {
      try {
        const response = await fetch(API_URL + "/" + params.id);
        const data = await response.json();
        if (!response.ok) {
          throw new Error(data.message);
        }
        setBlog(data);
      } catch (err) {
        setError(err.message);
      }
      setLoading(false);
    };

    getBlog();
  }, [params.id]);

  const handleDelete = async () => {
    // window.confirm shows a simple OK / Cancel box
    let sure = window.confirm("Are you sure you want to delete this blog post?");
    if (!sure) {
      return; // the user pressed Cancel
    }

    try {
      const response = await fetch(API_URL + "/" + params.id, { method: "DELETE" });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message);
      }
      navigate("/"); // go back to the blog list after deleting (Chapter 28)
    } catch (err) {
      setError("Could not delete: " + err.message);
    }
  };

  if (loading) {
    return <p className="message">Loading blog post...</p>;
  }

  return (
    <div className="detail">
      <NavLink to="/" className="back-link">
        &larr; Back to Home
      </NavLink>

      {error ? <p className="message error">{error}</p> : null}

      {blog ? (
        <div>
          <span className="category-label">{blog.category}</span>
          <h1>{blog.title}</h1>
          <p className="blog-meta">
            By {blog.author} | {new Date(blog.createdAt).toLocaleDateString()}
          </p>
          <p className="detail-description">{blog.description}</p>
          <div className="detail-content">{blog.content}</div>

          <div className="button-row">
            <button className="btn btn-primary" onClick={() => navigate("/edit/" + blog._id)}>
              Edit
            </button>
            <button className="btn btn-danger" onClick={handleDelete}>
              Delete
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default BlogDetail;
