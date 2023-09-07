import React from "react";
import { DebounceInput } from "react-debounce-input";
import useGetsearch from "../hook/useGetsearch";
import { Link } from 'react-router-dom'
import Header from "../components/Header";
import Footer from "../components/Footer";

function CoursePage() {
  const { searchList, inputText, setInputText, getSearchList } = useGetsearch();

  const handleInputChange = (e) => {
    const newInputText = e.target.value;
    setInputText(newInputText);
    getSearchList(newInputText);
  };

  return (
    <div className="font-inter mx-auto">
      <Header />
      <div className="bg-[url('src/assets/ourCourses/image_background.png')] bg-[length:100%_190px] bg-no-repeat">
        <div className="search-box mb-2 flex flex-col items-center mt-20 h-[230px]">
          <label htmlFor="input" className="text-black text-header2 font-bold">
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

      <div className="course-cards-container flex justify-center">
        <div className="course-cards-container grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-7">
          {/* Display course cards */}
          {searchList.map((item, index) => {
            const limitLetter =
              item.course_summary.length > 60
                ? item.course_summary.substring(0, 60) + "..."
                : item.course_summary;
            return (
              <div key={index} className="">
                <div className="course-card w-[357px] h-[475px] rounded-lg shadow-lg border border-gray-100 mb-8">
                  <div className="course-card-thumbnail">
                    <Link to={`/course/courseDetail/${item.course_id}`}>
                      <img
                        src={item.course_cover_img}
                        alt="course-image"
                        className="w-[357px] h-[240px] object-fit rounded-lg shadow-lg"
                      />
                    </Link>
                  </div>
                  <div className="description-box m-4">
                    <h3 className="mb-2 text-orange-500 text-body3">Course</h3>
                    <h2 className="font-bold mb-2 text-header3">
                    <Link to={`/course/courseDetail/${item.course_id}`}>{item.course_name}</Link>
                    </h2>
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
                      {item.course_duration} Hours
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
          {/* End display course cards */}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default CoursePage;
