import React from "react";
import Sidebar from "../../components/admin/Sidebar";
import { Link } from "react-router-dom";
import LessonForm from "../../components/admin/LessonForm";

function AddLessonPage() {
  return (
    <>
      <div className="flex">
        <Sidebar />
        <div className="flex flex-col w-screen bg-gray-100 items-center">
          <Link to="/admin/addcourse"><div className="h-[70px] w-full border-gray-500 border-b">navbar | back to addCourse</div></Link>
          <Link to="/admin/editcourse/c020134b-ea78-4af5-958b-3c20c0452f46"><div className="h-[70px] w-full border-gray-500 border-b">Back to Course</div></Link>
          <LessonForm />
        </div>
      </div>
    </>
  );
}

export default AddLessonPage;
