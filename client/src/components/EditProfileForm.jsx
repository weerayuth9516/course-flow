import { useState, userEffect } from "react";
import { useParams } from "react-router-dom";

function EditProfileForm() {
  const params = useParams();
  const [name, setName] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [education, setEducation] = useState("");
  const [email, setEmail] = useState("");
  //   const [images, setImages] = userState({});

  //   const handleRemoveImage = (event, imageKey) => {
  //     event.preventDefault();
  //     delete images[imageKey];
  //     setImages({ ...images });
  //   };

  return (
    <form className="flex">
      <div className="col-span-full">
        <label>
          <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
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
                  />
                </label>
              </div>
              <p className="text-xs leading-5 text-gray-600">
                PNG, JPG, JPEG up to 2MB
              </p>
            </div>
          </div>
        </label>
      </div>
      <div id="image-container">
        <label htmlFor="upload">
          Image
          <input
            id="upload"
            name="image"
            type="file"
            placeholder="Upload your image file"
            hidden
          />
          {/* <div id="image-list-preview-container">
    {Object.keys(images).map((imageKey)=>{
        const file = images[imageKey]
        return(
            <div key={imageKey}>
                <img
                id="image-preview"
                src={URL.createObjectURL(file)}
                alt={file.name}
                />
                <button
                className=""
                onClick={(event)=> handleRemoveImage(event,imageKey)}
                >
                    x
                </button>
            </div>
        )
    })}
</div> */}
        </label>
      </div>
      <div id="input-container" className="felx-col">
        <div className="flex-col">
          <label>Name</label>
          <div>
            <input
              id="name"
              name="name"
              type="text"
              // onChange={(e) => {
              //   setName(e.target.value);
              // }}
              // value={user_firstname}
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
                // onChange={(e) => {
                //   setName(e.target.value);
                // }}
                // value={user_dob}
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
                // onChange={(e) => {
                //   setName(e.target.value);
                // }}
                // value={user_education}
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
                // onChange={(e) => {
                //   setName(e.target.value);
                // }}
                // value={user_email}
              />
            </div>
          </label>
        </div>
      </div>
    </form>
  );
}

export default EditProfileForm;
