import React from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/HomePage";
import Register from "./pages/user/RegisterPage";
import Login from "./pages/user/LoginPage";
import EditProfilePage from "./pages/user/EditProfilePage";
import NotFoundPage from "./pages/NotFoundPage";
import CourseDetailPage from "./pages/user/CourseDetailPage";
import CoursePage from "./pages/user/CoursePage";
import MyCoursePage from "./pages/user/MyCoursePage";
import CourseLearningPage from "./pages/user/CourseLearningPage";
import { useAuth } from "./context/authentication";
import DesireCoursePage from "./pages/user/DesireCoursePage";
import CourseListPage from "./pages/admin/CourseList";
import AddCoursePage from "./pages/admin/AddCoursePage";
import AddLessonPage from "./pages/admin/AddLessonPage";
import AdminLoginPage from "./pages/admin/AdminLoginPage";

// export const SessionContext = React.createContext();

function App() {
  const auth = useAuth();
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/editprofile" element={<EditProfilePage />} />
      <Route path="/mydesirecourses" element={<DesireCoursePage />} />
      <Route path="/course" element={<CoursePage />} />
      {auth.isAuthenicated ? (
        <Route path="/mycourses" element={<MyCoursePage />} />
      ) : (
        ""
      )}
      <Route
        path="/courselearning/:courseId"
        element={<CourseLearningPage />}
      />
      <Route
        path="/course/courseDetail/:courseId"
        element={<CourseDetailPage />}
      />
      AddLessonPage
      <Route path="/admin/login" element={<AdminLoginPage />} />
      <Route path="/admin/courselist" element={<CourseListPage />} />
      <Route path="/admin/addcourse" element={<AddCoursePage />} />
      <Route path="/admin/addlesson" element={<AddLessonPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default App;
