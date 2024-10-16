import "./App.css";
import Header from "./Components/Header";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Posts from "./Screens/Posts";
import NotFound from "./Screens/NotFound";
import Login from "./Screens/Login";
import Register from "./Screens/Register";
import CreatePost from "./Screens/CreatePost";
import Statistics from "./Screens/Statistics";
import ViewBlog from "./Screens/ViewBlog";
import { ThemeProvider } from "./Contexts/ThemeContext";
import RegisterForm from "./Screens/RegisterForm";
import Home from "./Screens/Home";
import PrivateRoute from "./Contexts/PrivateRoute";
import { ToastProvider } from "./Contexts/ToastContext";
import Profile from "./Screens/Profile";
import BlogPosts from "./Screens/BlogPost";
import BlogPostView from "./Screens/BlogPostView";
function App() {
  return (
    <ThemeProvider>
      <ToastProvider>
        <BrowserRouter>
          <HeaderCondition />
          <Routes >
            <Route path="/" element={<Home />} />
            <Route
              path="/Posts"
              element={
                <PrivateRoute>
                  <Posts />
                </PrivateRoute>
              }
            />
            <Route path="/Login" element={<Login />} />
            <Route path="/Register" element={<Register />} />
            <Route path="/RegisterForm" element={<RegisterForm />} />
            <Route
              path="/NewPost"
              element={
                <PrivateRoute>
                  <CreatePost />
                </PrivateRoute>
              }
            />
            <Route
              path="/Statistics"
              element={
                <PrivateRoute>
                  <Statistics />
                </PrivateRoute>
              }
            />
            <Route
              path="/ViewBlog"
              element={
                // <PrivateRoute>
                  <BlogPosts />
                // </PrivateRoute>
              }
            />
            
            <Route
              path="/Profile"
              element={
                // <PrivateRoute>
                  <Profile />
                // </PrivateRoute>
              }
            />
            {/* <Route
              path="/BlogPosts"
              element={
                // <PrivateRoute>
                  <BlogPosts />
                // </PrivateRoute>
              }
            /> */}
            <Route
              path="/BlogPostView"
              element={
                // <PrivateRoute>
                  <BlogPostView />
                // </PrivateRoute>
              }
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </ToastProvider>
    </ThemeProvider>
  );
}


const HeaderCondition = () => {
  const location = useLocation();

  if (
    location.pathname === "/" ||
    location.pathname === "/Posts" ||
    location.pathname === "/NewPost" ||
    location.pathname === "/Statistics" ||
    location.pathname === "/ViewBlog" ||
    location.pathname === "/Profile" ||
    location.pathname === "/Home" ||
    location.pathname === "/BlogPostView"||
    location.pathname === "/BlogPosts"

  ) {
    return <Header />;
  }
  return null;
};

export default App;
