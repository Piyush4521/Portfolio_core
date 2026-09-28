import React from 'react';

export default function Skills() {
  const skillCategories = [
    {
      title: 'Microcontrollers & Firmware',
      icon: 'fa-microchip',
      skills: [
        'ESP32',
        'Arduino Nano',
        'Arduino IDE',
        'GPIO & PWM',
        'ADC & Timers',
        'Hardware Interrupts',
        'Embedded Firmware',
        'System Debugging'
      ]
    },
    {
      title: 'Communication Protocols',
      icon: 'fa-network-wired',
      skills: [
        'UART',
        'I2C',
        'SPI',
        'Serial Communication',
        'Bluetooth (HC-05/BLE)',
        'WiFi',
        'TCP/IP & HTTP',
        'REST & MQTT'
      ]
    },
    {
      title: 'Sensors & Actuators',
      icon: 'fa-gauge',
      skills: [
        'Load Cells & HX711',
        'MQ-6 Gas Sensor',
        'PZEM-004T',
        'MPU6050 Gyro/Accel',
        'HC-SR04 Ultrasonic',
        'GPS & DHT',
        'I2C OLED',
        'Relays & Servos',
        'L298N Motor Drivers'
      ]
    },
    {
      title: 'Robotics & Control',
      icon: 'fa-robot',
      skills: [
        'ROS2 Concepts',
        'ROS Nodes & Topics',
        'ROS Services & TF',
        'Gazebo Simulation',
        'Motor Control',
        'Sensor Fusion',
        'Kinematics',
        'Safety Feedback Loops'
      ]
    },
    {
      title: 'Programming Languages',
      icon: 'fa-terminal',
      skills: [
        { name: 'Embedded C', highlight: true },
        { name: 'C++', highlight: true },
        { name: 'Python', highlight: true },
        { name: 'JavaScript', highlight: false },
        { name: 'TypeScript', highlight: false },
        { name: 'SQL', highlight: false }
      ]
    },
    {
      title: 'Software, Cloud & Tools',
      icon: 'fa-cloud',
      skills: [
        'Firebase RTDB',
        'React.js',
        'Node.js',
        'Git & GitHub',
        'Docker',
        'Linux OS',
        'KiCad EDA',
        'PCB Prototyping'
      ]
    }
  ];

  return (
    <section className="skills-section" id="skills">
      <div className="section-container">
        <div className="section-header-centered">
          <span className="section-pretitle">
            <i className="fa-solid fa-code-fork"></i> TECHNICAL CAPABILITIES
          </span>
          <h2 className="section-title">Skills & Engineering Arsenal</h2>
          <p className="section-description">
            Hands-on proficiency across hardware protocols, microcontrollers, embedded firmware, robotics, and cloud telemetry.
          </p>
        </div>

        <div className="skills-grid">
          {skillCategories.map((cat, i) => (
            <div key={i} className="skill-category-card glass-card">
              <div className="cat-header">
                <div className="cat-icon">
                  <i className={`fa-solid ${cat.icon}`}></i>
                </div>
                <h3>{cat.title}</h3>
              </div>

              <div className="skills-pill-cloud">
                {cat.skills.map((s, si) => {
                  const isObj = typeof s === 'object';
                  const name = isObj ? s.name : s;
                  const isHighlight = isObj && s.highlight;
                  return (
                    <span key={si} className={`skill-badge ${isHighlight ? 'highlight' : ''}`}>
                      <i className="fa-solid fa-check"></i> {name}
                    </span>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
