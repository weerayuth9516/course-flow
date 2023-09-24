import LessonForm from "../../components/admin/LessonForm";
import Sidebar from "../../components/admin/Sidebar";

function EditLessonPage() {
  return (
    <>
      <div className="flex">
        <Sidebar />
        <div className="flex flex-col w-screen bg-gray-100 items-center">
          <div className="h-[70px] w-full border-gray-500 border-b">navbar</div>
          <LessonForm />
        </div>
      </div>
    </>
  );
}
export default EditLessonPage;
