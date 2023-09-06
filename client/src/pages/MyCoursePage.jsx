import React from "react";
import useGetsearch from "../hook/useGetsearch";
import Header from "../components/Header";

function MyCoursePage() {
  const { searchList } = useGetsearch();

  return (
    <div id="container" className="font-inter mx-auto">
      <Header />
      <div className="bg-[url('src/assets/ourCourses/image_background.png')] bg-[length:100%_190px] bg-no-repeat">
        <div className="search-box mb-2 flex flex-col items-center mt-20 h-[230px]">
          <div className="title text-black text-header2 font-bold mb-5">
            My Course
          </div>
          <div className="flex space-x-4 mt-12">
            <button className="text-gray-700 focus:text-black focus:border-b focus:border-b-1 focus: border-black pb-2">
              All Course
            </button>
            <button className="text-gray-700 focus:text-black focus:border-b focus:border-b-1 focus: border-black pb-2">
              Inprogress
            </button>
            <button className="text-gray-700 focus:text-black focus:border-b focus:border-b-1 focus: border-black pb-2">
              Completed
            </button>
          </div>
        </div>
      </div>
      <div className="user-image-and-course-container flex justify-center">
        <div className="user-box sticky top-0 w-[357px] h-[396px] rounded-lg shadow-lg mr-7 flex flex-col justify-center items-center">
          <div>
            <img src="src/assets/myCourse/profile.png" alt="user-image" />
          </div>
          <div className="mt-5 text-header3 text-gray-800">My Maxfield</div>
          <div className="w-[309px] h-[134px] flex justify-center space-x-4 mt-8">
            <div className="w-[143px] h-[134px] border-2 rounded-lg shadow-lg bg-gray-200 flex flex-col space-y-8">
              <div className="mt-3 ml-3 text-body2 text-gray-700">
                <div>Course</div>
                <div>Inprogress</div>
              </div>
              <div className="ml-3 mb-3 font-bold text-header3">3</div>
            </div>
            <div className="w-[143px] h-[134px] border-2 rounded-lg shadow-lg bg-gray-200 flex flex-col space-y-8">
              <div className="mt-3 ml-3 text-body2 text-gray-700">
                <div>Course</div>
                <div>Complete</div>
              </div>
              <div className="ml-3 mb-3 font-bold text-header3">2</div>
            </div>
          </div>
        </div>
        <div className="course-cards-container flex justify-center">
          <div className="course-cards-container grid grid-cols-2 gap-7">
            {/* Display course cards */}
            {searchList.map((item, index) => {
              const limitLetter =
                item.course_summary.length > 60
                  ? item.course_summary.substring(0, 60) + "..."
                  : item.course_summary;
              return (
                <div key={index} className="">
                  <div className="course-card w-[357px] h-[475px] rounded-lg shadow-lg border border-gray-100 mb-8">
                    <div className="course-card-thumnail">
                      <img
                        src={item.course_cover_img}
                        alt="course-cover-image"
                        className="w-[357px] h-[240px] object-fit rounded-lg shadow-lg"
                      />
                    </div>
                    <div className="description-box m-4">
                      <h3 className="mb-2 text-orange-500 text-body3">
                        Course
                      </h3>
                      <h2 className="font-bold mb-2 text-header3">
                        {item.course_name}
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
      </div>
    </div>
  );
}

export default MyCoursePage;
