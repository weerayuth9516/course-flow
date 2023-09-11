import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import jwtDecode from "jwt-decode";

const AuthContext = React.createContext();

function AuthProvider(props) {
  const [session, setSession] = useState({
    loading: null,
    error: null,
    user: null,
  });
  const navigate = useNavigate();
  const login = async (data) => {
    const results = await axios.post("http://localhost:4001/auth/login", data);
    if (results.data.message === "Email Invalid") {
      // setSession({ ...session, error: "Email Invalid" });
      session.error = "Email Invalid";
      return true;
    }
    if (results.data.message === "Password Invalid") {
      // setSession({ ...session, error: "Password Invalid" });
      session.error = "Password Invalid";
      return true;
    }
    if (results.data.message === "Login Succesfully") {
      const token = results.data.token;
      const userDataFromToken = jwtDecode(token);
      // setSession({ ...session, user: userDataFromToken });
      session.user = userDataFromToken;
      console.log(session);
      navigate("/");
      localStorage.setItem("token", token);
      return false;
    } else {
      session.error = "Something wrong";
      return true;
    }
  };
  const register = async (data) => {
    await axios.post("http://localhost:4001/auth/register", data);
    navigate("/login");
  };
  const logout = () => {
    localStorage.removeItem("token");
    setSession({ ...session, user: null, error: null });
  };

  // const handleData = () => {
  //   const token = localStorage.getItem("token");
  //   console.log(token);
  //   const userData = jwtDecode(localStorage.getItem("token"));
  //   console.log(userData);
  //   session.user = userData;
  // };

  const isAuthenicated = Boolean(localStorage.getItem("token"));

  return (
    <AuthContext.Provider
      value={{ session, login, logout, register, isAuthenicated }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}

const useAuth = () => React.useContext(AuthContext);

export { AuthProvider, useAuth };
