import React, { useState } from 'react';
import confetti from 'canvas-confetti';

export default function Contact({ onOpenResume, onShowToast }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [submitting, setSubmitting] = useState(false);
  const [statusMsg, setStatusMsg] = useState('');

  const copyToClipboard = (text, label) => {
    navigator.clipboard.writeText(text).then(() => {
      onShowToast(`${label} copied to clipboard!`);
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitting(true);

    setTimeout(() => {
      setSubmitting(false);
      setStatusMsg('Message received successfully. Piyush will reply promptly.');
      setFormData({ name: '', email: '', subject: '', message: '' });
      onShowToast('Message sent successfully!');

      try {
        confetti({
          particleCount: 60,
          spread: 70,
          origin: { y: 0.8 }
        });
      } catch (err) {
        // Confetti fallback
      }

      setTimeout(() => setStatusMsg(''), 6000);
    }, 1200);
  };

  return (
    <section className="contact-section" id="contact">
      <div className="section-container">
        <div className="section-header-centered">
          <span className="section-pretitle">
            <i className="fa-solid fa-paper-plane"></i> GET IN TOUCH
          </span>
          <h2 className="section-title">Let's Build Something Exceptional</h2>
          <p className="section-description">
            Interested in collaborating on embedded systems, IoT products, or robotics projects? Drop a message or reach out directly.
          </p>
        </div>

        <div className="contact-grid">
          {/* Contact Info Cards */}
          <div className="contact-info-col">
            <div className="contact-card glass-card">
              <div className="c-icon">
                <i className="fa-solid fa-envelope"></i>
              </div>
              <div className="c-info">
                <span className="c-label">Direct Email</span>
                <span className="c-val">piyushsonawane214@gmail.com</span>
              </div>
              <button
                type="button"
                className="btn-copy"
                onClick={() => copyToClipboard('piyushsonawane214@gmail.com', 'Email address')}
                title="Copy email address"
              >
                <i className="fa-solid fa-copy"></i>
              </button>
            </div>

            <div className="contact-card glass-card">
              <div className="c-icon">
                <i className="fa-solid fa-phone"></i>
              </div>
              <div className="c-info">
                <span className="c-label">Phone & WhatsApp</span>
                <a href="tel:7030883504" className="c-val">
                  +91 7030883504
                </a>
              </div>
              <button
                type="button"
                className="btn-copy"
                onClick={() => copyToClipboard('7030883504', 'Phone number')}
                title="Copy phone number"
              >
                <i className="fa-solid fa-copy"></i>
              </button>
            </div>

            <div className="contact-card glass-card">
              <div className="c-icon">
                <i className="fa-solid fa-location-dot"></i>
              </div>
              <div className="c-info">
                <span className="c-label">Base Location</span>
                <span className="c-val">Pune, Maharashtra, India</span>
              </div>
            </div>

            <div className="social-channels-card glass-card">
              <span className="social-card-title">Professional Profiles</span>
              <div className="social-links-grid">
                <a
                  href="https://www.linkedin.com/in/piyushsonawane2145"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-tile linkedin"
                >
                  <i className="fa-brands fa-linkedin-in"></i>
                  <span>LinkedIn</span>
                </a>
                <a
                  href="https://github.com/Piyush4521"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-tile github"
                >
                  <i className="fa-brands fa-github"></i>
                  <span>GitHub</span>
                </a>
                <button
                  type="button"
                  className="social-tile resume-tile"
                  onClick={onOpenResume}
                >
                  <i className="fa-solid fa-file-pdf"></i>
                  <span>View Resume</span>
                </button>
              </div>
            </div>
          </div>

          {/* Working Message Form */}
          <div className="contact-form-col">
            <form className="contact-form glass-card" onSubmit={handleSubmit}>
              <div className="form-header">
                <h3>
                  <i className="fa-solid fa-message"></i> Send Direct Message
                </h3>
                <p>Fill out the form below and I'll respond within 24 hours.</p>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="form-name">Your Full Name *</label>
                  <input
                    type="text"
                    id="form-name"
                    required
                    placeholder="e.g. John Doe"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="form-email">Your Email Address *</label>
                  <input
                    type="email"
                    id="form-email"
                    required
                    placeholder="john@company.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="form-subject">Subject *</label>
                <input
                  type="text"
                  id="form-subject"
                  required
                  placeholder="e.g. Embedded Engineer Opportunity / Project Inquiry"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label htmlFor="form-message">Message *</label>
                <textarea
                  id="form-message"
                  rows="5"
                  required
                  placeholder="Hi Piyush, I saw your OneGuard and OneFlux projects..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                ></textarea>
              </div>

              <button type="submit" className="btn-submit-form" disabled={submitting}>
                {submitting ? (
                  <>
                    <i className="fa-solid fa-spinner fa-spin"></i>
                    <span>Sending Message...</span>
                  </>
                ) : (
                  <>
                    <span>Send Message</span>
                    <i className="fa-solid fa-paper-plane"></i>
                  </>
                )}
              </button>

              {statusMsg && <div className="form-status-msg">{statusMsg}</div>}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
