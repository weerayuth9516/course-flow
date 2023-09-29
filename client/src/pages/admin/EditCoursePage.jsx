import React, { useState, useEffect } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import useDataCenter from "../../context/DataCenter";
import Sidebar from "../../components/admin/Sidebar";
import LessonAdmin from "../../components/admin/LessonAdmin";
import UploadMedia from "../../components/admin/UploadMedia";
import CourseForm from "../../components/admin/CourseForm";
import arrowBack from "../../assets/registerPage/arrow-back.svg";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import { DeleteCourseEdit } from "../../components/admin/ConfirmDeleteModal";
import { DeleteLesson } from "../../components/admin/ConfirmDeleteModal";
import LessonForm from "../../components/admin/LessonForm";

function EditCoursePage() {
  const { formValues, setFormValues } = useDataCenter();
  const [loading, setLoading] = useState(false);
  const params = useParams();
  const {
    imageServerUrl,
    setImageServerUrl,
    videoTrailerServerUrl,
    setVideoTrailerServerUrl,
    setCoverImageError,
    setVideoTrailerError,
    selectedImage,
    selectedVideoTrailer,
    firstTimeFetch,
    setFirstTimeFetch,
    handleCancelButton,
    addLesson,
    editState,
    setEditState,
    lessons,
    setLessons,
    lessonId,
    lessonLength,
    setLessonLength,
  } = useDataCenter();
  const navigate = useNavigate();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const filterSubmit = (values) => {
    selectedImage || imageServerUrl
      ? setCoverImageError(false)
      : setCoverImageError(true);

    selectedVideoTrailer || videoTrailerServerUrl
      ? setVideoTrailerError(false)
      : setVideoTrailerError(true);

    if (
      (selectedImage || imageServerUrl) &&
      (selectedVideoTrailer || videoTrailerServerUrl)
    ) {
      handleSubmit(values);
    } else {
      console.log("Please fill in all require information");
    }
  };

  const handleSubmit = async (values) => {
    // Handle form submission
    setLoading(true);
    const formData = new FormData();
    const courseDetail = {
      course_name: values.courseName,
      course_price: values.price,
      course_summary: values.courseSummary,
      course_detail: values.courseDetail,
      course_cover_image: values.course_cover_img,
      course_video_trailer: values.course_video_trailer,
      course_duration: values.totalLearningTime,
    };
    const courseCoverImgFile = selectedImage;
    const courseVideoTrailerFile = selectedVideoTrailer;
    console.log(courseDetail);
    for (let key in courseDetail) {
      formData.append(`courseDetail[${key}]`, courseDetail[key]);
    }
    formData.append("courseCoverImgFile", courseCoverImgFile);
    formData.append("courseVideoTrailerFile", courseVideoTrailerFile);
    console.log(courseCoverImgFile);
    try {
      const response = await axios.put(
        `http://localhost:4001/admin/updated/${params.courseId}`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
    // if (
    //   values.hasOwnProperty("coverImage") &&
    //   values.hasOwnProperty("videoTrailer")
    // ) {
    //   setTimeout(() => {
    //     // window.location.reload();
    //     // navigate("/admin/courselist");
    //   }, 2000);
    // }
  };

  const getCourseData = async () => {
    setLoading(true);
    lessons.length = 0;
    try {
      const response = await axios.get(
        `http://localhost:4001/admin/courses/${params.courseId}`
      );
      if (lessons.length === 0) {
        lessons.push(...response.data.data.lessons);
      }
      setFormValues({
        ...formValues,
        courseName: response.data.data.course[0].course_name,
        price: response.data.data.course[0].course_price,
        totalLearningTime: response.data.data.course[0].course_duration,
        courseSummary: response.data.data.course[0].course_summary,
        courseDetail: response.data.data.course[0].course_detail,
        public_status: response.data.data.course[0].public_status,
      });
      setImageServerUrl(response.data.data.course[0].course_cover_img);
      setVideoTrailerServerUrl(
        response.data.data.course[0].course_video_trailer
      );
    } catch (error) {
      console.log("request error");
    }
    setLoading(false);
  };

  const deleteCourse = async () => {
    try {
      const response = await axios.delete(
        `http://localhost:4001/admin/courses/${params.courseId}`
      );
      setCompleteDeleted(response.data.message);
    } catch (error) {
      console.log("request error");
    }
  };

  const deleteLessonList = async () => {
    try {
      const response = await axios.delete(
        `http://localhost:4001/admin/lessons/${lessonId}/${params.courseId}`
      );
      console.log(response.data.message);
    } catch (error) {
      console.log("request error");
    }
  };

  const getLessonList = async () => {
    try {
      const response = await axios.get(
        `http://localhost:4001/admin/courses/${params.courseId}`
      );
      setLessons(response.data.data.lessons);
    } catch (error) {
      console.log("request error");
    }
  };

  const handleDeleteLesson = () => {
    deleteLessonList();
    closeDeleteModal();
  };

  useEffect(() => {
    setLessonLength(lessons.length);
    getLessonList();
  }, [lessonLength, lessons]);

  const openDeleteModal = () => {
    setShowDeleteModal(true);
  };

  const closeDeleteModal = () => {
    setShowDeleteModal(false);
  };

  useEffect(() => {
    setLessonLength(lessons.length);
    getLessonList();
  }, [lessonLength, lessons]);

  const handleDeleteCourse = () => {
    deleteCourse();
    closeDeleteModal();
    setTimeout(() => {
      navigate("/admin/courselist");
    }, 2000);
  };

  useEffect(() => {
    if (firstTimeFetch) {
      getCourseData();
      setFirstTimeFetch(false);
      setEditState(false);
      // console.log(editState);
    }
  }, []);

  return (
    <>
      <main className=" flex w-screen">
        <Sidebar />
        <section className="font-inter flex flex-col justify-center items-center w-full">
          {/* <section id="right-content"> */}
          <div
            className={
              `w-full flex justify-center items-center` +
              (!addLesson ? `h-[92px]` : ``)
            }
          >
            {addLesson || editState ? (
              ""
            ) : (
              <section
                id="navbar"
                className="w-full h-[92px] flex justify-between items-center px-20 border-b border-gray-400"
              >
                <div className="text-header3 text-[2A2E3F] overflow-hidden flex">
                  <img
                    src={arrowBack}
                    className="mr-5 cursor-pointer"
                    onClick={() => navigate("/admin/courselist")}
                  />
                  <h6>
                    <span className="text-gray-600">Course</span> '
                    {formValues.courseName}'
                  </h6>
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
                    className="text-white w-[117px] h-[60px] bg-[#2f5fac] rounded-xl ml-[20px]"
                  >
                    Edit
                  </button>
                </div>
              </section>
            )}
          </div>
          <section className="w-full bg-[#f6f7fc] flex justify-center flex-col items-center">
            {loading ? (
              // <Oval
              //   ariaLabel="loading-indicator"
              //   height={500}
              //   width={500}
              //   strokeWidth={1}
              //   strokeWidthSecondary={1}
              //   color="gray"
              //   secondaryColor="white"
              // />
              // <h1 className="h-screen text-center text-justify">
              //   Uploading Data...
              // </h1>
              <Box sx={{ display: "flex" }} className="h-[90vh] bg-gray-100">
                <CircularProgress size="20rem" className="mt-[20vh]" />
              </Box>
            ) : (
              <>
                {addLesson || editState ? (
                  <>
                    <LessonForm />
                    <div
                      onClick={() => {
                        openDeleteModal();
                      }}
                      className="w-[85%] text-blue-500 font-bold text-right mt-[72px] mb-[93px] inline cursor-pointer"
                    >
                      Delete Lesson
                    </div>
                  </>
                ) : (
                  <section className="w-full bg-[#f6f7fc] flex justify-center flex-col items-center">
                    <div className="w-[85%] bg-white mt-[80px] mx-auto border border-gray-400 rounded-2xl flex justify-center items-start">
                      <div className="px-20 text-body1 text-black">
                        <CourseForm filterSubmit={filterSubmit} />
                        <UploadMedia />
                      </div>
                    </div>
                    <LessonAdmin />
                    <div
                      onClick={() => {
                        openDeleteModal();
                      }}
                      className="w-[85%] text-blue-500 font-bold text-right mt-[72px] mb-[93px] inline cursor-pointer"
                    >
                      Delete Course
                    </div>
                  </section>
                )}
              </>
            )}
          </section>
          {/* </section> */}
        </section>
      </main>
      <DeleteCourseEdit
        isOpen={showDeleteModal}
        onRequestClose={closeDeleteModal}
        handleConfirm={handleDeleteCourse}
      />
      <DeleteLesson
        isOpen={showDeleteModal}
        onRequestClose={closeDeleteModal}
        handleConfirm={handleDeleteLesson}
      />
    </>
  );
}

export default EditCoursePage;
