import error from "../assets/header/error.png";
import { createContext, useState } from "react";
export const ValidateContext = createContext();

function Validate({ children }) {
  const [fileErrorMessage, setfileErrorMessage] = useState("");
  const [nameErrorMessage, setNameErrorMessage] = useState("");
  const [dateErrorMessage, setDateErrorMessage] = useState("");
  const [educationErrorMessage, setEducationErrorMessage] = useState("");
  const [emailErrorMessage, setEmailErrorMessage] = useState("");
  const [signError, setSignError] = useState("");
  const [hasImage, setHasImage] = useState(false);

  const validateFileChange = (file, typeFile) => {
    if (file.size > 2097152) {
      setHasImage(false);
      setfileErrorMessage("File too large! (max 2MB)");
    } else if (
      typeFile.toLowerCase() === "jpg" ||
      typeFile.toLowerCase() === "png" ||
      typeFile.toLowerCase() === "jpeg"
    ) {
      try {
        if (file) {
          setImages(URL.createObjectURL(file));
          setFileBody(file);
          setHasImage(true);
          setfileErrorMessage("");
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      setHasImage(false);
      setfileErrorMessage("File Only JPG, PNG, JPEG !");
    }
  };

  const validateName = (name) => {
    if (!name) {
      setNameErrorMessage("Required!!!");
      setSignError(<img src={error} />);
    } else if (name.length < 2 || name.length > 20) {
      setNameErrorMessage(
        "Name must be between 2 and 20 characters in length."
      );
      setSignError(<img src={error} />);
    } else {
      setNameErrorMessage("");
      setSignError("");
    }
  };

  const validateBirthDate = (birthDate) => {
    if (!birthDate) {
      setDateErrorMessage("Required!!!");
      setSignError(<img src={error} />);
    } else if (new Date(birthDate) > new Date()) {
      setDateErrorMessage("Date of Birth cannot be in the future.");
      setSignError(<img src={error} />);
    } else {
      setDateErrorMessage("");
      setSignError("");
    }
  };

  const validateEducation = (education) => {
    if (!education) {
      setEducationErrorMessage("Required!!!");
      setSignError(<img src={error} />);
    } else if (education.length < 2 || education.length > 20) {
      setEducationErrorMessage(
        "Education background must be between 2 and 20 characters in length."
      );
      setSignError(<img src={error} />);
    } else {
      setEducationErrorMessage("");
      setSignError("");
    }
  };

  const validateEmail = (email) => {
    if (!email) {
      setEmailErrorMessage("Required!!!");
      setSignError(<img src={error} />);
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/) {
      setEmailErrorMessage("Invalid email format.");
      setSignError(<img src={error} />);
    } else {
      setEmailErrorMessage("");
      setSignError("");
    }
  };
  const allData = {
    nameErrorMessage,
    setNameErrorMessage,
    dateErrorMessage,
    setDateErrorMessage,
    educationErrorMessage,
    setEducationErrorMessage,
    emailErrorMessage,
    setEmailErrorMessage,
    fileErrorMessage,
    setfileErrorMessage,
    signError,
    setSignError,
    validateFileChange,
    validateName,
    validateBirthDate,
    validateEducation,
    validateEmail,
  };

  return (
    <ValidateContext.Provider value={allData}>
      {children}
    </ValidateContext.Provider>
  );
}

export default Validate;
