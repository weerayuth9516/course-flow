import React, { useEffect, useState } from "react";
import Header from '../components/Header'
import Footer from '../components/Footer'
import percent from '../assets/courseLearning/percent.png'
import completed from '../assets/courseLearning/completed.png'
import inprogress from '../assets/courseLearning/inprogress.png'
import notStart from '../assets/courseLearning/notStart.png'
import useGetsearch from "../hook/useGetsearch";
import axios from "axios";
import { Link, useParams } from "react-router-dom";

function CourseLearningPage() {

    const [course, setCourse] = useState([]);
    const [lesson, setLesson] = useState([]);
    const [status, setStatus] = useState(2);
    const [toggleStates, setToggleStates] = useState(lesson.map(() => false));
  
    const { searchList, getSearchList } = useGetsearch();
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
      } catch (error) {
        console.log("request error");
      }
    };
  
    useEffect(() => {
      getCourseAndLessonAndSubLesson();
      getSearchList("", 3);
    }, [params.courseId]);
  
    const toggle = (index) => {
      const newToggleStates = [...toggleStates];
      newToggleStates[index] = !newToggleStates[index];
      setToggleStates(newToggleStates);
    };
  
    const ToggleList = ({ title, content, isOpen, toggle, index }) => {
      return (
        <div className="mt-[50px] ml-5 w-[309px] relative">
          <div className="toggle-header w-full h-[48px] border-1 border-b border-gray-400" onClick={toggle}>
            <div className="toggle-title mr-10 absolute text-body2">
            <span className="mr-6 text-gray-700">0{index + 1}</span><span className="text-black">{title}</span>
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
    <Header/>
    <div id="container" className='font-inter flex justify-center items-center'>
    <div className='w-[1440px] border-2 border-red-700 mt-[120px]'>
    <div className='w-[357px] rounded-lg shadow-lg border border-gray-100'>
    <div className="description-box m-4 flex flex-col justify-start items-start">
            <h3 className="mb-5 text-orange-500 text-body3">Course</h3>
            <h2 className="font-bold mb-2 text-header3">
            {course.course_name}
            </h2>
            <div className="course-detail mb-5">
              <p>{typeof course.course_summary === "string" &&
                course.course_summary.length > 60
                  ? course.course_summary.substring(0, 60) + "..."
                  : course.course_summary}</p>
            </div>
            <div>
                <img src={percent} alt="progress image"/>
            </div>
          </div>
          <div id="toggle-list-box" className=''>
          {lesson.map((data, index) => (
                <ToggleList
                  className="text-lg"
                  key={index}
                  index={index}
                  title={data.lesson_name}
                  content={
                    data.sub_lessons && data.sub_lessons.length !== 0
                      ? data.sub_lessons.map((item, index) => {
                          return <li key={index} className="mb-5">
                            <span>{(status) === 0 ? (
  <img src={notStart} className="object-fit inline mr-4"/>
) : (status) === 1 ? (
  <img src={inprogress} className="object-fit inline mr-4"/>
) : (
  <img src={completed} className="object-fit inline mr-4"/>
)}
                            </span><span className="pb-0">{item.sub_lesson_name}</span></li>;
                        })
                      : ""
                  }
                  isOpen={toggleStates[index]}
                  toggle={() => toggle(index)}
                />
              ))}

          </div>

    </div>
    </div>
    </div>
    
    <Footer/>
    </>
  )
}

export default CourseLearningPage