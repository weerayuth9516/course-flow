import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import useDataCenter from "../../context/DataCenter";
import Sidebar from "../../components/admin/Sidebar";
import LessonAdmin from "../../components/admin/LessonAdmin";
import LessonForm from "../../components/admin/LessonForm";
import UploadMedia from "../../components/admin/UploadMedia";
import CourseForm from "../../components/admin/CourseForm";
function AddCoursePage() {
  const {
    setCoverImageError,
    setVideoTrailerError,
    selectedImage,
    selectedVideoTrailer,
    lessons,
    subLessonVideo,
    handleCancelButton,
  } = useDataCenter();

  const filterSubmit = (values) => {
    selectedImage ? setCoverImageError(false) : setCoverImageError(true);
    selectedVideoTrailer
      ? setVideoTrailerError(false)
      : setVideoTrailerError(true);
    if (selectedImage && selectedVideoTrailer) {
      handleSubmit(values);
    } else {
      console.log("Please fill in all require information");
    }
  };

  const handleSubmit = async (values) => {
    // Handle form submission
    values.course_cover_img = selectedImage.name;
    values.course_video_trailer = selectedVideoTrailer.name;
    values.course_img = selectedImage;
    values.videoTrailer = selectedVideoTrailer;
    const courseDetail = {
      course_name: values.courseName,
      course_price: values.price,
      course_summary: values.courseSummary,
      course_detail: values.courseDetail,
      course_cover_image: values.course_cover_img,
      course_video_trailer: values.course_video_trailer,
      course_duration: values.totalLearningTime,
    };
    const lessonsDetail = lessons.map((value) => {
      return {
        priority: value.priority,
        lesson_name: value.lessonName,
        sub_lesson: value.subLessons.map((subValue) => {
          return {
            priority: subValue.priority,
            sub_lesson_name: subValue.subLessonName,
            sub_lesson_video: subValue.sub_lesson_video,
          };
        }),
      };
    });
    const courseCoverImgFile = values.course_img;
    const courseVideoTrailerFile = values.videoTrailer;
    const subLessonVideoFile = [...subLessonVideo];
    const formData = new FormData();
    for (let key in courseDetail) {
      formData.append(`courseDetail[${key}]`, courseDetail[key]);
    }
    lessonsDetail.map((value, index) => {
      for (let key in value) {
        if (key === "sub_lesson") {
          const newValue = value[key][0];
          for (let subKey in newValue) {
            formData.append(
              `lessonsDetail[${index}][${key}][${subKey}]`,
              newValue[subKey]
            );
          }
        } else {
          formData.append(`lessonsDetail[${index}][${key}]`, value[key]);
        }
      }
    });
    formData.append("courseCoverImgFile", courseCoverImgFile);
    formData.append("courseVideoTrailerFile", courseVideoTrailerFile);
    subLessonVideoFile.map((value) => {
      formData.append("subLessonVideoFile", value);
    });
    ///** TOO EASY I DONT USE THAT. ***/
    // formData.append("courseDetail", JSON.stringify(courseDetail));
    // formData.append("lessonsDetail", JSON.stringify(lessonsDetail));
    ///** TOO EASY I DONT USE THAT. ***/
    const response = await axios.post(
      "http://localhost:4001/admin/course/created",
      formData,
      {
        headers: { "Content-Type": "multipart/form-data" },
      }
    );
    // console.log(response);
    // const lessons = [...lessons];
    // console.log(course_detail);
    // if (
    //   values.hasOwnProperty("coverImage") &&
    //   values.hasOwnProperty("videoTrailer")
    // ) {
    //   setTimeout(() => {
    //     window.location.reload();
    //     navigate("/admin/courselist");
    //   }, 2000);
    // }
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
                <button
                  onClick={handleCancelButton}
                  className="text-orange-500 w-[117px] h-[60px] border border-orange-500 rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  form="add-course"
                  className="text-white w-[117px] h-[60px] bg-[#2f5fac] rounded-xl ml-[20px] mr-[15px]"
                >
                  Create
                </button>
              </div>
            </section>
          </div>
          <section className="w-full bg-[#f6f7fc] flex justify-center flex-col items-center">
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
      </section>
    </main>
  );
}

export default AddCoursePage;
