import React from "react";

export function DesireCourseModal({ isOpen, onRequestClose, courseName }) {
  return (
    <>
      {isOpen && (
        <div className="fixed top-0 left-0 w-screen h-screen bg-black opacity-70 z-20"></div>
      )}
      <div
        className={`fixed top-[250px] left-[380px] z-30 ${
          isOpen ? "" : "hidden"
        }`}
      >
        <div className="bg-white shadow-lg rounded-3xl w-[470px] pb-5">
          <div className="pt-5 pb-3 pl-7 pr-8 flex justify-between border-b border-1">
            <p className="text-xl ">Confirmation</p>
            <button className="text-gray-500 mr-4" onClick={onRequestClose}>
              X
            </button>
          </div>
          <div className="mt-5 pl-7 pr-5">
            <p className="text-gray-700 ">
              Are you sure to add {courseName} Course to your Desire Course?
            </p>
            <div className="mt-5">
              <button
                className="border-[1px] border-orange-500 text-orange-500 font-bold w-[142px] h-[55px] rounded-xl mr-5 hover:bg-orange-500 hover:text-white"
                onClick={onRequestClose}
              >
                Cancel
              </button>
              <button
                className="font-bold text-white bg-blue-500 w-[142px] h-[55px] rounded-xl hover:bg-blue-600"
                onClick={onRequestClose}
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export function SubscribeModal({
  isOpen2,
  onRequestClose2,
  courseName,
  onConfirm,
}) {
  const handleConfirm = () => {
    onConfirm();
    onRequestClose2();
  };

  return (
    <>
      {isOpen2 && (
        <div className="fixed top-0 left-0 w-screen h-screen bg-black opacity-70 z-20"></div>
      )}
      <div
        className={`fixed top-[250px] left-[380px] z-30 ${
          isOpen2 ? "" : "hidden"
        }`}
      >
        <div className="bg-white shadow-lg rounded-3xl w-[528px] pb-5">
          <div className="pt-5 pb-3 pl-7 pr-8 flex justify-between border-b border-1">
            <p className="text-xl ">Confirmation</p>
            <button className="text-gray-500 mr-4" onClick={onRequestClose2}>
              X
            </button>
          </div>
          <div className="mt-5 pl-7">
            <p className="text-gray-700">
              Are you sure to subscribe {courseName} Course?
            </p>
            <div className="mt-5">
              <button
                className="border-[1px] border-orange-500 text-orange-500 font-bold w-[142px] h-[55px] rounded-xl mr-5 hover:bg-orange-500 hover:text-white"
                onClick={onRequestClose2}
              >
                No, I don't
              </button>
              <button
                className="font-bold text-white bg-blue-500 w-[250px] h-[55px] rounded-xl hover:bg-blue-600"
                onClick={handleConfirm}
              >
                Yes, I want to subscribe
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
