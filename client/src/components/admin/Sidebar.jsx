import React from "react";
import logo from "../../assets/header/CourseFlow.png";
import book from "../../assets/Sidebar/book.png";
import assignment from "../../assets/Sidebar/assignment.png";
import logout from "../../assets/Sidebar/logout.png";

function Sidebar() {
  return (
    <aside className="w-[15%] h-screen top-0 bottom-0">
      <div className="sidebar h-[100%] overflow-y-auto border-r-2">
        <div className=" mt-1 flex flex-col items-center mb-16 py-10 px-10">
          <img className="mb-6 cursor-pointer" src={logo}></img>
          <h2 className="text-sm">Admin Panel Control</h2>
        </div>
        <div className="p-0 m-0 h-12 flex items-center duration-300 cursor-pointer hover:bg-gray-200">
          <img className="pl-10" src={book}></img>
          <span className="ml-4 font-semibold">Course</span>
        </div>
        <div className="p-0 m-0 h-12 flex items-center duration-300 cursor-pointer hover:bg-gray-200 mb-96">
          <img className="pl-10" src={assignment}></img>
          <span className="ml-4 font-semibold">Assignment</span>
        </div>
        <div className="p-0 m-0 h-12 flex items-center duration-300 cursor-pointer hover:bg-gray-200 ">
          <img className="pl-10" src={logout}></img>
          <span className="ml-4 font-semibold">Log out</span>
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;
