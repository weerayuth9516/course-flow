import { createContext, useContext, useState } from "react";

const FormDataContext = createContext();

export default function useFormData() {
  return useContext(FormDataContext);
}

export function FormDataProvider({ children }) {
  const [imagePreview, setImagePreview] = useState(null);
  const [videoPreview, setVideoPreview] = useState(null);
  const [videoType, setVideoType] = useState("video/mp4");
  const [formValues, setFormValues] = useState({
    courseName: "",
    price: "",
    totalLearningTime: "",
    courseSummary: "",
    courseDetail: "",
    coverImage: null,
    videoTrailer: null,
  });

  return (
    <FormDataContext.Provider
      value={{
        formValues,
        setFormValues,
        imagePreview,
        setImagePreview,
        videoPreview,
        setVideoPreview,
        videoType,
        setVideoType,
      }}
    >
      {children}
    </FormDataContext.Provider>
  );
}
