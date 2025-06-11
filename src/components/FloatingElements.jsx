import { motion } from 'framer-motion';
import { FiCode, FiDatabase, FiServer, FiTool } from 'react-icons/fi';

const FloatingElements = () => {
  const elements = [
    { Icon: FiCode, color: 'text-blue-400', delay: 0, x: '10%', y: '20%' },
    { Icon: FiDatabase, color: 'text-green-400', delay: 1, x: '80%', y: '15%' },
    { Icon: FiServer, color: 'text-purple-400', delay: 2, x: '15%', y: '70%' },
    { Icon: FiTool, color: 'text-orange-400', delay: 3, x: '85%', y: '75%' },
  ];

  return (
    <div className="fixed inset-0 pointer-events-none z-10">
      {elements.map(({ Icon, color, delay, x, y }, index) => (
        <motion.div
          key={index}
          className={`absolute ${color} opacity-15`} // Reduced opacity
          style={{ left: x, top: y }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ 
            opacity: [0.15, 0.3, 0.15], // Reduced opacity values
            scale: [1, 1.1, 1], // Reduced scale change
            y: [0, -10, 0] // Reduced movement
          }}
          transition={{
            duration: 6, // Increased duration for smoother animation
            delay,
            repeat: Infinity,
            repeatType: 'reverse',
            ease: 'easeInOut'
          }}
        >
          <Icon size={24} /> {/* Reduced size */}
        </motion.div>
      ))}
    </div>
  );
};

export default FloatingElements;