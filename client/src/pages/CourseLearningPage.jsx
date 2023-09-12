import React, { useRef, useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import percent from "../assets/courseLearning/percent.png";
import completed from "../assets/courseLearning/completed.png";
import inprogress from "../assets/courseLearning/inprogress.png";
import notStart from "../assets/courseLearning/notStart.png";
import useGetsearch from "../hook/useGetsearch";
import axios from "axios";
import { Link, useParams } from "react-router-dom";

function CourseLearningPage() {
  const [course, setCourse] = useState([]);
  const [lesson, setLesson] = useState([]);
  const [subLessonArray, setSubLessonArray] = useState([]);
  const [status, setStatus] = useState(1);
  

  const [displaySubLesson, setDisplaySubLesson] = useState(
    "Mobile Applications"
  );
  const [displayVideo, setDisplayVideo] = useState(
    "https://qlxsggpxpucbrqcywrkm.supabase.co/storage/v1/object/public/course_videos/course_id_d9f4/lesson_id_c7ce/sub_lesson_id_4cc5.mp4?t=2023-09-12T04%3A56%3A27.848Z"
  );
  const [toggleStates, setToggleStates] = useState(lesson.map(() => false));

  const videoRef = useRef(null);
  const [isVideoFinished, setIsVideoFinished] = useState(false);
  const [isVideoStarted, setIsVideoStarted] = useState(false);
 

  const handleVideoEnd = () => {
    setIsVideoFinished(true);
  };

  const handleVideoStart = () => {
    setIsVideoStarted(true);
    setStatus(2)
  };

  useEffect(() => {
  }, [status]);

  const params = useParams();

  const getCourseAndLessonAndSubLesson = async () => {
    try {
      const courseResult = await axios.get(
        `http://localhost:4001/courses/${params.courseId}`
      );
      setCourse(courseResult.data.data[0]);
    } catch (error) {
      console.log("request error");
    }

    // Get lessons and subLesson by courseId
    try {
      const lessonResult = await axios.get(
        `http://localhost:4001/courses/${params.courseId}/lessons`
      );
      setLesson(lessonResult.data.data);
      const subLessons = lessonResult.data.data.flatMap(
        (lesson) => lesson.sub_lessons
        );
        setSubLessonArray(subLessons)
    } catch (error) {
      console.log("request error");
    }
  };

  useEffect(() => {
    getCourseAndLessonAndSubLesson();
  }, [params.courseId]);


  const toggle = (index) => {
    const newToggleStates = [...toggleStates];
    newToggleStates[index] = !newToggleStates[index];
    setToggleStates(newToggleStates);
  };

  const handleClick = (subLesson, subVideo) => {
    setDisplaySubLesson(subLesson);
    setDisplayVideo(subVideo);
    setIsVideoFinished(false);
    setIsVideoStarted(false);
  };

  const ToggleList = ({ title, content, isOpen, toggle, index }) => {
    return (
      <div className="ml-5 w-[309px] relative">
        <div
          className="toggle-header flex justify-start items-center w-full h-[72px] border-1 border-b border-gray-400 overflow-hidden"
          onClick={toggle}
        >
          <div className="toggle-title mr-10 text-body2 flex justify-start">
            <div className="mr-6 text-gray-700">0{index + 1}</div>
            <div className="text-black">{title}</div>
          </div>
          <button className="toggle-button inline absolute right-0">
            {isOpen ? (
              <img src="/src/assets/registerPage/arrow-down.svg" />
            ) : (
              <img src="/src/assets/registerPage/arrow-down.svg" />
            )}
          </button>
        </div>
        {isOpen && (
          <div className="toggle-content mt-8 ml-1">
            <ul className="text-body2 text-gray-700">{content}</ul>
          </div>
        )}
      </div>
    );
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
                  course.course_summary.length > 60
                    ? course.course_summary.substring(0, 60) + "..."
                    : course.course_summary}
                </p>
              </div>
              <div className="mb-3">
                <img src={percent} alt="progress image" />
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
                    data.sub_lessons && data.sub_lessons.length !== 0
                      ? data.sub_lessons.map((item, index) => {
                          return (
                            <li key={index} className="mb-5 flex justify-start">
                              <span>
                                {status === 1 ? (
                                  <img
                                    src={notStart}
                                    className="object-fit inline mr-4"
                                  />
                                ) : status === 2 ? (
                                  <img
                                    src={inprogress}
                                    className="object-fit inline mr-4"
                                  />
                                ) : (
                                  <img
                                    src={completed}
                                    className="object-fit inline mr-4"
                                  />
                                )}
                              </span>
                              <button
                                key={index}
                                onClick={() =>
                                  handleClick(
                                    item.sub_lesson_name,
                                    item.sub_lesson_video
                                  )
                                }
                                className="text-left"
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
            <p className="text-header2 text-black mb-8">{displaySubLesson}</p>
            <div className="text-header2 text-black">
              <video
                ref={videoRef}
                controls
                onPlay={handleVideoStart}
                onEnded={handleVideoEnd}
                src={displayVideo}
                className="w-[739px] h-[460px]"
              ></video>

              {isVideoStarted ? 
                  <p>Video has been started.</p>
              : 
                ""
              }

              {isVideoFinished ? 
                  <p>Video has finished playing.</p>
              : 
                ""
              }
            </div>
          </div>
        </div>
      </div>
      <div className="font-inter font-bold text-body2 flex justify-between items-center">
        <button className="ml-20 mt-10 mb-8 text-blue-500 ">
          Previous Lesson
        </button>
        <button className="w-[161px] h-[60px] mr-10 mt-10 mb-8 text-white bg-blue-500 rounded-lg">
          Next Lesson
        </button>
      </div>
      <Footer />
    </>
  );
}

export default CourseLearningPage;
