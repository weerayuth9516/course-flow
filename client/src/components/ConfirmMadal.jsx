import React from "react";

export function ConfirmationModal({ isOpen, onRequestClose }) {
  return (
    <div className={`fixed top-[250px] left-[380px] ${isOpen ? "" : "hidden"}`}>
      <div className="bg-white shadow-lg rounded-3xl w-[470px] h-[212px]">
        <div className="pt-5 pb-3 pl-7 pr-8 flex justify-between border-b border-1">
          <p className="text-xl ">Confirmation</p>
          <button className="text-gray-500 mr-4" onClick={onRequestClose}>
            X
          </button>
        </div>
        <div className="mt-5 pl-7">
          <p className="text-gray-700 ">
            Are you sure to add this course to your Desire Course?
          </p>
          <div className="mt-5">
            <button
              className="text-white bg-blue-500 font-bold w-[142px] h-[55px] rounded-xl mr-7 hover:bg-blue-600"
              onClick={onRequestClose}
            >
              Confirm
            </button>
            <button
              className="font-bold border-[1px] border-orange-500 text-orange-500 w-[142px] h-[55px] rounded-xl hover:bg-orange-500 hover:text-white"
              onClick={onRequestClose}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
