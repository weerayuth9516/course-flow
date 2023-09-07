import React, { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Link } from "react-router-dom";
import { supabase } from "../supabase/client";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import axios from "axios";
import { useContext } from "react";
import { SessionContext } from "../App";

function LoginPage({ setToken }) {
  const navigate = useNavigate();
  const { session, setSession } = useContext(SessionContext);
  const initialValues = {
    email: "",
    password: "",
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string()
      .required("Password is required")
      .min(6, "Password must be at least 6 characters"),
  });
  const handleSubmit = async (values) => {
    try {
      const results = await axios.post(
        "http://localhost:4001/auth/login",
        values
      );
      if (results.data.message === "Email Invalid") {
        validationSchema.ErrorMessage("Email Not Found.");
      }
      if (results.data.message === "Password Invalid") {
        return alert("Password Invalid");
      }
      const res = await supabase.auth.signInWithPassword({
        email: values.email,
        password: values.password,
      });
      setSession(res.data.session);
      navigate("/");
    } catch (error) {
      navigate("/login");
    }
  };
  useEffect(() => {
    if (session !== null) {
      navigate("/");
    }
  });
  return (
    <div className="font-inter w-screen h-screen bg-[url('src/assets/loginPage/bg-login.png')] bg-cover bg-no-repeat">
      <Header />
      <div className="flex flex-col justify-center items-center h-5/6">
        <div className="login-form w-[453px] h-[446px]">
          <h2 className="text-header2 text-[#383ba7] font-bold mb-10">
            Welcome back!
          </h2>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            <Form>
              <div className="mb-4">
                <label
                  htmlFor="email"
                  className="block text-body2 text-black-500 mb-2"
                >
                  Email:
                </label>
                <Field
                  type="email"
                  id="email"
                  name="email"
                  className="border border-gray-300 p-2 rounded-md w-full"
                  placeholder="Enter Email"
                  required
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="text-red-500 mt-2"
                />
              </div>

              <div className="mb-4">
                <label
                  htmlFor="password"
                  className="block text-body2 text-black-500 mb-2 mt-5"
                >
                  Password:
                </label>
                <Field
                  type="password"
                  id="password"
                  name="password"
                  className="border border-gray-300 p-2 rounded-md w-full"
                  placeholder="Enter password"
                  required
                />
                <ErrorMessage
                  name="password"
                  component="div"
                  className="text-red-500 mt-2"
                />
              </div>

              <div className="text-center mt-8">
                <button
                  type="submit"
                  className="bg-[#2f5fac] text-white py-2 px-4 rounded-xl hover:bg-blue-600 w-full"
                >
                  Login
                </button>
              </div>
            </Form>
          </Formik>
          <div className="text-left mt-10">
            Don't have an account?{"  "}
            <Link to="/register" className="text-[#527aba] font-bold">
              Register
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
