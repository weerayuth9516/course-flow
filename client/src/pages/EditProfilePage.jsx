import React from "react";
import Header from "../components/Header";
import EditProfileForm from "../components/EditProfileForm";
import background from "../assets/ourCourses/image_background.png";

function EditProfilePage() {
  return (
    <div className="font-inter relative">
      <Header />
      <img
        src={background}
        alt="background"
        className="absolute top-[200px] w-screen"
      />
      <EditProfileForm />
      <footer className="h-[240px] bg-blue-600"></footer>
    </div>
  );
}

export default EditProfilePage;
