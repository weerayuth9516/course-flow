import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function LessonAdmin() {
  const params = useParams();

  const [lessons, setLessons] = useState([]);
  const getLesson = async () => {
    try {
      const lessonsResult = await axios.get(
        `http://localhost:4001/admin/courses/${params.courseId}`
        // "http://localhost:4001/admin"
      );
      setLessons(lessonsResult.data.data);
      console.log(lessonsResult.data.data);
    } catch (error) {
      console.log("request lesson error", error);
    }
  };

  useEffect(() => {
    getLesson();
  }, []);
  return (
    <>
      <div className="w-[1120px] mx-auto">
        <div className="flex justify-between h-[60px] items-center mt-5">
          <div className="font-medium text-gray-900 text-2xl">Lesson</div>
          <button className="h-full bg-blue-500 px-[32px] py-[18px] rounded-xl font-bold text-white hover:bg-blue-600">
            + Add Lesson
          </button>
        </div>
        <table className="w-[100%] mt-8 rounded-lg overflow-hidden">
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
            {lessons.map((lesson) => (
              <tr key={lesson.lesson_id} className="border-b border-gray-200">
                <td>
                  <img src="src/assets/registerPage/drag.svg" />
                </td>
                <td className="pl-5">{lesson.lesson_id}</td>
                <td className="pl-5">{lesson.lesson_name}</td>
                <td className="pl-5">10</td>
                <td>
                  <div className="flex justify-evenly">
                    <img
                      src="src/assets/registerPage/delete.svg"
                      className="inline cursor-pointer"
                    />
                    <img
                      src="src/assets/registerPage/edit.svg"
                      className="inline cursor-pointer"
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
export default LessonAdmin;
