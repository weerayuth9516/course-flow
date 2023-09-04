import React from "react";
import Header from "../components/Header";
import EditProfileForm from "../components/EditProfileForm";

const handleLogOut = () => {
  sessionStorage.removeItem("token");
  navigate("/login");
};
return (
  <div className="font-inter">
    <Header />
    <div className="text-header2">Profile</div>
    <EditProfileForm />
  </div>
);

export default EditProfilePage;
