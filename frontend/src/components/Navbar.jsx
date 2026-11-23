import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="navbar">
      <h2 className="logo">TechSphere</h2>
      <div className="nav-links">
        {/* NavLink changes the URL without reloading the page (Chapter 27) */}
        <NavLink to="/" end>
          Home
        </NavLink>
        <NavLink to="/create">Add New Blog</NavLink>
      </div>
    </nav>
  );
};

export default Navbar;
