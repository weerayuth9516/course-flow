import React, { useRef, useEffect } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import completed from "../../assets/courseLearning/completed.png";
import inprogress from "../../assets/courseLearning/inprogress.png";
import notStart from "../../assets/courseLearning/notStart.png";
import ToggleList from "../../components/user/ToggleList";
import { useAuth } from "../../context/authentication";
import useCourselearning from "../../hook/useCourselearning";

function CourseLearningPage() {
  const videoRef = useRef(null);
  const auth = useAuth();
  const {
    course,
    lesson,
    subLessonArray,
    lessonPage,
    setLessonPage,
    currentSubLesson,
    setCurrentSubLesson,
    subLessonStatus,
    setSubLessonStatus,
    powerLevel,
    toggleStates,
    getUserCoursesLearning,
    toggle,
    calculatePowerLevel,
    handleTitleClick,
    handleVideoEnd,
    handleVideoStart,
    handleAssignment,
  } = useCourselearning();

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
        subLessonId: subLessonArray[0].sub_lesson_id,
      });
      setSubLessonStatus(subLessonArray.map((initial) => initial.status_value));
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
        subLessonId: subLessonArray[lessonPage - 1].sub_lesson_id,
      });
    }
  }, [lessonPage, subLessonArray]);

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
            <div id="toggle-list-box">
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
                              subLesson.sub_lesson_id === item.sub_lesson_id
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
                                currentSubLesson.subLessonId ===
                                item.sub_lesson_id
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
                                    item.sub_lesson_video,
                                    item.sub_lesson_id
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
                <div className="w-[739px] h-[314px] bg-blue-100 flex flex-col items-center rounded-lg mt-[70px]">
                  <div className="w-[691px] h-[32px] flex justify-between items-center mt-4">
                    <div className="text-body1 text-black">Assignment</div>
                    <div className="text-[#996500] text-[16px] w-[79px] bg-[#FFFBDB] border flex justify-center p-1">
                      Pending
                    </div>
                  </div>
                  <div className="w-[691px] h-[124px] flex flex-col mt-5">
                    <div className="text-[16px] mb-2">
                      What are the 4 elements of this lesson?
                    </div>
                    <div className="w-[691px] h-[96px] text-[16px] text-gray-600 border-1 rounded-lg bg-white pl-5 pt-3">
                      Answer...
                    </div>
                  </div>
                  <div className="w-[691px] flex justify-start mt-8">
                    <button className="w-[203px] h-[60px] text-[16px] text-white font-bold rounded-xl bg-blue-500">
                      Send Assignment
                    </button>
                  </div>
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
              onClick={() => {
                lessonPage > 1 ? setLessonPage(lessonPage - 1) : null;
              }}
              className="w-[161px] h-[60px] ml-20 mt-5 mb-5 text-blue-500"
            >
              Previous Lesson
            </button>
          ) : (
            <div></div>
          )}
          {lessonPage < subLessonArray.length ? (
            <button
              onClick={() => {
                lessonPage < subLessonArray.length
                  ? setLessonPage(lessonPage + 1)
                  : null;
              }}
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
