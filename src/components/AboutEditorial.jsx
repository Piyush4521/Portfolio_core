import React, { useState, useRef } from 'react';

export default function AboutEditorial({ onShowToast }) {
  // Default to Portrait II (Editorial Blazer) in About section as requested
  const [activePortrait, setActivePortrait] = useState(2);
  const frameRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!frameRef.current) return;
    const rect = frameRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    const tiltX = (y / rect.height) * -12;
    const tiltY = (x / rect.width) * 12;
    frameRef.current.style.transform = `perspective(800px) rotateX(${tiltX}deg) rotateY(${tiltY}deg)`;
  };

  const handleMouseLeave = () => {
    if (!frameRef.current) return;
    frameRef.current.style.transform = 'perspective(800px) rotateX(0deg) rotateY(0deg)';
  };

  const switchPortrait = (num) => {
    setActivePortrait(num);
    onShowToast(`Switched to ${num === 2 ? 'Editorial Portrait II' : 'Executive Portrait I'}`);
  };

  return (
    <section className="about-section" id="about">
      {/* Watermark Background Typography (Image 2 Yuta Takahashi Reference) */}
      <div className="about-watermark-text" aria-hidden="true">
        ABOUT
      </div>

      <div className="editorial-container">
        {/* Top Editorial Brand & Details */}
        <div className="editorial-header">
          <div className="editorial-badge">
            <div className="signature-micro-title">Piyush Sonawane</div>
            <div className="role-micro-tag">EMBEDDED & IOT DEVELOPER</div>
          </div>

          <div className="portrait-switcher-controls">
            <span className="portrait-label">
              <i className="fa-solid fa-camera"></i> Cutout Style:
            </span>
            <button
              type="button"
              className={`portrait-toggle-btn ${activePortrait === 2 ? 'active' : ''}`}
              onClick={() => switchPortrait(2)}
            >
              Portrait II (Editorial)
            </button>
            <button
              type="button"
              className={`portrait-toggle-btn ${activePortrait === 1 ? 'active' : ''}`}
              onClick={() => switchPortrait(1)}
            >
              Portrait I (Executive)
            </button>
          </div>

          <div className="editorial-copyright-tag">
            <span>© 2026 Piyush Sonawane · All Rights Reserved</span>
          </div>
        </div>

        {/* Center Editorial Stage with Clean Cutout and Layered Signature */}
        <div className="editorial-stage">
          {/* Geometric Accent Circle (from Image 2) */}
          <div className="editorial-accent-circle" title="System Status: Online">
            <span className="accent-inner-dot"></span>
          </div>

          {/* Cutout Portrait Container with Clean Transparent Cutout */}
          <div
            className="cutout-portrait-container"
            ref={frameRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
          >
            <img
              src="/piyush_portrait_2.png"
              alt="Piyush Sonawane - Casual Editorial Cutout Portrait"
              className={`cutout-image ${activePortrait === 2 ? 'active' : ''}`}
              loading="eager"
            />
            <img
              src="/piyush_portrait_1.png"
              alt="Piyush Sonawane - Executive Cutout Portrait"
              className={`cutout-image ${activePortrait === 1 ? 'active' : ''}`}
              loading="lazy"
            />
            <div className="cutout-ambient-glow"></div>
            <div className="cutout-bottom-feather"></div>
          </div>

          {/* Handwritten Script Signature Overlay (Image 2 Reference) */}
          <div className="editorial-signature-overlay" aria-hidden="true">
            <div className="signature-word first-name">Piyush</div>
            <div className="signature-word last-name">Sonawane</div>
          </div>

          {/* Floating Info Pills around Cutout */}
          <div className="floating-badge badge-left">
            <div className="badge-icon">
              <i className="fa-solid fa-graduation-cap"></i>
            </div>
            <div className="badge-info">
              <strong>NBNSCOE Solapur</strong>
              <span>B.E. ENTC · 8.43 SGPA</span>
            </div>
          </div>

          <div className="floating-badge badge-right">
            <div className="badge-icon">
              <i className="fa-solid fa-award"></i>
            </div>
            <div className="badge-info">
              <strong>1x Winner · 2x Top 4</strong>
              <span>National Hackathons</span>
            </div>
          </div>
        </div>

        {/* Editorial Bio & Metrics Grid */}
        <div className="editorial-footer-grid">
          <div className="editorial-social-strip">
            <a
              href="https://github.com/PiyushSonawane214"
              target="_blank"
              rel="noopener noreferrer"
              className="social-icon-btn"
              title="GitHub Profile"
            >
              <i className="fa-brands fa-github"></i>
            </a>
            <a
              href="https://linkedin.com/in/piyushsonawane"
              target="_blank"
              rel="noopener noreferrer"
              className="social-icon-btn"
              title="LinkedIn Profile"
            >
              <i className="fa-brands fa-linkedin-in"></i>
            </a>
            <a
              href="mailto:piyushsonawane214@gmail.com"
              className="social-icon-btn"
              title="Send Email"
            >
              <i className="fa-solid fa-envelope"></i>
            </a>
            <a href="tel:7030883504" className="social-icon-btn" title="Call Piyush">
              <i className="fa-solid fa-phone"></i>
            </a>
          </div>

          <div className="editorial-bio-text">
            <p>
              I am a final-year <strong>Electronics and Telecommunication Engineering</strong> student at <strong>N. B. Navale Sinhgad College of Engineering</strong> with an outstanding <strong>8.43 SGPA</strong>. I bridge the physical world with cloud intelligence through precision sensor instrumentation, low-latency firmware, and robust automation.
            </p>
            <p>
              From designing multi-sensor gas safety mechanisms with automated shutoff servos to deploying real-time energy telemetry on Firebase and programming gesture-driven robotics, I obsess over system reliability, clean hardware-software integration, and cyber-physical security.
            </p>
          </div>

          {/* Key Metrics Counter Cards */}
          <div className="editorial-metrics">
            <div className="metric-card">
              <div className="metric-num">8.43</div>
              <div className="metric-label">SGPA Till Sem VI</div>
            </div>
            <div className="metric-card">
              <div className="metric-num">3+</div>
              <div className="metric-label">Flagship IoT Deployments</div>
            </div>
            <div className="metric-card">
              <div className="metric-num">3x</div>
              <div className="metric-label">Hackathon Accolades</div>
            </div>
            <div className="metric-card">
              <div className="metric-num">10+</div>
              <div className="metric-label">Hardware Protocols</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
