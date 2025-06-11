import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiSettings, FiX, FiSave, FiRefreshCw, FiEye, FiEdit } from 'react-icons/fi';
import { useContent } from '../context/ContentContext';

const AdminPanel = () => {
  const { isEditing, setIsEditing, resetToDefault } = useContent();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Floating Admin Button */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-50 p-4 bg-gradient-to-r from-primary-600 to-secondary-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
      >
        <FiSettings size={24} />
      </motion.button>

      {/* Admin Panel Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setIsOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-dark-800/90 backdrop-blur-xl rounded-2xl p-8 max-w-md w-full border border-white/10"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-white">Admin Panel</h2>
                <motion.button
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setIsOpen(false)}
                  className="p-2 text-gray-400 hover:text-white transition-colors"
                >
                  <FiX size={20} />
                </motion.button>
              </div>

              <div className="space-y-4">
                {/* Edit Mode Toggle */}
                <div className="flex items-center justify-between p-4 bg-white/10 rounded-lg">
                  <div>
                    <h3 className="text-white font-medium">Edit Mode</h3>
                    <p className="text-gray-400 text-sm">Enable editing for all content</p>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setIsEditing(!isEditing)}
                    className={`flex items-center px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                      isEditing
                        ? 'bg-green-500 text-white'
                        : 'bg-gray-600 text-gray-300'
                    }`}
                  >
                    {isEditing ? <FiEdit className="mr-2" /> : <FiEye className="mr-2" />}
                    {isEditing ? 'Editing' : 'Viewing'}
                  </motion.button>
                </div>

                {/* Reset Content */}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    if (confirm('Are you sure you want to reset all content to default?')) {
                      resetToDefault();
                    }
                  }}
                  className="w-full flex items-center justify-center px-4 py-3 bg-orange-500 hover:bg-orange-600 text-white rounded-lg font-medium transition-colors"
                >
                  <FiRefreshCw className="mr-2" />
                  Reset to Default
                </motion.button>

                {/* Instructions */}
                <div className="p-4 bg-blue-500/20 border border-blue-400/50 rounded-lg">
                  <h4 className="text-blue-400 font-medium mb-2">How to Edit:</h4>
                  <ul className="text-blue-300 text-sm space-y-1">
                    <li>• Enable edit mode above</li>
                    <li>• Hover over any text to see edit button</li>
                    <li>• Click edit button to modify content</li>
                    <li>• Changes are saved automatically</li>
                  </ul>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default AdminPanel;