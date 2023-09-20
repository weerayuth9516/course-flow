function LessonAdmin() {
  const lessons = [
    {
      id: 1,
      name: "Introduction",
      subLesson: 10,
    },
    {
      id: 2,
      name: "Service Design Theories and Principles",
      subLesson: 10,
    },
    {
      id: 3,
      name: "Understanding Users and Finding Opportunities",
      subLesson: 10,
    },
    {
      id: 4,
      name: "Identifying and Validating Opportunities for Design",
      subLesson: 10,
    },
    {
      id: 5,
      name: "Prototyping",
      subLesson: 10,
    },
    {
      id: 6,
      name: "Course Summary",
      subLesson: 10,
    },
  ];

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
              <tr key={lesson.id} className="border-b border-gray-200">
                <td>
                  <img src="src/assets/registerPage/drag.svg" />
                </td>
                <td className="pl-5">{lesson.id}</td>
                <td className="pl-5">{lesson.name}</td>
                <td className="pl-5">{lesson.subLesson}</td>
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
