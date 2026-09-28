/**
 * PIYUSH SONAWANE | PORTFOLIO APPLICATION LOGIC
 * Features: Cyber Wave Canvas, Workstation Battlestation, Editorial Switcher,
 * Real-time Hardware Simulators (OneGuard, OneFlux, Gesture Robot Arena).
 */

document.addEventListener('DOMContentLoaded', () => {
  initWaveCanvas();
  initCursorAura();
  initNavbar();
  initWorkstation();
  initEditorialSection();
  initSimulators();
  initResumeModal();
  initContactFeatures();
});

/* ==========================================================================
   1. AMBIENT CYBER WAVE CANVAS (Image 1 Background Reference)
   ========================================================================== */
function initWaveCanvas() {
  const canvas = document.getElementById('wave-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  let mouse = { x: width * 0.5, y: height * 0.4 };
  window.addEventListener('mousemove', (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  });

  let step = 0;
  const numLines = 14;

  function render() {
    ctx.clearRect(0, 0, width, height);
    step += 0.008;

    // Get current theme accent color from root
    const style = getComputedStyle(document.body);
    const accentPurple = style.getPropertyValue('--accent-purple').trim() || '#9d4edd';

    for (let i = 0; i < numLines; i++) {
      ctx.beginPath();
      const progress = i / numLines;
      const baseAlpha = 0.03 + progress * 0.08;
      ctx.strokeStyle = accentPurple;
      ctx.globalAlpha = baseAlpha;
      ctx.lineWidth = 1.2;

      const yOffset = height * 0.15 + (i * height * 0.06);

      for (let x = 0; x <= width; x += 18) {
        // Trigonometric wave with mouse disturbance
        const distToMouse = Math.hypot(x - mouse.x, yOffset - mouse.y);
        const mouseEffect = Math.max(0, 1 - distToMouse / 450) * 35;

        const wave1 = Math.sin(x * 0.003 + step + i * 0.3) * 45;
        const wave2 = Math.cos(x * 0.006 - step * 0.7 + i * 0.15) * 25;
        const y = yOffset + wave1 + wave2 + (Math.sin(step + i) * mouseEffect);

        if (x === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      }
      ctx.stroke();
    }

    requestAnimationFrame(render);
  }

  render();
}

/* ==========================================================================
   2. CURSOR AURA
   ========================================================================== */
function initCursorAura() {
  const glow = document.getElementById('cursor-glow');
  if (!glow) return;

  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;
  let currentX = mouseX;
  let currentY = mouseY;

  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  function animate() {
    currentX += (mouseX - currentX) * 0.12;
    currentY += (mouseY - currentY) * 0.12;
    glow.style.transform = `translate(${currentX}px, ${currentY}px) translate(-50%, -50%)`;
    requestAnimationFrame(animate);
  }
  animate();
}

/* ==========================================================================
   3. NAVBAR & SCROLLSPY
   ========================================================================== */
function initNavbar() {
  const navbar = document.querySelector('.navbar-wrapper');
  const mobileToggle = document.getElementById('mobile-toggle');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    // Scrollspy
    const sections = document.querySelectorAll('section[id]');
    let current = '';
    const scrollPos = window.scrollY + 200;

    sections.forEach((section) => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      if (scrollPos >= top && scrollPos < top + height) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove('active');
      if (link.getAttribute('data-nav') === current) {
        link.classList.add('active');
      }
    });
  });

  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', () => {
      navMenu.classList.toggle('open');
    });

    navLinks.forEach((link) => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('open');
      });
    });
  }
}

/* ==========================================================================
   4. 3D WORKSTATION BATTLESTATION (Image 1 Reference)
   ========================================================================== */
const CODE_SNIPPETS = {
  esp32: {
    filename: 'OneGuard_ESP32_Firmware.ino',
    content: `<span class="text-purple">#include</span> &lt;WiFi.h&gt;
<span class="text-purple">#include</span> &lt;HX711.h&gt;
<span class="text-purple">#include</span> &lt;ESP32Servo.h&gt;
<span class="text-purple">#include</span> &lt;Firebase_ESP_Client.h&gt;

<span class="text-dim">// Hardware Pin Mapping</span>
<span class="text-cyan">const int</span> MQ6_PIN = 34;      <span class="text-dim">// Analog Gas Sensor</span>
<span class="text-cyan">const int</span> HX711_DOUT = 19;   <span class="text-dim">// Load Cell Data</span>
<span class="text-cyan">const int</span> HX711_SCK = 18;    <span class="text-dim">// Load Cell Clock</span>
<span class="text-cyan">const int</span> SERVO_PIN = 23;    <span class="text-dim">// Emergency Shutoff</span>
<span class="text-cyan">const int</span> BUZZER_PIN = 5;

HX711 scale;
Servo shutoffValve;

<span class="text-yellow">void setup()</span> {
  Serial.begin(115200);
  scale.begin(HX711_DOUT, HX711_SCK);
  scale.set_scale(2280.f);   <span class="text-dim">// Calibrated factor</span>
  shutoffValve.attach(SERVO_PIN);
  shutoffValve.write(0);     <span class="text-dim">// Open valve state</span>
  pinMode(BUZZER_PIN, OUTPUT);
}

<span class="text-yellow">void loop()</span> {
  <span class="text-cyan">float</span> gasPpm = analogRead(MQ6_PIN) * (1000.0 / 4095.0);
  <span class="text-cyan">float</span> weightKg = scale.get_units(5);

  <span class="text-purple">if</span> (gasPpm &gt; 450.0) {
    shutoffValve.write(90);  <span class="text-dim">// EMERGENCY CUTOFF</span>
    digitalWrite(BUZZER_PIN, HIGH);
    pushAlertFirebase(<span class="text-green">"CRITICAL_GAS_LEAK"</span>, gasPpm);
  }
  delay(200);
}`
  },
  telemetry: {
    filename: 'OneFlux_Telemetry.cpp',
    content: `<span class="text-purple">#include</span> "PZEM004Tv30.h"
<span class="text-purple">#include</span> &lt;Firebase_ESP_Client.h&gt;

PZEM004Tv30 pzem(&Serial2, 16, 17); <span class="text-dim">// UART2</span>

<span class="text-yellow">void syncEnergyTelemetry()</span> {
  <span class="text-cyan">float</span> voltage = pzem.voltage();
  <span class="text-cyan">float</span> current = pzem.current();
  <span class="text-cyan">float</span> power   = pzem.power();
  <span class="text-cyan">float</span> energy  = pzem.energy();
  <span class="text-cyan">float</span> freq    = pzem.frequency();

  <span class="text-dim">// Autonomous Safety Interlock</span>
  <span class="text-purple">if</span> (current &gt; 25.0 || voltage &lt; 180.0 || voltage &gt; 265.0) {
    digitalWrite(RELAY_TRIP_PIN, HIGH); <span class="text-dim">// Safe Cutoff</span>
    Firebase.RTDB.setString(&fbdo, <span class="text-green">"/grid/fault"</span>, <span class="text-green">"AUTONOMOUS_TRIP"</span>);
  }

  FirebaseJson json;
  json.set(<span class="text-green">"voltage"</span>, voltage);
  json.set(<span class="text-green">"current"</span>, current);
  json.set(<span class="text-green">"power"</span>, power);
  json.set(<span class="text-green">"co2_rate"</span>, power * 0.00082); <span class="text-dim">// kg/h</span>
  Firebase.RTDB.setJSON(&fbdo, <span class="text-green">"/live"</span>, &json);
}`
  },
  ros2: {
    filename: 'gesture_robot_node.py',
    content: `<span class="text-purple">import</span> rclpy
<span class="text-purple">from</span> rclpy.node <span class="text-purple">import</span> Node
<span class="text-purple">from</span> geometry_msgs.msg <span class="text-purple">import</span> Twist

<span class="text-yellow">class</span> <span class="text-cyan">GestureRobotController</span>(Node):
    <span class="text-yellow">def __init__</span>(self):
        super().__init__(<span class="text-green">'gesture_robot_node'</span>)
        self.cmd_pub = self.create_publisher(Twist, <span class="text-green">'/cmd_vel'</span>, 10)
        self.timer = self.create_timer(0.02, self.update_motion)
        self.get_logger().info(<span class="text-green">'ESP32 Bluetooth Bridge Ready'</span>)

    <span class="text-yellow">def parse_bluetooth_packet</span>(self, raw_bytes):
        <span class="text-dim"># Real-time gesture orientation processing</span>
        ax, ay, az = [int(b) <span class="text-purple">for</span> b <span class="text-purple">in</span> raw_bytes.split(b<span class="text-green">','</span>)]
        twist = Twist()
        twist.linear.x = max(-1.0, min(1.0, ay / 90.0))
        twist.angular.z = max(-1.0, min(1.0, ax / 90.0))
        self.cmd_pub.publish(twist)`
  }
};

function initWorkstation() {
  const codeView = document.getElementById('code-content-view');
  const filenameEl = document.getElementById('editor-active-filename');
  const codeTabs = document.querySelectorAll('.code-tab-btn');
  const themeSwatches = document.querySelectorAll('.swatch-btn');
  const terminalStream = document.getElementById('terminal-stream');

  // Load default code
  loadCodeSnippet('esp32');

  function loadCodeSnippet(key) {
    if (!CODE_SNIPPETS[key] || !codeView) return;
    codeView.innerHTML = `<pre><code>${CODE_SNIPPETS[key].content}</code></pre>`;
    if (filenameEl) {
      filenameEl.innerHTML = `<i class="fa-solid fa-code"></i> ${CODE_SNIPPETS[key].filename}`;
    }
  }

  codeTabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      codeTabs.forEach((t) => t.classList.remove('active'));
      tab.classList.add('active');
      const fileKey = tab.getAttribute('data-file');
      loadCodeSnippet(fileKey);
      appendTerminalLog(`[EXPLORER] Switched active buffer to: ${CODE_SNIPPETS[fileKey].filename}`);
    });
  });

  // Setup Theme Switcher
  themeSwatches.forEach((swatch) => {
    swatch.addEventListener('click', () => {
      themeSwatches.forEach((s) => s.classList.remove('active'));
      swatch.classList.add('active');
      const theme = swatch.getAttribute('data-theme');
      document.body.className = `theme-${theme}`;
      appendTerminalLog(`[RGB SYNC] Workstation illumination adjusted to: ${theme.toUpperCase()}`);
    });
  });

  // Simulated live serial logs generator
  const serialMessages = [
    () => `[HX711] Load cell sample: ${(14.15 + (Math.random() * 0.1 - 0.05)).toFixed(2)}kg (tare OK)`,
    () => `[MQ-6] Gas analog ppm: ${Math.floor(118 + Math.random() * 12)} (SAFE &lt; 250)`,
    () => `[PZEM-004T] Sampling: 230.${Math.floor(Math.random() * 9)}V | 50.0${Math.floor(Math.random() * 4)}Hz`,
    () => `[FIREBASE] RTDB payload verified. Latency: ${Math.floor(14 + Math.random() * 8)}ms`,
    () => `[BT BRIDGE] HC-05 packet ack: 0x55 (rssi: -58dBm)`,
    () => `[HEARTBEAT] Free Heap: ${Math.floor(182000 + Math.random() * 4000)} bytes`
  ];

  setInterval(() => {
    if (!terminalStream) return;
    const randomMsgFn = serialMessages[Math.floor(Math.random() * serialMessages.length)];
    appendTerminalLog(randomMsgFn());
  }, 3200);

  function appendTerminalLog(htmlMsg) {
    if (!terminalStream) return;
    const line = document.createElement('div');
    line.className = 't-line t-info';
    line.innerHTML = htmlMsg;
    terminalStream.appendChild(line);
    if (terminalStream.children.length > 30) {
      terminalStream.removeChild(terminalStream.children[0]);
    }
    terminalStream.scrollTop = terminalStream.scrollHeight;
  }
}

/* ==========================================================================
   5. EDITORIAL CUTOUT SECTION (Image 2 Yuta Takahashi Reference)
   ========================================================================== */
function initEditorialSection() {
  const btn1 = document.getElementById('btn-portrait-1');
  const btn2 = document.getElementById('btn-portrait-2');
  const img1 = document.getElementById('cutout-img-1');
  const img2 = document.getElementById('cutout-img-2');

  if (btn1 && btn2 && img1 && img2) {
    btn1.addEventListener('click', () => {
      btn1.classList.add('active');
      btn2.classList.remove('active');
      img1.classList.add('active');
      img2.classList.remove('active');
      showToast('Switched to Executive Portrait I');
    });

    btn2.addEventListener('click', () => {
      btn2.classList.add('active');
      btn1.classList.remove('active');
      img2.classList.add('active');
      img1.classList.remove('active');
      showToast('Switched to Editorial Portrait II');
    });
  }

  // Parallax tilt on cutout portrait container
  const portraitFrame = document.getElementById('portrait-frame');
  if (portraitFrame) {
    portraitFrame.addEventListener('mousemove', (e) => {
      const rect = portraitFrame.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      const tiltX = (y / rect.height) * -12;
      const tiltY = (x / rect.width) * 12;
      portraitFrame.style.transform = `perspective(800px) rotateX(${tiltX}deg) rotateY(${tiltY}deg)`;
    });

    portraitFrame.addEventListener('mouseleave', () => {
      portraitFrame.style.transform = 'perspective(800px) rotateX(0deg) rotateY(0deg)';
    });
  }
}

/* ==========================================================================
   6. INTERACTIVE IOT LAB & SIMULATORS
   ========================================================================== */
function initSimulators() {
  // Tabs switching
  const tabs = document.querySelectorAll('.sim-tab');
  const panels = document.querySelectorAll('.sim-panel');

  tabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      tabs.forEach((t) => t.classList.remove('active'));
      panels.forEach((p) => p.classList.remove('active'));

      tab.classList.add('active');
      const targetId = tab.getAttribute('data-target');
      const targetPanel = document.getElementById(targetId);
      if (targetPanel) {
        targetPanel.classList.add('active');
      }
    });
  });

  // Card demo buttons trigger tabs
  const demoCardBtns = document.querySelectorAll('.btn-demo-card');
  demoCardBtns.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      const simType = btn.getAttribute('data-sim');
      let targetTabId = 'sim-oneguard';
      if (simType === 'oneflux') targetTabId = 'sim-oneflux';
      if (simType === 'robot') targetTabId = 'sim-robotics';

      const targetTab = document.querySelector(`.sim-tab[data-target="${targetTabId}"]`);
      if (targetTab) {
        targetTab.click();
      }
    });
  });

  // Initialize Sub-simulators
  initOneGuardSim();
  initOneFluxSim();
  initRobotArenaSim();
}

/* --- Simulator 1: OneGuard Gas Safety --- */
function initOneGuardSim() {
  const sliderGas = document.getElementById('slider-gas');
  const sliderWeight = document.getElementById('slider-weight');
  const valGasPpm = document.getElementById('val-gas-ppm');
  const valWeightKg = document.getElementById('val-weight-kg');

  const readoutGas = document.getElementById('readout-gas-status');
  const readoutValve = document.getElementById('readout-valve-status');
  const readoutBuzzer = document.getElementById('readout-buzzer-status');
  const readoutCap = document.getElementById('readout-capacity-pct');

  const valveHandle = document.getElementById('valve-handle');
  const gasFlow = document.getElementById('gas-flow-particles');
  const guardLog = document.getElementById('guard-log-stream');

  const btnLeak = document.getElementById('btn-trigger-leak');
  const btnReset = document.getElementById('btn-reset-guard');

  function updateOneGuard() {
    const gas = parseInt(sliderGas.value, 10);
    const weight = parseFloat(sliderWeight.value);

    valGasPpm.textContent = `${gas} ppm`;
    valWeightKg.textContent = `${weight.toFixed(1)} kg`;

    const capPct = Math.max(0, Math.min(100, ((weight - 1.5) / 12.7) * 100)).toFixed(1);
    readoutCap.textContent = `${capPct}%`;

    if (gas > 450) {
      // Critical state
      readoutGas.textContent = 'CRITICAL LEAK!';
      readoutGas.className = 'r-value text-danger';
      readoutValve.textContent = 'SHUT OFF (EMERGENCY)';
      readoutValve.className = 'r-value text-danger';
      readoutBuzzer.textContent = 'ACTIVE (85dB ALARM)';
      readoutBuzzer.className = 'r-value text-danger';

      valveHandle.className = 'valve-handle closed';
      gasFlow.className = 'gas-flow'; // stops flow
    } else if (gas >= 250) {
      // Warning
      readoutGas.textContent = 'ELEVATED PPM';
      readoutGas.className = 'r-value text-warning';
      readoutValve.textContent = 'OPEN (MONITORED)';
      readoutValve.className = 'r-value text-warning';
      readoutBuzzer.textContent = 'PRE-ALERT CHIRP';
      readoutBuzzer.className = 'r-value text-warning';

      valveHandle.className = 'valve-handle open';
      gasFlow.className = 'gas-flow active';
    } else {
      // Normal
      readoutGas.textContent = 'NORMAL';
      readoutGas.className = 'r-value text-success';
      readoutValve.textContent = 'OPEN (ACTIVE)';
      readoutValve.className = 'r-value text-success';
      readoutBuzzer.textContent = 'SILENT';
      readoutBuzzer.className = 'r-value';

      valveHandle.className = 'valve-handle open';
      gasFlow.className = 'gas-flow active';
    }
  }

  if (sliderGas && sliderWeight) {
    sliderGas.addEventListener('input', () => {
      updateOneGuard();
      logGuardEvent(`MQ-6 Reading adjusted to: ${sliderGas.value} ppm`);
    });
    sliderWeight.addEventListener('input', () => {
      updateOneGuard();
      logGuardEvent(`HX711 Cylinder tare update: ${sliderWeight.value} kg`);
    });
  }

  if (btnLeak) {
    btnLeak.addEventListener('click', () => {
      sliderGas.value = 650;
      updateOneGuard();
      logGuardEvent('[EMERGENCY] Simulated Gas Leak Injected! Servo triggering cutoff.');
      showToast('⚠️ Gas Leak Detected! Emergency Valve Closed!');
    });
  }

  if (btnReset) {
    btnReset.addEventListener('click', () => {
      sliderGas.value = 120;
      sliderWeight.value = 14.2;
      updateOneGuard();
      logGuardEvent('[RESET] System restored to safe nominal parameters.');
      showToast('OneGuard Reset to Normal Operation');
    });
  }

  function logGuardEvent(msg) {
    if (!guardLog) return;
    const time = new Date().toLocaleTimeString();
    const entry = document.createElement('div');
    entry.textContent = `[${time}] ${msg}`;
    guardLog.appendChild(entry);
    guardLog.scrollTop = guardLog.scrollHeight;
  }
}

/* --- Simulator 2: OneFlux Smart Energy Meter --- */
function initOneFluxSim() {
  const chkAc = document.getElementById('load-ac');
  const chkInduction = document.getElementById('load-induction');
  const chkGeyser = document.getElementById('load-geyser');

  const vBtns = document.querySelectorAll('.v-btn');
  const banner = document.getElementById('breaker-banner');
  const btnReset = document.getElementById('btn-flux-reset');

  const txtV = document.getElementById('flux-v');
  const txtI = document.getElementById('flux-i');
  const txtP = document.getElementById('flux-p');
  const txtHz = document.getElementById('flux-hz');
  const txtCost = document.getElementById('flux-cost');
  const txtCo2 = document.getElementById('flux-co2');
  const logFlux = document.getElementById('flux-log-stream');

  let gridVoltage = 230;
  let isTripped = false;

  vBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      vBtns.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');
      gridVoltage = parseInt(btn.getAttribute('data-v'), 10);
      logFluxEvent(`Grid Voltage altered to: ${gridVoltage}V`);
      calcOneFlux();
    });
  });

  [chkAc, chkInduction, chkGeyser].forEach((chk) => {
    if (chk) {
      chk.addEventListener('change', () => {
        logFluxEvent('Appliance load state toggled.');
        calcOneFlux();
      });
    }
  });

  if (btnReset) {
    btnReset.addEventListener('click', () => {
      isTripped = false;
      banner.className = 'breaker-banner safe';
      banner.innerHTML = '<i class="fa-solid fa-shield"></i> CIRCUIT BREAKER: ARMED & RUNNING';
      logFluxEvent('[RESET] High-voltage relay coil re-engaged.');
      showToast('OneFlux Circuit Breaker Reset');
      calcOneFlux();
    });
  }

  function calcOneFlux() {
    if (isTripped) {
      txtV.textContent = `${gridVoltage.toFixed(1)} V`;
      txtI.textContent = '0.00 A';
      txtP.textContent = '0 W';
      txtHz.textContent = '50.00 Hz';
      txtCost.textContent = '₹0.00';
      txtCo2.textContent = '0.00 kg/h';
      return;
    }

    let power = 40; // baseline electronics
    if (chkAc && chkAc.checked) power += 1400;
    if (chkInduction && chkInduction.checked) power += 1800;
    if (chkGeyser && chkGeyser.checked) power += 2200;

    const current = power / (gridVoltage || 230);
    const costPerHour = (power / 1000) * 9.0; // ~9 Rs/kWh
    const co2Rate = (power / 1000) * 0.82; // 0.82 kg CO2 / kWh

    // Check Safety Trip conditions (Overcurrent > 22A or Voltage < 180V or Voltage > 260V)
    if (current > 22.0 || gridVoltage > 260 || gridVoltage < 180) {
      isTripped = true;
      banner.className = 'breaker-banner tripped';
      banner.innerHTML = '<i class="fa-solid fa-triangle-exclamation"></i> AUTONOMOUS RELAY TRIP! FAULT DETECTED!';
      logFluxEvent(`[TRIP] Sustained fault (I: ${current.toFixed(1)}A, V: ${gridVoltage}V). Cutoff executed.`);
      showToast('⚠️ Circuit Breaker Tripped! Safe Cutoff Executed!');
      calcOneFlux();
      return;
    }

    txtV.textContent = `${(gridVoltage + (Math.random() * 0.4 - 0.2)).toFixed(1)} V`;
    txtI.textContent = `${current.toFixed(2)} A`;
    txtP.textContent = `${Math.round(power)} W`;
    txtHz.textContent = `${(50.0 + (Math.random() * 0.04 - 0.02)).toFixed(2)} Hz`;
    txtCost.textContent = `₹${costPerHour.toFixed(2)}`;
    txtCo2.textContent = `${co2Rate.toFixed(2)} kg/h`;
  }

  function logFluxEvent(msg) {
    if (!logFlux) return;
    const time = new Date().toLocaleTimeString();
    const entry = document.createElement('div');
    entry.textContent = `[${time}] ${msg}`;
    logFlux.appendChild(entry);
    logFlux.scrollTop = logFlux.scrollHeight;
  }

  calcOneFlux();
}

/* --- Simulator 3: 2D Gesture Robot Vehicle Arena --- */
function initRobotArenaSim() {
  const canvas = document.getElementById('robot-arena-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let width = (canvas.width = 500);
  let height = (canvas.height = 240);

  // Robot State
  let robot = {
    x: width / 2,
    y: height / 2,
    angle: 0,
    speed: 0,
    angularSpeed: 0,
    width: 38,
    height: 26,
    color: '#9d4edd'
  };

  let trails = [];
  const cmdVal = document.getElementById('robot-cmd-val');
  const btnClear = document.getElementById('btn-clear-arena');

  if (btnClear) {
    btnClear.addEventListener('click', () => {
      trails = [];
    });
  }

  // D-Pad and Keyboard Controls
  const keys = { forward: false, backward: false, left: false, right: false };

  function handleCommand(cmd) {
    if (cmdVal) cmdVal.textContent = cmd;
    if (cmd === 'FORWARD') { robot.speed = 2.2; robot.angularSpeed = 0; }
    else if (cmd === 'REVERSE') { robot.speed = -1.8; robot.angularSpeed = 0; }
    else if (cmd === 'PIVOT_LEFT') { robot.angularSpeed = -0.06; }
    else if (cmd === 'PIVOT_RIGHT') { robot.angularSpeed = 0.06; }
    else if (cmd === 'STOP') { robot.speed = 0; robot.angularSpeed = 0; }
  }

  // Bind D-Pad
  const btnUp = document.getElementById('dpad-up');
  const btnDown = document.getElementById('dpad-down');
  const btnLeft = document.getElementById('dpad-left');
  const btnRight = document.getElementById('dpad-right');
  const btnStop = document.getElementById('dpad-stop');

  const setupDpadHold = (el, cmd) => {
    if (!el) return;
    el.addEventListener('mousedown', () => handleCommand(cmd));
    el.addEventListener('mouseup', () => handleCommand('STOP'));
    el.addEventListener('touchstart', (e) => { e.preventDefault(); handleCommand(cmd); });
    el.addEventListener('touchend', (e) => { e.preventDefault(); handleCommand('STOP'); });
  };

  setupDpadHold(btnUp, 'FORWARD');
  setupDpadHold(btnDown, 'REVERSE');
  setupDpadHold(btnLeft, 'PIVOT_LEFT');
  setupDpadHold(btnRight, 'PIVOT_RIGHT');
  if (btnStop) btnStop.addEventListener('click', () => handleCommand('STOP'));

  // Keyboard binding
  window.addEventListener('keydown', (e) => {
    const k = e.key.toLowerCase();
    if (['w', 'arrowup'].includes(k)) handleCommand('FORWARD');
    if (['s', 'arrowdown'].includes(k)) handleCommand('REVERSE');
    if (['a', 'arrowleft'].includes(k)) handleCommand('PIVOT_LEFT');
    if (['d', 'arrowright'].includes(k)) handleCommand('PIVOT_RIGHT');
    if (k === ' ') handleCommand('STOP');
  });

  window.addEventListener('keyup', (e) => {
    const k = e.key.toLowerCase();
    if (['w', 's', 'a', 'd', 'arrowup', 'arrowdown', 'arrowleft', 'arrowright'].includes(k)) {
      handleCommand('STOP');
    }
  });

  function update() {
    robot.angle += robot.angularSpeed;
    robot.x += Math.cos(robot.angle) * robot.speed;
    robot.y += Math.sin(robot.angle) * robot.speed;

    // Arena boundary bounce
    if (robot.x < 20) robot.x = 20;
    if (robot.x > width - 20) robot.x = width - 20;
    if (robot.y < 20) robot.y = 20;
    if (robot.y > height - 20) robot.y = height - 20;

    // Record trail point
    if (robot.speed !== 0 || robot.angularSpeed !== 0) {
      trails.push({ x: robot.x, y: robot.y });
      if (trails.length > 300) trails.shift();
    }
  }

  function draw() {
    ctx.fillStyle = '#03050c';
    ctx.fillRect(0, 0, width, height);

    // Grid lines
    ctx.strokeStyle = '#0d1527';
    ctx.lineWidth = 1;
    for (let x = 0; x < width; x += 25) {
      ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, height); ctx.stroke();
    }
    for (let y = 0; y < height; y += 25) {
      ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(width, y); ctx.stroke();
    }

    // Draw tire trail
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

    // Draw 4WD Robotic Vehicle Chassis
    ctx.save();
    ctx.translate(robot.x, robot.y);
    ctx.rotate(robot.angle);

    // Chassis body
    ctx.fillStyle = '#0f172a';
    ctx.strokeStyle = '#9d4edd';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.roundRect(-robot.width / 2, -robot.height / 2, robot.width, robot.height, 4);
    ctx.fill();
    ctx.stroke();

    // 4 Wheels
    ctx.fillStyle = '#38bdf8';
    // Front Left & Right
    ctx.fillRect(robot.width / 2 - 10, -robot.height / 2 - 4, 8, 4);
    ctx.fillRect(robot.width / 2 - 10, robot.height / 2, 8, 4);
    // Rear Left & Right
    ctx.fillRect(-robot.width / 2 + 2, -robot.height / 2 - 4, 8, 4);
    ctx.fillRect(-robot.width / 2 + 2, robot.height / 2, 8, 4);

    // ESP32 Chip on top
    ctx.fillStyle = '#1e293b';
    ctx.fillRect(-8, -6, 16, 12);
    ctx.fillStyle = '#10b981';
    ctx.fillRect(2, -2, 4, 4); // LED status

    // Heading front arrow
    ctx.fillStyle = '#00f2fe';
    ctx.beginPath();
    ctx.moveTo(robot.width / 2 + 2, 0);
    ctx.lineTo(robot.width / 2 - 4, -4);
    ctx.lineTo(robot.width / 2 - 4, 4);
    ctx.closePath();
    ctx.fill();

    ctx.restore();
  }

  function loop() {
    update();
    draw();
    requestAnimationFrame(loop);
  }

  loop();
}

/* ==========================================================================
   7. RESUME MODAL & VIEWER
   ========================================================================== */
function initResumeModal() {
  const modal = document.getElementById('resume-modal');
  const btnOpenNav = document.getElementById('btn-open-resume');
  const btnOpenModal = document.getElementById('btn-modal-resume');
  const btnClose = document.getElementById('btn-close-resume');

  function openModal() {
    if (modal) {
      modal.classList.add('active');
      modal.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
    }
  }

  function closeModal() {
    if (modal) {
      modal.classList.remove('active');
      modal.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    }
  }

  if (btnOpenNav) btnOpenNav.addEventListener('click', openModal);
  if (btnOpenModal) btnOpenModal.addEventListener('click', openModal);
  if (btnClose) btnClose.addEventListener('click', closeModal);

  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeModal();
    });
  }

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal && modal.classList.contains('active')) {
      closeModal();
    }
  });
}

/* ==========================================================================
   8. CONTACT FEATURES & TOASTS
   ========================================================================== */
function initContactFeatures() {
  const btnCopyEmail = document.getElementById('btn-copy-email');
  const btnCopyPhone = document.getElementById('btn-copy-phone');
  const contactForm = document.getElementById('contact-form');
  const formStatus = document.getElementById('form-status');

  if (btnCopyEmail) {
    btnCopyEmail.addEventListener('click', () => {
      navigator.clipboard.writeText('piyushsonawane214@gmail.com').then(() => {
        showToast('Email address copied to clipboard!');
      });
    });
  }

  if (btnCopyPhone) {
    btnCopyPhone.addEventListener('click', () => {
      navigator.clipboard.writeText('7030883504').then(() => {
        showToast('Phone number (+91 7030883504) copied!');
      });
    });
  }

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const submitBtn = document.getElementById('btn-submit-message');
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Sending Message...';
      }

      setTimeout(() => {
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.innerHTML = '<span>Message Sent!</span> <i class="fa-solid fa-check"></i>';
        }
        if (formStatus) {
          formStatus.style.display = 'block';
          formStatus.style.color = '#34d399';
          formStatus.textContent = '✓ Thank you! Your message has been received. Piyush will reply promptly.';
        }
        contactForm.reset();
        showToast('Message sent successfully!');

        setTimeout(() => {
          if (submitBtn) {
            submitBtn.innerHTML = '<span>Send Message</span> <i class="fa-solid fa-paper-plane"></i>';
          }
        }, 4000);
      }, 1200);
    });
  }
}

/* Toast Helper */
function showToast(message) {
  const container = document.getElementById('toast-container');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `<i class="fa-solid fa-circle-check text-success"></i> <span>${message}</span>`;

  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(10px)';
    toast.style.transition = 'all 0.3s ease';
    setTimeout(() => {
      if (toast.parentNode) toast.parentNode.removeChild(toast);
    }, 300);
  }, 3200);
}
