import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";

import vector from "../assets/homepage/vector.png";
import polygon from "../assets/homepage/Polygon.png";
import heart from "../assets/homepage/heart.png";
import verify from "../assets/homepage/verify.png";
import commu from "../assets/homepage/commu.png";
import wave from "../assets/homepage/wave.png";
import computer from "../assets/homepage/computer.png";
import circle1 from "../assets/homepage/Ellipse5.png";
import polygon3 from "../assets/homepage/Polygon3.png";
import ellipse7 from "../assets/homepage/Ellipse7.png";
import group5 from "../assets/homepage/Group5.png";
import ellipse6 from "../assets/homepage/Ellipse6.png";
import frame from "../assets/homepage/frame.png";

export default function HomePage() {
  return (
    <>
      <Header />
      {/* <div className="text-[48px] mb-[30px] pl-[6%]">
      <Header />
    </div> */}
      <div className="bg-blue-100 h-auto relative pl-[15%] pr-[15%] mb-[100px] z-0">
        <div className="pt-[210px] pb-[230px]">
          <div className="font-semibold text-5xl">Best Virtual</div>
          <div className="font-semibold text-5xl mb-[25px]">
            Classroom Software
          </div>
          <div className="text-gray-700">
            Welcome to Schooler! The one-stop online class management
          </div>
          <div className="text-gray-700 mb-[40px]">
            system that caters to all your educational needs
          </div>
          <Link to="/course">
            <button className="bg-blue-500 text-white font-semibold py-[14px] px-[35px] rounded-xl">
              Explore Courses
            </button>
          </Link>
          <img className="absolute top-0 right-0 z-0" src={wave}></img>
          <img
            className="absolute top-[14%] right-[10%] z-0"
            src={computer}
          ></img>
          <img
            className="absolute top-[10%] left-[-1%] z-0"
            src={circle1}
          ></img>
          <img
            className="absolute right-[10%] bottom-[10%]"
            src={polygon3}
          ></img>
          <img
            className="absolute right-[4%] bottom-[40%]"
            src={ellipse7}
          ></img>
          <img className="absolute right-[40%] top-[15%]" src={group5}></img>
          <img
            className="absolute right-[45%] bottom-[16%]"
            src={ellipse6}
          ></img>
        </div>
      </div>
      <div className="flex pl-[15%] pr-[15%] gap-[50px] mb-[100px]">
        <img
          className="object-cover h-auto w-[40%] rounded-md"
          src="https://www.phoenix.edu/content/dam/edu/blog/2023/02/Male-programmer-writing-code-in-modern-office-704x421.jpg"
          alt=""
        ></img>
        <div className="flex flex-col">
          <div className="font-semibold text-2xl">
            Learning experience has been
          </div>
          <div className="mb-[30px] font-semibold text-2xl">
            enhanced with new technologies
          </div>
          <div className="flex mb-[20px]">
            <img
              className="mr-[15px] h-[30px] w-[30px]"
              src={verify}
              alt=""
            ></img>
            <div className="flex-col">
              <h2 className="mb-[10px]">Secure & Easy</h2>
              <p>
                Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                Nesciunt aliquam voluptate vitae nihil, eligendi ab aliquid.
              </p>
            </div>
          </div>
          <div className="flex mb-[20px]">
            <img
              className="mr-[15px] h-[30px] w-[30px]"
              src={heart}
              alt=""
            ></img>
            <div className="flex-col">
              <h2 className="mb-[10px]">Support All Student</h2>
              <p>
                Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                Nesciunt aliquam voluptate vitae nihil, eligendi ab aliquid.
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="flex pl-[15%] pr-[15%] gap-[50px] mb-[100px]">
        <div className="flex flex-col">
          <div className="font-semibold text-2xl">
            Interaction between the tutor{" "}
          </div>
          <div className="mb-[30px] font-semibold text-2xl">
            and the learners
          </div>
          <div className="flex mb-[20px]">
            <img
              className="mr-[15px] h-[30px] w-[30px]"
              src={commu}
              alt=""
            ></img>
            <div className="flex-col">
              <h2 className="mb-[10px]">Purely Collaborative</h2>
              <p>
                Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                Nesciunt aliquam voluptate vitae nihil, eligendi ab aliquid.
              </p>
            </div>
          </div>
          <div className="flex mb-[20px]">
            <img
              className="mr-[15px] h-[30px] w-[30px]"
              src={heart}
              alt=""
            ></img>
            <div className="flex-col">
              <h2 className="mb-[10px]">Support All Student</h2>
              <p>
                Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                Nesciunt aliquam voluptate vitae nihil, eligendi ab aliquid.
              </p>
            </div>
          </div>
        </div>
        <img
          className="object-cover h-auto w-[40%] rounded-md"
          src="https://usa.bootcampcdn.com/wp-content/uploads/sites/119/2020/12/tes_gen_blog_code7-1-800x412.jpg"
          alt=""
        ></img>
      </div>

      <div className=" flex flex-col justify-center items-center">
        <h1 className="items-center justify-center mb-[50px] text-2xl text-bold font-semibold text-header2">
          Our Professional Instructor
        </h1>
        <div className="pl-[10%] pr-[10%] flex gap-[40px] mb-[100px]">
          <div className="flex flex-col justify-center items-center">
            <img
              className="w-[350px] h-[350px] object-cover rounded-md"
              src="https://w.wallha.com/ws/14/DWaxqUMB.jpg"
              alt=""
            ></img>
            <div>Kim Jisoo</div>
            <div className="text-xs text-blue-400">Blackpink</div>
          </div>
          <div className="flex flex-col justify-center items-center">
            <img
              className="w-[350px] h-[350px] object-cover rounded-md"
              src="https://s.isanook.com/jo/0/ud/492/2462673/jennie.jpg?ip/crop/w670h402/q80/jpg"
              alt=""
            ></img>
            <div>Kim Jennie</div>
            <div className="text-xs text-blue-400">Blackpink</div>
          </div>
          <div className="flex flex-col justify-center items-center">
            <img
              className="w-[350px] h-[350px] object-cover rounded-md"
              src="https://i.mydramalist.com/66L5p_5c.jpg"
              alt=""
            ></img>
            <div>Park Chaeyoung</div>
            <div className="text-xs text-blue-400">Blackpink</div>
          </div>
          <div className="flex flex-col justify-center items-center">
            <img
              className="w-[350px] h-[350px] object-cover rounded-md"
              src="https://i.pinimg.com/736x/16/34/5b/16345b49fe985982921dabaefa03880c.jpg"
              alt=""
            ></img>
            <div>Lalisa Manoban</div>
            <div className="text-xs text-blue-400">Blackpink</div>
          </div>
        </div>
      </div>
      <section className="mb-[200px]">
        <img className="w-screen" src={frame}></img>
      </section>

      <div className="bg-gradient-to-r from-indigo-500 to-sky-500 h-auto relative flex justify-between">
        <div className="flex flex-col pl-[15%] pt-[120px] pb-[170px]">
          <div className="text-white text-4xl">Interested in Becoming</div>
          <div className="text-white text-4xl mb-[40px] ">
            a Software Developer?
          </div>
          <Link to="/course">
            <button className="text-orange-400 bg-white w-[80%] py-[20px] rounded-md font-semibold">
              Check Out Our Course
            </button>
          </Link>
        </div>
        <img className=" object-cover absolute right-[12%]" src={vector}></img>
        <img
          className="w-[40px] h-[40px] top-[100px] right-[5%] absolute"
          src={polygon}
        ></img>
      </div>
      <Footer />
    </>
  );
}
