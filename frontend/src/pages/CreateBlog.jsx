import { useState } from "react";
import { useNavigate } from "react-router-dom";

const API_URL = "http://localhost:5000/api/blogs";

// The categories shown in the dropdown
const categories = [
  "Artificial Intelligence",
  "Programming",
  "Technology News",
  "Software and Apps",
  "Gadgets and Reviews",
];

const CreateBlog = () => {
  // One useState per form field (Chapter 20)
  let [title, setTitle] = useState("");
  let [author, setAuthor] = useState("");
  let [category, setCategory] = useState(categories[0]);
  let [description, setDescription] = useState("");
  let [content, setContent] = useState("");
  let [error, setError] = useState("");
  let navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault(); // stop the page from reloading (Chapter 24)
    setError("");

    // Put the form values into one object to send to the backend
    const newBlog = { title, author, category, description, content };

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newBlog), // turn the object into JSON text
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message);
      }

      // Reset the form fields (they visibly clear because the inputs are controlled)
      setTitle("");
      setAuthor("");
      setCategory(categories[0]);
      setDescription("");
      setContent("");

      navigate("/"); // go back to the blog list
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="form-page">
      <h1>Create a New Blog Post</h1>

      {error ? <p className="message error">{error}</p> : null}

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Blog Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          ></input>
        </div>

        <div className="form-group">
          <label>Author Name</label>
          <input
            type="text"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            required
          ></input>
        </div>

        <div className="form-group">
          <label>Category</label>
          <select value={category} onChange={(e) => setCategory(e.target.value)}>
            {categories.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label>Short Description</label>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          ></input>
        </div>

        <div className="form-group">
          <label>Full Blog Content</label>
          <textarea
            rows="10"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          ></textarea>
        </div>

        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};

export default CreateBlog;
