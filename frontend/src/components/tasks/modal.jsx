import { useEffect, useRef, useState } from "react";
import GlobalModal from "../globals/globalModal";

export default function Modal({ open, onClose, onSave }) {
  const formRef = useRef(null);
  const [taskData, setTaskData] = useState({
    title: "",
    description: "",
    dueDate: "",
    categories: [],
    priority: "medium",
    reminderDate: "",
    reminderTime: "",
  });

  useEffect(() => {
    if (open) {
      formRef.current?.querySelector("input")?.focus();

      setTaskData((prev) => ({
        ...prev,
        dueDate: prev.dueDate || new Date().toISOString().split("T")[0],
      }));
    }
  }, [open]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const reminder = taskData.reminderDate && taskData.reminderTime
      ? new Date(`${taskData.reminderDate}T${taskData.reminderTime}`)
      : undefined;

    const formattedTask = {
      title: taskData.title.trim(),
      description: taskData.description.trim(),
      dueDate: new Date(taskData.dueDate),
      categories: "",
      priority: taskData.priority,
      reminder,
    };

    if (formattedTask.title) {
      onSave(formattedTask);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTaskData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handlePriorityChange = (e) => {
    setTaskData((prev) => ({
      ...prev,
      priority: e.target.value,
    }));
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "low":
        return "bg-green-500";
      case "medium":
        return "bg-yellow-500";
      case "high":
        return "bg-red-500";
    }
  };

  return (
    <GlobalModal open={open} onClose={onClose}>
      <form ref={formRef} onSubmit={handleSubmit} className="">
        <div className="mb-2">
          <input
            id="title"
            name="title"
            type="text"
            value={taskData.title}
            onChange={handleInputChange}
            className="w-full border rounded px-3 py-2 focus:ring focus:ring-blue-200"
            required
          />
        </div>
        <div className="flex flex-col sm:flex-row gap-2">
          <div className="flex w-full h-[365px]">
            <textarea
              id="description"
              name="description"
              type="text"
              value={taskData.description}
              onChange={handleInputChange}
              className="w-full border rounded px-3 py-2 focus:ring resize-none focus:ring-blue-200"
            />
          </div>
          <div className="flex w-full flex-row sm:flex-col sm:w-40 justify-between">
            <div>
              <div>
                <input
                  id="dueDate"
                  name="dueDate"
                  type="date"
                  value={taskData.dueDate}
                  onChange={handleInputChange}
                  className="w-full border rounded px-3 py-2 focus:ring focus:ring-blue-200"
                  required
                />
              </div>
              <div className="flex items-center justify-start gap-2">
                <select
                  id="priority"
                  name="priority"
                  value={taskData.priority}
                  onChange={handlePriorityChange}
                  className="w-20 rounded px-3 py-2"
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
                <span
                  className={`${getPriorityColor(taskData.priority)} px-3 py-3 rounded-full text-white`}
                ></span>
              </div>
              <div>
                <input
                  id="reminderDate"
                  name="reminderDate"
                  type="date"
                  value={taskData.reminderDate}
                  onChange={handleInputChange}
                  className="w-full border rounded px-3 py-2 focus:ring focus:ring-blue-200"
                />
              </div>
              <div>
                <input
                  id="reminderTime"
                  name="reminderTime"
                  type="time"
                  value={taskData.reminderTime}
                  onChange={handleInputChange}
                  className="w-full border rounded px-3 py-2 focus:ring focus:ring-blue-200"
                />
              </div>
            </div>
            <div className="flex flex-col justify-end space-x-2 pt-2">
              <button
                type="button"
                className="btn bg-gray-300 text-gray-800 hover:bg-gray-400"
                onClick={onClose}
              >
                Cancel
              </button>
              <button type="submit" className="btn">
                Save
              </button>
            </div>
          </div>
        </div>
      </form>
    </GlobalModal>
  );
}
