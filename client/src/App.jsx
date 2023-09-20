import React from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/HomePage";
import Register from "./pages/RegisterPage";
import Login from "./pages/LoginPage";
import EditProfilePage from "./pages/EditProfilePage";
import NotFoundPage from "./pages/NotFoundPage";
import CourseDetailPage from "./pages/CourseDetailPage";
import CoursePage from "./pages/CoursePage";
import MyCoursePage from "./pages/MyCoursePage";
import CourseLearningPage from "./pages/CourseLearningPage";
import { useAuth } from "./context/authentication";
import DesireCoursePage from "./pages/DesireCoursePage";
import CourseListPage from "./pages/CourseList";
import AddCoursePage from "./pages/AddCoursePage";
import AddLessonPage from "./pages/AddLessonPage";

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
      <Route path="/courselist" element={<CourseListPage />} />
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
      <Route path="/addcourse" element={<AddCoursePage />} />
      <Route path="/addlesson" element={<AddLessonPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default App;
