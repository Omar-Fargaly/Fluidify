import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

export default function GlobalModal({ open, onClose, children }) {
  const modalRef = useRef(null);
  const backdropRef = useRef(null);

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

  const handleBackdropClick = (e) => {
    if (e.target === backdropRef.current) {
      onClose();
    }
  };

  return createPortal(
    <>
      {/* Wrapper to detect outside clicks */}
      <div
        ref={backdropRef}
        onClick={handleBackdropClick}
        className="fixed z-6 inset-0 flex items-center justify-center p-4 bg-black/60"
        role="dialog"
        aria-modal="true"
      >
        {/* Modal panel */}
        <div
          ref={modalRef}
          className="bg-[#191B1D] border text-white rounded-2xl shadow-xl max-w-3xl w-full p-6 relative"
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
