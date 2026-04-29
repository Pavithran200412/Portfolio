import { useEffect } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import Navigation from './components/Navigation';
import ParticleBackground from './components/ParticleBackground';
import BackToTop from './components/BackToTop';
import ScrollProgress from './components/ScrollProgress';
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

    // Performance optimizations
    const handleVisibilityChange = () => {
      if (document.hidden) {
        // Pause animations when tab is not visible
        document.body.style.animationPlayState = 'paused';
      } else {
        document.body.style.animationPlayState = 'running';
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  return (
    <ThemeProvider>
      <div className="relative min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white overflow-x-hidden theme-transition">
        <ScrollProgress />
        <ParticleBackground />
        <Navigation />
        <BackToTop />
        
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