import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import BlogDetail from "./pages/BlogDetail";
import CreateBlog from "./pages/CreateBlog";
import EditBlog from "./pages/EditBlog";

const App = () => {
  return (
    <div className="app">
      <Navbar></Navbar>

      <main className="main-content">
        {/* Routes picks the one Route that matches the URL (Chapter 26) */}
        <Routes>
          <Route path="/" element={<Home></Home>}></Route>
          <Route path="/blog/:id" element={<BlogDetail></BlogDetail>}></Route>
          <Route path="/create" element={<CreateBlog></CreateBlog>}></Route>
          <Route path="/edit/:id" element={<EditBlog></EditBlog>}></Route>
        </Routes>
      </main>

      <Footer></Footer>
    </div>
  );
};

export default App;
