import { useState } from "react";
import axios from "axios";
import { useAuth } from "../context/authentication";

function useGetsearch() {
  const auth = useAuth();
  const [searchList, setSearchList] = useState([]);
  const [inputText, setInputText] = useState("");
  const [course, setCourse] = useState([]);
  const [lesson, setLesson] = useState([]);
  const [subLessonArray, setSubLessonArray] = useState([]);
  const [allDesireCourse, setAllDesireCourse] = useState([]);

  const getSearchList = async (input, limit) => {
    try {
      const response = await axios.get(
        `http://localhost:4001/courses?title=${input}&limit=${limit}`
      );
      setSearchList(response.data.data);
    } catch (error) {
      console.log("request error");
    }
  };

  const getCourseAndLessonAndSubLesson = async () => {
    try {
      const courseResult = await axios.get(
        `http://localhost:4001/courses/${params.courseId}`
      );
      setCourse(courseResult.data.data[0]);
    } catch (error) {
      console.log("request error");
    }

    // Get lessons and subLesson by courseId
    try {
      const lessonResult = await axios.get(
        `http://localhost:4001/courses/${params.courseId}/lessons`
      );
      setLesson(lessonResult.data.data);
      const subLessons = lessonResult.data.data.flatMap(
        (lesson) => lesson.sub_lessons
      );
      setSubLessonArray(subLessons);
    } catch (error) {
      console.log("request error");
    }
  };

  const getDesireCourse = async () => {
    try {
      const userId = auth.session.user.user_id;
      const desireCourseResult = await axios.get(
        `http://localhost:4001/courses/mydesirecourses/${userId}`
      );
      setAllDesireCourse(desireCourseResult.data.data);
    } catch (error) {
      console.error("Error get desire course:", error);
    }
  };

  return {
    searchList,
    setSearchList,
    inputText,
    setInputText,
    getSearchList,
    course,
    setCourse,
    lesson,
    setLesson,
    subLessonArray,
    setSubLessonArray,
    getCourseAndLessonAndSubLesson,
    getDesireCourse,
    allDesireCourse,
    setAllDesireCourse,
  };
}

export default useGetsearch;
