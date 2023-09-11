import React from "react";
import useGetsearch from "../hook/useGetsearch";
import { useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import DisplayCards from "../components/DisplayCards";

function MyCoursePage() {
  const { searchList, getSearchList } = useGetsearch();
  const limit = 12;

  useEffect(() => {
    getSearchList("", limit);
  }, []);

  return (
    <div id="container" className="font-inter mx-auto">
      <Header />
      <div className="bg-[url('src/assets/ourCourses/image_background.png')] bg-[length:100%_190px] bg-no-repeat">
        <div className="search-box mb-2 flex flex-col items-center mt-20 h-[230px]">
          <div className="title text-black text-header2 font-bold mb-5">
            My Course
          </div>
          <div className="flex space-x-10 mt-12">
            <button className="transform hover:scale-110 transition-transform duration-300 ease-in-out hover:shadow-lg text-gray-700 focus:text-black focus:border-b focus:border-b-1 focus: border-black p-2">
              All Course
            </button>
            <button className="transform hover:scale-110 transition-transform duration-300 ease-in-out hover:shadow-lg text-gray-700 focus:text-black focus:border-b focus:border-b-1 focus: border-black p-2">
              Inprogress
            </button>
            <button className="transform hover:scale-110 transition-transform duration-300 ease-in-out hover:shadow-lg text-gray-700 focus:text-black focus:border-b focus:border-b-1 focus: border-black p-2">
              Completed
            </button>
          </div>
        </div>
      </div>
      <div className="user-image-and-course-container flex justify-center">
        <div className="user-box sticky top-0 w-[357px] h-[396px] rounded-lg shadow-lg mr-10 flex flex-col justify-center items-center">
          <div>
            <img src="src/assets/myCourse/profile.png" alt="user-image" />
          </div>
          <div className="mt-5 text-header3 text-gray-800">My Maxfield</div>
          <div className="w-[309px] h-[134px] flex justify-center space-x-4 mt-8">
            <div className="w-[143px] h-[134px] border-2 rounded-lg shadow-lg bg-gray-200 flex flex-col space-y-8  transform hover:scale-110 transition-transform duration-300 ease-in-out hover:shadow-lg">
              <div className="mt-3 ml-3 text-body2 text-gray-700">
                <div>Course</div>
                <div>Inprogress</div>
              </div>
              <div className="ml-3 mb-3 font-bold text-header3">3</div>
            </div>
            <div className="w-[143px] h-[134px] border-2 rounded-lg shadow-lg bg-gray-200 flex flex-col space-y-8  transform hover:scale-110 transition-transform duration-300 ease-in-out hover:shadow-lg">
              <div className="mt-3 ml-3 text-body2 text-gray-700">
                <div>Course</div>
                <div>Complete</div>
              </div>
              <div className="ml-3 mb-3 font-bold text-header3">2</div>
            </div>
          </div>
        </div>
        <div className="course-cards-container flex justify-center mb-[150px]">
          <div className="course-cards-container grid grid-cols-2 gap-10">
          <DisplayCards searchList={searchList}/>
          </div>
        </div>
      </div>
      <Footer/>
    </div>
  );
}

export default MyCoursePage;
