import React from "react";
import { Link } from "react-router-dom";
import Vector from "../assets/ourCourses/Vectors.png";
import Frame from "../assets/ourCourses/Frame.png";

function DisplayCards({ searchList }) {
  return (
    <>
      {/* Display course cards */}
      {searchList.map((item, index) => {
        const limitLetter =
          item.course_summary.length > 60
            ? item.course_summary.substring(0, 60) + "..."
            : item.course_summary;
        return (
          <Link
            key={index}
            to={`/course/courseDetail/${item.course_id}`}
            target="_blank"
          >
            <div className="course-cards-box font-inter ">
              <div className="course-card w-[357px] h-[475px] rounded-lg shadow-lg border border-gray-100 mb-8 hover:scale-105 hover:shadow-lg transform  transition-transform duration-300 ease-in-out">
                <div className="course-card-thumbnail  ">
                  <Link
                    to={`/course/courseDetail/${item.course_id}`}
                    target="_blank"
                  >
                    <img
                      src={item.course_cover_img}
                      alt="course-image"
                      className="w-[357px] h-[240px] object-fit rounded-lg shadow-lg"
                    />
                  </Link>
                </div>
                <div className="description-box m-4">
                  <h3 className="mb-2 text-orange-500 text-body3">Course</h3>
                  <h2 className="font-bold mb-2 text-header3 text-black ">
                    <Link
                      to={`/course/courseDetail/${item.course_id}`}
                      target="_blank"
                    >
                      {item.course_name}
                    </Link>
                  </h2>
                  <div className="course-detail text-body2 text-gray-700">
                    <p>{limitLetter}</p>
                  </div>
                </div>
                <div className="course-card-footer text-body2 text-gray-700 mt-10">
                  <hr className="border-t border-gray-300 my-4 w-full" />
                  <span>
                    <img
                      src={Frame}
                      alt="Image icon"
                      className="inline mr-2 ml-4"
                    />
                    6 Lessons
                  </span>
                  <span className="ml-5">
                    <img
                      src={Vector}
                      alt="Image icon"
                      className="inline mr-2 ml-4"
                    />
                    {item.course_duration} Hours
                  </span>
                </div>
              </div>
            </div>
          </Link>
        );
      })}
      {/* End display course cards */}
    </>
  );
}

export default DisplayCards;
