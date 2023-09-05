// import React from "react";
// import { Link } from "react-router-dom";
// import { useFormik } from "formik";
// import * as Yup from "yup";

// function RegisterPage() {
//   return (
//     <div className="h-screen flex flex-col items-center justify-center bg-[url('src/assets/registerPage/register-bg.svg')] bg-cover bg-no-repeat bg-bottom">
//       <div className="w-[453px]">
//         <header className="text-4xl font-medium text-[#22269e] mb-6">
//           Register to start learning!
//         </header>

//         <form>
//           <label htmlFor="name" className="text-base">
//             Name
//           </label>
//           <br />
//           <input
//             type="text"
//             id="name"
//             name="name"
//             placeholder="Enter Name and Lastname"
//             className="w-full border border-gray-300 py-2 pl-3 pr-4 rounded-lg mb-6"
//           />
//           <br />
//           <label htmlFor="birthDate">Date of Birth</label>
//           <br />
//           <input
//             type="text"
//             placeholder="DD/MM/YY"
//             className="w-full border border-gray-300 py-2 pl-3 pr-4 rounded-lg"
//           />
//           <input type="date" className="mb-6" />
//           <br />
//           <label htmlFor="education">Educational Background</label>
//           <br />
//           <input
//             type="text"
//             placeholder="Enter Educational Background"
//             className="w-full border border-gray-300 py-2 pl-3 pr-4 rounded-lg mb-6"
//           />
//           <br />
//           <label htmlFor="email">Email</label>
//           <br />
//           <input
//             type="email"
//             placeholder="Enter Email"
//             className="w-full border border-gray-300 py-2 pl-3 pr-4 rounded-lg mb-6"
//           />
//           <br />
//           <label htmlFor="password">Password</label>
//           <br />
//           <input
//             type="password"
//             placeholder="Enter password"
//             className="w-full border border-gray-300 py-2 pl-3 pr-4 rounded-lg mb-6"
//           />
//           <br />
//           <button
//             type="submit"
//             className="bg-blue-500 text-white w-full mb-6 px-8 py-3.5 rounded-xl"
//           >
//             Register
//           </button>
//           <div className="already">
//             Already have an account?
//             <Link to="/login" className="text-blue-500 ml-2.5">
//               Log in
//             </Link>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// }

// export default RegisterPage;
