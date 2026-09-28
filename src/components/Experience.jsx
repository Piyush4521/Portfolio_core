import React from 'react';

export default function Experience() {
  return (
    <section className="experience-section" id="experience">
      <div className="section-container">
        <div className="section-header-centered">
          <span className="section-pretitle">
            <i className="fa-solid fa-briefcase"></i> CAREER & ACADEMICS
          </span>
          <h2 className="section-title">Experience & Education</h2>
          <p className="section-description">
            Hands-on industry internship experience combined with strong academic performance and leadership.
          </p>
        </div>

        <div className="timeline-container">
          {/* Timeline Item 1: Internship */}
          <div className="timeline-item">
            <div className="timeline-marker">
              <i className="fa-solid fa-laptop-code"></i>
            </div>
            <div className="timeline-content glass-card">
              <div className="timeline-header">
                <div>
                  <span className="timeline-badge-internship">INTERNSHIP</span>
                  <h3 className="timeline-role">Software Development Engineer Intern</h3>
                  <h4 className="timeline-org">
                    <i className="fa-solid fa-building"></i> MyCare MyHealth (MCMH)
                  </h4>
                </div>
                <div className="timeline-date">
                  <i className="fa-solid fa-calendar-days"></i> June 2026 - Sept 2026
                </div>
              </div>
              <ul className="timeline-points">
                <li>Contributed to full-lifecycle application development, backend integration, feature validation, debugging, testing, and deployment workflows for a real-world software product.</li>
                <li>Worked with React, TypeScript, Vite, Supabase, Git, and REST API-driven workflows to implement, validate, debug, and improve application features.</li>
                <li>Collaborated in a structured engineering environment using Git-based development, issue resolution, testing practices, and iterative Agile development workflows.</li>
              </ul>
            </div>
          </div>

          {/* Timeline Item 2: BE Degree */}
          <div className="timeline-item">
            <div className="timeline-marker education-marker">
              <i className="fa-solid fa-graduation-cap"></i>
            </div>
            <div className="timeline-content glass-card">
              <div className="timeline-header">
                <div>
                  <span className="timeline-badge-edu">BACHELOR OF ENGINEERING</span>
                  <h3 className="timeline-role">B.E. in Electronics & Telecommunication (ENTC)</h3>
                  <h4 className="timeline-org">
                    <i className="fa-solid fa-school"></i> N. B. Navale Sinhgad College Of Engineering, Solapur
                  </h4>
                </div>
                <div className="timeline-date">
                  <i className="fa-solid fa-calendar-days"></i> 2023 - 2027
                </div>
              </div>
              <div className="academic-highlight">
                <span className="gpa-pill">
                  <i className="fa-solid fa-star"></i> 8.43 SGPA (till Sem VI)
                </span>
                <span className="location-pill">
                  <i className="fa-solid fa-location-dot"></i> Solapur, Maharashtra
                </span>
              </div>
              <p className="timeline-summary">
                Core coursework in Embedded Systems, Microprocessors & Microcontrollers, Signals & Systems, Wireless Communications, Control Systems, Digital Signal Processing, and IoT Architectures.
              </p>
            </div>
          </div>

          {/* Timeline Item 3: HSC & SSC */}
          <div className="timeline-item">
            <div className="timeline-marker school-marker">
              <i className="fa-solid fa-book-open"></i>
            </div>
            <div className="timeline-content glass-card">
              <div className="timeline-header">
                <div>
                  <span className="timeline-badge-edu">PRE-UNIVERSITY & HIGH SCHOOL</span>
                  <h3 className="timeline-role">HSC & SSC Academic Excellence</h3>
                  <h4 className="timeline-org">Chopda, Maharashtra</h4>
                </div>
                <div className="timeline-date">
                  <i className="fa-solid fa-calendar-days"></i> 2020 - 2023
                </div>
              </div>
              <div className="multi-edu-grid">
                <div className="mini-edu-box">
                  <strong>MGSM's Arts, Science & Commerce College</strong>
                  <span>Higher Secondary Certificate (HSC)</span>
                  <div className="score-badge">77.23% · 2022 - 2023</div>
                </div>
                <div className="mini-edu-box">
                  <strong>Pankaj Vidyalaya Secondary School</strong>
                  <span>Secondary School Certificate (SSC)</span>
                  <div className="score-badge">94.40% · 2020 - 2021</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Leadership & Achievements Showcase */}
        <div className="achievements-card-banner glass-card">
          <div className="achieve-col">
            <div className="achieve-icon">
              <i className="fa-solid fa-trophy"></i>
            </div>
            <div className="achieve-text">
              <h4>Hackathon Competitions</h4>
              <p>
                <strong>1x Winner</strong> & <strong>2x Top 4 Finishes</strong> in national engineering hackathons designing IoT automation prototypes.
              </p>
            </div>
          </div>
          <div className="achieve-divider"></div>
          <div className="achieve-col">
            <div className="achieve-icon">
              <i className="fa-solid fa-users-gear"></i>
            </div>
            <div className="achieve-text">
              <h4>Campus Leadership</h4>
              <p>
                Elected <strong>Associate General Secretary</strong> and <strong>Departmental Cultural Secretary</strong> at NBNSCOE, directing inter-departmental initiatives.
              </p>
            </div>
          </div>
          <div className="achieve-divider"></div>
          <div className="achieve-col">
            <div className="achieve-icon">
              <i className="fa-solid fa-language"></i>
            </div>
            <div className="achieve-text">
              <h4>Languages</h4>
              <p>
                <strong>English</strong> (Professional Working), <strong>Hindi</strong> (Native), <strong>Marathi</strong> (Native).
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
