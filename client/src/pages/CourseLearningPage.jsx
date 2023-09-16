import React, { useRef, useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import completed from "../assets/courseLearning/completed.png";
import inprogress from "../assets/courseLearning/inprogress.png";
import notStart from "../assets/courseLearning/notStart.png";
import ToggleList from "../components/ToggleList";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useAuth } from "../context/authentication";

function CourseLearningPage() {
  const [course, setCourse] = useState([]);
  const [lesson, setLesson] = useState([]);
  const [subLessonArray, setSubLessonArray] = useState([]);
  const [lessonPage, setLessonPage] = useState(1);
  const [currentSubLesson, setCurrentSubLesson] = useState({
    subLessonName: "",
    subLessonVideo: "",
  });
  const [subLessonStatus, setSubLessonStatus] = useState([]);
  const [powerLevel, setPowerLevel] = useState(0);
  const [toggleStates, setToggleStates] = useState(lesson.map(() => false));

  const videoRef = useRef(null);
  const params = useParams();
  const auth = useAuth();

  const getUserCoursesLearning = async (userId) => {
    try {
      const token = localStorage.getItem("token");
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      const courseResult = await axios.get(
        `http://localhost:4001/courses/coursedetail/learning?user_id=${userId}&course_id=${params.courseId}`,{ headers }
      );
      setCourse(courseResult.data.data[0].course_detail);
      setLesson(courseResult.data.data[0].lesson_detail);
      const subLessons = courseResult.data.data[0].lesson_detail.flatMap(
        (lesson) => lesson.sub_lesson
      );
      console.log(subLessons)
      setSubLessonArray(subLessons);
    } catch (error) {
      console.log("request error");
    }
  };

  useEffect(() => {
    if (auth.isAuthenicated) {
      const userId = auth.session.user.user_id;
      getUserCoursesLearning(userId);
    } 
  }, [auth.isAuthenicated]);

  useEffect(() => {
    if (subLessonArray.length > 0) {
      setCurrentSubLesson({
        subLessonName: subLessonArray[0].sub_lesson_name,
        subLessonVideo: subLessonArray[0].sub_lesson_video,
      });
    }
    if (subLessonArray.length > 0) {
      setSubLessonStatus(subLessonArray.map(() => "not_started"));
    }
  }, [subLessonArray]);

  useEffect(() => {
    calculatePowerLevel();
  }, [subLessonStatus]);

  useEffect(() => {
    if (lessonPage >= 1 && lessonPage <= subLessonArray.length) {
      setCurrentSubLesson({
        subLessonName: subLessonArray[lessonPage - 1].sub_lesson_name,
        subLessonVideo: subLessonArray[lessonPage - 1].sub_lesson_video,
      });
    }
  }, [lessonPage, subLessonArray]);

  const toggle = (index) => {
    const newToggleStates = [...toggleStates];
    newToggleStates[index] = !newToggleStates[index];
    setToggleStates(newToggleStates);
  };

  const calculatePowerLevel = () => {
    const totalSublesson = subLessonArray.length;
    const countCompleted = subLessonStatus.filter(
      (status) => status === "completed"
    ).length;
    if (totalSublesson === 0) {
      setPowerLevel(0);
    } else {
      const percentProgress = Math.floor(
        (countCompleted / totalSublesson) * 100
      );
      setPowerLevel(percentProgress);
    }
  };

  const handleTitleClick = (subLesson, subVideo) => {
    setCurrentSubLesson({
      subLessonName: subLesson,
      subLessonVideo: subVideo,
    });

    const currentIndex = subLessonArray.indexOf(
      subLessonArray.find((item) => item.sub_lesson_name === subLesson)
    );
    setLessonPage(currentIndex + 1);
  };

  const handleNextClick = () => {
    if (lessonPage < subLessonArray.length) {
      setLessonPage(lessonPage + 1);
    }
  };

  const handlePreviousClick = () => {
    if (lessonPage > 1) {
      setLessonPage(lessonPage - 1);
    }
  };

  const handleVideoEnd = () => {
    const currentIndex = subLessonArray.findIndex(
      (subLesson) =>
        subLesson.sub_lesson_name === currentSubLesson.subLessonName
    );
    if (currentIndex !== -1) {
      const newStatusArray = [...subLessonStatus];
      newStatusArray[currentIndex] = "completed";
      setSubLessonStatus(newStatusArray);
    }
  };

  const handleVideoStart = () => {
    const currentIndex = subLessonArray.findIndex(
      (subLesson) =>
        subLesson.sub_lesson_name === currentSubLesson.subLessonName
    );
    if (currentIndex !== -1) {
      const newStatusArray = [...subLessonStatus];
      newStatusArray[currentIndex] !== "completed"
        ? (newStatusArray[currentIndex] = "inprogress")
        : "";
      setSubLessonStatus(newStatusArray);
    }
  };

  const handleAssignment = () => {
    const currentIndex = subLessonArray.findIndex(
      (subLesson) =>
        subLesson.sub_lesson_name === currentSubLesson.subLessonName
    );
    if (currentIndex !== -1 && subLessonStatus[currentIndex] === "completed") {
      return true;
    }
    return false;
  };

  return (
    <>
      <Header />
      <div
        id="container"
        className="font-inter flex justify-center space-x-10 items-center"
      >
        <div
          id="all-content"
          className="w-full flex justify-center mt-[120px] space-x-8"
        >
          <div
            id="sidebar"
            className="w-[357px] rounded-lg shadow-lg border border-gray-100"
          >
            <div className="description-box m-4 flex flex-col justify-start items-start">
              <h3 className="mb-5 text-orange-500 text-body3">Course</h3>
              <h2 className="font-bold mb-2 text-header3">
                {course.course_name}
              </h2>
              <div className="course-detail mb-5">
                <p>
                  {typeof course.course_summary === "string" &&
                  course.course_summary.length > 100
                    ? course.course_summary.substring(0, 100) + "..."
                    : course.course_summary}
                </p>
              </div>
              <div className="power-level mb-3 w-[309px] h-[39px] flex flex-col justify-start items-start">
                <div className="text-body3 mb-2 text-gray-700">
                  {powerLevel}% Completed
                </div>
                <div className="w-[309px] h-[10px] bg-gray-300 rounded-lg">
                  <div
                    className="h-full transition-width ease-in-out duration-500 bg-blue-500 power-level rounded-lg bg-gradient-to-r from-[#95beff] to-[#1855ea]"
                    style={{ width: `${powerLevel}%` }}
                  ></div>
                </div>
              </div>
            </div>
            <div id="toggle-list-box" className="">
              {lesson.map((data, index) => (
                <ToggleList
                  className="text-lg"
                  key={index}
                  index={index}
                  title={data.lesson_name}
                  content={
                    data.sub_lesson && data.sub_lesson.length !== 0
                      ? data.sub_lesson.map((item, index) => {
                          const currentIndex = subLessonArray.findIndex(
                            (subLesson) =>
                              subLesson.sub_lesson_name === item.sub_lesson_name
                          );
                          const subLessonStatusClass =
                            subLessonStatus[currentIndex] === "completed"
                              ? completed
                              : subLessonStatus[currentIndex] === "in_progress"
                              ? inprogress
                              : notStart;
                          return (
                            <li
                              key={index}
                              className={`w-[309px] h-[60px] flex justify-start items-center pr-2 pl-2 ${
                                currentSubLesson.subLessonName ===
                                item.sub_lesson_name
                                  ? "bg-gray-100 rounded-lg"
                                  : ""
                              }`}
                            >
                              <span>
                                <img
                                  src={subLessonStatusClass}
                                  className="object-fit inline"
                                />
                              </span>
                              <button
                                key={index}
                                onClick={() =>
                                  handleTitleClick(
                                    item.sub_lesson_name,
                                    item.sub_lesson_video
                                  )
                                }
                                className="w-[257px] h-[48px] text-left ml-3 whitespace-normal"
                              >
                                {item.sub_lesson_name}
                              </button>
                            </li>
                          );
                        })
                      : ""
                  }
                  isOpen={toggleStates[index]}
                  toggle={() => toggle(index)}
                />
              ))}
            </div>
          </div>
          <div
            id="right-content"
            className="flex flex-col justify-start w-[739px]"
          >
            <p className="text-header2 text-black mb-2">
              {currentSubLesson.subLessonName}
            </p>
            <div className="text-header2 text-black">
              <video
                ref={videoRef}
                controls
                onPlay={handleVideoStart}
                onEnded={handleVideoEnd}
                src={currentSubLesson.subLessonVideo}
                className="w-[739px] h-[460px]"
              ></video>

              {handleAssignment() ? (
                <div className="w-[739px] h-[314px] bg-blue-100 flex flex-col justify-center items-center mt-20">
                  <h1>Assignment</h1>
                  <h1>Submit</h1>
                </div>
              ) : (
                ""
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-center items-center">
        <div className="w-[1440px] font-inter font-bold text-body2 flex justify-between items-center">
          {lessonPage > 1 ? (
            <button
              onClick={handlePreviousClick}
              className="w-[161px] h-[60px] ml-20 mt-5 mb-5 text-blue-500 "
            >
              Previous Lesson
            </button>
          ) : (
            <div></div>
          )}
          {lessonPage < subLessonArray.length ? (
            <button
              onClick={handleNextClick}
              className="w-[161px] h-[60px] mr-10 mt-5 mb-5 text-white bg-blue-500 rounded-lg"
            >
              Next Lesson
            </button>
          ) : (
            <div></div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}

export default CourseLearningPage;
