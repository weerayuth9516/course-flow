import { createContext, useContext, useState } from "react";
import * as Yup from "yup";

const FormDataContext = createContext();

export default function useFormData() {
  return useContext(FormDataContext);
}

export function FormDataProvider({ children }) {
  const [imagePreview, setImagePreview] = useState(null);
  const [videoPreview, setVideoPreview] = useState(null);
  const [videoType, setVideoType] = useState("video/mp4");
  const [imageUrl, setImageUrl] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedVideoTrailer, setSelectedVideoTrailer] = useState(null);
  const [coverImageError, setCoverImageError] = useState(false);
  const [videoTrailerError, setVideoTrailerError] = useState(false);
  const [videoTrailerUrl, setVideoTrailerUrl] = useState("");
  const [formValues, setFormValues] = useState({
    courseName: "",
    price: "",
    totalLearningTime: "",
    courseSummary: "",
    courseDetail: "",
  });

  const validationSchema = Yup.object().shape({
    courseName: Yup.mixed()
      .required("Course name is required")
      .test(
        "max-length",
        "Course name must be at most 60 characters",
        (value) => value && value.length <= 60
      ),
    price: Yup.number()
      .required("Price is required")
      .positive("Price must be positive")
      .test(
        "is-decimal",
        "Price must have exactly 2 decimal places",
        (value) => {
          if (!value) {
            return false;
          }
          const decimalCount = (value.toString().split(".")[1] || "").length;
          return decimalCount <= 2;
        }
      ),
    totalLearningTime: Yup.number()
      .integer("Total learning time must be an integer")
      .positive("Total learning must be positive")
      .required("Total learning time is required"),
    courseSummary: Yup.string()
      .required("Course summary is required")
      .test(
        "max-length",
        "Course name must be at most 3000 characters",
        (value) => value && value.length <= 3000
      ),
    courseDetail: Yup.string()
      .required("Course detail is required")
      .test(
        "max-length",
        "Course name must be at most 5000 characters",
        (value) => value && value.length <= 5000
      ),
  });

  const handleImagePreview = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleVideoPreview = (e) => {
    const file = e.target.files[0];
    if (file) {
      const allowedVideoTypes = ["video/mp4", "video/avi", "video/mov"];

      if (allowedVideoTypes.includes(file.type)) {
        const reader = new FileReader();
        reader.onload = () => {
          setVideoType(file.type);
          setVideoPreview(reader.result);
        };
        reader.readAsDataURL(file);
      }
    }
  };

  const clearImagePreview = () => {
    setImagePreview(null);
  };
  const clearVideoPreview = () => {
    setVideoPreview(null);
  };

  return (
    <FormDataContext.Provider
      value={{
        formValues,
        setFormValues,
        validationSchema,
        imagePreview,
        setImagePreview,
        videoPreview,
        setVideoPreview,
        videoType,
        setVideoType,
        handleImagePreview,
        handleVideoPreview,
        clearImagePreview,
        clearVideoPreview,
        selectedImage,
        setSelectedImage,
        imageUrl,
        setImageUrl,
        coverImageError,
        setCoverImageError,
        videoTrailerError,
        setVideoTrailerError,
        selectedVideoTrailer,
        setSelectedVideoTrailer,
        videoTrailerUrl,
        setVideoTrailerUrl,
      }}
    >
      {children}
    </FormDataContext.Provider>
  );
}
