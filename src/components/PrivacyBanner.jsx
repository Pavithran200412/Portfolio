import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiShield, FiX, FiSettings } from 'react-icons/fi';

const PrivacyBanner = () => {
  const [showBanner, setShowBanner] = useState(false);
  const [showSettings, setShowSettings] = useState(false);

  useEffect(() => {
    // Check if user has already given consent
    const hasConsent = localStorage.getItem('privacy_consent');
    if (!hasConsent) {
      // Show banner after a short delay
      setTimeout(() => setShowBanner(true), 2000);
    }
  }, []);

  const handleAcceptAll = () => {
    localStorage.setItem('privacy_consent', 'accepted');
    localStorage.setItem('privacy_settings', JSON.stringify({
      analytics: true,
      cookies: true,
      personalizedContent: true,
      timestamp: new Date().toISOString()
    }));
    setShowBanner(false);
  };

  const handleRejectAll = () => {
    localStorage.setItem('privacy_consent', 'rejected');
    localStorage.setItem('privacy_settings', JSON.stringify({
      analytics: false,
      cookies: false,
      personalizedContent: false,
      timestamp: new Date().toISOString()
    }));
    setShowBanner(false);
  };

  const handleCustomSettings = () => {
    setShowSettings(true);
  };

  const handleSaveCustomSettings = () => {
    localStorage.setItem('privacy_consent', 'custom');
    localStorage.setItem('privacy_settings', JSON.stringify({
      analytics: false,
      cookies: true,
      personalizedContent: false,
      timestamp: new Date().toISOString()
    }));
    setShowSettings(false);
    setShowBanner(false);
  };

  return (
    <AnimatePresence>
      {showBanner && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          className="fixed bottom-0 left-0 right-0 z-50 bg-dark-800/95 backdrop-blur-xl border-t border-white/10 p-6"
        >
          <div className="max-w-6xl mx-auto">
            <div className="flex items-start justify-between">
              <div className="flex-1 mr-6">
                <div className="flex items-center mb-3">
                  <FiShield className="text-primary-400 mr-2" size={24} />
                  <h3 className="text-lg font-bold text-white">Privacy & Cookies</h3>
                </div>
                <p className="text-gray-300 text-sm leading-relaxed mb-4">
                  We use cookies to enhance your experience and analyze site usage. 
                  Your privacy is important to us, and we're committed to protecting your data.
                </p>
                <div className="flex flex-wrap gap-3">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleAcceptAll}
                    className="bg-gradient-to-r from-primary-600 to-secondary-600 text-white px-6 py-2 rounded-lg font-medium hover:from-primary-700 hover:to-secondary-700 transition-all duration-200"
                  >
                    Accept All
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleRejectAll}
                    className="bg-gray-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-gray-700 transition-all duration-200"
                  >
                    Reject All
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleCustomSettings}
                    className="border border-white/20 text-white px-6 py-2 rounded-lg font-medium hover:bg-white/10 transition-all duration-200 flex items-center"
                  >
                    <FiSettings className="mr-2" size={16} />
                    Customize
                  </motion.button>
                </div>
              </div>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setShowBanner(false)}
                className="text-gray-400 hover:text-white transition-colors p-2"
              >
                <FiX size={20} />
              </motion.button>
            </div>
          </div>
        </motion.div>
      )}

      {/* Custom Settings Modal */}
      {showSettings && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setShowSettings(false)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-dark-800 rounded-2xl max-w-md w-full border border-white/10"
          >
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-white">Privacy Settings</h2>
                <button
                  onClick={() => setShowSettings(false)}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <FiX size={20} />
                </button>
              </div>

              <div className="space-y-4 mb-6">
                <div className="flex items-center justify-between">
                  <span className="text-white">Essential Cookies</span>
                  <span className="text-green-400 text-sm">Always On</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-white">Analytics</span>
                  <span className="text-gray-400 text-sm">Disabled</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-white">Marketing</span>
                  <span className="text-gray-400 text-sm">Disabled</span>
                </div>
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleSaveCustomSettings}
                className="w-full bg-gradient-to-r from-primary-600 to-secondary-600 text-white py-2 rounded-lg hover:from-primary-700 hover:to-secondary-700 transition-all duration-200"
              >
                Save Settings
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default PrivacyBanner;