import React from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import EditLessonPage from "./pages/admin/EditLessonPage";
import EditCoursePage from "./pages/admin/EditCoursePage";
import AssignmentPage from "./pages/admin/AssignmentPage";
import CourseListPage from "./pages/admin/CourseList";
import AddCoursePage from "./pages/admin/AddCoursePage";
import AddLessonPage from "./pages/admin/AddLessonPage";
import AdminLoginPage from "./pages/admin/AdminLoginPage";
import NotFoundPage from "./pages/NotFoundPage";
function AdminApp() {
  <Routes>
    <Route path="/admin/login" element={<AdminLoginPage />} />
    <Route path="/admin/courselist" element={<CourseListPage />} />
    <Route path="/admin/addcourse" element={<AddCoursePage />} />
    <Route path="/admin/addlesson" element={<AddLessonPage />} />
    <Route path="/admin/editcourse/:courseId" element={<EditCoursePage />} />
    <Route path="/admin/editlesson" element={<EditLessonPage />} />
    <Route path="/admin/assignment" element={<AssignmentPage />} />
    <Route path="*" element={<NotFoundPage />} />
  </Routes>;
}

export default AdminApp;
