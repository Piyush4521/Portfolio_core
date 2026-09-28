# Piyush Sonawane | Engineering Portfolio

[![React 19](https://img.shields.io/badge/React-19.0.0-61dafb?style=flat-square&logo=react&logoColor=white)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-6.0-646cff?style=flat-square&logo=vite&logoColor=white)](https://vitejs.dev/)
[![ESP32](https://img.shields.io/badge/Platform-ESP32%20%7C%20FreeRTOS-e7352c?style=flat-square&logo=espressif&logoColor=white)](https://www.espressif.com/)
[![ROS2](https://img.shields.io/badge/Robotics-ROS2%20Humble-22314E?style=flat-square&logo=ros&logoColor=white)](https://www.ros.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=flat-square)](https://opensource.org/licenses/MIT)
[![Custom Domain](https://img.shields.io/badge/Domain-piyushsonawane.dev-38bdf8?style=flat-square)](https://piyushsonawane.dev/)

A production-grade personal engineering portfolio and interactive IoT simulator showcase built with **React 19**, **Vite**, and **Vanilla CSS**. Designed following strict Dieter Rams and modern systems engineering aesthetics: crisp 1px borders, slate/obsidian palette, subtle CAD grid canvas, interactive client-side hardware simulators, zero vibe-coded tropes, and verified real-world academic data.

---

## Technical Highlights

- **Interactive Embedded & IoT Lab**: Client-side simulators replicating real hardware telemetry:
  - **OneGuard Simulator**: Injects MQ-6 gas ppm spikes, simulates load cell weight reduction, and triggers servo emergency shutoff valves.
  - **OneFlux Simulator**: Live AC mains energy calculation (voltage, current, power factor, power, cost/hr, CO2 rate) with an autonomous overcurrent breaker trip.
  - **Gesture Robotics Arena**: 2D teleoperation simulation driven by orientation controls and ROS2 Twist command velocity packets.
- **Hardware Workstation & Serial Monitor**: Real-time simulated 115200 baud ESP32 serial stream with multi-file firmware viewer (C++, Arduino, Python ROS2).
- **Engineering Design System**: Built completely from scratch without bloated CSS utility frameworks. Enforces rectangular 4px/6px geometry, high-contrast dark mode slate (`#07090e`, `#0f1420`), precision cyan (`#38bdf8`), deep cobalt (`#2563eb`), and telemetry emerald (`#10b981`).
- **Production Compliance**: Custom SVG IC-chip monogram favicon, CNAME configuration for `piyushsonawane.dev`, full Privacy Policy and Terms & Conditions legal dialogs, and embedded PDF resume viewer.

---

## System Architecture

```text
piyush-portfolio/
├── public/
│   ├── CNAME                          # Custom domain mapping (piyushsonawane.dev)
│   ├── favicon.svg                    # Custom geometric IC chip monogram
│   ├── piyush_portrait_1.png          # Executive cutout portrait (Hero)
│   ├── piyush_portrait_2.png          # Editorial blazer portrait (About)
│   └── piyush_sonawane_resume_Iot.pdf # Complete engineering resume
├── src/
│   ├── components/
│   │   ├── AboutEditorial.jsx         # Clean cutout portrait with shoulder feathering & metrics
│   │   ├── Contact.jsx                # Direct inquiry form with copy-to-clipboard telemetry
│   │   ├── Experience.jsx             # MCMH internship, 8.43 SGPA academic timeline, hackathons
│   │   ├── Footer.jsx                 # Engineering copyright, domain status & legal dialog triggers
│   │   ├── Hero.jsx                   # Dual-column hero with immediate portrait display
│   │   ├── IoTLab.jsx                 # Interactive OneGuard, OneFlux & Gesture simulators
│   │   ├── LegalModals.jsx            # Privacy Policy & Terms of Use dialogs
│   │   ├── Navbar.jsx                 # Scrollspy navigation and resume quick-action
│   │   ├── Projects.jsx               # Hardware flowcharts, sensor chips & project architectures
│   │   ├── ResumeModal.jsx            # In-app PDF resume reader & download
│   │   ├── Skills.jsx                 # 6-category engineering skill inventory
│   │   ├── TechnicalGridBackground.jsx# Subtle CAD-style engineering canvas dot grid
│   │   ├── Toast.jsx                  # Non-intrusive status toast system
│   │   └── Workstation.jsx            # Interactive 3D desk with live serial terminal
│   ├── App.jsx                        # Root application layout and theme provider
│   ├── index.css                      # Complete custom engineering design system
│   └── main.jsx                       # React 19 entry point
├── vercel.json                        # Vercel deployment & rewrite configuration
└── vite.config.js                     # Vite build configuration
```

---

## Featured Engineering Projects

### 1. OneGuard - Smart LPG Safety & Automated Weight Telemetry
- **Microcontroller**: ESP32-WROOM-32
- **Sensors & Actuators**: MQ-6 Gas Sensor, HX711 24-bit ADC + Load Cells, SG90 Servo Valve, Active Buzzer
- **Cloud Stack**: Google Firebase Realtime Database (RTDB), MQTT
- **Description**: Real-time gas leakage detection (<450 ppm threshold) triggering immediate physical valve cutoff via servo mechanical arm, concurrent weight measurement for cylinder depletion tracking, and instantaneous cloud alerts.

### 2. OneFlux - Smart Energy Monitoring & Grid Safety Breaker
- **Microcontroller**: ESP32 Dual Core
- **Hardware Integration**: PZEM-004T AC Energy Sensor, High-Voltage Safety Relay, I2C OLED Display
- **Protocol**: Hardware UART2 Serial Interface, FreeRTOS Multitasking
- **Description**: Precision voltage (80-260V), current (0-100A), active power, and frequency sampling. Features autonomous hardware interlock tripping if current exceeds 22A or voltage falls outside safe operating ranges.

### 3. Gesture-Controlled Robotic Vehicle & ROS2 Teleoperation
- **Microcontroller**: Arduino Nano / ESP32
- **Instrumentation**: MPU6050 6-DOF IMU (Accelerometer + Gyroscope), HC-05 Bluetooth transceiver, L298N H-Bridge Motor Driver
- **Robotics Integration**: ROS2 Humble node translating IMU roll/pitch packets into `/cmd_vel` Twist messages for omnidirectional locomotion.

---

## Academic & Professional Background

- **Education**: Bachelor of Engineering (B.E.) in Electronics & Telecommunication (ENTC)
  - **Institution**: N. B. Navale Sinhgad College Of Engineering, Solapur
  - **SGPA**: **8.43** (Cumulative till Semester VI)
- **Internship**: Software Development Engineer Intern at **MCMH** (June 2026 - Sept 2026)
  - Full-lifecycle application development, Git-based agile workflows, backend integration, and enterprise software engineering.
- **Accolades**: 1x Winner & 2x Top 4 Finisher in national-level IoT and embedded robotics hackathons.

---

## Local Development

### Prerequisites
- Node.js (v18.0.0 or higher)
- npm (v9.0.0 or higher)

### Setup & Run
```bash
# Clone the repository
git clone https://github.com/Piyush4521/Portfolio_core.git

# Navigate to project directory
cd Portfolio_core

# Install dependencies
npm install

# Start local development server (http://localhost:3000)
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

---

## Deployment

### Deploy to Vercel

This repository includes a pre-configured [`vercel.json`](./vercel.json) ready for 1-click deployment.

1. Go to [Vercel Dashboard](https://vercel.com/new).
2. Select **Import Git Repository** and choose `Piyush4521/Portfolio_core`.
3. Framework Preset will be automatically detected as **Vite**.
4. Click **Deploy**.

#### Custom Domain Mapping
To connect `piyushsonawane.dev`:
1. In your Vercel Project Settings, navigate to **Domains**.
2. Add `piyushsonawane.dev` and `www.piyushsonawane.dev`.
3. In your DNS registrar (GoDaddy, Namecheap, Cloudflare, etc.), configure:
   - **A Record**: `@` points to `76.76.21.21`
   - **CNAME Record**: `www` points to `cname.vercel-dns.com`

---

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## Contact & Connect

- **Engineer**: Piyush Sonawane
- **Email**: [piyushsonawane214@gmail.com](mailto:piyushsonawane214@gmail.com)
- **LinkedIn**: [linkedin.com/in/piyushsonawane](https://linkedin.com/in/piyushsonawane)
- **GitHub**: [github.com/Piyush4521](https://github.com/Piyush4521)
- **Location**: Pune, Maharashtra, India
