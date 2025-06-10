import { motion } from 'framer-motion';
import { useState } from 'react';

const GlowingCard = ({ children, className = '', glowColor = 'primary' }) => {
  const [isHovered, setIsHovered] = useState(false);

  const glowColors = {
    primary: 'shadow-primary-500/50',
    secondary: 'shadow-secondary-500/50',
    accent: 'shadow-accent-500/50',
    success: 'shadow-success-500/50',
  };

  return (
    <motion.div
      className={`relative group ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ scale: 1.02, y: -5 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
    >
      {/* Glow effect */}
      <motion.div
        className={`absolute -inset-0.5 bg-gradient-to-r from-${glowColor}-600 to-${glowColor === 'primary' ? 'secondary' : 'primary'}-600 rounded-xl blur opacity-0 group-hover:opacity-75 transition duration-1000`}
        animate={{
          opacity: isHovered ? 0.75 : 0,
        }}
      />
      
      {/* Card content */}
      <div className="relative bg-white/10 dark:bg-dark-800/50 backdrop-blur-xl rounded-xl border border-white/20 dark:border-dark-700/50 overflow-hidden">
        {children}
      </div>
    </motion.div>
  );
};

export default GlowingCard;