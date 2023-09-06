import { Link, useNavigate } from "react-router-dom";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { supabase } from "../supabase/client.js";
import * as Yup from "yup";
import axios from "axios";
import Header from "../components/Header";

function RegisterPage() {
  const navigate = useNavigate();
  const initialValues = {
    name: "",
    birthDate: "",
    education: "",
    email: "",
    password: "",
  };
  const validationSchema = Yup.object({
    name: Yup.string()
      .matches(/^[a-zA-Z'-]+$/, "Name must contain only letters, -, or  ' ")
      .required("Name is required"),
    birthDate: Yup.date()
      .max(new Date(), "Date of Birth cannot be in the future")
      .required("Date of Birth is required"),
    education: Yup.string().required("Educational Background is required"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string()
      .min(12, "Password must be at least 12 characters")
      .required("Password is required"),
  });

  //ยังไม่มี post new user?
  const registerUser = async (userProfile) => {
    try {
<<<<<<< HEAD
<<<<<<< HEAD
      const response = await axios.post(
        "http://localhost:4001/auth/register",
=======
      const result = await axios.post(
<<<<<<< HEAD
=======
      const result = await axios.post(
>>>>>>> bf453ef962e739cd19c32874728b5a2546023f78
        "http://localhost:4001/users",
>>>>>>> bf453ef (fix: resolve condition logic)
=======
        "http://localhost:4001/user",
>>>>>>> 547af46 (fix:resolve axios)
        userProfile
      );

      if (result.status === 201) {
        console.log("User registration successful");
      } else {
        console.log("User registration failed");
      }
<<<<<<< HEAD
      return result.data;
    } catch (error) {
      console.error("An error occurred", error);
      throw error;
=======
    } catch (error) {
      console.error("An error occurred", error);
>>>>>>> bf453ef962e739cd19c32874728b5a2546023f78
    }
  };

  const handleSubmit = async (values) => {
    try {
      await registerUser(values);
      navigate("/login");
    } catch (error) {
      console.error("response error", error);
    }
  };

  return (
    <>
      {/* <Header /> */}
      <div className="w-100% flex flex-col items-center justify-center bg-[url('src/assets/registerPage/register-bg.svg')] bg-cover bg-no-repeat bg-bottom">
        <div className="w-[453px]">
          <header className="text-4xl font-medium text-[#22269e] mt-16 mb-6">
            Register to start learning!
          </header>

          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            <Form>
              <div className="mb-4">
                <label htmlFor="name" className="text-base">
                  Name
                </label>

                <Field
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Enter Name and Lastname"
                  className="w-full border border-gray-300 py-2 pl-3 pr-4 rounded-lg"
                />
                <ErrorMessage
                  name="name"
                  component="div"
                  className="text-red-500"
                />
              </div>

              <div className="mb-4">
                <label htmlFor="birthDate">Date of Birth</label>
                <Field
                  type="date"
                  id="birthDate"
                  name="birthDate"
                  className="w-full border border-gray-300 py-2 pl-3 pr-4 rounded-lg"
                />
                <ErrorMessage
                  name="birthDate"
                  component="div"
                  className="text-red-500"
                />
              </div>

              <div className="mb-4">
                <label htmlFor="education">Educational Background</label>
                <Field
                  type="text"
                  id="education"
                  name="education"
                  placeholder="Enter Educational Background"
                  className="w-full border border-gray-300 py-2 pl-3 pr-4 rounded-lg "
                />
                <ErrorMessage
                  name="education"
                  component="div"
                  className="text-red-500"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="email">Email</label>
                <Field
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Enter Email"
                  className="w-full border border-gray-300 py-2 pl-3 pr-4 rounded-lg "
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="text-red-500"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="password">Password</label>
                <Field
                  type="password"
                  id="password"
                  name="password"
                  placeholder="Enter password"
                  className="w-full border border-gray-300 py-2 pl-3 pr-4 rounded-lg "
                />
                <ErrorMessage
                  name="password"
                  component="div"
                  className="text-red-500"
                />
              </div>
              <button
                type="submit"
                className="bg-blue-500 text-white w-full mb-6 px-8 py-3.5 rounded-xl"
              >
                Register
              </button>
            </Form>
          </Formik>
          <div className="mb-5">
            Already have an account?
            <Link to="/login" className="text-blue-500 ml-2.5">
              Log in
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default RegisterPage;
