import { motion } from 'framer-motion';
import { FiCode, FiDatabase, FiServer, FiTool, FiZap, FiCpu } from 'react-icons/fi';

const FloatingElements = () => {
  const elements = [
    { Icon: FiCode, color: 'text-blue-400', delay: 0, x: '10%', y: '20%' },
    { Icon: FiDatabase, color: 'text-green-400', delay: 0.5, x: '80%', y: '15%' },
    { Icon: FiServer, color: 'text-purple-400', delay: 1, x: '15%', y: '70%' },
    { Icon: FiTool, color: 'text-orange-400', delay: 1.5, x: '85%', y: '75%' },
    { Icon: FiZap, color: 'text-yellow-400', delay: 2, x: '50%', y: '10%' },
    { Icon: FiCpu, color: 'text-pink-400', delay: 2.5, x: '90%', y: '45%' },
  ];

  return (
    <div className="fixed inset-0 pointer-events-none z-10">
      {elements.map(({ Icon, color, delay, x, y }, index) => (
        <motion.div
          key={index}
          className={`absolute ${color} opacity-20`}
          style={{ left: x, top: y }}
          initial={{ opacity: 0, scale: 0, rotate: -180 }}
          animate={{ 
            opacity: [0.2, 0.6, 0.2], 
            scale: [1, 1.2, 1], 
            rotate: [0, 360],
            y: [0, -20, 0]
          }}
          transition={{
            duration: 4,
            delay,
            repeat: Infinity,
            repeatType: 'reverse',
          }}
        >
          <Icon size={32} />
        </motion.div>
      ))}
    </div>
  );
};

export default FloatingElements;