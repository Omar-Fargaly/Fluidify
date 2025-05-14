import React, { useState } from "react";
import { updateTask, deleteTask  } from "../../libs/api/tasks.js";

import { useQueryClient } from "@tanstack/react-query";
import Modal from "./modal";

function TaskItem({ task }) {
  const [isChecked, setIsChecked] = useState(task.completed);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const queryClient = useQueryClient();

  const handleCheckChange = async (event) => {
    event.stopPropagation();
    const checked = event.target.checked;
    setIsChecked(checked);

    try {
      await updateTask(task._id, { completed: checked });
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    } catch (err) {
      console.error("Failed to update task:", err);
      setIsChecked(!checked);
    }
  };


const handleDelete = async (taskId) => {
  try {
    await deleteTask(taskId);
    queryClient.invalidateQueries({ queryKey: ["tasks"] });
    setIsModalOpen(false);
  } catch (err) {
    console.error("Failed to delete task:", err);
  }
};

  const handleSave = async (updatedTask) => {
    try {
      await updateTask(task._id, updatedTask);
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      setIsModalOpen(false);
    } catch (err) {
      console.error("Failed to edit task:", err);
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "low":
        return "bg-green-500";
      case "medium":
        return "bg-yellow-500";
      case "high":
        return "bg-red-500";
      default:
        return "bg-gray-500";
    }
  };

  return (
    <>
      <div
        onClick={() => setIsModalOpen(true)}
        className={`flex  bg-black/30 items-center px-7 py-5 rounded-2xl shadow-2xl transition-opacity duration-300 cursor-pointer ${
          isChecked ? "opacity-80" : ""
        }`}
      >
        <div>
          <input
            type="checkbox"
            checked={isChecked}
            onChange={handleCheckChange}
            onClick={(e) => e.stopPropagation()}
            className="transform scale-200 sm:scale-250 w-fit h-fit me-4 sm:me-7"
          />
        </div>
        <div className="w-full flex flex-col gap-2">
          <div className="flex w-full justify-between items-center">
            <h2
              className={`font-bela text-lg text-start sm:text-xl w-[200px] whitespace-nowrap overflow-hidden text-ellipsis ${
                isChecked ? "line-through text-gray-400" : ""
              }`}
            >
              {task.title}
            </h2>
            <div className="flex gap-3 items-center">
              {/* Priority color dot */}
              {task.reminder && (
                <img
                  src="./notify-icon.svg"
                  alt="notify-icon"
                  className="w-[25px]"
                />
              )}
              <span
                className={`w-7 h-7 rounded-full ${getPriorityColor(
                  task.priority
                )}`}
              ></span>
            </div>
          </div>
          <div className="flex w-full">
            <p className="font-poppins text-bold text-gray-300 text-md sm:text-lg">
              {task.dueDate
                ? new Date(task.dueDate).toLocaleDateString()
                : "No date"}
            </p>
          </div>
        </div>
      </div>

      {/* Edit Modal */}
      <Modal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSave}
        onDelete={handleDelete}
        initialData={task}
      />
    </>
  );
}

export default TaskItem;
