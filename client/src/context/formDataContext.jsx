import { createContext, useContext, useState } from "react";

const FormDataContext = createContext();

export default function useFormData() {
  return useContext(FormDataContext);
}

export function FormDataProvider({ children }) {
  const [formValues, setFormValues] = useState({
    courseName: "",
    price: "",
    totalLearningTime: "",
    courseSummary: "",
    courseDetail: "",
    // coverImage: JSON.parse(localStorage.getItem("selectedFile")) || null,
    videoTrailer: null,
  });

  const [imagePreview, setImagePreview] = useState(null);
  const [videoPreview, setVideoPreview] = useState(null);
  const [videoType, setVideoType] = useState("video/mp4");
  const [selectedFile, setSelectedFile] = useState(null);
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
        selectedFile,
        setSelectedFile,
      }}
    >
      {children}
    </FormDataContext.Provider>
  );
}
