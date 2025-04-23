import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

export default function Modal({ open, onClose, children }) {
  const modalRef = useRef(null);
  useEffect(() => {
    function handleKey(e) {
      if (e.key === 'Escape') onClose();
    }
    if (open) window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [open, onClose]);

  useEffect(() => {
    if (open && modalRef.current) {
      const focusable = modalRef.current.querySelector(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      focusable?.focus();
    }
  }, [open]);

  if (!open) return null;

  return createPortal(
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black bg-opacity-50"
        onClick={onClose}
        aria-hidden="true"
      />
      {/* Modal panel */}
      <div
        className="fixed inset-0 flex items-center justify-center p-4"
        role="dialog"
        aria-modal="true"
      >
        <div
          ref={modalRef}
          className="bg-white rounded-2xl shadow-xl max-w-md w-full p-6 relative"
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 focus:outline-none"
            aria-label="Close modal"
          >
            ✕
          </button>

          {/* Content */}
          {children}
        </div>
      </div>
    </>,
    document.getElementById('modal-root')
  );
}
