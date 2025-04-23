import { useEffect, useRef } from 'react';
import Modal from '../globals/Modal';

export default function HomeModal({ open, onClose, onSave }) {
  const formRef = useRef(null);

  useEffect(() => {
    if (open) formRef.current?.querySelector('input')?.focus();
  }, [open]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const name = e.target.elements.name.value.trim();
    if (name) onSave(name);
  };

  return (
    <Modal open={open} onClose={onClose}>
      <h2 className="text-2xl font-semibold mb-4">New Item</h2>
      <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1" htmlFor="name">Name</label>
          <input
            id="name"
            name="name"
            type="text"
            className="w-full border rounded px-3 py-2 focus:ring focus:ring-blue-200"
            required
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
