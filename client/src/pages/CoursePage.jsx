import React from "react";

function CoursePage() {
  const displayCards = (
    <div className="col-span-4">
      <div className="course-card w-[357px] h-[475px] rounded-lg shadow-lg border border-gray-100">
        <div className="course-card-thumnail">
          <img
            src="src/assets/ourCourses/image.png"
            alt="Description of the image"
            className="w-[357px] h-[240px] object-cover rounded-lg shadow-lg"
          />
        </div>
        <div className="description-box m-4">
          <h3 className="mb-2 text-orange-500">Course</h3>
          <h2 className="font-bold text-2xl mb-2">Software Developer</h2>
          <div className="course-detail">
            <p>Lorem ipsum dolor sit amet, conse ctetur adipiscing elit.</p>
          </div>

          <div className="course-card-footer mt-4">
            <span>
              <img
                src="src/assets/ourCourses/Frame.png"
                alt="Image icon"
                className="inline mr-2"
              />
              6 Lessons
            </span>
            <span className="ml-5">
              <img
                src="src/assets/ourCourses/Vectors.png"
                alt="Image icon"
                className="inline mr-2"
              />
              6 Hours
            </span>
          </div>
        </div>
      </div>
    </div>
  );

  const cardArray = new Array(12).fill(null);

  return (
    <div className="container">
     <div className="bg-[url('src/assets/ourCourses/image_background.png')] bg-container bg-center bg-no-repeat h-[190px]">
      <div className="search-box mb-4 flex flex-col items-center mt-40">
        <label for="input" className="text-gray-700 text-4xl font-bold">
          Our Courses
        </label>
        <div className="relative mt-12">
          <img
            src="src/assets/ourCourses/search.png"
            alt="Image icon"
            className="inline absolute left-2 top-3"
          />
          <input
            type="text"
            id="input"
            className="w-[357px] h-[48px] pl-10 border rounded-lg py-2 px-3 focus:outline-none focus:border-blue-400"
            placeholder="Search..."
          />
        </div>
      </div>
      </div>
    
      <div className="course-cards-container flex justify-center m-20">
        <div className="course-cards-container grid grid-cols-12 gap-7">
          {cardArray.map((_, index) => (
            <React.Fragment key={index}>{displayCards}</React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
}

export default CoursePage;
