import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { PillBase } from '@/components/ui/3d-adaptive-navigation-bar';

const Navigation = () => {
  const [activeSection, setActiveSection] = useState('home');

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'skills', label: 'Skills' },
    { id: 'projects', label: 'Projects' },
    { id: 'github', label: 'GitHub' },
    { id: 'contact', label: 'Contact' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const sections = navItems.map(item => document.getElementById(item.id));
      const scrollPosition = window.scrollY + 100;

      sections.forEach((section, index) => {
        if (section) {
          const { offsetTop, offsetHeight } = section;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(navItems[index].id);
          }
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="fixed top-3 sm:top-4 left-0 right-0 z-50 flex items-center justify-between px-3 sm:px-8 pointer-events-none"
    >
      {/* Brand / Logo on top-left */}
      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="pointer-events-auto shrink-0"
      >
        <button
          onClick={() => scrollToSection('home')}
          className="text-xl sm:text-2xl font-extrabold bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 bg-clip-text text-transparent drop-shadow-sm px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-xl backdrop-blur-md bg-white/20 dark:bg-black/20 border border-white/30 dark:border-white/10"
        >
          SP
        </button>
      </motion.div>

      {/* Centered 3D Adaptive Navigation Pill */}
      <div className="pointer-events-auto mx-auto max-w-full">
        <PillBase
          items={navItems}
          activeSection={activeSection}
          onSectionClick={scrollToSection}
        />
      </div>

      {/* Spacer to balance header layout on desktop */}
      <div className="hidden sm:block w-12 pointer-events-none" />
    </motion.header>
  );
};

export default Navigation;