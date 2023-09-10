import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import ToggleLesson from "../components/ToggleLesson";

// import useGetsearch from "../hook/useGetsearch";
// import DisplayCards from "../components/DisplayCards";

import axios from "axios";

function CourseDetailPage() {
  const [course, setCourse] = useState({});
  const params = useParams();

  const getCourse = async () => {
    try {
      const courseResult = await axios.get(
        `http://localhost:4001/courses/${params.courseId}`
      );
      setCourse(courseResult.data.data[0]);
    } catch (error) {
      console.log("request error");
    }
  };

  useEffect(() => {
    getCourse();
    // getSearchList("", 3);
  }, [params.courseId]);

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
            <p className="text-gray-700">
              {typeof course.course_detail === "string" &&
              course.course_detail.length > 1500
                ? course.course_detail.substring(0, 1500) + "..."
                : course.course_detail}
            </p>
          </div>
          <div className="w-[739px]">
            <header className="font-medium text-4xl mt-16">
              Module Samples
            </header>
            <ToggleLesson />
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
            <button className="px-8 py-[18px] w-[309px] h-[60px] border-solid border-[1px] rounded-[12px] bg-blue-500 font-bold text-white mt-5 hover:bg-blue-600 ">
              Subscribe This Course
            </button>
          </div>
        </div>
      </div>
      {/* <div className="mt-20 flex flex-col justify-center items-center">
        <div className="text-header2 font-bold mb-12">Other Interesting Course</div>
      <DisplayCards searchList={searchList}/> */}
      <Footer />
    </>
  );
}

export default CourseDetailPage;
