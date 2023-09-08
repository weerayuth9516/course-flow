import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import axios from "axios";

function CourseDetailPage() {
  const [course, setCourse] = useState([]);
  const [lesson, setLesson] = useState([]);

  const params = useParams();

  const getCourseAndLessonAndSubLesson = async () => {
    try{
    const courseResult = await axios.get(
      `http://localhost:4001/courses/${params.courseId}`
    );
    setCourse(courseResult.data.data[0]);
  } catch (error) {
    console.log("request error");
  }

  // Get lessons and subLesson by courseId
  try{
    const lessonResult = await axios.get(
      `http://localhost:4001/courses/${params.courseId}/lessons`
      );
      setLesson(lessonResult.data.data)
      
  }catch (error) {
    console.log("request error");
  }
  };

  useEffect(() => {
    getCourseAndLessonAndSubLesson();
  }, [params.courseId]);

  
  const [toggleStates, setToggleStates] = useState(lesson.map(() => false));

  const toggle = (index) => {
    const newToggleStates = [...toggleStates];
    newToggleStates[index] = !newToggleStates[index];
    setToggleStates(newToggleStates);
  };

  const ToggleList = ({ title, content, isOpen, toggle }) => {
    return (
      <div className="mt-5 mb-5">
        <div className="toggle-header" onClick={toggle}>
          <h2 className="inline toggle-title mr-10 text-2xl">{title}</h2>
          <button className="toggle-button inline">
            {isOpen ? (
              <img src="/src/assets/registerPage/arrow-down.svg" />
            ) : (
              <img src="/src/assets/registerPage/arrow-down.svg" />
            )}
          </button>
        </div>
        {isOpen && <div className="toggle-content"><ul>{content}</ul></div>}
      </div>
    );
  };

  return (
    <>
      <Header />
      <div className="flex justify-center mt-9">
        <div className="flex flex-col mr-5">
          <Link to="/course" className="text-blue-500 mb-4 font-bold">
            <span className="font-semibold text-xs pr-2">🡠</span> Back
          </Link>
          <iframe
            width="739px"
            height="460px"
            src="https://qlxsggpxpucbrqcywrkm.supabase.co/storage/v1/object/public/course_video_trailers/A-Class%20trailer.mp4?t=2023-09-07T10%3A12%3A00.864Z"
            // frameBorder="0"
            allowFullScreen
          ></iframe>

          {/* <div className="w-[739px] h-[460px] bg-gray-500 rounded-lg"></div> */}
          <div className="w-[735px]">
            <p className="text-4xl font-medium mb-6 mt-20">
              {course.course_name}
            </p>
            <div>
      <p className="text-gray-700">
      {course.course_detail}
      </p>
    </div>


          </div>
          <div className="w-[739px]">
            <header className="font-medium text-4xl mt-16">
              Module Samples
            </header>
            <div className="flex flex-col items-start mb-[100px] ">
              {lesson.map((data, index) => (
                <ToggleList
                  className="text-lg"
                  key={index}
                  title={data.lesson_name}
                  content={data.sub_lessons && data.sub_lessons.length !== 0 ? data.sub_lessons.map((item,index)=>{
                  return (<li key={index}>{item.sub_lesson_name}</li>

                  )
                  }): ""}
                  isOpen={toggleStates[index]}
                  toggle={() => toggle(index)}
                />
              ))}
            </div>
          </div>
        </div>

        <div className="h-full mt-7 sticky top-16">
          <div className="w-[357px] h-[449px] py-8 px-6 shadow-lg rounded-lg ml-10">
            <p className="text-sm text-orange-500 mb-4">Course</p>
            <p className="text-2xl text-black font-medium mb-2">
              {course.course_name}
            </p>
            <p className="text-gray-700 mb-5">
              Lorem ipsum dolor sit amet, conse.
              <br /> ctetur adipiscing elit.
            </p>
            <p className="text-gray-700 text-2xl font-medium mb-6">
              THB {course.course_price}.00
            </p>
            <hr className="mb-6" />
            <button className="px-8 py-[18px] w-[309px] h-[60px] border-solid border-[1px] rounded-[12px] border-orange-500 font-bold text-orange-500 mt-3 hover:bg-orange-500 hover:text-white">
              Get in Desire Course
            </button>
            <br />
            <button className="px-8 py-[18px] w-[309px] h-[60px] border-solid border-[1px] rounded-[12px] bg-blue-500 font-bold text-white mt-5 hover:opacity-75 ">
              Subscribe This Course
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default CourseDetailPage;
