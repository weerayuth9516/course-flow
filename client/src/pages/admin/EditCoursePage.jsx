import React, { useState, useEffect } from "react";
import useFormData from "../../context/formDataContext";
import Sidebar from "../../components/admin/Sidebar";
import LessonAdmin from "../../components/admin/LessonAdmin";
import UploadMedia from "../../components/admin/UploadMedia";
import CourseForm from "../../components/admin/CourseForm";
import arrowBack from "../../assets/EditCourse/arrow_back.png"
import axios from "axios";
import { Link , useParams } from "react-router-dom";

function EditCoursePage() {
  const { formValues, setFormValues } = useFormData();
  const params = useParams();
  const {
    imageServerUrl,
    imageUrl,
    setImageServerUrl,
    videoTrailerServerUrl,
    setVideoTrailerServerUrl,
    setCoverImageError,
    setVideoTrailerError,
    videoTrailerUrl,
  } = useFormData();

  const filterSubmit = (values) => {
    imageUrl || imageServerUrl ? setCoverImageError(false) : setCoverImageError(true);
    videoTrailerUrl || videoTrailerServerUrl ? setVideoTrailerError(false) : setVideoTrailerError(true);
    if ((imageUrl || imageServerUrl) && (videoTrailerUrl || videoTrailerServerUrl)) {
      handleSubmit(values);
    } else {
      console.log("Please fill in all require information");
    }
  };

  const handleSubmit = (values) => {
    // Handle form submission
    // values.coverImage = imageUrl;
    // values.videoTrailer = videoTrailerUrl;
    console.log(values);
    if (
      values.hasOwnProperty("coverImage") &&
      values.hasOwnProperty("videoTrailer")
    ) {
      setTimeout(() => {
        // window.location.reload();
        // navigate("/admin/courselist");
      }, 2000);
    }
  };

  const getCourseData = async () => {
    try {
      const response = await axios.get(
        `http://localhost:4001/admin/courses/${params.courseId}`
      );
      setFormValues({
        ...formValues,
        courseName: response.data.data.course[0].course_name,
        price: response.data.data.course[0].course_price,
        totalLearningTime: response.data.data.course[0].course_duration,
        courseSummary: response.data.data.course[0].course_summary,
        courseDetail: response.data.data.course[0].course_detail,
      });

      setImageServerUrl(response.data.data.course[0].course_cover_img)
      setVideoTrailerServerUrl(response.data.data.course[0].course_video_trailer)
    } catch (error) {
      console.log("request error");
    }
  };

  useEffect(() => {
    getCourseData();
  }, [])

  return (
    <main className=" flex">
      <Sidebar />
      <section className="font-inter flex justify-center items-center">
        <section id="right-content w-full">
          <div className="w-full h-[92px] flex justify-center items-center">
            <section
              id="navbar"
              className="w-full h-[92px] flex justify-between items-center px-20 border-b border-gray-400"
            >
              <div className="flex items-center">
              <Link to="/admin/courselist"><img src={arrowBack} className="inline mr-4"/></Link>
              <div className="inline text-header3 text-[2A2E3F] overflow-hidden">
                Course {formValues.courseName}
              </div>
              </div>
              <div className="flex justify-center items-center font-bold">
                <button className="text-orange-500 w-[117px] h-[60px] border border-orange-500 rounded-xl">
                  Cancel
                </button>
                <button
                  type="submit"
                  form="add-course"
                  onClick={filterSubmit}
                  className="text-white w-[117px] h-[60px] bg-[#2f5fac] rounded-xl ml-[20px] mr-[15px]"
                >
                  Edit
                </button>
              </div>
            </section>
          </div>
          <section className="w-full bg-[#f6f7fc] flex justify-center flex-col items-center">
            <div className="w-[85%] bg-white mt-[80px] mx-auto border border-gray-400 rounded-2xl flex justify-center items-start">
              <div className="px-20 text-body1 text-black">
                  <CourseForm filterSubmit={filterSubmit} />
                <UploadMedia />
              </div>
            </div>
            <LessonAdmin />
          </section>
        </section>
      </section>
    </main>
  );
}

export default EditCoursePage;
