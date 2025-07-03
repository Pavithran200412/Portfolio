import { useEffect } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import Navigation from './components/Navigation';
import ParticleBackground from './components/ParticleBackground';
import FloatingElements from './components/FloatingElements';
import PrivacyBanner from './components/PrivacyBanner';
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

    // Preload critical resources
    const preloadImages = [
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSH5Cf_LlgRH2M7uVV474n6mMbbW4DfiS2NHQ&s',
      'https://acropolium.com/img/articles/hospital-management-software/img01.jpg',
      'https://images.pexels.com/photos/267350/pexels-photo-267350.jpeg?auto=compress&cs=tinysrgb&w=800'
    ];

    preloadImages.forEach(src => {
      const img = new Image();
      img.src = src;
    });

    // Security headers (for reference - these should be set by the server)
    const meta = document.createElement('meta');
    meta.httpEquiv = 'Content-Security-Policy';
    meta.content = "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data: https: blob:; connect-src 'self' https:;";
    document.head.appendChild(meta);

    // Disable right-click context menu in production
    const handleContextMenu = (e) => {
      if (process.env.NODE_ENV === 'production') {
        e.preventDefault();
      }
    };

    // Disable F12 and other developer tools shortcuts in production
    const handleKeyDown = (e) => {
      if (process.env.NODE_ENV === 'production') {
        if (e.key === 'F12' || 
            (e.ctrlKey && e.shiftKey && e.key === 'I') ||
            (e.ctrlKey && e.shiftKey && e.key === 'C') ||
            (e.ctrlKey && e.key === 'U')) {
          e.preventDefault();
        }
      }
    };

    document.addEventListener('contextmenu', handleContextMenu);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('contextmenu', handleContextMenu);
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  return (
    <ThemeProvider>
      <div className="relative min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white overflow-x-hidden theme-transition">
        <ScrollProgress />
        <ParticleBackground />
        <FloatingElements />
        <Navigation />
        <PrivacyBanner />
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