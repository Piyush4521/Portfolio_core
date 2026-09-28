import React from 'react';
 
export default function Footer({ onOpenPrivacy, onOpenTerms }) {
  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="site-footer">
      <div className="footer-container">
        <div className="footer-brand">
          <div className="logo-icon-hexagon sm">
            <span>P</span>
          </div>
          <div className="footer-brand-text">
            <span className="f-name">Piyush Sonawane</span>
            <span className="f-desc">Embedded Systems, IoT & Robotics Engineer</span>
          </div>
        </div>

        <div className="footer-nav-col">
          <span className="footer-col-title">Navigation</span>
          <div className="footer-links">
            <a href="#hero" onClick={(e) => { e.preventDefault(); scrollTo('hero'); }}>Home</a>
            <a href="#about" onClick={(e) => { e.preventDefault(); scrollTo('about'); }}>About</a>
            <a href="#projects" onClick={(e) => { e.preventDefault(); scrollTo('projects'); }}>Projects</a>
            <a href="#simulators" onClick={(e) => { e.preventDefault(); scrollTo('simulators'); }}>IoT Lab</a>
            <a href="#skills" onClick={(e) => { e.preventDefault(); scrollTo('skills'); }}>Skills</a>
            <a href="#experience" onClick={(e) => { e.preventDefault(); scrollTo('experience'); }}>Experience</a>
            <a href="#contact" onClick={(e) => { e.preventDefault(); scrollTo('contact'); }}>Contact</a>
          </div>
        </div>

        <div className="footer-legal-col">
          <span className="footer-col-title">Legal & Compliance</span>
          <div className="footer-legal-links">
            <button
              type="button"
              className="btn-legal-link"
              onClick={onOpenPrivacy}
            >
              <i className="fa-solid fa-shield-halved"></i> Privacy Policy
            </button>
            <button
              type="button"
              className="btn-legal-link"
              onClick={onOpenTerms}
            >
              <i className="fa-solid fa-file-contract"></i> Terms & Conditions
            </button>
          </div>
        </div>

        <div className="footer-bottom-row">
          <div className="footer-domain-badge">
            <i className="fa-solid fa-globe text-cyan"></i>
            <span>piyushsonawane.dev</span>
            <span className="domain-verified-dot" title="Custom Domain Active"></span>
          </div>
          <div className="footer-copy">
            © 2026 Piyush Sonawane. All rights reserved. Built with React 19 and custom engineering design system.
          </div>
        </div>
      </div>
    </footer>
  );
}
