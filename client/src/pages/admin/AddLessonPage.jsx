import React from "react";
import Sidebar from "../../components/admin/Sidebar";
import { Link } from "react-router-dom";
import LessonForm from "../../components/admin/LessonForm";

function AddLessonPage() {
  return (
    <>
<<<<<<< HEAD
      <div className="flex">
        <Sidebar />
        <div className="flex flex-col w-screen bg-gray-100 items-center">
          <div className="h-[70px] w-full border-gray-500 border-b">navbar</div>
          <LessonForm />
        </div>
      </div>
=======
    <div>AddLessonPage</div>
    <Link to="/admin/addcourse">Back to AddCoursePage</Link>
>>>>>>> c9e6b8a (basic test)
    </>
  );
}

export default AddLessonPage;
