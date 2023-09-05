import React , {useState, useEffect} from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/HomePage";
import Register from "./pages/RegisterPage";
import Login from "./pages/LoginPage";
import EditProfilePage from "./pages/EditProfilePage";
import Course from "./pages/CoursePage";
import NotFoundPage from "./pages/NotFoundPage";

function App() {
  const [token, setToken] = useState(false);
  if (token) {
    sessionStorage.setItem("token", JSON.stringify(token));
  }
  useEffect(() => {
    if (sessionStorage.getItem("token")) {
      let data = JSON.parse(sessionStorage.getItem("token"));
      setToken(data);
    }
  }, []);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login setToken={setToken} />} />
        <Route path="/editprofile" element={<EditProfilePage />} />
        <Route path="/course" element={<Course />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
