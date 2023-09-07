import React, { useState, useEffect } from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/HomePage";
import Register from "./pages/RegisterPage";
import Login from "./pages/LoginPage";
import EditProfilePage from "./pages/EditProfilePage";
import Course from "./pages/CoursePage";
import NotFoundPage from "./pages/NotFoundPage";
import CourseDetailPage from "./pages/CourseDetailPage";
import CoursePage from "./pages/CoursePage";
import MyCoursePage from "./pages/MyCoursePage";
import { supabase } from "./supabase/client";
export const SessionContext = React.createContext();
function App() {
  // const [token, setToken] = useState(false);
  // if (token) {
  //   sessionStorage.setItem("token", JSON.stringify(token));
  // }
  // useEffect(() => {
  //   if (sessionStorage.getItem("token")) {
  //     let data = JSON.parse(sessionStorage.getItem("token"));
  //     setToken(data);
  //   }
  // }, []);
  const [session, setSession] = useState(null);
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
    return () => subscription.unsubscribe();
  }, []);
  return (
    <BrowserRouter>
      <SessionContext.Provider value={{ session, setSession }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/editprofile" element={<EditProfilePage />} />
          <Route path="/course" element={<CoursePage />} />
<<<<<<< HEAD
          <Route path="/mycourses" element={<MyCoursePage />} />
          <Route path="/course/courseDetail/:courseId" element={<CourseDetailPage />} />
=======
          <Route path="/mycourse" element={<MyCoursePage />} />
          <Route path="/course/courseDetail" element={<CourseDetailPage />} />
>>>>>>> e3fff4305f0e89a10aa0c311367385bce34963b9
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </SessionContext.Provider>
    </BrowserRouter>
  );
}

export default App;
