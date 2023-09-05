import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Link } from "react-router-dom";
import { supabase } from "../supabase/client";
import { useNavigate } from "react-router-dom";

function LoginPage({ setToken }) {
  const navigate = useNavigate();
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
    // handle form submit
    console.log("Form submitted with values:", values);
    try {
      const results = await supabase
        .from("users")
        .select("*")
        .eq("user_email", values.email);
      if (results.data.length === 0) {
        alert("Email Invalid.");
      } else {
        const { data, error } = await supabase.auth.signInWithPassword({
          email: values.email,
          password: values.password,
        });
        setToken(data);
        navigate("/editprofile");
      }
    } catch (error) {
      navigate("/login");
    }
  };

  return (
    <div className="container">
      <div
        className="h-screen flex items-center justify-center 
      bg-[url('src/assets/loginPage/bg-login.png')] bg-cover bg-center bg-no-repeat"
      >
        <div className="login-form w-[453px] h-[446px]">
          <h2 className="text-4xl text-[#383ba7] font-bold mb-10">
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
                  className="block text-md text-black-500 mb-2"
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
                  className="block text-md text-black-500 mb-2 mt-5"
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
