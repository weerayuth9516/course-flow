import React from "react";
import axios from "axios";
import useFormData from "../../context/formDataContext";
import Sidebar from "../../components/admin/Sidebar";
import LessonAdmin from "../../components/admin/LessonAdmin";
import UploadMedia from "../../components/admin/UploadMedia";
import CourseForm from "../../components/admin/CourseForm";
function AddCoursePage() {
  const {
    imageUrl,
    setCoverImageError,
    setVideoTrailerError,
    videoTrailerUrl,
  } = useFormData();

  const filterSubmit = (values) => {
    imageUrl ? setCoverImageError(false) : setCoverImageError(true);
    videoTrailerUrl ? setVideoTrailerError(false) : setVideoTrailerError(true);
    if (imageUrl && videoTrailerUrl) {
      handleSubmit(values);
    } else {
      console.log("Please fill in all require information");
    }
  };

  const handleSubmit = (values) => {
    // Handle form submission
    values.coverImage = imageUrl;
    values.videoTrailer = videoTrailerUrl;
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
              <div className="text-header3 text-[2A2E3F] overflow-hidden">
                Add Course
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
                  Create
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

export default AddCoursePage;
