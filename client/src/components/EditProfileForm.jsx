import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import useGetuser from "../hook/useGetuser";
import remove from "../assets/header/remove.png";
import { useContext } from "react";
import { SessionContext } from "../App";
import { supabase } from "../supabase/client.js";

function EditProfileForm() {
  const {
    user,
    getCurrentUser,
    updateUserProfileById,
    updateAvatarProfilById,
  } = useGetuser();
  const [name, setName] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [education, setEducation] = useState("");
  const [email, setEmail] = useState("");
  const [images, setImages] = useState({});
  const [hasImage, setHasImage] = useState(false);
  const { session, setSession } = useContext(SessionContext);

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

    const formData = new FormData();

    formData.append("user_name", name);
    formData.append("user_dob", birthDate);
    formData.append("user_education", education);
    formData.append("user_avatar", images);

    updateUserProfileById(session.user.id, formData);
    console.log(name);
    console.log(formData);
    console.log(images);
  };

  const handleFileChange = (event) => {
    const uniqueId = Date.now();
    const file = event.target.files[event.target.files.length - 1];
    console.log(file);
    console.log(URL.createObjectURL(file));
    if (file) {
      setImages(URL.createObjectURL(file));
      setHasImage(true);
    }
  };

  return (
    <div
      id="edit-profile-container"
      className=" flex flex-col items-center justify-center bg-[url('src/assets/ourCourses/image_background.png')] bg-no-repeat bg-[length:100%_190px] bg-[center_top_5rem] h-[955px]"
    >
      <span className=" text-header2  font-medium">Profile</span>
      <form
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
                className="flex items-center justify-center rounded-2xl border border-dashed border-gray-900/25 px-6 py-10 w-[358px] h-[358px]"
              >
                <div className="text-center">
                  <svg
                    className="mx-auto h-12 w-12 text-gray-300"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M1.5 6a2.25 2.25 0 012.25-2.25h16.5A2.25 2.25 0 0122.5 6v12a2.25 2.25 0 01-2.25 2.25H3.75A2.25 2.25 0 011.5 18V6zM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0021 18v-1.94l-2.69-2.689a1.5 1.5 0 00-2.12 0l-.88.879.97.97a.75.75 0 11-1.06 1.06l-5.16-5.159a1.5 1.5 0 00-2.12 0L3 16.061zm10.125-7.81a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <div className="mt-4 flex text-sm leading-6 text-gray-600">
                    <label
                      htmlFor="file-upload"
                      className="relative cursor-pointer rounded-md bg-white font-semibold text-blue-600 hover:text-blue-400"
                    >
                      <span>Upload your image</span>
                      <input
                        id="file-upload"
                        name="file-upload"
                        type="file"
                        className="sr-only"
                        onChange={handleFileChange}
                      />
                    </label>
                  </div>
                  <p className="text-xs leading-5 text-gray-600">
                    PNG, JPG, JPEG up to 2MB
                  </p>
                </div>
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
              <input
                id="name"
                name="name"
                type="text"
                className="border border-gray-500 w-[453px] h-[48px] rounded-lg p-3"
                onChange={(e) => {
                  setName(e.target.value);
                }}
                value={name}
              />
            </div>
          </div>
          <div>
            <label>
              Date of Birth
              <div>
                <input
                  id="birthDate"
                  name="birthDate"
                  type="date"
                  className="border border-gray-500 w-[453px] h-[48px] rounded-lg p-3"
                  onChange={(e) => {
                    setBirthDate(e.target.value);
                  }}
                  value={birthDate}
                />
              </div>
            </label>
          </div>
          <div>
            <label>
              Education Background
              <div>
                <input
                  id="education"
                  name="education"
                  type="text"
                  className="border border-gray-500 w-[453px] h-[48px] rounded-lg p-3"
                  onChange={(e) => {
                    setEducation(e.target.value);
                  }}
                  value={education}
                />
              </div>
            </label>
          </div>
          <div>
            <label>
              Email
              <div>
                <input
                  id="email"
                  name="email"
                  type="text"
                  className="border border-gray-500 w-[453px] h-[48px] rounded-lg p-3 "
                  value={email}
                />
              </div>
            </label>
          </div>
          <button className="bg-blue-500 rounded-xl h-[60px] text-white font-bold">
            Update Profile
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditProfileForm;
