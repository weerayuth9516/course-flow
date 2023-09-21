import React from "react";
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

function CourseListPage() {
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
            <button className="bg-blue-500 hover:bg-blue-400 active:bg-blue-300 py-3.5 px-8 rounded-md text-white">
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
              <tr className="border-b-2">
                <td className="p-5">
                  <img className="w-3" src={greenstatus}></img>
                </td>
                <td className="p-5">
                  <img src={ex1}></img>
                </td>
                <td className="p-5">Service Design Essentials</td>
                <td className="p-5">6 lessons</td>
                <td className="p-5">3,559.00</td>
                <td className="p-5">12/02/2022 10:30PM</td>
                <td className="p-5">12/02/2022 10:30PM</td>
                <td className="pt-8 flex pl-4 gap-2 ">
                  <img src={deleteLogo}></img>
                  <img src={edit}></img>
                </td>
              </tr>
              <tr className="border-b-2">
                <td className="p-5">
                  <img className="w-3" src={greenstatus}></img>
                </td>
                <td className="p-5">
                  <img src={ex1}></img>
                </td>
                <td className="p-5">Service Design Essentials</td>
                <td className="p-5">6 lessons</td>
                <td className="p-5">3,559.00</td>
                <td className="p-5">12/02/2022 10:30PM</td>
                <td className="p-5">12/02/2022 10:30PM</td>
                <td className="pt-8 flex pl-4 gap-2">
                  <img src={deleteLogo}></img>
                  <img src={edit}></img>
                </td>
              </tr>
              <tr className="border-b-2">
                <td className="p-5">
                  <img className="w-3" src={greenstatus}></img>
                </td>
                <td className="p-5">
                  <img src={ex1}></img>
                </td>
                <td className="p-5">Service Design Essentials</td>
                <td className="p-5">6 lessons</td>
                <td className="p-5">3,559.00</td>
                <td className="p-5">12/02/2022 10:30PM</td>
                <td className="p-5">12/02/2022 10:30PM</td>
                <td className="pt-8 flex pl-4 gap-2">
                  <img src={deleteLogo}></img>
                  <img src={edit}></img>
                </td>
              </tr>
              <tr className="border-b-2">
                <td className="p-5">
                  <img className="w-3" src={greenstatus}></img>
                </td>
                <td className="p-5">
                  <img src={ex1}></img>
                </td>
                <td className="p-5">Service Design Essentials</td>
                <td className="p-5">6 lessons</td>
                <td className="p-5">3,559.00</td>
                <td className="p-5">12/02/2022 10:30PM</td>
                <td className="p-5">12/02/2022 10:30PM</td>
                <td className="pt-8 flex pl-4 gap-2">
                  <img src={deleteLogo}></img>
                  <img src={edit}></img>
                </td>
              </tr>
              <tr className="border-b-2">
                <td className="p-5">8</td>
                <td className="p-5">
                  <img src={ex1}></img>
                </td>
                <td className="p-5">Service Design Essentials</td>
                <td className="p-5">6 lessons</td>
                <td className="p-5">3,559.00</td>
                <td className="p-5">12/02/2022 10:30PM</td>
                <td className="p-5">12/02/2022 10:30PM</td>
                <td className="pt-8 flex pl-4  gap-2">
                  <img src={deleteLogo}></img>
                  <img src={edit}></img>
                </td>
              </tr>
              <tr className="border-b-2">
                <td className="p-5">8</td>
                <td className="p-5">
                  <img src={ex1}></img>
                </td>
                <td className="p-5">Service Design Essentials</td>
                <td className="p-5">6 lessons</td>
                <td className="p-5">3,559.00</td>
                <td className="p-5">12/02/2022 10:30PM</td>
                <td className="p-5">12/02/2022 10:30PM</td>
                <td className="pt-8 flex pl-4  gap-2">
                  <img src={deleteLogo}></img>
                  <img src={edit}></img>
                </td>
              </tr>
              <tr className="border-b-2">
                <td className="p-5">8</td>
                <td className="p-5">
                  <img src={ex1}></img>
                </td>
                <td className="p-5">Service Design Essentials</td>
                <td className="p-5">6 lessons</td>
                <td className="p-5">3,559.00</td>
                <td className="p-5">12/02/2022 10:30PM</td>
                <td className="p-5">12/02/2022 10:30PM</td>
                <td className="pt-8 flex pl-4 gap-2">
                  <img src={deleteLogo}></img>
                  <img src={edit}></img>
                </td>
              </tr>
              <tr className="border-b-2">
                <td className="p-5">8</td>
                <td className="p-5">
                  <img src={ex1}></img>
                </td>
                <td className="p-5">Service Design Essentials</td>
                <td className="p-5">6 lessons</td>
                <td className="p-5">3,559.00</td>
                <td className="p-5">12/02/2022 10:30PM</td>
                <td className="p-5">12/02/2022 10:30PM</td>
                <td className="pt-8 flex pl-4  gap-2">
                  <img src={deleteLogo}></img>
                  <img src={edit}></img>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default CourseListPage;
