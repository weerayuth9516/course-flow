import { useState } from "react";

const toggleData = [
  {
    title: "01 Introduction",
    content: (
      <ul>
        <li>
          <p className="text-lg text-gray-700 ml-5 mt-5">
            ● Welcome to the course{" "}
          </p>
        </li>
        <li>
          <p className="text-lg text-gray-700 ml-5 ">● Course Overview </p>
        </li>
        <li>
          <p className="text-lg text-gray-700 ml-5 ">● Getting to Know You </p>
        </li>
      </ul>
    ),
  },
  {
    title: "02 Service Design Theories and Principles",
    content: (
      <ul>
        <li>
          <p className="text-lg text-gray-700 ml-5 mt-5">
            ● Welcome to the course{" "}
          </p>
        </li>
        <li>
          <p className="text-lg text-gray-700 ml-5 ">● Course Overview </p>
        </li>
        <li>
          <p className="text-lg text-gray-700 ml-5 ">● Getting to Know You </p>
        </li>
      </ul>
    ),
  },
  {
    title: "03 Understanding Users and Finding Opportunities",
    content: (
      <ul>
        <li>
          <p className="text-lg text-gray-700 ml-5 mt-5">
            ● Welcome to the course{" "}
          </p>
        </li>
        <li>
          <p className="text-lg text-gray-700 ml-5 ">● Course Overview </p>
        </li>
        <li>
          <p className="text-lg text-gray-700 ml-5 ">● Getting to Know You </p>
        </li>
      </ul>
    ),
  },
  {
    title: "04 Identifying and Validatiing Opportunities for Design",
    content: (
      <ul>
        <li>
          <p className="text-lg text-gray-700 ml-5 mt-5">
            ● Welcome to the course{" "}
          </p>
        </li>
        <li>
          <p className="text-lg text-gray-700 ml-5 ">● Course Overview </p>
        </li>
        <li>
          <p className="text-lg text-gray-700 ml-5 ">● Getting to Know You </p>
        </li>
      </ul>
    ),
  },
  {
    title: "05 Prototyping",
    content: (
      <ul>
        <li>
          <p className="text-lg text-gray-700 ml-5 mt-5">
            ● Welcome to the course{" "}
          </p>
        </li>
        <li>
          <p className="text-lg text-gray-700 ml-5 ">● Course Overview </p>
        </li>
        <li>
          <p className="text-lg text-gray-700 ml-5 ">● Getting to Know You </p>
        </li>
      </ul>
    ),
  },
];

function ToggleLesson() {
  const [toggleStates, setToggleStates] = useState(toggleData.map(() => false));

  const toggle = (index) => {
    const newToggleStates = [...toggleStates];
    newToggleStates[index] = !newToggleStates[index];
    setToggleStates(newToggleStates);
  };

  return (
    <div className="mt-5 mb-5">
      <div className="flex flex-col items-start mb-[100px]">
        {toggleData.map((item, index) => (
          <div key={index} className="w-[739px]">
            <div
              className="flex justify-between border-b border-solid border-1 pb-5 mb-3"
              onClick={() => toggle(index)}
            >
              <p className=" text-2xl">{item.title}</p>
              <button id="toggle-button">
                {toggleStates[index] ? (
                  <img src="/src/assets/registerPage/arrow-down.svg" />
                ) : (
                  <img src="/src/assets/registerPage/arrow-down.svg" />
                )}
              </button>
            </div>
            {toggleStates[index] && <div className="mb-5">{item.content}</div>}
          </div>
        ))}
      </div>
    </div>
  );
}

export default ToggleLesson;
