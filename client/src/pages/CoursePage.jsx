import React from "react";
import { DebounceInput } from "react-debounce-input";
import useGetsearch from "../hook/useGetsearch";

function CoursePage() {
  const { searchList, inputText, setInputText, getSearchList } = useGetsearch();

  const handleInputChange = (e) => {
    const newInputText = e.target.value;
    setInputText(newInputText);
    getSearchList(newInputText);
  };

  return (
    <div className="container">
     <div className="bg-[url('src/assets/ourCourses/image_background.png')] bg-container bg-center bg-no-repeat h-[190px]">
      <div className="search-box mb-4 flex flex-col items-center mt-40">
        <label htmlFor="input" className="text-gray-700 text-4xl font-bold">
          Our Courses
        </label>
        <div className="relative mt-12">
          <img
            src="src/assets/ourCourses/search.png"
            alt="Image icon"
            className="inline absolute left-2 top-3"
          />
          <DebounceInput
            minLength={2}
            id="message-text"
            name="message-text"
            type="text"
            value={inputText}
            className="w-[357px] h-[48px] pl-10 border rounded-lg py-2 px-3 focus:outline-none focus:border-blue-400"
            placeholder="Search..."
            debounceTimeout={500}
            onChange={handleInputChange}
          />
        </div>
      </div>
      </div>
    
      <div className="course-cards-container flex justify-center m-20">
        <div className="course-cards-container grid grid-cols-12 gap-7">

        {/* Display course cards */}
        {searchList.map((item, index) => {
    const limitLetter =
      item.course_detail.length > 70
        ? item.course_detail.substring(0, 70) + "..."
        : item.course_detail;
    return (
    <div key={index} className="col-span-4">
      <div className="course-card w-[357px] h-[475px] rounded-lg shadow-lg border border-gray-100 mb-8">
        <div className="course-card-thumnail">
          <img
            src={item.course_cover_img}
            alt="Description of the image"
            className="w-[357px] h-[240px] object-cover rounded-lg shadow-lg"
          />
        </div>
        <div className="description-box m-4">
          <h3 className="mb-2 text-orange-500">Course</h3>
          <h2 className="font-bold text-2xl mb-2">{item.course_name}</h2>
          <div className="course-detail">
            <p>{limitLetter}</p>
          </div>

        </div>
        <div className="course-card-footer mt-10">
          <hr className="border-t border-gray-300 my-4 w-full" />
            <span>
              <img
                src="src/assets/ourCourses/Frame.png"
                alt="Image icon"
                className="inline mr-2 ml-4"
              />
              6 Lessons
            </span>
            <span className="ml-5">
              <img
                src="src/assets/ourCourses/Vectors.png"
                alt="Image icon"
                className="inline mr-2 ml-4"
              />
              {item.course_learning_time} Hours
            </span>
          </div>
      </div>
    </div>
  );
    })}
         {/* End display course cards */}

        </div>
      </div>
    </div>
  );
}

export default CoursePage;
