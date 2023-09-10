import React, { useContext } from "react";
import { DebounceInput } from "react-debounce-input";
import useGetsearch from "../hook/useGetsearch";
import { useEffect } from "react";
import search from "../assets/ourCourses/search.png";
import { SessionContext } from "../App";
import Header from "../components/Header";
import Footer from "../components/Footer";
import DisplayCards from "../components/DisplayCards";
import SubFooter from "../components/SubFooter";

function CoursePage() {
  const { searchList, inputText, setInputText, getSearchList } = useGetsearch();
  const { session } = useContext(SessionContext);
  const limit = 12;

  const handleInputChange = (e) => {
    const newInputText = e.target.value;
    setInputText(newInputText);
    getSearchList(newInputText, limit);
  };

  useEffect(() => {
    getSearchList("", limit);
  }, []);

  return (
    <>
      <Header />
      <div
        id="container"
        className="font-inter bg-[url('src/assets/ourCourses/image_background.png')] bg-[length:100%_190px] bg-no-repeat"
      >
        <div className="search-box mb-2 flex flex-col items-center mt-20 h-[230px]">
          <label htmlFor="input" className="text-black text-header2 font-bold">
            Our Courses
          </label>
          <div className="relative mt-12">
            <img
              src={search}
              alt="Image icon"
              className="inline absolute left-2 top-3"
            />
            <DebounceInput
              minLength={2}
              id="message-text"
              name="message-text"
              type="text"
              value={inputText}
              className="w-[357px] h-[48px] pl-10 border rounded-lg py-2 px-3 focus:outline-none hover:border-orange-300 focus:border-orange-300"
              placeholder="Search..."
              debounceTimeout={500}
              onChange={handleInputChange}
            />
          </div>
        </div>
        <div className="course-cards-container flex justify-center mb-20">
          <div className="course-cards-container grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-10">
            <DisplayCards searchList={searchList} />
          </div>
        </div>
        {!session ? <SubFooter /> : ""}
        <Footer />
      </div>
    </>
  );
}

export default CoursePage;
