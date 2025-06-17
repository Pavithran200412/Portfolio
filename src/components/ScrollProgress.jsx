import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const ScrollProgress = () => {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const updateScrollProgress = () => {
      const scrollPx = document.documentElement.scrollTop;
      const winHeightPx = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolled = scrollPx / winHeightPx;
      setScrollProgress(scrolled);
    };

    window.addEventListener('scroll', updateScrollProgress);
    return () => window.removeEventListener('scroll', updateScrollProgress);
  }, []);

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary-600 via-secondary-600 to-accent-600 z-50 origin-left"
      style={{
        scaleX: scrollProgress,
      }}
      initial={{ scaleX: 0 }}
      animate={{ scaleX: scrollProgress }}
      transition={{ duration: 0.1, ease: 'easeOut' }}
    />
  );
};

export default ScrollProgress;