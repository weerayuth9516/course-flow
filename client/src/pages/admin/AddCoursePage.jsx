import React, { useEffect} from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { Link } from "react-router-dom";
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
    videoPreview,
    videoType,
    validationSchema,
    handleImagePreview,
    handleVideoPreview,
    clearImagePreview,
    clearVideoPreview,
    selectedImage,
    setSelectedImage,
  } = useFormData();

  const handleSubmit = async (values) => {
    // Handle form submission
    console.log(values);
  };

  const uploadImage = async (folderName, file) => {
    const timestamp = Date.now();
    const randomString = Math.random().toString(36).substring(7); 
    const fileName = `${timestamp}_${randomString}`;

    const filePath = `${folderName}/${fileName}`;
    const { data, error } = await supabase.storage
      .from('test_upload')
      .upload(filePath, file);
  
    if (error) {
      console.error('Error uploading image:', error);
    } else {
      console.log('Image uploaded successfully:', data);
      setSelectedImage(filePath)
    }
  };

  const deleteImage = async () => {
    const { error } = await supabase.storage
      .from('test_upload')
      .remove([selectedImage]);
  
    if (error) {
      console.error('Error deleting image:', error);
    } else {
      console.log('Image deleted successfully:');
    }
  };

  const handleButtonClick = () => {
    clearImagePreview();
    deleteImage();
  };

  useEffect(() => {
    console.log(selectedImage)
  }, []);

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
                              console.log(selectedFile)
                              setFieldValue("coverImage", selectedFile);
                              if(selectedFile){
                                uploadImage("image", selectedFile)
                              }
                              handleImagePreview(e);
                          }}
                          // style={{ display: "none" }}
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
                                onClick={handleButtonClick}
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
                <Link to="/admin/addlesson">Go to Add Lesson</Link>
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
