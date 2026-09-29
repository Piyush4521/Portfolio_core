import React from 'react';
import Workstation from './Workstation';

export default function Hero({ currentTheme, onThemeChange, colorMode, onToggleColorMode }) {
  const handleScrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="hero-section" id="hero">
      <div className="hero-container">
        {/* Hero Top Grid: Text Intro + Hero Cutout Portrait */}
        <div className="hero-top-row">
          <div className="hero-content">
            <div className="hero-accent-indicator">
              <span className="indicator-dot"></span>
              <span className="indicator-line"></span>
            </div>

            <div className="hero-text-block">
              <div className="hero-badge">
                <span className="pulse-status"></span>
                <span>Available for Robotics & Embedded Roles</span>
              </div>

              <h1 className="hero-title">
                Hi, I'm <span className="highlight-name glow-text">Piyush</span>
              </h1>

              <p className="hero-subtitle">
                I build <strong>intelligent embedded firmware</strong>, <strong>real-time IoT architectures</strong>, and <strong>autonomous robotics systems</strong>.
              </p>

              <div className="hero-tags">
                <span className="tag-pill">
                  <i className="fa-solid fa-microchip"></i> ESP32 & Microcontrollers
                </span>
                <span className="tag-pill">
                  <i className="fa-solid fa-wifi"></i> Telemetry & Cloud
                </span>
                <span className="tag-pill">
                  <i className="fa-solid fa-robot"></i> ROS2 & Autonomous Control
                </span>
              </div>

              <div className="hero-cta-group">
                <button
                  type="button"
                  className="btn-primary"
                  onClick={() => handleScrollTo('projects')}
                >
                  <span>Explore Projects</span>
                  <i className="fa-solid fa-arrow-right"></i>
                </button>

                <button
                  type="button"
                  className="btn-secondary"
                  onClick={() => handleScrollTo('about')}
                >
                  <i className="fa-solid fa-user"></i>
                  <span>About Me</span>
                </button>

                <button
                  type="button"
                  className="btn-ghost"
                  onClick={() => handleScrollTo('simulators')}
                >
                  <i className="fa-solid fa-flask-vial"></i>
                  <span>Interactive IoT Lab</span>
                </button>
              </div>
            </div>
          </div>

          {/* Hero Immediate Cutout Portrait Display */}
          <div className="hero-portrait-card">
            <div className="hero-portrait-frame">
              <div className="hero-portrait-ambient-glow"></div>
              <img
                src="/piyush_portrait_1.png"
                alt="Piyush Sonawane - Embedded & IoT Engineer"
                className="hero-cutout-img"
                loading="eager"
              />
              <div className="hero-portrait-overlay-gradient"></div>

              {/* Floating Status Badges */}
              <div className="hero-portrait-badge top-badge">
                <span className="pulse-status"></span>
                <span>IoT System Online</span>
              </div>

              <div className="hero-portrait-badge bottom-badge">
                <i className="fa-solid fa-microchip text-cyan"></i>
                <span>Piyush Sonawane · ENTC</span>
              </div>
            </div>
          </div>
        </div>

        {/* 3D Developer & Embedded Hardware Workstation */}
        <Workstation
          currentTheme={currentTheme}
          onThemeChange={onThemeChange}
          colorMode={colorMode}
          onToggleColorMode={onToggleColorMode}
        />

        {/* Animated Mouse Scroll Pill */}
        <div className="hero-scroll-indicator">
          <a
            href="#about"
            className="scroll-pill"
            aria-label="Scroll to about section"
            onClick={(e) => {
              e.preventDefault();
              handleScrollTo('about');
            }}
          >
            <span className="scroll-dot"></span>
          </a>
          <span className="scroll-text">SCROLL TO DISCOVER</span>
        </div>
      </div>
    </section>
  );
}
