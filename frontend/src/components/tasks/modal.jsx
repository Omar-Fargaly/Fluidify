import { useEffect, useRef, useState } from "react";
import GlobalModal from "../globals/globalModal";

export default function Modal({
  open,
  onClose,
  onSave,
  onDelete,
  initialData = null,
}) {
  const formRef = useRef(null);

  const [taskData, setTaskData] = useState({
    id: null,
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

      if (initialData) {
        const reminder = initialData.reminder
          ? new Date(initialData.reminder)
          : null;

        setTaskData({
          id: initialData.id || null,
          title: initialData.title || "",
          description: initialData.description || "",
          dueDate: initialData.dueDate
            ? new Date(initialData.dueDate).toISOString().split("T")[0]
            : new Date().toISOString().split("T")[0],
          categories: initialData.categories || [],
          priority: initialData.priority || "medium",
          reminderDate: reminder ? reminder.toISOString().split("T")[0] : "",
          reminderTime: reminder
            ? reminder.toTimeString().split(":").slice(0, 2).join(":")
            : "",
        });
      } else {
        setTaskData({
          id: null,
          title: "",
          description: "",
          dueDate: new Date().toISOString().split("T")[0],
          categories: [],
          priority: "medium",
          reminderDate: "",
          reminderTime: "",
        });
      }
    }
  }, [open, initialData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const reminder =
      taskData.reminderDate && taskData.reminderTime
        ? new Date(`${taskData.reminderDate}T${taskData.reminderTime}`)
        : undefined;

    const formattedTask = {
      id: taskData.id,
      title: taskData.title.trim(),
      description: taskData.description.trim(),
      dueDate: new Date(taskData.dueDate),
      categories: taskData.categories,
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
      <form ref={formRef} onSubmit={handleSubmit}>
        <div className="mb-2">
          <input
            id="title"
            name="title"
            type="text"
            placeholder="Task Name"
            value={taskData.title}
            onChange={handleInputChange}
            className="w-full bg-[#40474C] border rounded px-3 py-2 focus:ring focus:ring-blue-200"
            required
          />
        </div>
        <div className="flex flex-col sm:flex-row gap-2">
          <div className="flex w-full h-[365px]">
            <textarea
              id="description"
              name="description"
              placeholder="Task Description"
              value={taskData.description}
              onChange={handleInputChange}
              className="w-full bg-[#40474C] border rounded px-3 py-2 focus:ring resize-none focus:ring-blue-200"
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
                  <option className="bg-[#191B1D]" value="low">Low</option>
                  <option className="bg-[#191B1D]" value="medium">Medium</option>
                  <option className="bg-[#191B1D]" value="high">High</option>
                </select>
                <span
                  className={`${getPriorityColor(
                    taskData.priority
                  )} px-3 py-3 rounded-full text-white`}
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
            <div className="flex flex-col gap-1 justify-end space-x-2 pt-2">
              {initialData && (
                <button
                  type="button"
                  className="btn py-1 bg-red-600 text-white hover:bg-red-700 w-full"
                  onClick={() => {
                      onDelete(initialData.id || initialData._id);
                  }}
                >
                  Delete
                </button>
              )}
              <button
                type="button"
                className="btn py-1 bg-gray-300 text-gray-800 w-full hover:bg-gray-400"
                onClick={onClose}
              >
                Cancel
              </button>
              <button type="submit" className="btn py-1 bg-green-600 w-full hover:bg-green-800">
                {initialData ? "Update" : "Save"}
              </button>
            </div>
          </div>
        </div>
      </form>
    </GlobalModal>
  );
}
