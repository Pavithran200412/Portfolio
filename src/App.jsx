import { useEffect } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import Navigation from './components/Navigation';
import ParticleBackground from './components/ParticleBackground';
import FloatingElements from './components/FloatingElements';
import HeroSection from './sections/HeroSection';
import AboutSection from './sections/AboutSection';
import SkillsSection from './sections/SkillsSection';
import ProjectsSection from './sections/ProjectsSection';
import ContactSection from './sections/ContactSection';
import './index.css';

function App() {
  useEffect(() => {
    // Smooth scrolling for the entire page
    document.documentElement.style.scrollBehavior = 'smooth';
  }, []);

  return (
    <ThemeProvider>
      <div className="relative min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900 dark:from-dark-900 dark:via-purple-900 dark:to-violet-900 text-white overflow-x-hidden">
        <ParticleBackground />
        <FloatingElements />
        <Navigation />
        
        <main>
          <HeroSection />
          <AboutSection />
          <SkillsSection />
          <ProjectsSection />
          <ContactSection />
        </main>
      </div>
    </ThemeProvider>
  );
}

export default App;