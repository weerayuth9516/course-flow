import React, { useState } from "react";
import { DebounceInput } from "react-debounce-input";
import useGetsearch from "../../hook/useGetsearch";
import { useEffect } from "react";
import search from "../../assets/ourCourses/search.png";
import image_background from "../../assets/ourCourses/image_background.png";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import DisplayCards from "../../components/user/DisplayCards";
import SubFooter from "../../components/SubFooter";
import { useAuth } from "../../context/authentication";

function MyAssignmentPage() {
  const { searchList, getSearchList } = useGetsearch();
  const [getFocus, setGetFocus] = useState(true);
  const [hasImage, setHasImage] = useState(false);
  const [preAssignment, setPreAssignment] = useState({
    assignmentDetail: "",
    assignmentAnswer: "",
    assignmentDuration: 0,
    assignmentStartedAt: null,
    assignmentStatus: "",
  });
  const [inputText, setInputText] = useState("");
  const [checkAssignmentStatus, setCheckAssignmentStatus] = useState("");
  const [status, setStatus] = useState("myCourses");
  const auth = useAuth();
  const limit = 12;
  const submitForm = (e) => {
    e.preventDefault();
    setCheckAssignmentStatus("in_progress");
  };
  const handleInputText = (e) => {
    const newInputText = e.target.value;
    setInputText(newInputText);
  };
  const handleInputChange = (e) => {
    const newInputText = e.target.value;
    setInputText(newInputText);
    getSearchList(newInputText, limit);
  };
  const getMyAssignment = async () => {
    console.log(auth.session.user.user_id);
  };
  useEffect(() => {
    // getSearchList("", limit);
    // getAssignment();
    getMyAssignment();
    localStorage.setItem("previousPage", "/assignments");
  }, []);

  return (
    <>
      <Header />
      <div id="container" className="font-inter relative">
        <img className="w-screen absolute" src={image_background}></img>
        <div className="search-box mb-2 flex flex-col items-center mt-20 h-[230px]">
          <label htmlFor="input" className="text-black text-header2 font-bold">
            My Assignments
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
        <div className="course-cards-container flex justify-center mb-[50px]">
          <div className="sub-container grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-10">
            <div className="flex space-x-10 mt-2 justify-center items-center w-screen">
              <button
                onClick={() => {
                  setStatus("all");
                  setGetFocus(true);
                }}
                className={`text-black p-2 ${
                  getFocus ? "border-b border-black " : "text-gray-600"
                } transform transition-transform duration-300 ease-in-out  hover:border-b hover:border-b-1 hover:text-black focus:text-black focus:border-b focus:border-b-1 focus:border-black`}
              >
                All
              </button>
              <button
                onClick={() => {
                  setStatus("pending");
                  setGetFocus(false);
                }}
                className="transform transition-transform duration-300 ease-in-out hover:border-b hover:border-b-1 hover:text-black text-gray-600 focus:text-black focus:border-b focus:border-b-1 focus: border-black p-2"
              >
                Pending
              </button>
              <button
                onClick={() => {
                  setStatus("submit");
                  setGetFocus(false);
                }}
                className="transform  transition-transform duration-300 ease-in-out hover:border-b hover:border-b-1 hover:text-black text-gray-600 focus:text-black focus:border-b focus:border-b-1 focus: border-black p-2"
              >
                Submit
              </button>
              <button
                onClick={() => {
                  setStatus("submit");
                  setGetFocus(false);
                }}
                className="transform  transition-transform duration-300 ease-in-out hover:border-b hover:border-b-1 hover:text-black text-gray-600 focus:text-black focus:border-b focus:border-b-1 focus: border-black p-2"
              >
                Orver Due
              </button>
              <button
                onClick={() => {
                  setStatus("submit");
                  setGetFocus(false);
                }}
                className="transform  transition-transform duration-300 ease-in-out hover:border-b hover:border-b-1 hover:text-black text-gray-600 focus:text-black focus:border-b focus:border-b-1 focus: border-black p-2"
              >
                Submit Late
              </button>
            </div>
          </div>
        </div>
        <div className="h-auto  flex flex-col items-center justify-center">
          <div className="bg-blue-100 w-[70%] flex flex-col justify-center items-center rounded-lg mt-[10px] mb-[20px] p-[20px]">
            <div className="w-[691px] h-[32px] flex justify-between items-center mt-4">
              <div className="text-body1 text-black">Assignment</div>
              {checkAssignmentStatus === "pending" ? (
                <div className="text-[#996500] text-[16px] w-[79px] bg-[#FFFBDB] border flex justify-center p-1 w-[100px]">
                  Pending
                </div>
              ) : checkAssignmentStatus === "overdue" ? (
                <div className="text-[#246e28] text-[16px] w-[79px] bg-[#b8ffb8] border flex justify-center p-1 w-[100px]">
                  Overdue
                </div>
              ) : checkAssignmentStatus === "submitrate" ? (
                <div className="text-[#246e28] text-[16px] w-[79px] bg-[#b8ffb8] border flex justify-center p-1 w-[100px]">
                  Submit Rate
                </div>
              ) : (
                <div className="text-[#246e28] text-[16px] w-[79px] bg-[#b8ffb8] border flex justify-center p-1 w-[100px]">
                  Submit
                </div>
              )}
            </div>
            <div className="flex flex-col ">
              <form onSubmit={submitForm} className="">
                <div className="w-[691px] h-[124px] flex flex-col mt-5">
                  <div className="text-[16px] mb-2">
                    {preAssignment.assignmentDetail}
                  </div>
                  <input
                    type="text"
                    className="w-[691px] h-[96px] text-[16px] text-gray-600 border-1 rounded-lg bg-white pl-5 pt-3"
                    placeholder={
                      preAssignment.assignmentAnswer !== null ||
                      preAssignment.assignmentAnswer !== ""
                        ? "Answer..."
                        : `Your Answer is "${preAssignment.assignmentAnswer}"`
                    }
                    onChange={handleInputText}
                    value={
                      preAssignment.assignmentAnswer !== null ||
                      preAssignment.assignmentAnswer !== ""
                        ? inputText
                        : `Your Answer is "${preAssignment.assignmentAnswer}"`
                    }
                    disabled={checkAssignmentStatus !== "pending"}
                    required
                  />
                </div>
                <div className="w-[691px] flex justify-start mt-8">
                  {checkAssignmentStatus === "pending" ? (
                    <button
                      type="submit"
                      className={
                        checkAssignmentStatus !== "pending"
                          ? `w-[203px] h-[60px] text-[16px] text-white font-bold rounded-xl bg-blue-500 hover:bg-blue-400`
                          : `w-[203px] h-[60px] text-[16px] text-white font-bold rounded-xl bg-blue-500`
                      }
                      disabled={checkAssignmentStatus !== "pending"}
                    >
                      Send Assignment
                    </button>
                  ) : checkAssignmentStatus === "overdue" ? (
                    <button
                      type="submit"
                      className={
                        checkAssignmentStatus !== "pending" ||
                        checkAssignmentStatus !== "overdue"
                          ? `w-[203px] h-[60px] text-[16px] text-white font-bold rounded-xl bg-blue-500 hover:bg-blue-400`
                          : `w-[203px] h-[60px] text-[16px] text-white font-bold rounded-xl bg-blue-500`
                      }
                    >
                      Send Assignment
                    </button>
                  ) : (
                    <button
                      type="submit"
                      className={
                        checkAssignmentStatus !== "pending" ||
                        checkAssignmentStatus !== "overdue"
                          ? `w-[203px] h-[60px] text-[16px] text-white font-bold rounded-xl bg-blue-500 hover:bg-blue-400`
                          : `w-[203px] h-[60px] text-[16px] text-white font-bold rounded-xl bg-blue-500`
                      }
                    >
                      Send Assignment
                    </button>
                  )}
                </div>
              </form>
            </div>
          </div>
        </div>
        <div>{!auth.session.user ? <SubFooter /> : ""}</div>
        <Footer />
      </div>
    </>
  );
}

export default MyAssignmentPage;
