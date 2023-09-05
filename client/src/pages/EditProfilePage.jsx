import React from 'react';
import { useNavigate } from 'react-router-dom';

function EditProfilePage({token}) {
  const navigate = useNavigate()

  const handleLogOut = () =>{
    sessionStorage.removeItem("token");
    navigate("/login");
  }
  return (
    <>
      <div>UserProfilePage</div>
      {token && <p>Welcome Back {token.user.aud}</p>}
      <button onClick={handleLogOut}>Log Out</button>
    </>
  );
}

export default EditProfilePage;