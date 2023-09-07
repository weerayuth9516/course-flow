import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Header from "../components/Header";

import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import axios from "axios";

function CourseDetailPage() {
  const [course, setCourse] = useState({});
  const [lesson, setLesson] = useState([]);
  const params = useParams();

  const getCourseAndLesson = async () => {
    const courseResult = await axios.get(
      `http://localhost:4001/courses/${params.courseId}`
    );
    const lessonResult = await axios.get(
      `http://localhost:4001/courses/${params.courseId}/lessons`
    );
    const courseData = courseResult.data.data[0];
    const lessonData = lessonResult.data.data[0].lessons;
    console.log(lessonResult.data.data[0].lessons);

    setCourse(courseData);
    setLesson(lessonData);
    console.log(courseData);
    console.log(lessonData);
  };

  useEffect(() => {
    getCourseAndLesson();
  }, [params.courseId]);

  return (
    <>
      <Header />
      <div className="flex justify-center mt-9">
        <div className="flex flex-col mr-5">
          <Link to="/course" className="text-blue-500 mb-4 font-bold">
            <span className="font-semibold text-xs pr-2">🡠</span> Back
          </Link>
          <video
            controls
            width="739px"
            height="460px"
            className="rounded-lg cursor-pointer"
          >
            <source src={course.course_video_trailer} type="video/mp4" />
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
              // key={index}
              className="mt-8 mb-40"
              style={{ boxShadow: "none", border: "none", height: "50px" }}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
                className="delay-1000"
              >
                {lesson.map((item, index) => (
                  <Typography
                    className="font-medium text-black !text-2xl"
                    key={index}
                  >
                    <span className="text-gray-700 text-2xl font-medium mr-3">
                      0{index + 1}
                    </span>
                    {item.lesson_name} introduction
                  </Typography>
                ))}
              </AccordionSummary>
              <AccordionDetails>
                <Typography>
                  <hr className="mb-2" />
                  <div className="pl-8 text-gray-700">
                    <Typography variant="body1">
                      • Welcome to the Course
                    </Typography>
                    <Typography variant="body1">
                      • Welcome to the Course
                    </Typography>
                  </div>
                </Typography>
              </AccordionDetails>
            </Accordion>
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
    </>
  );
}

export default CourseDetailPage;
