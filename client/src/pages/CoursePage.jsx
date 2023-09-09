import React from "react";
import { DebounceInput } from "react-debounce-input";
import useGetsearch from "../hook/useGetsearch";
import { useEffect } from "react";
import search from "../assets/ourCourses/search.png"

import Header from "../components/Header";
import Footer from "../components/Footer";
import DisplayCards from "../components/DisplayCards";

function CoursePage() {
  const { searchList, inputText, setInputText, getSearchList } = useGetsearch();
  const limit = 12;

  const handleInputChange = (e) => {
    const newInputText = e.target.value;
    setInputText(newInputText);
    getSearchList(newInputText,limit);
  };

  useEffect(() => {
    getSearchList("", limit);
  }, []);

  return (

    <div
      id="container"
    >
      <Header />
      <div className="bg-[url('src/assets/ourCourses/image_background.png')] bg-[length:100%_190px] bg-no-repeat">
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
              className="w-[357px] h-[48px] pl-10 border rounded-lg py-2 px-3 focus:outline-none focus:border-blue-400"
              placeholder="Search..."
              debounceTimeout={500}
              onChange={handleInputChange}
            />
          </div>
        </div>
      </div>
      <DisplayCards searchList={searchList}/>
      <Footer />
    </div>
  );
}

export default CoursePage;
