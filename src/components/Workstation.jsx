import React, { useState, useEffect, useRef } from 'react';

const CODE_FILES = {
  esp32: {
    name: 'OneGuard_ESP32_Firmware.ino',
    content: `#include <WiFi.h>
#include <HX711.h>
#include <ESP32Servo.h>
#include <Firebase_ESP_Client.h>

// Hardware Pin Configuration
const int MQ6_PIN = 34;      // Analog Gas Sensor
const int HX711_DOUT = 19;   // Load Cell Data
const int HX711_SCK = 18;    // Load Cell Clock
const int SERVO_PIN = 23;    // Emergency Shutoff Valve
const int BUZZER_PIN = 5;

HX711 scale;
Servo shutoffValve;

void setup() {
  Serial.begin(115200);
  scale.begin(HX711_DOUT, HX711_SCK);
  scale.set_scale(2280.f);   // Calibrated tare factor
  shutoffValve.attach(SERVO_PIN);
  shutoffValve.write(0);     // Normal Open valve
  pinMode(BUZZER_PIN, OUTPUT);
}

void loop() {
  float gasPpm = analogRead(MQ6_PIN) * (1000.0 / 4095.0);
  float weightKg = scale.get_units(5);

  if (gasPpm > 450.0) {
    shutoffValve.write(90);  // EMERGENCY VALVE CUTOFF
    digitalWrite(BUZZER_PIN, HIGH);
    pushAlertFirebase("CRITICAL_GAS_LEAK", gasPpm);
  }
  delay(200);
}`
  },
  telemetry: {
    name: 'OneFlux_Telemetry.cpp',
    content: `#include "PZEM004Tv30.h"
#include <Firebase_ESP_Client.h>

PZEM004Tv30 pzem(&Serial2, 16, 17); // Hardware UART2

void syncEnergyTelemetry() {
  float voltage = pzem.voltage();
  float current = pzem.current();
  float power   = pzem.power();
  float energy  = pzem.energy();
  float freq    = pzem.frequency();

  // Autonomous Safety Interlock
  if (current > 25.0 || voltage < 180.0 || voltage > 265.0) {
    digitalWrite(RELAY_TRIP_PIN, HIGH); // Autonomous Trip
    Firebase.RTDB.setString(&fbdo, "/grid/fault", "AUTONOMOUS_TRIP");
  }

  FirebaseJson json;
  json.set("voltage", voltage);
  json.set("current", current);
  json.set("power", power);
  json.set("co2_rate", power * 0.00082); // kg/h
  Firebase.RTDB.setJSON(&fbdo, "/live", &json);
}`
  },
  ros2: {
    name: 'gesture_robot_node.py',
    content: `import rclpy
from rclpy.node import Node
from geometry_msgs.msg import Twist

class GestureRobotController(Node):
    def __init__(self):
        super().__init__('gesture_robot_node')
        self.cmd_pub = self.create_publisher(Twist, '/cmd_vel', 10)
        self.timer = self.create_timer(0.02, self.update_motion)
        self.get_logger().info('ESP32 Bluetooth Bridge Ready')

    def parse_bluetooth_packet(self, raw_bytes):
        # Real-time gesture orientation processing
        ax, ay, az = [int(b) for b in raw_bytes.split(b',')]
        twist = Twist()
        twist.linear.x = max(-1.0, min(1.0, ay / 90.0))
        twist.angular.z = max(-1.0, min(1.0, ax / 90.0))
        self.cmd_pub.publish(twist)`
  }
};

export default function Workstation({ currentTheme, onThemeChange, colorMode = 'dark', onToggleColorMode }) {
  const [activeTab, setActiveTab] = useState('esp32');
  const [logs, setLogs] = useState([
    '[BOOT] ESP32-WROOM-32 booting core 1 @ 240MHz...',
    '[WIFI] Connected to AP | IP: 192.168.1.142',
    '[SENSORS] HX711 Load Cells calibrated (tare: 0.00kg)',
    '[MQ-6] Gas Sensor Baseline: 124 ppm (NORMAL)',
    '[FIREBASE] RTDB Telemetry synchronized at 200ms interval'
  ]);
  const streamRef = useRef(null);

  useEffect(() => {
    const generator = [
      () => `[HX711] Load cell sample: ${(14.15 + (Math.random() * 0.1 - 0.05)).toFixed(2)}kg (tare OK)`,
      () => `[MQ-6] Gas analog ppm: ${Math.floor(118 + Math.random() * 12)} (SAFE < 250)`,
      () => `[PZEM-004T] Sampling: 230.${Math.floor(Math.random() * 9)}V | 50.0${Math.floor(Math.random() * 4)}Hz`,
      () => `[FIREBASE] RTDB payload verified. Latency: ${Math.floor(14 + Math.random() * 8)}ms`,
      () => `[BT BRIDGE] HC-05 packet ack: 0x55 (rssi: -58dBm)`,
      () => `[HEARTBEAT] Free Heap: ${Math.floor(182000 + Math.random() * 4000)} bytes`
    ];

    const timer = setInterval(() => {
      const fn = generator[Math.floor(Math.random() * generator.length)];
      setLogs((prev) => {
        const next = [...prev, fn()];
        if (next.length > 25) next.shift();
        return next;
      });
    }, 3000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (streamRef.current) {
      streamRef.current.scrollTop = streamRef.current.scrollHeight;
    }
  }, [logs]);

  const themes = [
    { id: 'cyan', label: 'Precision Cyan', color: '#38bdf8' },
    { id: 'cobalt', label: 'Deep Cobalt', color: '#2563eb' },
    { id: 'emerald', label: 'Matrix Emerald', color: '#10b981' },
    { id: 'amber', label: 'Solar Amber', color: '#f59e0b' }
  ];

  return (
    <div className="workstation-wrapper">
      <div className="workstation-controls">
        <div className="workstation-ctrl-group">
          <span className="ctrl-label">
            <i className="fa-solid fa-palette"></i> Theme Accent:
          </span>
          <div className="theme-swatches">
            {themes.map((t) => (
              <button
                key={t.id}
                type="button"
                className={`swatch-btn ${currentTheme === t.id ? 'active' : ''}`}
                style={{ '--c': t.color }}
                onClick={() => onThemeChange(t.id)}
                title={t.label}
              />
            ))}
          </div>
          {onToggleColorMode && (
            <button
              type="button"
              className="swatch-mode-toggle"
              onClick={onToggleColorMode}
              title={`Switch to ${colorMode === 'dark' ? 'Light' : 'Dark'} Mode`}
              aria-label={`Switch to ${colorMode === 'dark' ? 'Light' : 'Dark'} Mode`}
            >
              {colorMode === 'dark' ? (
                <i className="fa-solid fa-sun icon-sun-swatch"></i>
              ) : (
                <i className="fa-solid fa-moon icon-moon-swatch"></i>
              )}
              <span>{colorMode === 'dark' ? 'Light' : 'Dark'}</span>
            </button>
          )}
        </div>

        <div className="code-tab-switchers">
          <button
            type="button"
            className={`code-tab-btn ${activeTab === 'esp32' ? 'active' : ''}`}
            onClick={() => setActiveTab('esp32')}
          >
            OneGuard.ino
          </button>
          <button
            type="button"
            className={`code-tab-btn ${activeTab === 'telemetry' ? 'active' : ''}`}
            onClick={() => setActiveTab('telemetry')}
          >
            FirebaseRTDB.cpp
          </button>
          <button
            type="button"
            className={`code-tab-btn ${activeTab === 'ros2' ? 'active' : ''}`}
            onClick={() => setActiveTab('ros2')}
          >
            robot_node.py
          </button>
        </div>
      </div>

      <div className="workstation-desk" id="workstation-desk">
        {/* Left Studio Speaker */}
        <div className="speaker speaker-left">
          <div className="speaker-driver high"></div>
          <div className="speaker-driver bass rgb-glow-ring"></div>
        </div>

        {/* Central Curved Monitor Setup with Code */}
        <div className="monitor-assembly">
          <div className="monitor-bezel">
            <div className="monitor-top-bar">
              <div className="window-dots">
                <span className="dot close"></span>
                <span className="dot min"></span>
                <span className="dot max"></span>
              </div>
              <div className="editor-title">
                <i className="fa-solid fa-code"></i> {CODE_FILES[activeTab].name}
              </div>
              <div className="editor-status-badge">
                <span className="status-live"></span> 115200 BAUD | COM7
              </div>
            </div>

            <div className="monitor-screen">
              <div className="code-editor-layout">
                {/* File Explorer Tree */}
                <div className="editor-sidebar">
                  <div className="sidebar-header">EXPLORER</div>
                  <div
                    className={`file-item ${activeTab === 'esp32' ? 'active' : ''}`}
                    onClick={() => setActiveTab('esp32')}
                  >
                    <i className="fa-brands fa-cuttlefish text-purple"></i> OneGuard.ino
                  </div>
                  <div
                    className={`file-item ${activeTab === 'telemetry' ? 'active' : ''}`}
                    onClick={() => setActiveTab('telemetry')}
                  >
                    <i className="fa-solid fa-bolt text-cyan"></i> OneFlux_PZEM.cpp
                  </div>
                  <div
                    className={`file-item ${activeTab === 'ros2' ? 'active' : ''}`}
                    onClick={() => setActiveTab('ros2')}
                  >
                    <i className="fa-brands fa-python text-yellow"></i> gesture_bot.py
                  </div>
                  <div className="file-item">
                    <i className="fa-solid fa-microchip text-green"></i> pinout_config.h
                  </div>
                </div>

                {/* Code & Terminal Area */}
                <div className="editor-main">
                  <div className="code-content">
                    <pre>
                      <code>{CODE_FILES[activeTab].content}</code>
                    </pre>
                  </div>

                  {/* Integrated Serial Terminal */}
                  <div className="terminal-panel">
                    <div className="terminal-header">
                      <span>
                        <i className="fa-solid fa-terminal"></i> ESP32 SERIAL MONITOR
                      </span>
                      <span className="terminal-pulse">CONNECTED</span>
                    </div>
                    <div className="terminal-stream" ref={streamRef}>
                      {logs.map((msg, index) => (
                        <div key={index} className="t-line t-info">
                          {msg}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="monitor-brand">PIYUSH · ULTRASHARP 4K</div>
          </div>
          <div className="monitor-neck"></div>
          <div className="monitor-base"></div>
        </div>

        {/* Right Glowing Cyber PC Tower */}
        <div className="pc-tower rgb-accent-box">
          <div className="pc-tempered-glass">
            <div className="pc-internal-components">
              <div className="pc-gpu-block">
                <span className="gpu-logo">ESP-RTX</span>
                <div className="gpu-light-strip"></div>
              </div>
              <div className="pc-ram-sticks">
                <div className="ram-rgb-bar"></div>
                <div className="ram-rgb-bar"></div>
              </div>
              <div className="cooling-radiator">
                <div className="fan-circle fan-1 spinning-fan">
                  <div className="fan-blade"></div>
                </div>
                <div className="fan-circle fan-2 spinning-fan">
                  <div className="fan-blade"></div>
                </div>
              </div>
            </div>
          </div>
          <div className="pc-front-panel">
            <div className="power-button"></div>
            <div className="front-rgb-strip"></div>
            <div className="pc-badge">
              <i className="fa-solid fa-bolt"></i>
            </div>
          </div>
        </div>

        {/* Right Studio Speaker */}
        <div className="speaker speaker-right">
          <div className="speaker-driver high"></div>
          <div className="speaker-driver bass rgb-glow-ring"></div>
        </div>

        {/* Glowing RGB Keyboard & Mouse on Desk */}
        <div className="desk-surface">
          <div className="mousepad">
            <div className="rgb-keyboard">
              <div className="key-row key-row-f"></div>
              <div className="key-row key-row-1"></div>
              <div className="key-row key-row-2"></div>
              <div className="key-row key-row-3"></div>
              <div className="key-spacebar"></div>
            </div>
            <div className="rgb-mouse">
              <div className="mouse-wheel"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
