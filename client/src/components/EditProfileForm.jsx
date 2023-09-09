import { useState, useEffect } from "react";
import useGetuser from "../hook/useGetuser";
import remove from "../assets/header/remove.png";
import { useContext } from "react";
import { SessionContext } from "../App";
import { supabase } from "../supabase/client.js";
import addImage from "../assets/header/add.png";

import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

function EditProfileForm() {
  const { user, getCurrentUser, updateUserProfileById } = useGetuser();
  const [name, setName] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [education, setEducation] = useState("");
  const [email, setEmail] = useState("");
  const [images, setImages] = useState("");
  const [fileBody, setFileBody] = useState({});
  const [hasImage, setHasImage] = useState(false);
  const { session, setSession } = useContext(SessionContext);

  const [errorMessage, setErrorMessage] = useState("");

  // const validationSchema = Yup.object({
  //   name: Yup.string().required("Name is required"),
  //   birthDate: Yup.date()
  //     .max(new Date(), "Date of Birth cannot be in the future")
  //     .required("Date of Birth is required"),
  //   education: Yup.string().required("Educational Background is required"),
  //   email: Yup.string()
  //     .email("Invalid email address")
  //     .required("Email is required"),
  // });

  // function validateText(value) {
  //   let error;
  //   if (value === null) {
  //     error = "Requried !";
  //   } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
  //     error = "Invalid email address !";
  //   }
  //   return error;
  // }

  const handleRemoveImage = async (event) => {
    event.preventDefault();
    setImages({});
    setHasImage(false);
  };

  useEffect(() => {
    if (session) {
      getCurrentUser(session.user.id);
    } else {
      getCurrentUser(null);
    }
  }, [session]);

  useEffect(() => {
    if (user) {
      setName(user.user_name);
      setBirthDate(user.user_dob);
      setEducation(user.user_education);
      setEmail(user.user_email);
      if (user.user_avatar === null) {
        setHasImage(false);
      } else {
        setHasImage(true);
        try {
          setImages(user.user_avatar);
        } catch {
          console.log("Awaiting for loading Img Path");
        }
      }
    }
  }, [user]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = {
      user_name: name,
      user_dob: birthDate,
      user_education: education,
      user_email: email,
      avatarObj: fileBody,
    };
    updateUserProfileById(session.user.id, data);
  };

  const handleFileChange = (event) => {
    const file = event.target.files[event.target.files.length - 1];
    const typeFile = file.name.substring(file.name.lastIndexOf(".") + 1);
    if (file.size > 2097152) {
      setHasImage(false);
      setErrorMessage("File too large!");
    } else if (
      typeFile.toLowerCase() === "jpg" ||
      typeFile.toLowerCase() === "png" ||
      typeFile.toLowerCase() === "jpeg"
    ) {
      try {
        if (file) {
          setImages(URL.createObjectURL(file));
          setFileBody(file);
          setHasImage(true);
          setErrorMessage("");
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      setHasImage(false);
      setErrorMessage("File Only JPG, PNG, JPEG !");
    }
  };

  return (
    <div
      id="edit-profile-container"
      className=" flex flex-col items-center justify-center bg-[url('src/assets/ourCourses/image_background.png')] bg-no-repeat bg-[length:100%_190px] bg-[center_top_5rem] h-[955px]"
    >
      <span className=" text-header2  font-medium">Profile</span>
      {/* <Formik initialValues={{ email: "" }}> */}
      <Formik>
        <Form
          onSubmit={handleSubmit}
          className="flex flex-row items-start justify-between text-body2 mt-[100px] w-[930px] h-[521px]"
        >
          <div id="image-preview" className="col-span-full">
            <label>
              {hasImage ? (
                <div id="user-image" className="relative">
                  <img
                    src={images}
                    alt="User image"
                    className="flex items-center justify-center rounded-2xl w-[358px] h-[358px]"
                  />

                  <button
                    className="absolute top-[6px] left-[320px] bg-purple-600 w-[32px] h-[32px] rounded-full flex justify-center items-center text-white text-header3 font-light"
                    onClick={(event) => handleRemoveImage(event)}
                  >
                    <img src={remove} alt="Remove Image" />
                  </button>
                </div>
              ) : (
                <div
                  id="hasnot-image"
                  className={`flex items-center justify-center rounded-2xl border border-dashed bg-gray-100 border-gray-900/25 px-6 py-10 w-[358px] h-[358px]  ${
                    errorMessage && "border-purple-500 border-2"
                  }`}
                >
                  <div className="flex flex-col justify-center items-center group">
                    <img
                      src={addImage}
                      className="scale-100 group-hover:scale-110"
                    />

                    <div className="mt-4 flex text-sm leading-6 text-gray-600">
                      <label
                        htmlFor="file-upload"
                        className={`relative cursor-pointer rounded-md bg-white font-semibold text-blue-400 scale-100 group-hover:scale-110 ${
                          errorMessage && "text-purple-500"
                        }`}
                      >
                        <span>Upload image</span>
                        <input
                          id="file-upload"
                          name="file-upload"
                          type="file"
                          className="sr-only"
                          onChange={handleFileChange}
                        />
                      </label>
                    </div>
                    <p
                      className={`text-xs leading-5 text-gray-600 ${
                        errorMessage && "text-purple-500"
                      }`}
                    >
                      PNG, JPG, JPEG up to 2MB
                    </p>
                  </div>
                </div>
              )}
              {errorMessage && (
                <div className="text-purple-500 font-bold p-5">
                  {errorMessage}
                </div>
              )}
            </label>
          </div>

          <div
            id="input-container"
            className="flex flex-col justify-between w-[453px] h-[521px] "
          >
            <div className="flex-col">
              <label>Name</label>
              <div>
                <Field
                  id="name"
                  name="name"
                  type="text"
                  className="border border-gray-500 w-[453px] h-[48px] rounded-lg p-3 focus:border-orange-500 focus:outline-none"
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                  value={name}
                />
                {/* <ErrorMessage
                  name="name"
                  component="div"
                  className="text-red-500"
                /> */}
              </div>
            </div>
            <div>
              <label>
                Date of Birth
                <div>
                  <Field
                    id="birthDate"
                    name="birthDate"
                    type="date"
                    className="border border-gray-500 w-[453px] h-[48px] rounded-lg p-3 focus:border-orange-500 focus:outline-none"
                    onChange={(e) => {
                      setBirthDate(e.target.value);
                    }}
                    value={birthDate}
                  />
                  {/* <ErrorMessage
                    name="birthDate"
                    component="div"
                    className="text-red-500"
                  /> */}
                </div>
              </label>
            </div>
            <div>
              <label>
                Education Background
                <div>
                  <Field
                    id="education"
                    name="education"
                    type="text"
                    className="border border-gray-500 w-[453px] h-[48px] rounded-lg p-3 focus:border-orange-500 focus:outline-none"
                    onChange={(e) => {
                      setEducation(e.target.value);
                    }}
                    value={education}
                  />
                  {/* <ErrorMessage
                    name="education"
                    component="div"
                    className="text-red-500"
                  /> */}
                </div>
              </label>
            </div>
            <div>
              <label>
                Email
                <div>
                  <Field
                    id="email"
                    name="email"
                    type="text"
                    className="border border-gray-500 w-[453px] h-[48px] rounded-lg p-3 focus:border-orange-500 focus:outline-none"
                    value={email}
                    // validate={validateText}
                  />
                  {/* <ErrorMessage
                    name="email"
                    component="div"
                    className="text-red-500"
                  /> */}
                </div>
              </label>
            </div>
            <button className="bg-blue-500 rounded-xl h-[60px] text-white font-bold hover:bg-blue-600">
              Update Profile
            </button>
          </div>
        </Form>
      </Formik>
    </div>
  );
}

export default EditProfileForm;
