import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Header from "../components/Header";

import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import axios from "axios";
import { useNavigate } from "react-router-dom";

function CourseDetailPage() {
  const [course, setCourse] = useState({});
  const [lesson, setLesson] = useState({});
  const params = useParams();
  const navigate = useNavigate;

  const getCourse = async () => {
    const result = await axios.get(
      `http://localhost:4001/courses/${params.courseId}`
    );
    setCourse(result.data.data[0]);
  };

  // const getCourse = async (lessonId) => {
  //   const result = await axios.get(
  //     `http://localhost:4001/courses/${params.courseId}`
  //   );
  //   const courseResult = result.data.data[0];

  //   const response = await axios.get(
  //     `http://localhost:4001/courses/${params.courseId}/lessons/${lessonId}`
  //   );
  //   const lessonData = response.data;
  //   setCourse(courseResult);
  //   console.log(courseResult, lessonData);
  //   return { courseResult, lessonData };
  // };

  useEffect(() => {
    getCourse();
  }, []);

  return (
    <>
      <Header />
      <div className="flex justify-center mt-9">
        <div className="flex flex-col mr-5">
          <Link to="/course" className="text-blue-500 mb-4 font-bold">
            <span className="font-semibold text-xs pr-2">🡠</span> Back
          </Link>
          <video controls width="739px" height="460px" className="rounded-lg">
            <sourse src={course.course_video_trailer} type="video/mp4" />
          </video>
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

            <Accordion
              className="mt-8 mb-40"
              style={{ boxShadow: "none", border: "none", height: "50px" }}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
                onClick={() =>
                  navigate(
                    `/course/courseDetail/d93e4360-839c-4c3c-a183-493c735b7d08/lessons/244dadb7-a345-4e14-8c2a-9f2b20deaa93`
                  )
                }
              >
                <Typography className="font-medium text-black !text-2xl">
                  <span className="text-gray-700 text-2xl font-medium mr-3">
                    01
                  </span>
                  {/* {course.lessons.lesson_name} */} introduction
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>
                  <hr className="mb-2" />
                  <div className="pl-8 text-gray-700">
                    {/* {course.map((item, index) => {})} */}
                    <Typography variant="body1">
                      • {lesson.lesson_name} <br />• Welcome to the Course
                      <br />• Welcome to the Course
                      <br />• Welcome to the Course
                      <br />• Welcome to the Course
                      <br />• Welcome to the Course
                      <br />• Welcome to the Course
                      <br />• Welcome to the Course
                    </Typography>
                  </div>
                </Typography>
              </AccordionDetails>
            </Accordion>
          </div>
        </div>

        <div className="h-full mt-12 sticky top-40">
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
    </>
  );
}

export default CourseDetailPage;
