import React, { useState, useEffect } from "react";
import axios from "axios";

function AssignmentBox({
  assignmentDetail,
  assignmentStatus,
  userCourseDetailId,
  subLessonId,
  assignmentAnswer,
  assignmentDuration,
  assignmentStartedAt,
}) {
  const [inputText, setInputText] = useState(assignmentAnswer);
  const [checkAssignmentStatus, setCheckAssignmentStatus] = useState(assignmentStatus);
  const handleInputText = (e) => {
    const newInputText = e.target.value;
    setInputText(newInputText);
  };

  const createAssignmentAnswer = async () => {
    try {
      const token = localStorage.getItem("token");
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      const body = {
        assignment_status: checkAssignmentStatus,
        assignment_answer: inputText,
        user_course_detail_id: userCourseDetailId,
        sub_lesson_id: subLessonId,
      };
      const courseResult = await axios.put(
        `http://localhost:4001/courses/assignment/submit`,
        body,
        { headers }
      );
      console.log(courseResult.data.message);
    } catch (error) {
      console.log("request error");
    }
  };

  const submitForm = (e) => {
    e.preventDefault();
    setCheckAssignmentStatus("in_progress")
  };

  useEffect(() => {
    if (checkAssignmentStatus === "in_progress") {
      createAssignmentAnswer();
    }
  }, [checkAssignmentStatus]);

  useEffect(() => {
      setInputText(assignmentAnswer);
      setCheckAssignmentStatus(assignmentStatus)
  }, [subLessonId,assignmentAnswer,assignmentStatus]);

  return (
    <div className="w-[739px] h-[314px] bg-blue-100 flex flex-col items-center rounded-lg mt-[70px]">
      <div className="w-[691px] h-[32px] flex justify-between items-center mt-4">
        <div className="text-body1 text-black">Assignment</div>
        <div className="text-[#996500] text-[16px] w-[79px] bg-[#FFFBDB] border flex justify-center p-1">
          {checkAssignmentStatus !== "not_started" ? "Pending" : "Submitted"}
        </div>
      </div>
      <form onSubmit={submitForm}>
        <div className="w-[691px] h-[124px] flex flex-col mt-5">
          <div className="text-[16px] mb-2">{assignmentDetail}</div>
          <input
            type="text"
            className="w-[691px] h-[96px] text-[16px] text-gray-600 border-1 rounded-lg bg-white pl-5 pt-3"
            placeholder="Answer..."
            onChange={handleInputText}
            value={inputText}
            // disabled={
            //   checkAssignmentStatus === "in_progress" ||
            //   checkAssignmentStatus === "completed"
            // }
            required
          />
        </div>
        <div className="w-[691px] flex justify-start mt-8">
          <button
            type="submit"
            className="w-[203px] h-[60px] text-[16px] text-white font-bold rounded-xl bg-blue-500"
            disabled={
              checkAssignmentStatus === "in_progress" ||
              checkAssignmentStatus === "completed"
            }
          >
            Send Assignment
          </button>
        </div>
      </form>
    </div>
  );
}

export default AssignmentBox;
