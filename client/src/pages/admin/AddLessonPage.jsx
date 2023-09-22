import React from "react";
import Sidebar from "../../components/admin/Sidebar";
import LessonAdmin from "../../components/admin/LessonAdmin";
import { Link } from "react-router-dom";

function AddLessonPage() {
  return (
    <>
      <div className="add-lesson-container">
        <Sidebar />
        <div className="add-lesson-and-navbar">
          <div className="navbar">navbar</div>
          <div className="add-lesson-form">add lesson form</div>
        </div>
      </div>
      {/* <div>AddLessonPage</div>
      <Link to="/admin/addcourse">Back to AddCoursePage</Link> */}
    </>
  );
}

export default AddLessonPage;
