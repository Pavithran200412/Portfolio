import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiEye } from 'react-icons/fi';

const ViewCounter = () => {
  const [views, setViews] = useState(null);

  useEffect(() => {
    const countViews = async () => {
      try {
        // Use a namespace unique to your portfolio
        const namespace = 'pavithran-portfolio';
        const key = 'page-views';
        
        // Try to use countapi via a CORS-friendly approach
        const response = await fetch(`https://api.countapi.xyz/hit/${namespace}/${key}`);
        if (response.ok) {
          const data = await response.json();
          setViews(data.value);
          return;
        }
      } catch (e) {
        // Fallback to localStorage counter
      }
      
      // localStorage fallback
      const stored = localStorage.getItem('portfolio_views');
      const currentViews = stored ? parseInt(stored, 10) + 1 : 1;
      localStorage.setItem('portfolio_views', currentViews.toString());
      setViews(currentViews);
    };

    countViews();
  }, []);

  if (views === null) return null;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 1.5, duration: 0.5 }}
      className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-full backdrop-blur-sm"
    >
      <FiEye className="text-primary-400" size={16} />
      <span className="text-sm font-medium text-gray-300">
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
        >
          {views.toLocaleString()}
        </motion.span>
        {' '}profile views
      </span>
    </motion.div>
  );
};

export default ViewCounter;
