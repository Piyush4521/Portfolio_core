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
  const [resumeOpen, setResumeOpen] = useState(false);
  const [legalModal, setLegalModal] = useState(null); // 'privacy' | 'terms' | null
  const [activeSim, setActiveSim] = useState('oneguard');
  const [toasts, setToasts] = useState([]);

  useEffect(() => {
    document.body.className = `theme-${theme}`;
  }, [theme]);

  const showToast = (message) => {
    const id = Date.now() + Math.random();
    setToasts((prev) => [...prev, { id, message }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3200);
  };

  const handleSelectSimulator = (simKey) => {
    setActiveSim(simKey);
    const el = document.getElementById('simulators');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="portfolio-app">
      <TechnicalGridBackground />

      <Navbar onOpenResume={() => setResumeOpen(true)} />

      <main>
        <Hero currentTheme={theme} onThemeChange={(t) => setTheme(t)} />
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
