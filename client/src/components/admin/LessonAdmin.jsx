import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import editIcon from "../../assets/registerPage/edit.svg";
import deleteIcon from "../../assets/registerPage/delete.svg";
import dragIcon from "../../assets/registerPage/drag.svg";
import useDataCenter from "../../context/DataCenter";
function LessonAdmin() {
  const params = useParams();
  const { lessons, setAddLesson, setEditIndex, setEditState } = useDataCenter();
  // const getLesson = async () => {
  //   let lessonsResult;
  //   if (!addLesson) {
  //     // console.log(addLesson);
  //   } else {
  //     lessons.length = 0;
  //     try {
  //       lessonsResult = await axios.get(
  //         `http://localhost:4001/admin/courses/${params.courseId}`
  //       );
  //       // setLessons(lessonsResult.data.data.lessons);
  //       // console.log(lessonsResult);
  //       if (lessons.length === 0) {
  //         lessons.push(...lessonsResult.data.data.lessons);
  //       }
  //       console.log(lessons);
  //     } catch (error) {
  //       console.log("request lesson error", error);
  //     }
  //   }
  // };
  // useEffect(() => {
  //   getLesson();
  //   // setEditState(false);
  //   // setAddLesson(false);
  //   // console.log(lessons);
  // }, []);
  return (
    <>
      <div className="w-[85%] mx-auto">
        <div className="flex justify-between h-[60px] items-center mt-5">
          <div className="font-medium text-gray-900 text-2xl">Lesson</div>
          <button
            className="h-full bg-blue-500 px-[32px] py-[18px] rounded-xl font-bold text-white hover:bg-blue-600"
            onClick={() => setAddLesson(true)}
          >
            + Add Lesson
          </button>
        </div>
        <table className="w-[100%] mt-8 mb-8 rounded-lg overflow-hidden">
          <thead className=" h-[41px] bg-gray-300">
            <tr>
              <th className="w-[56px]"></th>
              <th className="w-[48px]"></th>
              <th className="w-[500px] text-start pl-5 text-sm font-medium text-gray-800">
                Lesson name
              </th>
              <th className="w-[396px] text-start pl-5 text-sm font-medium text-gray-800">
                Sub-lesson
              </th>
              <th className="w-[120px] text-center text-sm font-medium text-gray-800">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {lessons.length > 0 ? (
              lessons.map((item, index) => (
                <tr key={index} className="border-b border-gray-200 bg-white">
                  <td>
                    <img src={dragIcon} />
                  </td>
                  <td className="pl-5">{index + 1}</td>
                  <td className="pl-5">{item.lessonName}</td>
                  <td className="pl-5">{item.subLessons.length}</td>
                  <td>
                    <div className="flex justify-evenly">
                      <img src={deleteIcon} className="inline cursor-pointer" />
                      <img
                        src={editIcon}
                        className="inline cursor-pointer"
                        onClick={() => {
                          setEditState(true);
                          setEditIndex(index);
                        }}
                        // onClick={navigate("/admin/editlesson")}
                      />
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="5"
                  className=" text-center py-4 pt-4 bg-white text-sm font-medium text-gray-800"
                >
                  No lessons available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}
export default LessonAdmin;
