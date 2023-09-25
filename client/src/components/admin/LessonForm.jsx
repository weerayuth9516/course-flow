import { Formik, Form, Field, ErrorMessage, FieldArray } from "formik";
import * as Yup from "yup";
import errorIcon from "../../assets/registerPage/errorIcon.svg";
import { useState } from "react";
import dragIcon from "../../assets/registerPage/drag-addlesson.svg";
import videoSubLesson from "../../assets/registerPage/videoSubLesson.svg";

function LessonForm() {
  // const [lessonName, setLessonName] = useState("");
  // const [subLessonName, setSubLessonName] = useState("");
  const [video, setVideo] = useState(null);
  const [videoType, setVideoType] = useState("video/mp4");

  const initialValues = {
    lessonName: "",
    subLessons: [{ subLessonName: "", video: null }],
  };

  const validationSchema = Yup.object().shape({
    lessonName: Yup.string()
      .required("Lesson name is required")
      .matches(
        /^[a-zA-Z0-9]+$/,
        "Lesson name must contain only letters or digits"
      ),
    subLessons: Yup.array()
      .of(
        Yup.object().shape({
          subLessonName: Yup.string()
            .required("Sub-Lesson name is required")
            .matches(
              /^[a-zA-Z0-9\s]+$/,
              "Sub-Lesson name must contain only letters or digits"
            ),
          video: Yup.mixed()
            .test(
              "fileType",
              "Only .mp4, .mov, and .avi formats are allowed",
              (value) =>
                value &&
                ["video/mp4", "video/mov", "video/avi"].includes(value.type)
            )
            .test(
              "fileSize",
              "Video file is too large. Maximum size is 20MB",
              (value) => value && value.size <= 20971520 // 20MB
            )
            .required("Video is required"),
        })
      )
      .min(1, "At least one Sub-Lesson is required"),
  });

  const clearVideo = () => {
    setVideo(null);
  };
  return (
    <>
      <div className="bg-white w-[90%] border border-gray-200 rounded-2xl px-[100px] pt-[40px] pb-[60px] mt-8 mb-8">
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          // onSubmit={handleSubmit}
          enableReinitialize={true}
        >
          {({ errors, touched, values }) => (
            <Form>
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
              <FieldArray
                name="subLessons"
                render={(arrayHelpers) => (
                  <div>
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
                                  htmlFor={`subLessons[${index}].subLessonName`}
                                  className="pl-1"
                                >
                                  Sub-lesson name *
                                </label>
                                <Field
                                  type="text"
                                  id={`subLessons[${index}].subLessonName`}
                                  name={`subLessons[${index}].subLessonName`}
                                  className={`w-[500px] h-[48px] border border-gray-400 rounded-xl pl-4 focus:border-orange-500 focus:outline-none mt-1 ${
                                    errors.subLessons?.[index]?.subLessonName &&
                                    touched.subLessons?.[index]?.subLessonName
                                      ? "border-purple-500 border-2"
                                      : ""
                                  }`}
                                />
                                {errors.subLessons?.[index]?.subLessonName &&
                                  touched.subLessons?.[index]
                                    ?.subLessonName && (
                                    <div className="error-icon absolute right-[35%] top-[19%] transform -translate-y-1/2">
                                      <img src={errorIcon} alt="Error Icon" />
                                    </div>
                                  )}
                                <ErrorMessage
                                  name={`subLessons[${index}].subLessonName`}
                                  component="div"
                                  className="text-purple-500 text-sm mt-1"
                                />
                              </div>
                              <div className="flex flex-col mt-5 mb-3">
                                <label htmlFor={`subLessons[${index}].video`}>
                                  Video *
                                </label>
                                <input
                                  type="file"
                                  id={`subLessons[${index}].video`}
                                  name={`subLessons[${index}].video`}
                                  accept=".mp4,.avi,.mov"
                                  style={{ display: "none" }}
                                  onChange={(event) => {
                                    const selectedVideo = event.target.files[0];
                                    if (selectedVideo.size <= 20971520) {
                                      arrayHelpers.replace(index, {
                                        ...subLesson,
                                        video:
                                          URL.createObjectURL(selectedVideo),
                                        videoType: selectedVideo.type,
                                      });
                                    }
                                  }}
                                />
                                <button
                                  type="button"
                                  className="w-[160px] h-[160px]"
                                  onClick={() =>
                                    document
                                      .getElementById(
                                        `subLessons[${index}].video`
                                      )
                                      .click()
                                  }
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
                                <ErrorMessage
                                  name={`subLessons[${index}].video`}
                                  component="div"
                                  className="text-purple-500 mt-1 text-sm"
                                />
                              </div>
                            </div>
                          </div>

                          {values.subLessons.length > 1 ? (
                            <button
                              type="button"
                              className="text-gray-500 font-semibold flex justify-start hover:text-black h-[24px]"
                              onClick={() => arrayHelpers.remove(index)}
                            >
                              Delete
                            </button>
                          ) : (
                            <button
                              type="button"
                              className="text-gray-500 font-semibold flex justify-start h-[24px] cursor-not-allowed"
                            >
                              Delete
                            </button>
                          )}
                        </div>
                      </div>
                    ))}

                    <button
                      type="button"
                      className="px-7 py-[15px] border border-orange-500 rounded-xl text-orange-500 font-bold mt-5 hover:bg-orange-500 hover:text-white"
                      onClick={() =>
                        arrayHelpers.insert(values.subLessons.length, {
                          subLessonName: "",
                          video: null,
                        })
                      }
                    >
                      + Add Sub-Lesson
                    </button>
                  </div>
                )}
              />
            </Form>
          )}
        </Formik>
      </div>
    </>
  );
}
export default LessonForm;
