import React, { useEffect } from 'react';

export default function ResumeModal({ isOpen, onClose }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="modal-overlay"
      onClick={(e) => {
        if (e.target.classList.contains('modal-overlay')) onClose();
      }}
      aria-modal="true"
      role="dialog"
    >
      <div className="modal-box glass-card">
        <div className="modal-top">
          <div className="modal-title">
            <i className="fa-solid fa-file-pdf text-danger"></i>
            <span>Piyush_Sonawane_Resume_IoT.pdf</span>
          </div>
          <div className="modal-actions">
            <a
              href="/piyush_sonawane_resume_Iot.pdf"
              download="Piyush_Sonawane_Resume_IoT.pdf"
              className="btn-modal-action"
              title="Download Resume"
            >
              <i className="fa-solid fa-download"></i> Download
            </a>
            <button
              type="button"
              className="btn-close-modal"
              onClick={onClose}
              aria-label="Close modal"
            >
              <i className="fa-solid fa-xmark"></i>
            </button>
          </div>
        </div>

        <div className="modal-pdf-container">
          <iframe
            src="/piyush_sonawane_resume_Iot.pdf#toolbar=1"
            className="pdf-iframe"
            title="Piyush Sonawane Resume"
          />
        </div>
      </div>
    </div>
  );
}
