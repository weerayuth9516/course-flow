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
      {isOpen && <div className="toggle-content">{content}</div>}
    </div>
  );
};

function CourseDetailPage() {
  const [course, setCourse] = useState({});
  const [lesson, setLesson] = useState([]);
  const [subLesson, setSubLesson] = useState([]);
  const params = useParams();

  const getCourseAndLessonAndSubLesson = async () => {
    const courseResult = await axios.get(
      `http://localhost:4001/courses/${params.courseId}`
    );
    setCourse(courseResult.data.data[0]);
    const lessonResult = await axios.get(
      `http://localhost:4001/courses/${params.courseId}/lessons`
    );
    if (lesson.length < lessonResult.data.data.length) {
      setLesson(
        lessonResult.data.data.map((value, index) => {
          lesson.push(value);
        })
      );
    }
    const subLessonResult = async (lessonArr) => {
      lessonArr.map(async (value) => {
        const lessonName = value;
        const subResult = await axios
          .get(
            `http://localhost:4001/courses/${params.courseId}/lessons/${value.lesson_id}/sublessons`
          )
          .then((value) => {
            return { [lessonName]: value.data.data };
          });
        console.log(lessonName);
        setSubLesson(subLesson.push(subResult));
      });
    };
    subLessonResult(lesson);
  };

  useEffect(() => {
    getCourseAndLessonAndSubLesson();
    // console.log(Object.keys(subLesson));
  }, [params.courseId]);

  // const toggleData = [
  //   {
  //     title: "01 Introduction",
  //     content: (
  //       <ul>
  //         <li>
  //           <p className="text-lg text-gray-700 ml-5 mt-5">
  //             ● Welcome to the course
  //           </p>
  //         </li>
  //         <li>
  //           <p className="text-lg text-gray-700 ml-5">● Course Overview </p>
  //         </li>
  //         <li>
  //           <p className="text-lg text-gray-700 ml-5">● Getting to Know You </p>
  //         </li>
  //       </ul>
  //     ),
  //   },
  //   {
  //     title: "02 Service Design Theories and Principles",
  //     content: (
  //       <ul>
  //         <li>
  //           <p className="text-lg text-gray-700 ml-5 mt-5">
  //             ● Welcome to the course
  //           </p>
  //         </li>
  //         <li>
  //           <p className="text-lg text-gray-700 ml-5">● Course Overview </p>
  //         </li>
  //         <li>
  //           <p className="text-lg text-gray-700 ml-5">● Getting to Know You </p>
  //         </li>
  //       </ul>
  //     ),
  //   },
  //   {
  //     title: "03 Understanding Users and Finding Opportunities",
  //     content: (
  //       <ul>
  //         <li>
  //           <p className="text-lg text-gray-700 ml-5 mt-5">
  //             ● Welcome to the course
  //           </p>
  //         </li>
  //         <li>
  //           <p className="text-lg text-gray-700 ml-5">● Course Overview </p>
  //         </li>
  //         <li>
  //           <p className="text-lg text-gray-700 ml-5">● Getting to Know You </p>
  //         </li>
  //       </ul>
  //     ),
  //   },
  //   {
  //     title: "04 Identifying and Validatiing Opportunities for Design",
  //     content: (
  //       <ul>
  //         <li>
  //           <p className="text-lg text-gray-700 ml-5 mt-5">
  //             ● Welcome to the course
  //           </p>
  //         </li>
  //         <li>
  //           <p className="text-lg text-gray-700 ml-5">● Course Overview </p>
  //         </li>
  //         <li>
  //           <p className="text-lg text-gray-700 ml-5">● Getting to Know You </p>
  //         </li>
  //       </ul>
  //     ),
  //   },
  //   {
  //     title: "05 Prototyping",
  //     content: (
  //       <ul>
  //         <li>
  //           <p className="text-lg text-gray-700 ml-5 mt-5">
  //             ● Welcome to the course
  //           </p>
  //         </li>
  //         <li>
  //           <p className="text-lg text-gray-700 ml-5">● Course Overview </p>
  //         </li>
  //         <li>
  //           <p className="text-lg text-gray-700 ml-5">● Getting to Know You </p>
  //         </li>
  //       </ul>
  //     ),
  //   },
  // ];

  // const [toggleStates, setToggleStates] = useState(subLesson.map(() => false));

  const toggle = (index) => {
    const newToggleStates = [...toggleStates];
    newToggleStates[index] = !newToggleStates[index];
    setToggleStates(newToggleStates);
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
            frameborder="0"
            allowfullscreen
          ></iframe>

          {/* <div className="w-[739px] h-[460px] bg-gray-500 rounded-lg"></div> */}
          <div className="w-[735px]">
            <p className="text-4xl font-medium mb-6 mt-20">
              {course.course_name}
            </p>
            <p className="text-gray-700">{course.course_detail}</p>
          </div>
          <div className="w-[739px]">
            <header className="font-medium text-4xl mt-16">
              Module Samples
            </header>
            <div className="flex flex-col items-start ">
              {/* {subLesson.map((item, index) => (
                <ToggleList
                  className="text-lg"
                  key={index}
                  title={item.lesson_name}
                  content={item.sub_lesson_name}
                  isOpen={toggleStates[index]}
                  toggle={() => toggle(index)}
                />
              ))} */}
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
