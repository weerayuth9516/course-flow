import React from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";

import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

function CourseDetailPage() {
  return (
    <>
      <Header />

      <div className="flex justify-evenly mt-9">
        <div className="flex flex-col">
          <Link to="/course" className="text-blue-500 mb-4 font-bold">
            <span className="font-semibold text-xs pr-2">🡠</span> Back
          </Link>
          <div className="w-[739px] h-[460px] bg-gray-500 rounded-lg"></div>
          <div className="w-[735px]">
            <p className="text-4xl font-medium mb-6 mt-20">Course Detail</p>
            <p className="text-gray-700">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Elementum
              aenean fermentum, velit vel, scelerisque morbi accumsan. Nec,
              tellus leo id leo id felis egestas. Quam sit lorem quis vitae ut
              mus imperdiet. Volutpat placerat dignissim dolor faucibus elit
              ornare fringilla. Vivamus amet risus ullamco auctor nibh. Maecenas
              morbi nec vestibulum ac tempus vehicula.
              <p className="mt-5">
                Vel, sit magna nisl cras non cursus. Sed sed sit ullamcorper
                neque. Dictum sapien amet, dictumst maecenas. Mattis nulla
                tellus ut neque euismod cras amet, volutpat purus. Semper purus
                viverra turpis tempus ac nunc.
              </p>
              <p className="mb-8">
                Morbi ullamcorper sed elit enim turpis. Scelerisque rhoncus
                morbi pulvinar donec at sed fermentum. Duis non urna lacus, sit
                amet. Accumsan orci elementum nisl tellus sit quis. Integer
                turpis lectus eu blandit sit. At at cras viverra odio neque nisl
                consectetur.Arcu senectus aliquet vulputate urna, ornare.sem
                tellus elementum at commodo blandit nunc.
              </p>
              Viverra elit adipiscing ut dui, tellus viverra nec. Lectus
              pharetra eget curabitur lobortis gravida gravida eget ut. Nullam
              velit morbi quam a at. Sed eu orci, sociis nulla at sit. Nunc quam
              integer metus vitae elementum pulvinar mattis nulla molestie. Quis
              eget vestibulum, faucibus malesuada eu. Et lectus molestie egestas
              faucibus auctor auctor.
            </p>
          </div>
          <div className="w-[739px]">
            <header className="font-medium text-4xl mt-16">
              Module Samples
            </header>

            <Accordion
              className="mt-8 mb-40"
              style={{ boxShadow: "none", border: "none", height: "50px" }}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography className="font-medium text-black !text-2xl">
                  <span className="text-gray-700 text-2xl font-medium mr-3">
                    01
                  </span>
                  Introduction
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>
                  <hr className="mb-2" />
                  <div className="pl-8 text-gray-700">
                    <Typography variant="body1">
                      • Welcome to the Course <br />• Welcome to the Course
                      <br />• Welcome to the Course
                      <br />• Welcome to the Course
                      <br />• Welcome to the Course
                      <br />• Welcome to the Course
                      <br />• Welcome to the Course
                      <br />• Welcome to the Course
                    </Typography>
                  </div>
                </Typography>
              </AccordionDetails>
            </Accordion>
          </div>
        </div>

        <div className="h-full mt-12 sticky">
          <div className="w-[357px] h-[449px] py-8 px-6 shadow-lg rounded-lg ml-10">
            <p className="text-sm text-orange-500 mb-4">Course</p>
            <p className="text-2xl text-black font-medium mb-2">
              Service Design Essentails
            </p>
            <p className="text-gray-700 mb-5">
              Lorem ipsum dolor sit amet, conse.
              <br /> ctetur adipiscing elit.
            </p>
            <p className="text-gray-700 text-2xl font-medium mb-6">
              THB 3,559.00
            </p>
            <hr className="mb-6" />
            <button className="px-8 py-[18px] w-[309px] h-[60px] border-solid border-[1px] rounded-[12px] border-orange-500 font-bold text-orange-500 mt-3 hover:bg-orange-500 hover:text-white">
              Get in Desire Course
            </button>
            <br />
            <button className="px-8 py-[18px] w-[309px] h-[60px] border-solid border-[1px] rounded-[12px] bg-blue-500 font-bold text-white mt-5 hover:opacity-75 ">
              Subscribe This Course
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default CourseDetailPage;
