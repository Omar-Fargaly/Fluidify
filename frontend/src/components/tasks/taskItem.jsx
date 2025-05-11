import React, { useState } from "react";

function TaskItem() {
  const [isChecked, setIsChecked] = useState(false);
  const handleChange = (event) => {
    setIsChecked(event.target.checked);
  };
  return (
    <div className="flex border-1 bg-black/80 border-white items-center px-7 py-5 rounded-3xl shadow-2xl">
      <div className="">
        <input
          type="checkbox"
          checked={isChecked}
          onChange={handleChange}
          className="transform scale-200 sm:scale-250 w-fit h-fit me-4 sm:me-7"
        />
      </div>
      <div className=" w-full flex flex-col gap-2">
        <div className="flex w-full justify-between items-center">
          <h2 className="font-bela text-lg sm:text-2xl w-[200px] whitespace-nowrap overflow-hidden text-ellipsis">
            Imagine a long text is here that takes all of this space
          </h2>{" "}
          <div className="flex gap-3 ">
            <img
              src="./notify-icon.svg"
              alt="notify-icon"
              className="w-[30px]"
            />
            <button className="bg-red-600 p-4 rounded-full"></button>
          </div>
        </div>
        <div className="flex w-full justify-between">
          <p className="font-poppins text-bold text-gray-300 text-md sm:text-lg">Date</p>
          <p className="font-poppins text-bold text-gray-300 text-md sm:text-lg">Date will be here</p>

        </div>
      </div>
    </div>
  );
}

export default TaskItem;
