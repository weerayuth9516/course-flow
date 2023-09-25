import React from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/header/CourseFlow.png";
import book from "../../assets/Sidebar/book.png";
import assignment from "../../assets/Sidebar/assignment.png";
import logout from "../../assets/Sidebar/logout.png";
import Sidebar from "../../components/admin/Sidebar";
import searchicon from "../../assets/courselist/search.png";
import ex1 from "../../assets/courselist/ex1.png";
import edit from "../../assets/courselist/edit.png";
import deleteLogo from "../../assets/courselist/delete.png";
import greenstatus from "../../assets/courselist/greenstatus.png";
import { useState, useEffect } from "react";
import { useAuth } from "../../context/authentication";
import axios from "axios";

function CourseListPage() {
  const auth = useAuth();
  const [courseList, setCourseList] = useState([]);

  const getCourseList = async (
    page,
    publicStatus,
    price,
    createdat,
    updatedat
  ) => {
    try {
      const response = await axios.get(
        `http://localhost:4001/admin?page=${page}&publicStatus=${publicStatus}&price=${price}&createdat=${createdat}&updatedat=${updatedat}`
      );
      setCourseList(response.data.data);
      console.log(response.data.data);
    } catch (error) {
      console.log("request error");
    }
  };
  useEffect(() => {
    getCourseList(1);
  }, []);

  const handleDeleteCourse = async (courseId) => {
    try {
      // Make an API call to delete the course
      const response = await axios.delete(
        `http://localhost:4001/admin/courses/${courseId}`
      );

      // Check if the deletion was successful (you can add more error handling here)
      if (response.status === 200) {
        // Remove the deleted course from the courseList state
        setCourseList((prevCourseList) =>
          prevCourseList.filter((course) => course.course_id !== courseId)
        );
      }
    } catch (error) {
      console.error("Error deleting course:", error);
    }
  };

  return (
    <div className="flex flex-row">
      <Sidebar />
      <div className="w-[100%] flex flex-col">
        <div className="flex items-center text-center w-[100%] justify-between pt-6 pb-4 border-b-2">
          <div className="pl-[5%] text-header3">Course</div>
          <div className="flex gap-3 items-center pr-[5%]">
            <label
              for="default-search"
              className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
            ></label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <img className="" src={searchicon}></img>
              </div>
              <input
                type="search"
                className="w-full p-3 pr-20 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg"
                placeholder="Search..."
              ></input>
            </div>
            <button
              onClick={() => {
                navigate("/admin/addcourse");
              }}
              className="bg-blue-500 hover:bg-blue-400 active:bg-blue-300 py-3.5 px-8 rounded-md text-white"
            >
              + Add Course
            </button>
          </div>
        </div>
        <div className="bg-gray-100 h-screen relative">
          <table className="table-auto absolute right-[5%] top-[5%] w-[90%]">
            <thead className="bg-gray-300">
              <tr>
                <th className="py-3 px-5 tracking-wide text-start"></th>
                <th className="py-3 px-5 tracking-wide text-start">Image</th>
                <th className="py-3 px-5 tracking-wide text-start">
                  Course name
                </th>
                <th className="py-3 px-5 tracking-wide text-start">Lesson</th>
                <th className="py-3 px-5 tracking-wide text-start">Price</th>
                <th className="py-3 px-5 tracking-wide text-start">
                  Created date
                </th>
                <th className="py-3 px-5 tracking-wide text-start">
                  Updated date
                </th>
                <th className="py-3 px-5 tracking-wide text-start">Action</th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {courseList.map((item, index) => {
                return (
                  <tr key={index} className="border-b-2">
                    <td className="p-5">
                      <img className="w-3" src={greenstatus}></img>
                    </td>

                    <td className="p-5">
                      <img
                        className="w-20 h-14 object-cover"
                        src={item.course_cover_img}
                      ></img>
                    </td>

                    <Link to={`/course/courseDetail/${item.course_id}`}>
                      <td className="p-5 font-semibold">{item.course_name}</td>
                    </Link>
                    <td className="p-5 font-semibold">
                      {item.lesson_amount} lessons
                    </td>
                    <td className="p-5 font-semibold">
                      {item.course_price}.00
                    </td>
                    <td className="p-5 font-semibold">
                      {item.course_created_at}
                    </td>
                    <td className="p-5 font-semibold">
                      {item.course_updated_at}
                    </td>
                    <td className="pt-8 flex pl-4 gap-2 ">
                      {/* <img src={deleteLogo}></img> */}
                      <img
                        src={deleteLogo}
                        alt="Delete"
                        onClick={() => handleDeleteCourse(item.course_id)}
                        style={{ cursor: "pointer" }}
                      />
                      <img src={edit}></img>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default CourseListPage;
