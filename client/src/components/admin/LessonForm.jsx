import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import errorIcon from "../../assets/registerPage/errorIcon.svg";
import { useEffect, useState } from "react";
import dragIcon from "../../assets/registerPage/drag-addlesson.svg";
import videoSubLesson from "../../assets/registerPage/videoSubLesson.svg";
import useDataCenter from "../../context/DataCenter";
import { Link, useNavigate } from "react-router-dom";
import arrowBack from "../../assets/registerPage/arrow-back.svg";

function LessonForm() {
  // const [lessonName, setLessonName] = useState("");
  // const [subLessonName, setSubLessonName] = useState("");
  const [preArrayVideo, setPreArrayVideo] = useState([]);
  const [videoSizeError, setVideoSizeError] = useState("");
  const [clickSublesson, setClickSubLesson] = useState(false);
  const [stateSubLesson, setStateSubLesson] = useState("Update");
  const [newIndex, setNewIndex] = useState([]);
  const [indexStatus, setIndexStatus] = useState([]);
  const [subLessonNameError, setSubLessonNameError] = useState(null);
  const [signError, setSignError] = useState("");
  const navigate = useNavigate();
  const {
    setAddLesson,
    addLesson,
    lessons,
    subLessonVideo,
    formValues,
    editState,
    setEditState,
    editIndex,
  } = useDataCenter();
  const initialValues = {};
  if (!addLesson) {
    try {
      initialValues.lessonName = lessons[editIndex].lesson_name;
      initialValues.subLessons = lessons[editIndex].subLesson.map((value) => {
        return {
          subLessonName: value.sub_lesson_name,
          video: value.sub_lesson_video,
        };
      });
    } catch (error) {
      // console.log(error);
    } finally {
      initialValues.lessonName = lessons[editIndex].lessonName;
      initialValues.subLessons = lessons[editIndex].subLessons.map((value) => {
        return {
          subLessonName: value.sub_lesson_name,
          video: value.sub_lesson_video,
        };
      });
    }
  } else {
    initialValues.lessonName = "";
    initialValues.subLessons = [{ subLessonName: "", video: null }];
  }
  const validationSchema = Yup.object().shape({
    lessonName: Yup.string()
      .required("Lesson name is required")
      .matches(
        /^[a-zA-Z0-9]+$/,
        "Lesson name must contain only letters or digits"
      ),
    subLessons: Yup.array().min(1, "At least one Sub-Lesson is required"),
  });

  const handleSubmit = async (values) => {
    lessons.push(values);
    subLessonVideo.push(...preArrayVideo);
    setAddLesson(false);
    console.log(values);
    // setEditState(false);
    // console.log(lessons);
  };
  // const handleUpdateInfomation = async () => {
  //   console.log(indexStatus);
  // };
  // const handleDeleteInfomation = async () => {
  //   console.log(indexStatus);
  // };
  const handleBack = () => {
    setAddLesson(false);
    setEditState(false);
  };
  // useEffect(() => {
  //   console.log(lessons);
  // });

  const [subLessons, setSubLessons] = useState([
    { subLessonName: "", video: null },
  ]);

  // const validateSubLessons = (subLessons) => {
  //   const errors = [];

  //   subLessons.forEach((subLesson, index) => {
  //     const subLessonErrors = {};

  //     if (!subLesson.subLessonName || !subLesson.subLessonName.trim()) {
  //       subLessonErrors.subLessonName = "Sub-Lesson name is required";
  //     } else if (!/^[a-zA-Z0-9\s]+$/.test(subLesson.subLessonName)) {
  //       subLessonErrors.subLessonName =
  //         "Sub-Lesson name must contain only letters or digits";
  //     }

  //     errors[index] = subLessonErrors;
  //   });

  //   return errors;
  // };

  // const validateForm = (values) => {
  //   const errors = {};

  //   const subLessonErrors = validateSubLessons(values.subLessons);
  //   if (subLessonErrors.length === 0) {
  //     errors.subLessons = "At least one Sub-Lesson is required";
  //   } else {
  //     errors.subLessons = subLessonErrors;
  //   }

  //   return errors;
  // };

  const validateSubLessonName = (subLessonName) => {
    if (!subLessonName) {
      setSubLessonNameError("Required!!!");
      setSignError(<img src={errorIcon} />);
    } else if (!/^[a-zA-Z0-9\s]+$/.test(subLessonName)) {
      setSubLessonNameError(
        "Sub-Lesson name must contain only letters or digits"
      );
      setSignError(<img src={errorIcon} />);
    } else {
      setSubLessonNameError(null);
      setSignError("");
    }
  };

  return (
    <>
      <div className="h-[92px] w-[100%] flex border-b justify-between bg-white">
        <div className="flex pl-14">
          <img
            src={arrowBack}
            className="mr-5 cursor-pointer"
            onClick={handleBack}
          />
          <div className="flex flex-col justify-center text-2xl font-medium">
            <div className="flex w-[400px] text-sm">
              <span className="text-gray-600 mr-2">Course</span>"
              {formValues.courseName.length === 0 ? "-" : formValues.courseName}
              "
            </div>
            {!editState ? (
              "Add Lesson"
            ) : (
              <div>
                <span className="text-xl text-gray-600">Lesson</span> '
                {lessons[editIndex].lessonName}'
              </div>
            )}
          </div>
        </div>
        <div className="flex items-center pr-14">
          <Link to="">
            <button className="w-[118px] h-[58px] border border-orange-500 rounded-xl font-bold text-orange-500 hover:text-white hover:bg-orange-500 mr-3">
              Cancel
            </button>
          </Link>
          {editState ? (
            ""
          ) : (
            <button
              type="submit"
              form="lessons"
              className="w-[118px] h-[58px] font-bold text-white bg-blue-500 hover:bg-blue-600 rounded-xl"
            >
              Create
            </button>
          )}
        </div>
      </div>
      <div className="bg-white w-[90%] border border-gray-200 rounded-2xl px-[100px] pt-[40px] pb-[60px] mt-8 mb-11">
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
          enableReinitialize={true}
        >
          {({ errors, touched, values }) => (
            <Form id="lessons">
              <div className="flex flex-col relative">
                <label htmlFor="lessonName">Lesson name *</label>
                <Field
                  type="text"
                  id="lessonName"
                  name="lessonName"
                  className={`w-[100%] h-[48px] border border-gray-400 rounded-xl pl-4 focus:border-orange-500 focus:outline-none mt-1 ${
                    errors.lessonName && touched.lessonName
                      ? "border-purple-500 border-2"
                      : ""
                  }`}
                />
                {errors.lessonName && touched.lessonName && (
                  <div className="error-icon absolute right-4 top-1/2 transform -translate-y-1/2">
                    <img src={errorIcon} alt="Error Icon" />
                  </div>
                )}
                <ErrorMessage
                  name="lessonName"
                  component="div"
                  className="text-purple-500 text-sm mt-1"
                />
              </div>
              <hr className="mt-10 mb-7" />
              <div className="mb-5">
                <label className="text-gray-700 text-xl font-semibold">
                  Sub-Lesson
                </label>
              </div>
              {values.subLessons.map((subLesson, index) => (
                <div
                  key={index}
                  className="bg-gray-100 border border-gray-300 rounded-xl relative py-6 px-4 mb-3"
                >
                  <div className="flex justify-between">
                    <div className="flex">
                      <img src={dragIcon} className="mr-3 h-[76px]" />
                      <div className="flex flex-col">
                        <div className="flex flex-col">
                          <label
                            htmlFor={`subLessonName_${index}`}
                            className="pl-1"
                          >
                            Sub-lesson name *
                          </label>
                          <input
                            type="text"
                            id={`subLessonName_${index}`}
                            className="relative w-[500px] h-[48px] border border-gray-400 rounded-xl pl-4 focus:border-orange-500 focus:outline-none mt-1"
                            value={subLesson.subLessonName}
                            onChange={(e) => {
                              const newSubLessons = [...subLessons];
                              newSubLessons[index].subLessonName =
                                e.target.value;
                              setSubLessons(newSubLessons);
                              validateSubLessonName(newSubLessons);
                            }}
                          />
                          {subLessonNameError && (
                            <>
                              <div className="text-purple-500 text-sm mt-1">
                                {subLessonNameError}
                              </div>
                              <img
                                src={errorIcon}
                                alt="Error Icon"
                                className=" absolute right-[36%] top-[21%] transform -translate-y-1/2"
                              />
                            </>
                          )}
                          {/* {errors.subLessons?.[index]?.subLessonName &&
                            touched.subLessons?.[index]?.subLessonName && (
                              <div className="error-icon absolute right-[35%] top-[19%] transform -translate-y-1/2">
                                <img src={errorIcon} alt="Error Icon" />
                              </div>
                            )}
                          <ErrorMessage
                            name={`subLessons[${index}].subLessonName`}
                            component="div"
                            className="text-purple-500 text-sm mt-1"
                          /> */}
                        </div>
                        <div className="flex flex-col mt-5 mb-3">
                          <label htmlFor={`video_${index}`}>Video *</label>
                          <input
                            type="file"
                            id={`video_${index}`}
                            accept=".mp4,.avi,.mov"
                            style={{ display: "none" }}
                            onChange={(event) => {
                              const selectedVideo = event.target.files[0];
                              const maxSize = 20 * 1024 * 1024; // 20MB
                              if (selectedVideo.size <= maxSize) {
                                const updatedSubLesson = {
                                  ...subLesson,
                                  sub_lesson_video: selectedVideo.name,
                                  priority: index + 1,
                                  video: URL.createObjectURL(selectedVideo),
                                };
                                const newSubLessons = [...subLessons];
                                newSubLessons[index] = updatedSubLesson;
                                setSubLessons(newSubLessons);
                                preArrayVideo.push(selectedVideo);
                                setVideoSizeError("");
                              } else {
                                setVideoSizeError(
                                  "Video file is too large. Maximum size is 20MB"
                                );
                              }
                            }}
                          />

                          <button
                            type="button"
                            className="w-[160px] h-[160px]"
                            onClick={() => {
                              document.getElementById(`video_${index}`).click();
                            }}
                          >
                            {!subLesson.video && (
                              <div className="w-[160px] h-[160px]">
                                <img src={videoSubLesson} />
                              </div>
                            )}
                            {subLesson.video && (
                              <div>
                                <video
                                  controls
                                  className="w-[160px] h-[160px] rounded-lg object-cover"
                                >
                                  <source
                                    src={subLesson.video}
                                    type={subLesson.videoType}
                                  />
                                </video>
                              </div>
                            )}
                          </button>
                          {videoSizeError && (
                            <div className="text-purple-500 text-sm mt-1">
                              {videoSizeError}
                            </div>
                          )}
                          {/* <ErrorMessage
                            name={`subLessons[${index}].video`}
                            component="div"
                            className="text-purple-500 mt-1 text-sm"
                          /> */}
                        </div>
                      </div>
                    </div>
                    {subLessons.length > 1 ? (
                      <button
                        className="text-gray-500 font-bold flex justify-start hover:text-blue-500 h-[24px]"
                        onClick={() => {
                          const newSubLessons = [...subLessons];
                          newSubLessons.splice(index, 1);
                          setSubLessons(newSubLessons);
                        }}
                      >
                        Delete
                      </button>
                    ) : (
                      <button className="text-gray-500 font-bold flex justify-start h-[24px] cursor-not-allowed">
                        Delete
                      </button>
                    )}
                  </div>
                </div>
              ))}

              <button
                type="button"
                className="px-7 py-[15px] border border-orange-500 rounded-xl text-orange-500 font-bold mt-5 hover:bg-orange-500 hover:text-white"
                onClick={() => {
                  const newSubLesson = { subLessonName: "", video: null };
                  setSubLessons([...subLessons, newSubLesson]);
                }}
              >
                + Add Sub-Lesson
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </>
  );
}
export default LessonForm;
