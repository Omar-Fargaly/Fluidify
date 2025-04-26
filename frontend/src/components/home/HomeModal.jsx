import { useEffect, useRef, useState } from 'react';
import Modal from '../globals/Modal';

export default function HomeModal({ open, onClose, onSave }) {
  const formRef = useRef(null);
  const [taskData, setTaskData] = useState({
    title: '',
    description: '',
    dueDate: '',
    categories: [],
    priority: 'medium',
    reminder: ''
  });

  useEffect(() => {
    if (open) formRef.current?.querySelector('input')?.focus();
  }, [open]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const newTask = {
      title: taskData.title.trim(),
      description: taskData.description.trim(),
      dueDate: taskData.dueDate,
      categories: taskData.categories.split(',').map((category) => category.trim()), // splitting by commas for multiple categories
      priority: taskData.priority,
      reminder: taskData.reminder ? new Date(taskData.reminder) : null,
    };

    // Save the new task data
    if (newTask.title && newTask.dueDate) {
      onSave(newTask);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTaskData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  return (
    <Modal open={open} onClose={onClose}>
      <h2 className="text-2xl font-semibold mb-4">New Task</h2>
      <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1" htmlFor="title">Task Title</label>
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
        
        <div>
          <label className="block mb-1" htmlFor="description">Description</label>
          <input
            id="description"
            name="description"
            type="text"
            value={taskData.description}
            onChange={handleInputChange}
            className="w-full border rounded px-3 py-2 focus:ring focus:ring-blue-200"
          />
        </div>

        <div>
          <label className="block mb-1" htmlFor="dueDate">Due Date</label>
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

        <div>
          <label className="block mb-1" htmlFor="categories">Categories (comma separated)</label>
          <input
            id="categories"
            name="categories"
            type="text"
            value={taskData.categories}
            onChange={handleInputChange}
            className="w-full border rounded px-3 py-2 focus:ring focus:ring-blue-200"
          />
        </div>

        <div>
          <label className="block mb-1" htmlFor="priority">Priority</label>
          <select
            id="priority"
            name="priority"
            value={taskData.priority}
            onChange={handleInputChange}
            className="w-full border rounded px-3 py-2 focus:ring focus:ring-blue-200"
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>

        <div>
          <label className="block mb-1" htmlFor="reminder">Reminder (optional)</label>
          <input
            id="reminder"
            name="reminder"
            type="datetime-local"
            value={taskData.reminder}
            onChange={handleInputChange}
            className="w-full border rounded px-3 py-2 focus:ring focus:ring-blue-200"
          />
        </div>

        <div className="flex justify-end space-x-2 pt-2">
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
      </form>
    </Modal>
  );
}
