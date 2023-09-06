import logo from "../assets/header/CourseFlow.png";

import arrow from "../assets/header/arrow-dropdown.png";
import userimage from "../assets/header/user.png";
import homework from "../assets/header/homework.png";
import frames from "../assets/header/Frame.png";
import star from "../assets/header/star.png";
import logout from "../assets/header/logout.png";
import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import useGetuser from "../hook/useGetuser";
import { useContext } from "react";
import { SessionContext } from "../App";
import { supabase } from "../supabase/client";
function Header() {
  const { session, setSession } = useContext(SessionContext);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const params = useParams();
  const { user, getCurrentUser } = useGetuser();

  function singOutHandle(_event) {
    if (_event) {
      supabase.auth.signOut();
      setSession(null);
    }
  }
  useEffect(() => {
    if (session) {
      getCurrentUser(session.user.id);
      setIsLoggedIn(true);
    } else {
      getCurrentUser(null);
      setIsLoggedIn(false);
    }
  }, [session]);

  return (
    <section id="header" className="font-inter">
      <div
        id="header-container"
        className="flex h-[88px] items-center justify-between pl-[160px] pr-[160px]"
      >
        <img id="logo" src={logo} alt="Logo" />
        <div
          id="header-items"
          className="flex items-center justify-between text-body2 font-bold"
        >
          <Link to="/course">
            <span
              id="ourCourses"
              className="text-blue-700 mr-[50px] hover:text-blue-500"
            >
              Our Courses
            </span>
          </Link>

          {isLoggedIn ? (
            <>
              <div
                id="nav-items"
                className="flex items-center justify-between relative"
              >
                <img
                  id="image-profile"
                  className="w-10 h-10 m-2 rounded-full"
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                  alt="image profile"
                />
                <span
                  id="username"
                  className="text-body2 font-normal text-gray-800 m-2"
                >
                  {user.user_name}
                </span>
                <img
                  id="arrow-dropdown"
                  src={arrow}
                  alt="arrow-dropdown"
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className="rounded-full scale-100 active:scale-125"
                />
              </div>

              {/* Dropdown */}
              {isMenuOpen && (
                <div
                  id="menuItems"
                  className="bg-white drop-shadow-xl flex flex-col absolute top-16 right-1 text-body3 font-normal text-gray-700 rounded-md w-[198px] z-30"
                >
                  <Link to="/editprofile">
                    <div className="flex items-center rounded-md hover:bg-blue-200">
                      <img
                        id="profile"
                        className="p-4"
                        src={userimage}
                        alt="profile"
                      />
                      <span id="profile">Profile</span>
                    </div>
                  </Link>
                  <Link to="/mycourses">
                    <div className="flex items-center rounded-md hover:bg-blue-200">
                      <img
                        id="myCourses"
                        className="p-4"
                        src={frames}
                        alt="My courses"
                      />
                      <span id="myCourses">My Courses</span>
                    </div>
                  </Link>
                  <Link to="/myhomeworks">
                    <div className="flex items-center rounded-md hover:bg-blue-200">
                      <img
                        id="myHomework"
                        className="p-4"
                        src={homework}
                        alt="My homework"
                      />
                      <span id="myHomework">My Homework</span>
                    </div>
                  </Link>
                  <Link to="/mydesirecourses">
                    <div className="flex items-center rounded-md hover:bg-blue-200">
                      <img
                        id="myDesireCourse"
                        className="p-4"
                        src={star}
                        alt="My Desire Course"
                      />
                      <span id="myDesireCourse">My Desire Courses</span>
                    </div>
                  </Link>
                  <hr className="bg-gray-300 h-0.5" />
                  <Link to="/login" onClick={singOutHandle}>
                    <div className="flex items-center rounded-md hover:bg-red-100">
                      <img
                        id="logOut"
                        className="p-4"
                        src={logout}
                        alt="Log out"
                      />
                      <span id="logOut">Log out</span>
                    </div>
                  </Link>
                </div>
              )}
            </>
          ) : (
            <Link to="/login">
              <button
                id="login"
                className="text-white bg-blue-500 w-[126px] h-[60px] rounded-xl hover:bg-blue-600"
              >
                Log in
              </button>
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}

export default Header;
