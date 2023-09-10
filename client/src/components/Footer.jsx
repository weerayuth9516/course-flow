import logo from "../assets/header/CourseFlow.png";
import facebookLogo from "../assets/footer/fb.png";
import igLogo from "../assets/footer/ig.png";
import twLogo from "../assets/footer/tw.png";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <section className="bg-blue-600 h-auto ">
      <div className="flex h-[88px] items-center justify-between pl-[160px] pr-[160px] pt-[100px] pb-[100px]">
        <Link to="/">
          <img className="cursor-pointer" src={logo}></img>
        </Link>


        <div className="flex gap-[10px]">
          <a className="cursor-pointer">
            <img src={facebookLogo}></img>
          </a>
          <a className="cursor-pointer">
            <img src={igLogo}></img>
          </a>
          <a className="cursor-pointer">
            <img src={twLogo}></img>
          </a>
        </div>
      </div>
    </section>
  );
}

export default Footer;
