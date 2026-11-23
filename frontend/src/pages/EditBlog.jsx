import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const API_URL = "/api/blogs";

const categories = [
  "Artificial Intelligence",
  "Programming",
  "Technology News",
  "Software and Apps",
  "Gadgets and Reviews",
];

const EditBlog = () => {
  let params = useParams();
  let navigate = useNavigate();

  let [title, setTitle] = useState("");
  let [author, setAuthor] = useState("");
  let [category, setCategory] = useState(categories[0]);
  let [description, setDescription] = useState("");
  let [content, setContent] = useState("");
  let [loading, setLoading] = useState(true);
  let [error, setError] = useState("");

  // Load the existing post and put its values into the form fields
  useEffect(() => {
    const getBlog = async () => {
      try {
        const response = await fetch(API_URL + "/" + params.id);
        const data = await response.json();
        if (!response.ok) {
          throw new Error(data.message);
        }
        setTitle(data.title);
        setAuthor(data.author);
        setCategory(data.category);
        setDescription(data.description);
        setContent(data.content);
      } catch (err) {
        setError(err.message);
      }
      setLoading(false);
    };

    getBlog();
  }, [params.id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const updatedBlog = { title, author, category, description, content };

    try {
      const response = await fetch(API_URL + "/" + params.id, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedBlog),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message);
      }
      navigate("/"); // go back to the blog list after saving
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) {
    return <p className="message">Loading blog post...</p>;
  }

  return (
    <div className="form-page">
      <h1>Edit Blog Post</h1>

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
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default EditBlog;
