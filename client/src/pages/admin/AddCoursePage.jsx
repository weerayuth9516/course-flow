import React, { useState, useEffect } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { Link } from "react-router-dom";
import * as Yup from "yup";
import axios from "axios";
import errorIcon from "../../assets/loginPage/exclamation.png";
import plusIcon from "../../assets/addCourse/plus.png";
import deleteIcon from "../../assets/addCourse/delete.png";
import useFormData from "../../context/formDataContext";
import { supabase } from "../../supabase/client.js";
import Sidebar from "../../components/admin/Sidebar";
import LessonAdmin from "../../components/admin/LessonAdmin";
function AddCoursePage() {
  const {
    formValues,
    setFormValues,
    imagePreview,
    setImagePreview,
    videoPreview,
    setVideoPreview,
    videoType,
    setVideoType,
  } = useFormData();

  const validationSchema = Yup.object().shape({
    courseName: Yup.mixed()
      .required("Course name is required")
      .test(
        "max-length",
        "Course name must be at most 60 characters",
        (value) => value && value.length <= 60
      ),
    price: Yup.number()
      .required("Price is required")
      .positive("Price must be positive")
      .test(
        "is-decimal",
        "Price must have exactly 2 decimal places",
        (value) => {
          if (!value) {
            return false;
          }
          const decimalCount = (value.toString().split(".")[1] || "").length;
          return decimalCount <= 2;
        }
      ),
    totalLearningTime: Yup.number()
      .integer("Total learning time must be an integer")
      .positive("Total learning must be positive")
      .required("Total learning time is required"),
    courseSummary: Yup.string()
      .required("Course summary is required")
      .test(
        "max-length",
        "Course name must be at most 3000 characters",
        (value) => value && value.length <= 3000
      ),
    courseDetail: Yup.string()
      .required("Course detail is required")
      .test(
        "max-length",
        "Course name must be at most 5000 characters",
        (value) => value && value.length <= 5000
      ),
    coverImage: Yup.mixed()
      .required("Image is required")
      .test(
        "fileSize",
        "Maximum size is 5MB",
        (value) => value && value.size <= 5242880 // 5MB
        // (value) => !value || value.size <= 10240 //10K
      )
      .test(
        "fileType",
        "Only JPEG, PNG & GIF",
        (value) =>
          value && ["image/jpg", "image/png", "image/jpeg"].includes(value.type)
      ),
    videoTrailer: Yup.mixed()
      .required("Video file is required")
      .test(
        "fileSize",
        "Video file is too large. Maximum size is 20MB",
        (value) => value && value.size <= 20971520 // 20MB
      )
      .test(
        "fileType",
        "Only MP4, MOV, and API formats are allowed",
        (value) =>
          value && ["video/mp4", "video/mov", "video/avi"].includes(value.type)
      ),
  });

  const handleSubmit = async (values) => {
    // Handle form submission
    console.log(values);
    if (values.videoTrailer !== null || values.coverImage === null) {
      const uploadVideoResult = await supabase.storage
        .from("course_video_trailers")
        .upload(`${values.videoTrailer.name}`, values.videoTrailer, {
          cacheControl: "3600",
          upsert: true,
          contentType: `${values.videoTrailer.type}`,
        });
      const uploadImgResult = await supabase.storage
        .from("course_images")
        .upload(`${values.coverImage.name}`, values.coverImage, {
          cacheControl: "3600",
          upsert: true,
          contentType: `${values.coverImage.type}`,
        });
      if (uploadImgResult.error === null && uploadVideoResult === null) {
        ////direct to admin api.
        const courseResult = await axios.get(
          `http://localhost:4001/admin/course/created`,
          values
        );
        console.log(courseResult);
      } else {
        alert("can upload to supabase");
      }
    } else {
      alert("please select you'r video or cover image first");
    }
  };

  const handleImagePreview = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleVideoPreview = (e) => {
    const file = e.target.files[0];
    if (file) {
      const allowedVideoTypes = ["video/mp4", "video/avi", "video/mov"];

      if (allowedVideoTypes.includes(file.type)) {
        const reader = new FileReader();
        reader.onload = () => {
          setVideoType(file.type);
          setVideoPreview(reader.result);
        };
        reader.readAsDataURL(file);
      }
    }
  };

  const clearImagePreview = () => {
    setImagePreview(null);
  };
  const clearVideoPreview = () => {
    setVideoPreview(null);
  };

  return (
    <main className="w-screen flex justify-center items-center">
      <Sidebar />
      <section className="font-inter flex justify-center items-center">
        <section id="right-content w-[1200px]">
          <div className="w-full h-[92px] flex justify-center items-center border border-gray-400 border-b-0">
            <section
              id="navbar"
              className="w-[1120px] h-[92px] flex justify-between items-center"
            >
              <div className="text-header3 text-[2A2E3F] ml-[40px]">
                Add Course
              </div>
              <div className="flex justify-center items-center font-bold">
                <button className="text-orange-500 w-[117px] h-[60px] border border-orange-500 rounded-xl">
                  Cancel
                </button>
                <button
                  type="submit"
                  form="add-course"
                  onClick={handleSubmit}
                  className="text-white w-[117px] h-[60px] bg-[#2f5fac] rounded-xl ml-[20px] mr-[15px]"
                >
                  Create
                </button>
              </div>
            </section>
          </div>
          <section className="w-full bg-[#f6f7fc] flex justify-center flex-col items-center border border-gray-400">
            <div className="w-[1120px] bg-white mt-[80px] mr-[80px] ml-[80px] border border-gray-400 rounded-2xl flex justify-center items-start">
              <div className="w-[920px] text-body1 text-black">
                <Formik
                  initialValues={formValues}
                  validationSchema={validationSchema}
                  onSubmit={handleSubmit}
                >
                  {({ errors, touched, setFieldValue }) => (
                    <Form id="add-course">
                      <div className="mt-[40px] relative">
                        <label htmlFor="courseName">Course name *</label>
                        <Field
                          type="text"
                          id="courseName"
                          name="courseName"
                          onBlur={(e) => {
                            setFormValues({
                              ...formValues,
                              courseName: e.target.value,
                            });
                          }}
                          className={`w-[920px] h-[48px] border-2 border-[D6D9E4] rounded-xl text-[16px] pl-4 focus:border-orange-500 focus:outline-none mt-1 ${
                            errors.courseName && touched.courseName
                              ? "border-purple-500 border-2"
                              : ""
                          }`}
                          placeholder="Enter Course name"
                        />
                        {errors.courseName && touched.courseName && (
                          <div className="error-icon absolute right-4 top-12">
                            <img src={errorIcon} alt="Error Icon" />
                          </div>
                        )}
                        <ErrorMessage
                          name="courseName"
                          component="div"
                          className="text-purple-500 mt-2"
                        />
                      </div>
                      <div className="w-[920px] flex space-x-20 mt-[40px]">
                        <div className="relative">
                          <label htmlFor="price">Price *</label>
                          <Field
                            type="number"
                            id="price"
                            name="price"
                            onBlur={(e) => {
                              setFormValues({
                                ...formValues,
                                price: e.target.value,
                              });
                            }}
                            className={`w-[420px] h-[48px] border-2 border-[D6D9E4] rounded-xl text-[16px] pl-4 focus:border-orange-500 focus:outline-none mt-1 ${
                              errors.price && touched.price
                                ? "border-purple-500 border-2"
                                : ""
                            }`}
                            placeholder="Enter Price"
                          />
                          {errors.price && touched.price && (
                            <div className="error-icon absolute right-4 top-12">
                              <img src={errorIcon} alt="Error Icon" />
                            </div>
                          )}
                          <ErrorMessage
                            name="price"
                            component="div"
                            className="text-purple-500 mt-2"
                          />
                        </div>

                        <div className="relative">
                          <label htmlFor="totalLearningTime">
                            Total learning time *
                          </label>
                          <Field
                            type="number"
                            id="totalLearningTime"
                            name="totalLearningTime"
                            onBlur={(e) => {
                              setFormValues({
                                ...formValues,
                                totalLearningTime: e.target.value,
                              });
                            }}
                            className={`w-[420px] h-[48px] border-2 border-[D6D9E4] rounded-xl text-[16px] pl-4 focus:border-orange-500 focus:outline-none mt-1 ${
                              errors.totalLearningTime &&
                              touched.totalLearningTime
                                ? "border-purple-500 border-2"
                                : ""
                            }`}
                            placeholder="Enter Total learning time"
                          />
                          {errors.totalLearningTime &&
                            touched.totalLearningTime && (
                              <div className="error-icon absolute right-4 top-12">
                                <img src={errorIcon} alt="Error Icon" />
                              </div>
                            )}
                          <ErrorMessage
                            name="totalLearningTime"
                            component="div"
                            className="text-purple-500 mt-2"
                          />
                        </div>
                      </div>

                      <div className="mt-[40px] relative">
                        <label htmlFor="courseSummary">Course summary *</label>
                        <Field
                          as="textarea"
                          id="courseSummary"
                          name="courseSummary"
                          onBlur={(e) => {
                            setFormValues({
                              ...formValues,
                              courseSummary: e.target.value,
                            });
                          }}
                          className={`w-[920px] h-[72px] border-2 border-[D6D9E4] rounded-xl text-[16px] pl-4 pt-4 focus:border-orange-500 focus:outline-none resize-none mt-1 ${
                            errors.courseSummary && touched.courseSummary
                              ? "border-purple-500 border-2"
                              : ""
                          }`}
                          placeholder="Enter Course summary"
                        />
                        {errors.courseSummary && touched.courseSummary && (
                          <div className="error-icon absolute right-4 top-12">
                            <img src={errorIcon} alt="Error Icon" />
                          </div>
                        )}
                        <ErrorMessage
                          name="courseSummary"
                          component="div"
                          className="text-purple-500 mt-2"
                        />
                      </div>

                      <div className="mt-[40px] relative">
                        <label htmlFor="courseDetail" className="mt-[40px]">
                          Course detail *
                        </label>
                        <Field
                          as="textarea"
                          id="courseDetail"
                          name="courseDetail"
                          onBlur={(e) => {
                            setFormValues({
                              ...formValues,
                              courseDetail: e.target.value,
                            });
                          }}
                          className={`w-[920px] h-[220px] border-2 border-[D6D9E4] rounded-xl text-[16px] pl-4 pt-4 focus:border-orange-500 focus:outline-none resize-none mt-1 ${
                            errors.courseDetail && touched.courseDetail
                              ? "border-purple-500 border-2"
                              : ""
                          }`}
                          placeholder="Enter Course detail"
                        />
                        {errors.courseDetail && touched.courseDetail && (
                          <div className="error-icon absolute right-4 top-12">
                            <img src={errorIcon} alt="Error Icon" />
                          </div>
                        )}
                        <ErrorMessage
                          name="courseDetail"
                          component="div"
                          className="text-purple-500 mt-2"
                        />
                      </div>

                      <div className="w-[240px] h-[272px] mt-[40px]">
                        <label htmlFor="coverImage">Cover image *</label>
                        <input
                          type="file"
                          id="coverImage"
                          name="coverImage"
                          accept="image/*"
                          onChange={(e) => {
                            const selectedFile = e.currentTarget.files[0];
                            setFieldValue("coverImage", selectedFile);
                            handleImagePreview(e);
                            localStorage.setItem(
                              "selectedFile",
                              JSON.stringify(selectedFile)
                            );
                          }}
                          style={{ display: "none" }}
                        />

                        <button
                          type="button"
                          onClick={() =>
                            document.getElementById("coverImage").click()
                          }
                        >
                          {!imagePreview && (
                            <div className="w-[240px] h-[240px] bg-gray-100 flex justify-center items-center rounded-xl mt-2">
                              <div className="w-[93px] h-[53px] text-blue-400 flex flex-col justify-center items-center space-y-3">
                                <img src={plusIcon} />
                                <div className="text-[14px]">Upload Image</div>
                              </div>
                            </div>
                          )}

                          {imagePreview && (
                            <div className="w-[240px] h-[240px] bg-gray-100 flex justify-center items-center rounded-xl mt-2 relative">
                              <img
                                src={imagePreview}
                                alt="Preview"
                                className="object-cover w-[240px] h-[240px]"
                              />
                              <div
                                type="button"
                                className="mt-2 text-red-500 hover:text-red-700 absolute top-0 right-0"
                                onClick={clearImagePreview}
                              >
                                <img src={deleteIcon} alt="Remove Icon" />
                              </div>
                            </div>
                          )}
                        </button>
                        <ErrorMessage
                          name="coverImage"
                          component="div"
                          className="text-purple-500 mt-2"
                        />
                      </div>

                      <div className="w-[240px] h-[272px] mt-[60px] mb-[200px]">
                        <label htmlFor="videoTrailer">Video Trailer *</label>
                        <input
                          type="file"
                          id="videoTrailer"
                          name="videoTrailer"
                          accept=".mp4,.avi,.mov"
                          onChange={(e) => {
                            setFieldValue(
                              "videoTrailer",
                              e.currentTarget.files[0]
                            );
                            handleVideoPreview(e);
                          }}
                          style={{ display: "none" }}
                        />
                        <button
                          type="button"
                          onClick={() =>
                            document.getElementById("videoTrailer").click()
                          }
                        >
                          {!videoPreview && (
                            <div className="w-[240px] h-[240px] bg-gray-100 flex justify-center items-center rounded-xl mt-2">
                              <div className="w-[93px] h-[53px] text-blue-400 flex flex-col justify-center items-center space-y-3">
                                <img src={plusIcon} />
                                <div className="text-[14px]">Upload Video</div>
                              </div>
                            </div>
                          )}

                          {videoPreview && (
                            <div className="w-[240px] h-[240px] bg-gray-100 flex justify-center items-center rounded-xl mt-2 relative">
                              <video
                                controls
                                className="w-full h-full object-cover"
                              >
                                <source src={videoPreview} type={videoType} />
                              </video>
                              <div
                                type="button"
                                className="mt-2 text-red-500 hover:text-red-700 absolute top-0 right-0"
                                onClick={clearVideoPreview}
                              >
                                <img src={deleteIcon} alt="Remove Icon" />
                              </div>
                            </div>
                          )}
                        </button>
                        <ErrorMessage
                          name="videoTrailer"
                          component="div"
                          className="text-purple-500 mt-2"
                        />
                      </div>
                    </Form>
                  )}
                </Formik>
                {/* <Link to="/addlesson">Add Lesson</Link> */}
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
