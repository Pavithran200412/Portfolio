import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiShield, FiX, FiSettings, FiInfo } from 'react-icons/fi';
import { privacyManager } from '../utils/privacy';

const PrivacyBanner = () => {
  const [showBanner, setShowBanner] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [settings, setSettings] = useState(privacyManager.settings);

  useEffect(() => {
    // Check if user has already given consent
    const consentStatus = privacyManager.getConsentStatus();
    if (!consentStatus.hasConsent) {
      setShowBanner(true);
    }
  }, []);

  const handleAcceptAll = () => {
    const newSettings = {
      analytics: true,
      cookies: true,
      personalizedContent: true,
      thirdPartyIntegrations: true,
      dataRetention: '90days'
    };
    
    privacyManager.saveSettings(newSettings);
    setSettings(newSettings);
    setShowBanner(false);
  };

  const handleRejectAll = () => {
    const newSettings = {
      analytics: false,
      cookies: false,
      personalizedContent: false,
      thirdPartyIntegrations: false,
      dataRetention: '30days'
    };
    
    privacyManager.saveSettings(newSettings);
    setSettings(newSettings);
    setShowBanner(false);
  };

  const handleCustomSettings = () => {
    setShowSettings(true);
  };

  const handleSaveCustomSettings = () => {
    privacyManager.saveSettings(settings);
    setShowSettings(false);
    setShowBanner(false);
  };

  const handleSettingChange = (key, value) => {
    setSettings(prev => ({
      ...prev,
      [key]: value
    }));
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
                  We use cookies and similar technologies to enhance your experience, analyze site usage, 
                  and provide personalized content. Your privacy is important to us, and we're committed 
                  to protecting your personal data in accordance with GDPR and other privacy regulations.
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
            className="bg-dark-800 rounded-2xl max-w-2xl w-full max-h-[80vh] overflow-y-auto border border-white/10"
          >
            <div className="p-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-white flex items-center">
                  <FiSettings className="mr-3 text-primary-400" />
                  Privacy Settings
                </h2>
                <button
                  onClick={() => setShowSettings(false)}
                  className="text-gray-400 hover:text-white transition-colors p-2"
                >
                  <FiX size={20} />
                </button>
              </div>

              <div className="space-y-6">
                {/* Analytics */}
                <div className="flex items-start justify-between p-4 bg-white/5 rounded-lg">
                  <div className="flex-1">
                    <h3 className="text-white font-medium mb-2">Analytics & Performance</h3>
                    <p className="text-gray-400 text-sm">
                      Help us improve the website by allowing anonymous usage analytics.
                    </p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer ml-4">
                    <input
                      type="checkbox"
                      checked={settings.analytics}
                      onChange={(e) => handleSettingChange('analytics', e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                  </label>
                </div>

                {/* Cookies */}
                <div className="flex items-start justify-between p-4 bg-white/5 rounded-lg">
                  <div className="flex-1">
                    <h3 className="text-white font-medium mb-2">Functional Cookies</h3>
                    <p className="text-gray-400 text-sm">
                      Enable cookies for enhanced functionality and user experience.
                    </p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer ml-4">
                    <input
                      type="checkbox"
                      checked={settings.cookies}
                      onChange={(e) => handleSettingChange('cookies', e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                  </label>
                </div>

                {/* Personalized Content */}
                <div className="flex items-start justify-between p-4 bg-white/5 rounded-lg">
                  <div className="flex-1">
                    <h3 className="text-white font-medium mb-2">Personalized Content</h3>
                    <p className="text-gray-400 text-sm">
                      Allow personalization based on your preferences and behavior.
                    </p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer ml-4">
                    <input
                      type="checkbox"
                      checked={settings.personalizedContent}
                      onChange={(e) => handleSettingChange('personalizedContent', e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                  </label>
                </div>

                {/* Third Party Integrations */}
                <div className="flex items-start justify-between p-4 bg-white/5 rounded-lg">
                  <div className="flex-1">
                    <h3 className="text-white font-medium mb-2">Third-Party Integrations</h3>
                    <p className="text-gray-400 text-sm">
                      Enable external services like social media widgets and embedded content.
                    </p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer ml-4">
                    <input
                      type="checkbox"
                      checked={settings.thirdPartyIntegrations}
                      onChange={(e) => handleSettingChange('thirdPartyIntegrations', e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                  </label>
                </div>

                {/* Data Retention */}
                <div className="p-4 bg-white/5 rounded-lg">
                  <h3 className="text-white font-medium mb-2">Data Retention Period</h3>
                  <p className="text-gray-400 text-sm mb-4">
                    Choose how long we keep your data before automatic deletion.
                  </p>
                  <select
                    value={settings.dataRetention}
                    onChange={(e) => handleSettingChange('dataRetention', e.target.value)}
                    className="w-full bg-dark-700 text-white border border-white/20 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  >
                    <option value="30days">30 Days</option>
                    <option value="90days">90 Days</option>
                    <option value="1year">1 Year</option>
                  </select>
                </div>
              </div>

              <div className="flex justify-end space-x-4 mt-8">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setShowSettings(false)}
                  className="px-6 py-2 border border-white/20 text-white rounded-lg hover:bg-white/10 transition-all duration-200"
                >
                  Cancel
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleSaveCustomSettings}
                  className="px-6 py-2 bg-gradient-to-r from-primary-600 to-secondary-600 text-white rounded-lg hover:from-primary-700 hover:to-secondary-700 transition-all duration-200"
                >
                  Save Settings
                </motion.button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default PrivacyBanner;