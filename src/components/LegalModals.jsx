import React, { useEffect } from 'react';

export default function LegalModal({ type, isOpen, onClose }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) onClose();
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
      <div className="modal-box legal-modal glass-card">
        <div className="modal-top">
          <div className="modal-title">
            <i className="fa-solid fa-file-shield text-cyan"></i>
            <span>{type === 'privacy' ? 'Privacy Policy' : 'Terms and Conditions'}</span>
          </div>
          <button
            type="button"
            className="btn-close-modal"
            onClick={onClose}
            aria-label="Close dialog"
          >
            <i className="fa-solid fa-xmark"></i>
          </button>
        </div>

        <div className="legal-content">
          {type === 'privacy' ? (
            <div className="legal-body">
              <p className="legal-date">Last Updated: September 2026</p>
              <h3>1. Overview</h3>
              <p>
                This personal engineering portfolio website is maintained by Piyush Sonawane ("Engineer"). This Privacy Policy explains how information is collected, used, and protected when you visit this website.
              </p>

              <h3>2. Data Collection</h3>
              <p>
                This website does not utilize tracking cookies, persistent identifiers, or third-party marketing analytics. When you voluntarily submit an inquiry through the contact form, the provided details (name, email address, subject, and message) are used exclusively for direct professional communication.
              </p>

              <h3>3. Third-Party Services</h3>
              <p>
                Static resources and CDN assets (such as Google Fonts and FontAwesome icons) may log standard network requests (including IP addresses and user agents) in accordance with their respective privacy policies.
              </p>

              <h3>4. Data Security</h3>
              <p>
                Industry-standard practices are employed to ensure transmission integrity. Information submitted through contact endpoints is never sold, leased, or distributed to third parties.
              </p>

              <h3>5. Contact</h3>
              <p>
                For any privacy questions or data deletion requests, contact directly at: <strong>piyushsonawane214@gmail.com</strong>.
              </p>
            </div>
          ) : (
            <div className="legal-body">
              <p className="legal-date">Last Updated: September 2026</p>
              <h3>1. Terms of Use</h3>
              <p>
                By accessing this portfolio website, you agree to these Terms and Conditions. If you do not agree, please discontinue use of this site.
              </p>

              <h3>2. Intellectual Property Rights</h3>
              <p>
                All original firmware schematics, project descriptions, interactive simulation models, architectural designs, and written content presented on this site are the intellectual property of Piyush Sonawane, unless otherwise attributed. Unauthorized commercial reproduction or misrepresentation is prohibited.
              </p>

              <h3>3. Interactive Simulators Disclaimer</h3>
              <p>
                The interactive simulators (OneGuard, OneFlux, and Gesture Robotics Arena) are client-side demonstrations designed to illustrate firmware logic and control algorithms. They are provided on an "as-is" basis for demonstration and educational evaluation only.
              </p>

              <h3>4. External Links</h3>
              <p>
                This portfolio may contain links to external websites (such as GitHub and LinkedIn). The Engineer does not endorse and is not responsible for the availability, accuracy, or content of third-party platforms.
              </p>

              <h3>5. Governing Law</h3>
              <p>
                These terms are governed by the laws of Maharashtra, India.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
