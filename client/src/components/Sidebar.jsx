import React from "react";
import logo from "../assets/header/CourseFlow.png"
import book from "../assets/Sidebar/book.png"
import assignment from "../assets/Sidebar/assignment.png"
import logout from "../assets/Sidebar/logout.png"

function Sidebar() {
    return (
        <section className="mt-[1000px] mb-[1000px] ml-[50px]">
            <div className="flex flex-col ">
                <img className="w-[10%] mb-[15px]" src={logo}></img>
                <div className="mb-[100px]">Admin Panel Control</div>
            </div>
            <div className="flex items-center mb-5">
                <img className="mr-[10px]" src={book}></img>
                <div className="">Course</div>

            </div>
            <div className="flex items-center mb-[150px]">
                <img className="mr-[10px]" src={assignment}></img>
                <div className="">Assignment</div>
            </div>
            <div className="flex items-center">
                <img className="mr-[10px]" src={logout}></img>
                <div>Log out</div>
            </div>
        </section>
    )
}

export default Sidebar