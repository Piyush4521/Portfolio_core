import React, { useState, useEffect, useRef } from 'react';

export default function IoTLab({ activeSim, setActiveSim, onShowToast }) {
  return (
    <section className="simulators-section" id="simulators">
      <div className="section-container">
        <div className="section-header-centered">
          <span className="section-pretitle">
            <i className="fa-solid fa-microscope"></i> HANDS-ON EXPERIENCE
          </span>
          <h2 className="section-title">Interactive IoT & Robotics Lab</h2>
          <p className="section-description">
            Interact with live simulations of Piyush's real hardware algorithms directly in your browser.
          </p>
        </div>

        {/* Simulator Navigation Tabs */}
        <div className="sim-tabs-nav">
          <button
            type="button"
            className={`sim-tab ${activeSim === 'oneguard' ? 'active' : ''}`}
            onClick={() => setActiveSim('oneguard')}
          >
            <i className="fa-solid fa-fire-flame-curved"></i> OneGuard Gas Safety Lab
          </button>
          <button
            type="button"
            className={`sim-tab ${activeSim === 'oneflux' ? 'active' : ''}`}
            onClick={() => setActiveSim('oneflux')}
          >
            <i className="fa-solid fa-bolt-lightning"></i> OneFlux Energy Telemetry Lab
          </button>
          <button
            type="button"
            className={`sim-tab ${activeSim === 'robot' ? 'active' : ''}`}
            onClick={() => setActiveSim('robot')}
          >
            <i className="fa-solid fa-gamepad"></i> Gesture Vehicle Simulator
          </button>
        </div>

        <div className="simulators-display-area">
          {activeSim === 'oneguard' && <OneGuardSimulator onShowToast={onShowToast} />}
          {activeSim === 'oneflux' && <OneFluxSimulator onShowToast={onShowToast} />}
          {activeSim === 'robot' && <RobotArenaSimulator onShowToast={onShowToast} />}
        </div>
      </div>
    </section>
  );
}

/* ==========================================================================
   Sub-Simulator 1: OneGuard Gas Safety Lab
   ========================================================================== */
function OneGuardSimulator({ onShowToast }) {
  const [gasPpm, setGasPpm] = useState(120);
  const [weightKg, setWeightKg] = useState(14.2);
  const [logs, setLogs] = useState([
    '[00:00:01] System boot verified. HX711 balanced. Valve initialized.'
  ]);
  const logRef = useRef(null);

  const addLog = (msg) => {
    const time = new Date().toLocaleTimeString();
    setLogs((prev) => [...prev, `[${time}] ${msg}`]);
  };

  useEffect(() => {
    if (logRef.current) {
      logRef.current.scrollTop = logRef.current.scrollHeight;
    }
  }, [logs]);

  const isCritical = gasPpm > 450;
  const isWarning = gasPpm >= 250 && gasPpm <= 450;
  const capacityPct = Math.max(0, Math.min(100, ((weightKg - 1.5) / 12.7) * 100)).toFixed(1);

  const handleGasChange = (e) => {
    const val = parseInt(e.target.value, 10);
    setGasPpm(val);
    if (val > 450) {
      addLog(`[ALERT] MQ-6 PPM spiked to ${val}. Auto-closing valve.`);
    }
  };

  const handleWeightChange = (e) => {
    const val = parseFloat(e.target.value);
    setWeightKg(val);
  };

  const triggerLeak = () => {
    setGasPpm(680);
    addLog('[EMERGENCY] Simulated Gas Leak Injected! Servo triggering cutoff.');
    onShowToast('[ALERT] Critical Gas Leak Detected: Emergency Shutoff Triggered');
  };

  const resetSystem = () => {
    setGasPpm(120);
    setWeightKg(14.2);
    addLog('[RESET] System restored to safe nominal parameters.');
    onShowToast('OneGuard Reset to Normal Operation');
  };

  return (
    <div className="sim-panel active">
      <div className="sim-card-grid">
        {/* Controls */}
        <div className="sim-control-box">
          <h4 className="sim-box-title">
            <i className="fa-solid fa-sliders"></i> Sensor Hardware Injections
          </h4>

          <div className="control-group">
            <div className="control-label-row">
              <span>
                <i className="fa-solid fa-smog"></i> MQ-6 Gas Leakage (PPM):
              </span>
              <span className="val-badge">{gasPpm} ppm</span>
            </div>
            <input
              type="range"
              min="50"
              max="800"
              value={gasPpm}
              onChange={handleGasChange}
              className="sim-slider"
            />
            <div className="slider-ticks">
              <span>Safe (&lt;250)</span>
              <span className="text-warning">Warning (250-450)</span>
              <span className="text-danger">Critical (&gt;450)</span>
            </div>
          </div>

          <div className="control-group">
            <div className="control-label-row">
              <span>
                <i className="fa-solid fa-weight-scale"></i> Cylinder Weight (HX711):
              </span>
              <span className="val-badge">{weightKg.toFixed(1)} kg</span>
            </div>
            <input
              type="range"
              min="0.5"
              max="15.0"
              step="0.1"
              value={weightKg}
              onChange={handleWeightChange}
              className="sim-slider"
            />
            <div className="slider-ticks">
              <span className="text-danger">Empty (&lt;2kg)</span>
              <span className="text-warning">Refill Needed</span>
              <span>Full (14.2kg)</span>
            </div>
          </div>

          <div className="sim-quick-actions">
            <button type="button" className="sim-action-btn" onClick={triggerLeak}>
              <i className="fa-solid fa-triangle-exclamation"></i> Simulate Sudden Gas Leak
            </button>
            <button type="button" className="sim-action-btn btn-reset" onClick={resetSystem}>
              <i className="fa-solid fa-rotate-left"></i> Reset System
            </button>
          </div>
        </div>

        {/* Output Status & Valve Visualization */}
        <div className="sim-status-box">
          <h4 className="sim-box-title">
            <i className="fa-solid fa-desktop"></i> Actuator & Telemetry Response
          </h4>

          <div className="sim-readouts">
            <div className="readout-card">
              <div className="r-title">Gas Sensor Status</div>
              <div
                className={`r-value ${
                  isCritical ? 'text-danger' : isWarning ? 'text-warning' : 'text-success'
                }`}
              >
                {isCritical ? 'CRITICAL LEAK!' : isWarning ? 'ELEVATED PPM' : 'NORMAL'}
              </div>
            </div>

            <div className="readout-card">
              <div className="r-title">Shutoff Valve</div>
              <div
                className={`r-value ${
                  isCritical ? 'text-danger' : isWarning ? 'text-warning' : 'text-success'
                }`}
              >
                {isCritical ? 'SHUT OFF (EMERGENCY)' : 'OPEN (ACTIVE)'}
              </div>
            </div>

            <div className="readout-card">
              <div className="r-title">Safety Buzzer</div>
              <div className={`r-value ${isCritical ? 'text-danger' : ''}`}>
                {isCritical ? 'ACTIVE (85dB ALARM)' : isWarning ? 'PRE-ALERT CHIRP' : 'SILENT'}
              </div>
            </div>

            <div className="readout-card">
              <div className="r-title">Remaining Capacity</div>
              <div className="r-value">{capacityPct}%</div>
            </div>
          </div>

          {/* Valve Animated Graphic */}
          <div className="valve-visualizer">
            <div className="pipe pipe-in">
              <div className={`gas-flow ${!isCritical ? 'active' : ''}`}></div>
            </div>
            <div className="valve-body">
              <div className={`valve-handle ${isCritical ? 'closed' : 'open'}`}>
                <span className="handle-bar"></span>
              </div>
              <span className="valve-lbl">SOLENOID / SERVO</span>
            </div>
            <div className="pipe pipe-out"></div>
          </div>

          {/* Real-time Event Log */}
          <div className="event-log-container">
            <div className="log-title">TELEMETRY EVENT LOG</div>
            <div className="log-body" ref={logRef}>
              {logs.map((item, idx) => (
                <div key={idx}>{item}</div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ==========================================================================
   Sub-Simulator 2: OneFlux Energy Telemetry Lab
   ========================================================================== */
function OneFluxSimulator({ onShowToast }) {
  const [loadAc, setLoadAc] = useState(true);
  const [loadInduction, setLoadInduction] = useState(true);
  const [loadGeyser, setLoadGeyser] = useState(false);
  const [gridVoltage, setGridVoltage] = useState(230);
  const [isTripped, setIsTripped] = useState(false);
  const [logs, setLogs] = useState([
    '[00:00:01] PZEM-004T UART initialized. Sampling rate 5Hz. All safe.'
  ]);
  const logRef = useRef(null);

  const addLog = (msg) => {
    const time = new Date().toLocaleTimeString();
    setLogs((prev) => [...prev, `[${time}] ${msg}`]);
  };

  useEffect(() => {
    if (logRef.current) {
      logRef.current.scrollTop = logRef.current.scrollHeight;
    }
  }, [logs]);

  // Calculate live values
  let power = 40; // baseline
  if (loadAc) power += 1400;
  if (loadInduction) power += 1800;
  if (loadGeyser) power += 2200;

  const current = power / (gridVoltage || 230);
  const costPerHour = (power / 1000) * 9.0;
  const co2Rate = (power / 1000) * 0.82;

  // Auto Safety Trip check
  useEffect(() => {
    if (!isTripped && (current > 22.0 || gridVoltage > 260 || gridVoltage < 180)) {
      setIsTripped(true);
      addLog(`[TRIP] Fault detected (I: ${current.toFixed(1)}A, V: ${gridVoltage}V). High-voltage relay cut off.`);
      onShowToast('[FAULT] OneFlux Circuit Breaker Tripped: Safe Cutoff Executed');
    }
  }, [current, gridVoltage, isTripped]);

  const resetBreaker = () => {
    setIsTripped(false);
    addLog('[RESET] High-voltage relay coil re-engaged.');
    onShowToast('OneFlux Circuit Breaker Reset to Armed State');
  };

  return (
    <div className="sim-panel active">
      <div className="sim-card-grid">
        {/* Controls */}
        <div className="sim-control-box">
          <h4 className="sim-box-title">
            <i className="fa-solid fa-plug-circle-bolt"></i> Connected Electrical Loads
          </h4>
          <p className="sim-box-desc">
            Toggle appliances to observe PZEM-004T live sampling & safety logic:
          </p>

          <div className="load-toggle-list">
            <label className="load-item">
              <input
                type="checkbox"
                checked={loadAc}
                onChange={(e) => setLoadAc(e.target.checked)}
              />
              <span className="load-custom-check"></span>
              <div className="load-details">
                <strong>Dual Inverter AC (1.5 Ton)</strong>
                <span>Nominal: ~1400W | 6.2A</span>
              </div>
            </label>

            <label className="load-item">
              <input
                type="checkbox"
                checked={loadInduction}
                onChange={(e) => setLoadInduction(e.target.checked)}
              />
              <span className="load-custom-check"></span>
              <div className="load-details">
                <strong>Induction Cooktop (Max Boost)</strong>
                <span>Nominal: ~1800W | 7.8A</span>
              </div>
            </label>

            <label className="load-item">
              <input
                type="checkbox"
                checked={loadGeyser}
                onChange={(e) => setLoadGeyser(e.target.checked)}
              />
              <span className="load-custom-check"></span>
              <div className="load-details">
                <strong>Fast Water Geyser (Heavy Load)</strong>
                <span>Nominal: ~2200W | 9.5A</span>
              </div>
            </label>
          </div>

          <div className="voltage-fault-tester">
            <label>Grid Voltage Fluctuation:</label>
            <div className="voltage-btns">
              <button
                type="button"
                className={`v-btn ${gridVoltage === 170 ? 'active' : ''}`}
                onClick={() => setGridVoltage(170)}
              >
                Brownout (170V)
              </button>
              <button
                type="button"
                className={`v-btn ${gridVoltage === 230 ? 'active' : ''}`}
                onClick={() => setGridVoltage(230)}
              >
                Normal (230V)
              </button>
              <button
                type="button"
                className={`v-btn ${gridVoltage === 275 ? 'active' : ''}`}
                onClick={() => setGridVoltage(275)}
              >
                Surge (275V)
              </button>
            </div>
          </div>

          <div className="breaker-manual-control">
            <button type="button" className="btn-trip-reset" onClick={resetBreaker}>
              <i className="fa-solid fa-power-off"></i> Reset Circuit Breaker Relay
            </button>
          </div>
        </div>

        {/* Energy Telemetry Gauges */}
        <div className="sim-status-box">
          <div className={`breaker-banner ${isTripped ? 'tripped' : 'safe'}`}>
            <i className={`fa-solid ${isTripped ? 'fa-triangle-exclamation' : 'fa-shield'}`}></i>
            {isTripped
              ? 'AUTONOMOUS RELAY TRIP! FAULT DETECTED!'
              : 'CIRCUIT BREAKER: ARMED & RUNNING'}
          </div>

          <div className="sim-readouts">
            <div className="readout-card">
              <div className="r-title">Voltage (V)</div>
              <div className="r-value text-cyan">
                {isTripped ? `${gridVoltage.toFixed(1)} V` : `${gridVoltage.toFixed(1)} V`}
              </div>
            </div>
            <div className="readout-card">
              <div className="r-title">Current (A)</div>
              <div className="r-value text-yellow">
                {isTripped ? '0.00 A' : `${current.toFixed(2)} A`}
              </div>
            </div>
            <div className="readout-card">
              <div className="r-title">Active Power (W)</div>
              <div className="r-value text-purple">
                {isTripped ? '0 W' : `${Math.round(power)} W`}
              </div>
            </div>
            <div className="readout-card">
              <div className="r-title">Grid Frequency</div>
              <div className="r-value">50.02 Hz</div>
            </div>
            <div className="readout-card">
              <div className="r-title">Estimated Cost / hr</div>
              <div className="r-value">{isTripped ? '₹0.00' : `₹${costPerHour.toFixed(2)}`}</div>
            </div>
            <div className="readout-card">
              <div className="r-title">CO2 Emission Rate</div>
              <div className="r-value">{isTripped ? '0.00 kg/h' : `${co2Rate.toFixed(2)} kg/h`}</div>
            </div>
          </div>

          <div className="event-log-container mt-3">
            <div className="log-title">PZEM-004T FIRMWARE SAFETY LOG</div>
            <div className="log-body" ref={logRef}>
              {logs.map((item, idx) => (
                <div key={idx}>{item}</div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ==========================================================================
   Sub-Simulator 3: Gesture Robot Vehicle Arena
   ========================================================================== */
function RobotArenaSimulator() {
  const canvasRef = useRef(null);
  const [command, setCommand] = useState('IDLE');
  const robotRef = useRef({
    x: 250,
    y: 120,
    angle: 0,
    speed: 0,
    angularSpeed: 0,
    width: 38,
    height: 26
  });
  const trailsRef = useRef([]);

  const handleCommand = (cmd) => {
    setCommand(cmd);
    const r = robotRef.current;
    if (cmd === 'FORWARD') {
      r.speed = 2.2;
      r.angularSpeed = 0;
    } else if (cmd === 'REVERSE') {
      r.speed = -1.8;
      r.angularSpeed = 0;
    } else if (cmd === 'PIVOT_LEFT') {
      r.angularSpeed = -0.06;
    } else if (cmd === 'PIVOT_RIGHT') {
      r.angularSpeed = 0.06;
    } else if (cmd === 'STOP') {
      r.speed = 0;
      r.angularSpeed = 0;
    }
  };

  const clearTrail = () => {
    trailsRef.current = [];
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const width = (canvas.width = 500);
    const height = (canvas.height = 240);

    let animationId;

    const loop = () => {
      const r = robotRef.current;
      r.angle += r.angularSpeed;
      r.x += Math.cos(r.angle) * r.speed;
      r.y += Math.sin(r.angle) * r.speed;

      // Bounce
      if (r.x < 20) r.x = 20;
      if (r.x > width - 20) r.x = width - 20;
      if (r.y < 20) r.y = 20;
      if (r.y > height - 20) r.y = height - 20;

      if (r.speed !== 0 || r.angularSpeed !== 0) {
        trailsRef.current.push({ x: r.x, y: r.y });
        if (trailsRef.current.length > 300) trailsRef.current.shift();
      }

      // Draw
      ctx.fillStyle = '#03050c';
      ctx.fillRect(0, 0, width, height);

      // Grid
      ctx.strokeStyle = '#0d1527';
      ctx.lineWidth = 1;
      for (let x = 0; x < width; x += 25) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = 0; y < height; y += 25) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // Trails
      const trails = trailsRef.current;
      if (trails.length > 1) {
        ctx.beginPath();
        ctx.strokeStyle = 'rgba(0, 242, 254, 0.4)';
        ctx.lineWidth = 2.5;
        for (let i = 0; i < trails.length; i++) {
          if (i === 0) ctx.moveTo(trails[i].x, trails[i].y);
          else ctx.lineTo(trails[i].x, trails[i].y);
        }
        ctx.stroke();
      }

      // Robot Chassis
      ctx.save();
      ctx.translate(r.x, r.y);
      ctx.rotate(r.angle);

      ctx.fillStyle = '#0f172a';
      ctx.strokeStyle = '#9d4edd';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.roundRect(-r.width / 2, -r.height / 2, r.width, r.height, 4);
      ctx.fill();
      ctx.stroke();

      // Wheels
      ctx.fillStyle = '#38bdf8';
      ctx.fillRect(r.width / 2 - 10, -r.height / 2 - 4, 8, 4);
      ctx.fillRect(r.width / 2 - 10, r.height / 2, 8, 4);
      ctx.fillRect(-r.width / 2 + 2, -r.height / 2 - 4, 8, 4);
      ctx.fillRect(-r.width / 2 + 2, r.height / 2, 8, 4);

      // ESP32 Chip
      ctx.fillStyle = '#1e293b';
      ctx.fillRect(-8, -6, 16, 12);
      ctx.fillStyle = '#10b981';
      ctx.fillRect(2, -2, 4, 4);

      // Orientation Arrow
      ctx.fillStyle = '#00f2fe';
      ctx.beginPath();
      ctx.moveTo(r.width / 2 + 2, 0);
      ctx.lineTo(r.width / 2 - 4, -4);
      ctx.lineTo(r.width / 2 - 4, 4);
      ctx.closePath();
      ctx.fill();

      ctx.restore();

      animationId = requestAnimationFrame(loop);
    };

    loop();

    return () => cancelAnimationFrame(animationId);
  }, []);

  // Keyboard binding
  useEffect(() => {
    const handleKeyDown = (e) => {
      const k = e.key.toLowerCase();
      if (['w', 'arrowup'].includes(k)) handleCommand('FORWARD');
      if (['s', 'arrowdown'].includes(k)) handleCommand('REVERSE');
      if (['a', 'arrowleft'].includes(k)) handleCommand('PIVOT_LEFT');
      if (['d', 'arrowright'].includes(k)) handleCommand('PIVOT_RIGHT');
      if (k === ' ') handleCommand('STOP');
    };

    const handleKeyUp = (e) => {
      const k = e.key.toLowerCase();
      if (['w', 's', 'a', 'd', 'arrowup', 'arrowdown', 'arrowleft', 'arrowright'].includes(k)) {
        handleCommand('STOP');
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  return (
    <div className="sim-panel active">
      <div className="sim-card-grid">
        {/* Joystick / Directional Pad Controls */}
        <div className="sim-control-box text-center">
          <h4 className="sim-box-title">
            <i className="fa-solid fa-gamepad"></i> Real-Time Gesture Pad
          </h4>
          <p className="sim-box-desc">
            Use arrow buttons or keyboard WASD / Arrow keys to command the vehicle:
          </p>

          <div className="dpad-container">
            <button
              type="button"
              className="dpad-btn dpad-up"
              onMouseDown={() => handleCommand('FORWARD')}
              onMouseUp={() => handleCommand('STOP')}
              onTouchStart={(e) => {
                e.preventDefault();
                handleCommand('FORWARD');
              }}
              onTouchEnd={(e) => {
                e.preventDefault();
                handleCommand('STOP');
              }}
              title="Move Forward (W / Up)"
            >
              <i className="fa-solid fa-chevron-up"></i>
            </button>
            <div className="dpad-middle-row">
              <button
                type="button"
                className="dpad-btn dpad-left"
                onMouseDown={() => handleCommand('PIVOT_LEFT')}
                onMouseUp={() => handleCommand('STOP')}
                onTouchStart={(e) => {
                  e.preventDefault();
                  handleCommand('PIVOT_LEFT');
                }}
                onTouchEnd={(e) => {
                  e.preventDefault();
                  handleCommand('STOP');
                }}
                title="Pivot Left (A / Left)"
              >
                <i className="fa-solid fa-chevron-left"></i>
              </button>
              <button
                type="button"
                className="dpad-btn dpad-stop"
                onClick={() => handleCommand('STOP')}
                title="Emergency Stop (Space)"
              >
                STOP
              </button>
              <button
                type="button"
                className="dpad-btn dpad-right"
                onMouseDown={() => handleCommand('PIVOT_RIGHT')}
                onMouseUp={() => handleCommand('STOP')}
                onTouchStart={(e) => {
                  e.preventDefault();
                  handleCommand('PIVOT_RIGHT');
                }}
                onTouchEnd={(e) => {
                  e.preventDefault();
                  handleCommand('STOP');
                }}
                title="Pivot Right (D / Right)"
              >
                <i className="fa-solid fa-chevron-right"></i>
              </button>
            </div>
            <button
              type="button"
              className="dpad-btn dpad-down"
              onMouseDown={() => handleCommand('REVERSE')}
              onMouseUp={() => handleCommand('STOP')}
              onTouchStart={(e) => {
                e.preventDefault();
                handleCommand('REVERSE');
              }}
              onTouchEnd={(e) => {
                e.preventDefault();
                handleCommand('STOP');
              }}
              title="Move Reverse (S / Down)"
            >
              <i className="fa-solid fa-chevron-down"></i>
            </button>
          </div>

          <div className="robot-metrics-mini">
            <div>
              <strong>Packet Delay:</strong> <span className="text-success">18 ms</span>
            </div>
            <div>
              <strong>Motor PWM:</strong> <span>220 / 255</span>
            </div>
            <div>
              <strong>Current State:</strong> <span className="text-cyan">{command}</span>
            </div>
          </div>
        </div>

        {/* 2D Canvas Arena */}
        <div className="sim-status-box">
          <div className="arena-header">
            <span>
              <i className="fa-solid fa-crosshairs"></i> VIRTUAL TEST ARENA (4WD CHASSIS)
            </span>
            <button type="button" className="btn-clear-trail" onClick={clearTrail}>
              Clear Path
            </button>
          </div>
          <div className="arena-canvas-container">
            <canvas id="robot-arena-canvas" ref={canvasRef}></canvas>
          </div>
          <p className="arena-hint">
            <i className="fa-solid fa-circle-info"></i> Steer the robot inside the arena. Notice
            the dual differential track trails and smooth orientation interpolation.
          </p>
        </div>
      </div>
    </div>
  );
}
