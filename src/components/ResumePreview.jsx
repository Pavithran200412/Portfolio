import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX, FiDownload, FiMaximize2 } from 'react-icons/fi';

const ResumePreview = ({ isOpen, onClose }) => {
  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = '/Resume.pdf';
    link.download = 'Pavithran_Resume.pdf';
    link.click();
  };

  const handleOpenInTab = () => {
    window.open('/Resume.pdf', '_blank');
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/85 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.85, opacity: 0, y: 40 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.85, opacity: 0, y: 40 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-gray-900 border border-white/10 rounded-2xl w-full max-w-4xl h-[85vh] flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-gray-800/50">
              <h3 className="text-lg font-semibold text-white">Resume Preview</h3>
              <div className="flex items-center gap-3">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleOpenInTab}
                  className="flex items-center gap-2 px-4 py-2 text-sm text-gray-300 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg transition-all duration-200"
                >
                  <FiMaximize2 size={14} />
                  Open in Tab
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleDownload}
                  className="flex items-center gap-2 px-4 py-2 text-sm text-white bg-gradient-to-r from-primary-600 to-secondary-600 hover:from-primary-700 hover:to-secondary-700 rounded-lg transition-all duration-200"
                >
                  <FiDownload size={14} />
                  Download
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={onClose}
                  className="p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-full transition-all duration-200"
                >
                  <FiX size={20} />
                </motion.button>
              </div>
            </div>

            {/* PDF Viewer */}
            <div className="flex-1 bg-gray-700">
              <iframe
                src="/Resume.pdf"
                title="Resume Preview"
                className="w-full h-full border-0"
                style={{ minHeight: '100%' }}
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ResumePreview;
