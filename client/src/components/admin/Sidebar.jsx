import React from "react";
import logo from "../../assets/header/CourseFlow.png";
import book from "../../assets/Sidebar/book.png";
import assignment from "../../assets/Sidebar/assignment.png";
import logout from "../../assets/Sidebar/logout.png";

function Sidebar() {
  return (
    <aside className="w-[17%] top-0 border-r border-gray-400">
      <div className="sidebar overflow-y-auto">
        <div className=" w-full flex flex-col items-center mt-10 mb-24 px-5">
          <img
            className="mb-6 cursor-pointer w-[182px] h-[19px]"
            src={logo}
          ></img>
          <h2 className="text-gray-700">Admin Panel Control</h2>
        </div>
        <div className="py-4 px-6 h-12 w-full flex items-center duration-300 cursor-pointer hover:bg-gray-200">
          <img src={book}></img>
          <span className="ml-4 font-semibold text-gray-800">Course</span>
        </div>
        <div className="py-4 px-6 h-12 flex items-center duration-300 cursor-pointer hover:bg-gray-200 mb-96">
          <img src={assignment}></img>
          <span className="ml-4 font-semibold text-gray-800">Assignment</span>
        </div>
        <div className="py-4 px-6 h-12 flex items-center duration-300 cursor-pointer hover:bg-gray-200 ">
          <img src={logout}></img>
          <span className="ml-4 font-semibold text-gray-800">Log out</span>
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;
