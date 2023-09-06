import { useState } from "react";
import axios from "axios";

function useGetCourse() {
  const [course, setCourse] = useState([]);
  const [isError, setIsError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  // const [lesson, setLesson] = useState([]);

  const getCourseById = async (id) => {
    try {
      setIsError(false);
      setIsLoading(true);
      const result = await axios.get(`http://localhost:4001/courses/${id}`);
      setCourse(result.data.data);
      setIsLoading(false);
    } catch (error) {
      setIsError(true);
      setIsLoading(false);
    }

    // const getLessonById = async (id) => {
    //   try {
    //     setIsError(false);
    //     setIsLoading(true);
    //     const result = await axios.get(`http://localhost:4001/lessons/${id}`);
    //     setLesson(result.data.data);
    //     setIsLoading(false);
    //   } catch (error) {
    //     setIsError(true);
    //     setIsLoading(false);
    //   }
    // };
    return {
      course,
      isError,
      isLoading,
      getCourseById,
      // setCourse,
      // getLessonById,
      // lesson,
    };
  };
}

export default useGetCourse;
