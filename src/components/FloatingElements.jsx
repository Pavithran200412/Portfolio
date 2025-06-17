import { motion } from 'framer-motion';
import { FiCode, FiDatabase, FiServer, FiTool, FiZap, FiCpu } from 'react-icons/fi';

const FloatingElements = () => {
  const elements = [
    { Icon: FiCode, color: 'text-blue-400', delay: 0, x: '10%', y: '20%' },
    { Icon: FiDatabase, color: 'text-green-400', delay: 1, x: '80%', y: '15%' },
    { Icon: FiServer, color: 'text-purple-400', delay: 2, x: '15%', y: '70%' },
    { Icon: FiTool, color: 'text-orange-400', delay: 3, x: '85%', y: '75%' },
    { Icon: FiZap, color: 'text-yellow-400', delay: 4, x: '5%', y: '50%' },
    { Icon: FiCpu, color: 'text-pink-400', delay: 5, x: '90%', y: '45%' },
  ];

  return (
    <div className="fixed inset-0 pointer-events-none z-10 overflow-hidden">
      {elements.map(({ Icon, color, delay, x, y }, index) => (
        <motion.div
          key={index}
          className={`absolute ${color} opacity-20 hover:opacity-40 transition-opacity duration-300`}
          style={{ left: x, top: y }}
          initial={{ opacity: 0, scale: 0, rotate: 0 }}
          animate={{ 
            opacity: [0.2, 0.4, 0.2],
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360],
            y: [0, -20, 0]
          }}
          transition={{
            duration: 8,
            delay,
            repeat: Infinity,
            repeatType: 'reverse',
            ease: 'easeInOut'
          }}
          whileHover={{
            scale: 1.5,
            opacity: 0.6,
            transition: { duration: 0.3 }
          }}
        >
          <Icon size={28} />
        </motion.div>
      ))}
      
      {/* Interactive particles that follow mouse */}
      <motion.div
        className="absolute w-2 h-2 bg-primary-400 rounded-full opacity-60"
        animate={{
          x: [0, 100, 0],
          y: [0, -50, 0],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: 'easeInOut'
        }}
        style={{ left: '20%', top: '30%' }}
      />
      
      <motion.div
        className="absolute w-3 h-3 bg-secondary-400 rounded-full opacity-50"
        animate={{
          x: [0, -80, 0],
          y: [0, 60, 0],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 2
        }}
        style={{ right: '25%', top: '60%' }}
      />
    </div>
  );
};

export default FloatingElements;