import { motion } from 'framer-motion';
import { useState } from 'react';

/**
 * Apple-style Frosted Lift Card
 * Subtle specular backlight, hairline border illumination, and calm micro-elevation
 */
const GlowingCard = ({ children, className = '', glowColor = 'primary', onClick }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className={`relative group ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
      whileHover={{ y: -3 }}
      whileTap={{ scale: 0.99 }}
      transition={{ type: 'spring', stiffness: 380, damping: 26 }}
    >
      {/* Subtle Apple specular ambient backlight */}
      <motion.div
        className="absolute -inset-[1px] rounded-2xl bg-gradient-to-b from-white/15 to-primary-500/10 blur-sm pointer-events-none transition-opacity duration-500"
        animate={{
          opacity: isHovered ? 0.35 : 0,
        }}
      />

      {/* Frosted Titanium Card content */}
      <div className="relative h-full bg-[#161617]/90 group-hover:bg-[#1c1c1e]/95 transition-all duration-300 backdrop-blur-2xl rounded-2xl border border-white/[0.08] group-hover:border-white/[0.18] overflow-hidden shadow-lg shadow-black/50">
        {children}
      </div>
    </motion.div>
  );
};

export default GlowingCard;