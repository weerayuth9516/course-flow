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
    session.error = null;
    try {
      const results = await axios.post(
        "http://localhost:4001/auth/login",
        data
      );
      if (!results.data.token) {
        session.error = results.data.message;
      } else {
        session.error = null;
        const token = results.data.token;
        const userDataFromToken = jwtDecode(token);
        session.user = userDataFromToken;
        if (Boolean(localStorage.getItem("previousPage"))) {
          const redirectPage = localStorage.getItem("previousPage");
          navigate(redirectPage);
          localStorage.removeItem("previousPage");
        } else {
          navigate("/");
        }
        localStorage.setItem("token", token);
      }
    } catch (error) {
      console.log(error);
      session.error;
      console.log(session.error);
      return error;
    }
  };
  const register = async (data) => {
    const result = await axios.post(
      "http://localhost:4001/auth/register",
      data
    );
    if (result.data.message === "Register Successfully") {
      session.error = null;
      navigate("/login");
    } else if (result.data.message === "Email already sign in") {
      session.error = result.data.message;
      navigate("/register");
    } else {
      alert("API INVALID");
    }
  };
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("previousPage");
    setSession({ ...session, user: null, error: null });
  };

  const isAuthenicated = Boolean(localStorage.getItem("token"));
  if (isAuthenicated) {
    const token = localStorage.getItem("token");
    session.user = jwtDecode(token);
  }
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
