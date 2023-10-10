import { Route, Routes, useNavigate } from "react-router-dom";
import { Home } from "./pages/Home";
import { Blogs } from "./pages/Blogs";
import { NewBlog } from "./pages/Newblog";
import { Login } from "./pages/Login";
import { Signup } from "./pages/Signup";
import { useEffect } from "react";

const Router = () => {
  const navigate = useNavigate();
  const isAuthenticated = localStorage.getItem("TOKEN");
  const path = window.location.pathname;
  useEffect(() => {
    if (!isAuthenticated && path !== "/signup") {
      navigate("/login");
    }
  }, [isAuthenticated, path]);
  return (
    <Routes>
      isAuthenticated ? (
      <>
        <Route path="/" element={<Home />} />
        <Route path="/:id" element={<Blogs />} />
        <Route path="/create" element={<NewBlog />} />
      </>
      ) : (
      <>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </>
      );
    </Routes>
  );
};
export default Router;
