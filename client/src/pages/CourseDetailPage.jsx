import React from "react";
import { Link } from "react-router-dom";

import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

function CourseDetailPage() {
  return (
    <>
      <div className="flex flex-col mt-9">
        <Link to="/course">🡠 Back</Link>
        <div className="flex justify-center">
          <div className="w-[739px] h-[460px] bg-gray-500 rounded-lg"></div>
          <div className="w-[357px] h-[449px] py-8 px-6 shadow-lg rounded-lg ml-5">
            <p className="course">Course</p>
            <p className="name-course">Service Design Essentails</p>
            <p className="detail">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit.
            </p>
            <p className="price-course">THB 3,559.00</p>
            <hr />
            <button className="get-in">Get in Desire Course</button>
            <br />
            <button className="subscribe">Subscribe This Course</button>
          </div>
        </div>
        <div className="w-[739px] ml-[200px]">
          <p className="text-4xl font-medium mb-6">Course Detail</p>
          <p className="text-gray-700">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Elementum
            aenean fermentum, velit vel, scelerisque morbi accumsan. Nec, tellus
            leo id leo id felis egestas. Quam sit lorem quis vitae ut mus
            imperdiet. Volutpat placerat dignissim dolor faucibus elit ornare
            fringilla. Vivamus amet risus ullamcorper auctor nibh. Maecenas
            morbi nec vestibulum ac tempus vehicula.
            <p className="mt-5">
              Vel, sit magna nisl cras non cursus. Sed sed sit ullamcorper
              neque. Dictum sapien amet, dictumst maecenas. Mattis nulla tellus
              ut neque euismod cras amet, volutpat purus. Semper purus viverra
              turpis in tempus ac nunc.
            </p>
            <p className="mb-8">
              Morbi ullamcorper sed elit enim turpis. Scelerisque rhoncus morbi
              pulvinar donec at sed fermentum. Duis non urna lacus, sit amet.
              Accumsan orci elementum nisl tellus sit quis. Integer turpis
              lectus eu blandit sit. At at cras viverra odio neque nisl
              consectetur.Arcu senectus aliquet vulputate urna, ornare. Mi sem
              tellus elementum at commodo blandit nunc.
            </p>
            Viverra elit adipiscing ut dui, tellus viverra nec. Lectus pharetra
            eget curabitur lobortis gravida gravida eget ut. Nullam velit morbi
            quam a at. Sed eu orci, sociis nulla at sit. Nunc quam integer metus
            vitae elementum pulvinar mattis nulla molestie. Quis eget
            vestibulum, faucibus malesuada eu. Et lectus molestie egestas
            faucibus auctor auctor.
          </p>
        </div>
        <div className="w-[739px] ml-[200px]">
          <header className="module">Module Samples</header>

          <Accordion className="border-b bg-none">
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
                <ul className="list-disc ml-8">
                  <li>Welcome to the Course</li>
                  <li>Welcome to the Course</li>
                  <li>Welcome to the Course</li>
                  <li>Welcome to the Course</li>
                  <li>Welcome to the Course</li>
                  <li>Welcome to the Course</li>
                  <li>Welcome to the Course</li>
                  <li>Welcome to the Course</li>
                  <li>Welcome to the Course</li>
                  <li>Welcome to the Course</li>
                  <li>Welcome to the Course</li>
                </ul>
              </Typography>
            </AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel2a-content"
              id="panel2a-header"
            >
              <Typography>
                <span>02</span> Service Design Theories and Principles
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                <ul className="list-disc">
                  <li>Welcome to the Course</li>
                  <li>Welcome to the Course</li>
                  <li>Welcome to the Course</li>
                  <li>Welcome to the Course</li>
                  <li>Welcome to the Course</li>
                  <li>Welcome to the Course</li>
                  <li>Welcome to the Course</li>
                  <li>Welcome to the Course</li>
                  <li>Welcome to the Course</li>
                  <li>Welcome to the Course</li>
                  <li>Welcome to the Course</li>
                </ul>
              </Typography>
            </AccordionDetails>
          </Accordion>
        </div>
      </div>
    </>
  );
}

export default CourseDetailPage;
