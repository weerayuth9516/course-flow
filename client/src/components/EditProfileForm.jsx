import { useState, useEffect } from "react";
import useGetuser from "../hook/useGetuser";
import remove from "../assets/header/remove.png";
import { useContext } from "react";
import { SessionContext } from "../App";
import { supabase } from "../supabase/client.js";
import addImage from "../assets/header/add.png";

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
      avatarObj: fileBody,
    };
    updateUserProfileById(session.user.id, data);
  };

  const handleFileChange = (event) => {
    const file = event.target.files[event.target.files.length - 1];
    try {
      if (file) {
        setImages(URL.createObjectURL(file));
        setFileBody(file);
        setHasImage(true);
      }
    } catch (error) {
      console.log(error);
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
                className="flex items-center justify-center rounded-2xl border border-dashed bg-gray-100 border-gray-900/25 px-6 py-10 w-[358px] h-[358px]"
              >
                <div className="flex flex-col justify-center items-center">
                  <img src={addImage} />
                  <div className="mt-4 flex text-sm leading-6 text-gray-600">
                    <label
                      htmlFor="file-upload"
                      className="relative cursor-pointer rounded-md bg-white font-semibold text-blue-400 hover:text-blue-600"
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
                className="border border-gray-500 w-[453px] h-[48px] rounded-lg p-3 focus:border-orange-500 focus:outline-none"
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
                  className="border border-gray-500 w-[453px] h-[48px] rounded-lg p-3 focus:border-orange-500 focus:outline-none"
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
                  className="border border-gray-500 w-[453px] h-[48px] rounded-lg p-3 focus:border-orange-500 focus:outline-none"
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
                  className="border border-gray-500 w-[453px] h-[48px] rounded-lg p-3 focus:border-orange-500 focus:outline-none"
                  value={email}
                />
              </div>
            </label>
          </div>
          <button className="bg-blue-500 rounded-xl h-[60px] text-white font-bold hover:bg-blue-600">
            Update Profile
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditProfileForm;
