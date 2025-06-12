import { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { FiSend, FiShield, FiLock, FiAlertTriangle } from 'react-icons/fi';
import { 
  sanitizeInput, 
  validateEmail, 
  validatePhone, 
  formRateLimiter, 
  processFormData,
  detectXSS,
  secureStorage,
  generateSecureToken
} from '../utils/security';

const SecureContactForm = ({ onSubmit, isSubmitting = false }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  
  const [errors, setErrors] = useState({});
  const [securityWarning, setSecurityWarning] = useState('');
  const [isRateLimited, setIsRateLimited] = useState(false);
  const [sessionToken] = useState(() => generateSecureToken());

  // Real-time input validation and sanitization
  const handleInputChange = useCallback((e) => {
    const { name, value } = e.target;
    
    // Check for potential XSS attempts
    if (detectXSS(value)) {
      setSecurityWarning('Potentially malicious content detected. Please use safe characters only.');
      return;
    }
    
    // Clear security warning if input is safe
    setSecurityWarning('');
    
    // Sanitize input
    const sanitizedValue = sanitizeInput(value);
    
    // Update form data
    setFormData(prev => ({
      ...prev,
      [name]: sanitizedValue
    }));
    
    // Clear field-specific errors
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
    
    // Real-time validation
    validateField(name, sanitizedValue);
  }, [errors]);

  const validateField = (name, value) => {
    let error = '';
    
    switch (name) {
      case 'name':
        if (!value.trim()) {
          error = 'Name is required';
        } else if (value.length < 2) {
          error = 'Name must be at least 2 characters';
        } else if (value.length > 50) {
          error = 'Name must be less than 50 characters';
        }
        break;
        
      case 'email':
        if (!value.trim()) {
          error = 'Email is required';
        } else if (!validateEmail(value)) {
          error = 'Please enter a valid email address';
        }
        break;
        
      case 'subject':
        if (!value.trim()) {
          error = 'Subject is required';
        } else if (value.length < 5) {
          error = 'Subject must be at least 5 characters';
        } else if (value.length > 100) {
          error = 'Subject must be less than 100 characters';
        }
        break;
        
      case 'message':
        if (!value.trim()) {
          error = 'Message is required';
        } else if (value.length < 10) {
          error = 'Message must be at least 10 characters';
        } else if (value.length > 1000) {
          error = 'Message must be less than 1000 characters';
        }
        break;
    }
    
    if (error) {
      setErrors(prev => ({
        ...prev,
        [name]: error
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    // Validate all fields
    Object.keys(formData).forEach(key => {
      validateField(key, formData[key]);
    });
    
    // Check for any remaining errors
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Clear previous warnings
    setSecurityWarning('');
    
    // Check rate limiting
    const userIdentifier = `${formData.email}_${sessionToken}`;
    if (!formRateLimiter.isAllowed(userIdentifier)) {
      const remainingTime = Math.ceil(formRateLimiter.getRemainingTime(userIdentifier) / 1000 / 60);
      setIsRateLimited(true);
      setSecurityWarning(`Too many attempts. Please wait ${remainingTime} minutes before trying again.`);
      return;
    }
    
    setIsRateLimited(false);
    
    // Validate form
    if (!validateForm()) {
      setSecurityWarning('Please fix the errors above before submitting.');
      return;
    }
    
    try {
      // Process and secure form data
      const processedData = processFormData(formData);
      
      // Add security metadata
      const secureSubmission = {
        ...processedData,
        sessionToken,
        timestamp: new Date().toISOString(),
        userAgent: navigator.userAgent,
        referrer: document.referrer || 'direct'
      };
      
      // Store submission locally (encrypted) for backup
      secureStorage.setItem(`form_submission_${Date.now()}`, secureSubmission);
      
      // Submit form
      await onSubmit(secureSubmission);
      
      // Clear form on successful submission
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
      setErrors({});
      
    } catch (error) {
      console.error('Form submission error:', error);
      setSecurityWarning(error.message || 'An error occurred while submitting the form. Please try again.');
    }
  };

  return (
    <div className="relative">
      {/* Security Indicator */}
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-2xl font-bold text-white flex items-center">
          <FiSend className="mr-3 text-primary-400" />
          Secure Contact Form
        </h3>
        <div className="flex items-center text-green-400 text-sm">
          <FiShield className="mr-1" />
          <span>SSL Protected</span>
        </div>
      </div>

      {/* Security Warning */}
      {securityWarning && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 p-4 bg-red-500/20 border border-red-400/50 text-red-400 rounded-lg backdrop-blur-sm flex items-start"
        >
          <FiAlertTriangle className="mr-2 mt-0.5 flex-shrink-0" />
          <span>{securityWarning}</span>
        </motion.div>
      )}

      {/* Rate Limit Warning */}
      {isRateLimited && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 p-4 bg-orange-500/20 border border-orange-400/50 text-orange-400 rounded-lg backdrop-blur-sm flex items-start"
        >
          <FiLock className="mr-2 mt-0.5 flex-shrink-0" />
          <span>Rate limit exceeded. This helps protect against spam and abuse.</span>
        </motion.div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6" noValidate>
        {/* Name and Email Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="relative group">
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
              maxLength={50}
              className={`w-full px-4 py-3 bg-white/10 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-300 text-white placeholder-gray-400 backdrop-blur-sm group-hover:bg-white/15 ${
                errors.name ? 'border-red-400' : 'border-white/20'
              }`}
              placeholder="Your Name *"
              autoComplete="name"
            />
            {errors.name && (
              <p className="mt-1 text-sm text-red-400">{errors.name}</p>
            )}
          </div>
          
          <div className="relative group">
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
              maxLength={254}
              className={`w-full px-4 py-3 bg-white/10 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-300 text-white placeholder-gray-400 backdrop-blur-sm group-hover:bg-white/15 ${
                errors.email ? 'border-red-400' : 'border-white/20'
              }`}
              placeholder="Your Email *"
              autoComplete="email"
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-400">{errors.email}</p>
            )}
          </div>
        </div>
        
        {/* Subject */}
        <div className="relative group">
          <input
            type="text"
            name="subject"
            value={formData.subject}
            onChange={handleInputChange}
            required
            maxLength={100}
            className={`w-full px-4 py-3 bg-white/10 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-300 text-white placeholder-gray-400 backdrop-blur-sm group-hover:bg-white/15 ${
              errors.subject ? 'border-red-400' : 'border-white/20'
            }`}
            placeholder="Subject *"
            autoComplete="off"
          />
          {errors.subject && (
            <p className="mt-1 text-sm text-red-400">{errors.subject}</p>
          )}
        </div>
        
        {/* Message */}
        <div className="relative group">
          <textarea
            name="message"
            value={formData.message}
            onChange={handleInputChange}
            required
            rows="6"
            maxLength={1000}
            className={`w-full px-4 py-3 bg-white/10 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-300 text-white placeholder-gray-400 resize-none backdrop-blur-sm group-hover:bg-white/15 ${
              errors.message ? 'border-red-400' : 'border-white/20'
            }`}
            placeholder="Your Message *"
          />
          <div className="flex justify-between items-center mt-1">
            {errors.message ? (
              <p className="text-sm text-red-400">{errors.message}</p>
            ) : (
              <div></div>
            )}
            <p className="text-sm text-gray-400">
              {formData.message.length}/1000
            </p>
          </div>
        </div>
        
        {/* Security Notice */}
        <div className="text-sm text-gray-400 bg-white/5 p-3 rounded-lg">
          <div className="flex items-center mb-2">
            <FiShield className="mr-2 text-green-400" />
            <span className="font-medium">Your data is protected</span>
          </div>
          <ul className="space-y-1 text-xs">
            <li>• All data is encrypted and sanitized</li>
            <li>• Rate limiting prevents spam</li>
            <li>• No personal data is stored permanently</li>
            <li>• SSL/TLS encryption in transit</li>
          </ul>
        </div>
        
        {/* Submit Button */}
        <motion.button
          type="submit"
          disabled={isSubmitting || isRateLimited || Object.keys(errors).length > 0}
          whileHover={{ scale: 1.02, y: -2 }}
          whileTap={{ scale: 0.98 }}
          className="w-full bg-gradient-to-r from-primary-600 to-secondary-600 text-white font-medium py-4 px-6 rounded-lg hover:from-primary-700 hover:to-secondary-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center shadow-lg"
        >
          {isSubmitting ? (
            <motion.div 
              className="w-6 h-6 border-2 border-white border-t-transparent rounded-full"
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
            />
          ) : (
            <>
              <FiSend className="mr-2" />
              Send Secure Message
            </>
          )}
        </motion.button>
      </form>
    </div>
  );
};

export default SecureContactForm;