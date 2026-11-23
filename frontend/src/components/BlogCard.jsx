import { NavLink } from "react-router-dom";

// Props are destructured in the parameter list (Chapter 13)
// The parent (Home.jsx) sends the data, this component only displays it
const BlogCard = ({ id, title, author, category, description, createdAt }) => {
  return (
    <div className="blog-card">
      <span className="category-label">{category}</span>
      <h3>{title}</h3>
      <p className="blog-meta">
        By {author} | {new Date(createdAt).toLocaleDateString()}
      </p>
      <p>{description}</p>
      {/* The id goes into the URL, for example /blog/65f1a... */}
      <NavLink to={"/blog/" + id} className="read-more">
        Read More
      </NavLink>
    </div>
  );
};

export default BlogCard;
