import React, { useState } from "react";
import { useEffect } from "react";
import useGetuser from "../hook/useGetuser";
import DisplayCardsMyCourses from "../components/DisplayCardsMyCourses";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useAuth } from "../context/authentication";
import axios from "axios";

function MyCoursePage() {
  const [myCourses, setMyCourses] = useState([]);
  const [inProgressCourses, setInProgressCourses] = useState([]);
  const [completedCourses, setCompletedCourses] = useState([]);
  const [status, setStatus] = useState("");
  const [userId, setUserId] = useState("");
  const { user, getCurrentUser } = useGetuser();
  const auth = useAuth();

  const getAllMyCourses = async (userId) => {
    try {
      const response = await axios.get(
        `http://localhost:4001/courses/${userId}/mycourses`
      );
      setMyCourses(response.data.data);
      const createInProgressCourses = response.data.data.filter(
        (course) => course.status_value === "in_progress"
      );
      setInProgressCourses(createInProgressCourses);
      const createCompleteCourses = response.data.data.filter(
        (course) => course.status_value === "completed"
      );
      setCompletedCourses(createCompleteCourses);
    } catch (error) {
      console.log("request error");
    }
  };

  useEffect(() => {
    if (auth.isAuthenicated) {
      getCurrentUser(auth.session.user.user_id);
      setUserId(auth.session.user.user_id);
    } else {
      getCurrentUser(null);
    }
  }, [auth.isAuthenicated]);

  useEffect(() => {
    getAllMyCourses(userId);
  }, [userId]);

  return (
    <>
      <Header />
      <div id="container" className="font-inter mx-auto">
        <div className="bg-[url('src/assets/ourCourses/image_background.png')] bg-[length:100%_190px] bg-no-repeat">
          <div className="search-box mb-2 flex flex-col items-center mt-20 h-[230px]">
            <div className="title text-black text-header2 font-bold mb-5">
              My Course
            </div>
            <div className="flex space-x-10 mt-12">
              <button
                onClick={() => {
                  setStatus("myCourses");
                }}
                className="transform hover:scale-110 transition-transform duration-300 ease-in-out hover:shadow-lg text-gray-700 focus:text-black focus:border-b focus:border-b-1 focus: border-black p-2"
              >
                All Course
              </button>
              <button
                onClick={() => {
                  setStatus("in_progress");
                }}
                className="transform hover:scale-110 transition-transform duration-300 ease-in-out hover:shadow-lg text-gray-700 focus:text-black focus:border-b focus:border-b-1 focus: border-black p-2"
              >
                Inprogress
              </button>
              <button
                onClick={() => {
                  setStatus("completed");
                }}
                className="transform hover:scale-110 transition-transform duration-300 ease-in-out hover:shadow-lg text-gray-700 focus:text-black focus:border-b focus:border-b-1 focus: border-black p-2"
              >
                Completed
              </button>
            </div>
          </div>
        </div>
        <div className="user-image-and-course-container flex justify-center">
          <div className="user-box sticky top-20 w-[357px] h-[396px] rounded-lg shadow-lg mr-10 flex flex-col justify-center items-center">
            <div className="w-[120px] h-[120px]">
              <img
                src={auth.session.user.user_avatar}
                alt="user image"
                className="object-contain w-full h-full"
              />
            </div>
            <div className="mt-5 text-header3 text-gray-800">
              {auth.session.user.user_name}
            </div>
            <div className="w-[309px] h-[134px] flex justify-center space-x-4 mt-8">
              <div className="w-[143px] h-[134px] border-2 rounded-lg shadow-lg bg-gray-200 flex flex-col space-y-8  transform hover:scale-110 transition-transform duration-300 ease-in-out hover:shadow-lg">
                <div className="mt-3 ml-3 text-body2 text-gray-700">
                  <div>Course</div>
                  <div>Inprogress</div>
                </div>
                <div className="ml-3 mb-3 font-bold text-header3">{inProgressCourses.length}</div>
              </div>
              <div className="w-[143px] h-[134px] border-2 rounded-lg shadow-lg bg-gray-200 flex flex-col space-y-8  transform hover:scale-110 transition-transform duration-300 ease-in-out hover:shadow-lg">
                <div className="mt-3 ml-3 text-body2 text-gray-700">
                  <div>Course</div>
                  <div>Completed</div>
                </div>
                <div className="ml-3 mb-3 font-bold text-header3">{completedCourses.length}</div>
              </div>
            </div>
          </div>
          <div className="course-cards-container flex justify-center mb-[150px]">
            <div className="course-cards-container w-[740px] grid grid-cols-2 gap-10">
              <DisplayCardsMyCourses
                myCourses={
                  status === "in_progress"
                    ? inProgressCourses
                    : status === "completed"
                    ? completedCourses
                    : myCourses
                }
              />
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
}

export default MyCoursePage;
