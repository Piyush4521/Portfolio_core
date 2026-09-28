import React from 'react';

export default function Projects({ onSelectSimulator }) {
  const projects = [
    {
      id: 'oneguard',
      title: 'OneGuard',
      tagline: 'IoT Gas Cylinder Safety & Real-Time Monitoring System',
      category: 'IoT Safety System',
      categoryIcon: 'fa-shield-halved',
      status: 'Hardware Deployed',
      flowchart: [
        { label: '4x Load Cells + HX711', icon: 'fa-weight-hanging' },
        { label: 'ESP32 Controller', icon: 'fa-microchip', isController: true },
        { label: 'Emergency Servo Valve', icon: 'fa-faucet' }
      ],
      sensorPills: [
        { label: 'MQ-6 Gas Leakage', icon: 'fa-fire-burner' },
        { label: 'MPU6050 Motion', icon: 'fa-compass' },
        { label: 'DS3231 RTC', icon: 'fa-clock' },
        { label: 'Buzzer & Relays', icon: 'fa-bell' }
      ],
      bullets: [
        'Engineered an ESP32-based IoT safety system for real-time LPG cylinder weight calibration and toxic gas leakage detection.',
        'Integrated load sensor combinator with 4 load cells & HX711, plus MPU6050 tilt detection and DS3231 precision RTC.',
        'Automated multi-stage threshold safety: Autonomous servo emergency valve cutoff, audible buzzer alarm, and instant Firebase telemetry notifications.'
      ],
      techStack: ['ESP32', 'HX711', 'MQ-6', 'MPU6050', 'Firebase RTDB', 'Embedded C++'],
      simKey: 'oneguard'
    },
    {
      id: 'oneflux',
      title: 'OneFlux',
      tagline: 'IoT Energy Monitoring & Safety Automation System',
      category: 'Smart Energy Grid',
      categoryIcon: 'fa-bolt',
      status: 'Web & RTDB Integrated',
      flowchart: [
        { label: 'PZEM-004T Meter', icon: 'fa-plug' },
        { label: 'ESP32 Firmware', icon: 'fa-microchip', isController: true },
        { label: 'React & Vite Cloud UI', icon: 'fa-chart-line' }
      ],
      sensorPills: [
        { label: 'Voltage & Current', icon: 'fa-gauge-high' },
        { label: 'Cost & CO2 Footprint', icon: 'fa-calculator' },
        { label: 'Autonomous Relay Trip', icon: 'fa-toggle-on' }
      ],
      bullets: [
        'Constructed an ESP32 and PZEM-004T power analyzer streaming live voltage, current, active power, grid frequency, cumulative kWh, cost, and carbon footprint.',
        'Programmed robust firmware safety trips for undervoltage, overvoltage, overcurrent, and overpower conditions with fail-safe relay isolation.',
        'Developed a companion React and Vite web dashboard synchronized with Firebase RTDB for sub-second telemetry and remote manual overrides.'
      ],
      techStack: ['ESP32', 'PZEM-004T', 'React.js', 'Vite', 'Firebase RTDB', 'UART Protocols'],
      simKey: 'oneflux'
    },
    {
      id: 'robotics',
      title: 'Gesture Robotic Vehicle',
      tagline: 'ESP32 & Bluetooth Real-Time Autonomous Navigation',
      category: 'Wireless Robotics',
      categoryIcon: 'fa-robot',
      status: 'Prototype Tested',
      flowchart: [
        { label: 'Gesture Sensor', icon: 'fa-hand' },
        { label: 'HC-05 + ESP32', icon: 'fa-brands fa-bluetooth-b', isController: true },
        { label: 'L298N 4WD Motors', icon: 'fa-gears' }
      ],
      sensorPills: [
        { label: 'Low Latency Motion', icon: 'fa-arrows-up-down-left-right' },
        { label: 'PWM Differential Drive', icon: 'fa-sliders' },
        { label: 'Modular Architecture', icon: 'fa-network-wired' }
      ],
      bullets: [
        'Engineered a 4-wheel robotic vehicle orchestrated by ESP32 and Arduino communicating over HC-05 Bluetooth.',
        'Designed a decoupled modular software architecture separating wireless packet processing, state-machine motion logic, and L298N dual H-bridge motor driver PWM.',
        'Tested across directional maneuvers (forward, reverse, pivot spin, differential turning) with sub-30ms response times.'
      ],
      techStack: ['ESP32', 'Arduino Nano', 'HC-05 Bluetooth', 'L298N Driver', 'DC Motors', 'PWM Firmware'],
      simKey: 'robot'
    },
    {
      id: 'oneops',
      title: 'OneOps',
      tagline: 'AI Incident Intelligence & Automated Remediation Platform',
      category: 'Cloud & Reliability',
      categoryIcon: 'fa-brain',
      status: 'Platform Active',
      flowchart: [
        { label: 'Incident Detector', icon: 'fa-triangle-exclamation' },
        { label: 'Node.js & GitHub API', icon: 'fa-server', isController: true },
        { label: 'Governed Remediation', icon: 'fa-code-pull-request' }
      ],
      sensorPills: [
        { label: 'Diff Verification', icon: 'fa-code-compare' },
        { label: 'Confidence Checks', icon: 'fa-circle-check' },
        { label: 'Human Approvals', icon: 'fa-user-shield' }
      ],
      bullets: [
        'Built a software platform connecting incident detection, source analysis, API workflows, evidence validation, and governed remediation for application reliability.',
        'Integrated Node.js REST APIs, GitHub API, structured data validation, and automated cloud workflows for reliable software operations.',
        'Implemented confidence checks, source-matched validation, diff verification, and human approval controls to ensure automated workflow safety.'
      ],
      techStack: ['Node.js', 'REST APIs', 'GitHub API', 'TypeScript', 'Docker', 'CI/CD'],
      simKey: 'oneflux'
    }
  ];

  return (
    <section className="projects-section" id="projects">
      <div className="section-container">
        <div className="section-header-centered">
          <span className="section-pretitle">
            <i className="fa-solid fa-cube"></i> RESUME PORTFOLIO
          </span>
          <h2 className="section-title">Flagship Engineering Projects</h2>
          <p className="section-description">
            Production-grade cyber-physical systems designed, calibrated, and deployed with real hardware and cloud telemetry.
          </p>
        </div>

        <div className="projects-grid">
          {projects.map((proj) => (
            <article key={proj.id} className="project-card glass-card">
              <div className="card-glow-edge"></div>
              <div className="project-header">
                <div className="project-category">
                  <span className="badge-cat">
                    <i className={`fa-solid ${proj.categoryIcon}`}></i> {proj.category}
                  </span>
                  <span className="badge-status">{proj.status}</span>
                </div>
                <h3 className="project-name">{proj.title}</h3>
                <p className="project-tagline">{proj.tagline}</p>
              </div>

              <div className="project-schematic-visual">
                <div className="hardware-flowchart">
                  {proj.flowchart.map((node, i) => (
                    <React.Fragment key={i}>
                      <div className={`hw-node ${node.isController ? 'hw-esp32' : ''}`}>
                        <i className={`fa-solid ${node.icon}`}></i> {node.label}
                      </div>
                      {i < proj.flowchart.length - 1 && (
                        <div className="hw-arrow">
                          <i className="fa-solid fa-arrow-right"></i>
                        </div>
                      )}
                    </React.Fragment>
                  ))}
                </div>

                <div className="sensor-indicators">
                  {proj.sensorPills.map((s, idx) => (
                    <span key={idx} className="s-pill">
                      <i className={`fa-solid ${s.icon}`}></i> {s.label}
                    </span>
                  ))}
                </div>
              </div>

              <div className="project-body">
                <ul className="project-bullets">
                  {proj.bullets.map((b, bi) => (
                    <li key={bi}>
                      <i className="fa-solid fa-check-circle"></i>
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>

                <div className="tech-stack-row">
                  {proj.techStack.map((tech, ti) => (
                    <span key={ti} className="tech-chip">
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="project-card-footer">
                  <button
                    type="button"
                    className="btn-demo-card"
                    onClick={() => onSelectSimulator(proj.simKey)}
                  >
                    <i className="fa-solid fa-play"></i> Test Interactive Simulator
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
