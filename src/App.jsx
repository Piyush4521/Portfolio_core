import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import TechnicalGridBackground from './components/TechnicalGridBackground';
import Hero from './components/Hero';
import AboutEditorial from './components/AboutEditorial';
import Projects from './components/Projects';
import IoTLab from './components/IoTLab';
import Skills from './components/Skills';
import Experience from './components/Experience';
import Contact from './components/Contact';
import Footer from './components/Footer';
import ResumeModal from './components/ResumeModal';
import LegalModal from './components/LegalModals';
import Toast from './components/Toast';

export default function App() {
  const [theme, setTheme] = useState('cyan');
  const [colorMode, setColorMode] = useState(() => {
    try {
      const saved = localStorage.getItem('portfolio-color-mode');
      if (saved === 'light' || saved === 'dark') return saved;
      return window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches
        ? 'light'
        : 'dark';
    } catch {
      return 'dark';
    }
  });
  const [resumeOpen, setResumeOpen] = useState(false);
  const [legalModal, setLegalModal] = useState(null); // 'privacy' | 'terms' | null
  const [activeSim, setActiveSim] = useState('oneguard');
  const [toasts, setToasts] = useState([]);

  useEffect(() => {
    try {
      localStorage.setItem('portfolio-color-mode', colorMode);
    } catch {
      // ignore
    }
    document.documentElement.setAttribute('data-theme', colorMode);
    document.documentElement.setAttribute('data-accent', theme);
    document.documentElement.className = `theme-${theme} mode-${colorMode}`;
    document.body.className = `theme-${theme} ${colorMode}-mode`;
  }, [colorMode, theme]);

  const showToast = (message) => {
    const id = Date.now() + Math.random();
    setToasts((prev) => [...prev, { id, message }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3200);
  };

  const toggleColorMode = () => {
    setColorMode((prev) => {
      const next = prev === 'dark' ? 'light' : 'dark';
      showToast(next === 'light' ? 'Switched to Crisp Light Mode ☀️' : 'Switched to Technical Dark Mode 🌙');
      return next;
    });
  };

  const handleSelectSimulator = (simKey) => {
    setActiveSim(simKey);
    const el = document.getElementById('simulators');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="portfolio-app">
      <TechnicalGridBackground colorMode={colorMode} />

      <Navbar
        onOpenResume={() => setResumeOpen(true)}
        colorMode={colorMode}
        onToggleColorMode={toggleColorMode}
      />

      <main>
        <Hero
          currentTheme={theme}
          onThemeChange={(t) => setTheme(t)}
          colorMode={colorMode}
          onToggleColorMode={toggleColorMode}
        />
        <AboutEditorial onShowToast={showToast} />
        <Projects onSelectSimulator={handleSelectSimulator} />
        <IoTLab
          activeSim={activeSim}
          setActiveSim={setActiveSim}
          onShowToast={showToast}
        />
        <Skills />
        <Experience />
        <Contact
          onOpenResume={() => setResumeOpen(true)}
          onShowToast={showToast}
        />
      </main>

      <Footer
        onOpenPrivacy={() => setLegalModal('privacy')}
        onOpenTerms={() => setLegalModal('terms')}
      />

      <ResumeModal isOpen={resumeOpen} onClose={() => setResumeOpen(false)} />
      <LegalModal
        type={legalModal}
        isOpen={Boolean(legalModal)}
        onClose={() => setLegalModal(null)}
      />
      <Toast toasts={toasts} />
    </div>
  );
}
