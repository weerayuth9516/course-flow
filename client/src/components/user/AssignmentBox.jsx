import React from "react";

function AssignmentBox() {
  return (
    <div className="w-[739px] h-[314px] bg-blue-100 flex flex-col items-center rounded-lg mt-[70px]">
      <div className="w-[691px] h-[32px] flex justify-between items-center mt-4">
        <div className="text-body1 text-black">Assignment</div>
        <div className="text-[#996500] text-[16px] w-[79px] bg-[#FFFBDB] border flex justify-center p-1">
          Pending
        </div>
      </div>
      <div className="w-[691px] h-[124px] flex flex-col mt-5">
        <div className="text-[16px] mb-2">
          What are the 4 elements of this lesson?
        </div>
        <div className="w-[691px] h-[96px] text-[16px] text-gray-600 border-1 rounded-lg bg-white pl-5 pt-3">
          Answer...
        </div>
      </div>
      <div className="w-[691px] flex justify-start mt-8">
        <button className="w-[203px] h-[60px] text-[16px] text-white font-bold rounded-xl bg-blue-500">
          Send Assignment
        </button>
      </div>
    </div>
  );
}

export default AssignmentBox;
