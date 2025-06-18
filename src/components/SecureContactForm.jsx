import { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { FiSend, FiShield, FiAlertTriangle } from 'react-icons/fi';

const SecureContactForm = ({ onSubmit, isSubmitting = false }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  
  const [errors, setErrors] = useState({});
  const [securityWarning, setSecurityWarning] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Simple input sanitization
  const sanitizeInput = (input) => {
    if (typeof input !== 'string') return input;
    return input.replace(/[<>]/g, '').trim();
  };

  // Basic email validation
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Real-time input validation
  const handleInputChange = useCallback((e) => {
    const { name, value } = e.target;
    
    // Clear security warning
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
  }, [errors]);

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    } else if (formData.name.length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    if (!formData.subject.trim()) {
      newErrors.subject = 'Subject is required';
    } else if (formData.subject.length < 5) {
      newErrors.subject = 'Subject must be at least 5 characters';
    }
    
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (formData.message.length < 10) {
      newErrors.message = 'Message must be at least 10 characters';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Clear previous warnings
    setSecurityWarning('');
    
    // Validate form
    if (!validateForm()) {
      setSecurityWarning('Please fix the errors above before submitting.');
      return;
    }
    
    try {
      // Process form data
      const processedData = {
        ...formData,
        timestamp: new Date().toISOString(),
        source: 'contact_form'
      };
      
      // Submit form
      await onSubmit(processedData);
      
      // Show success message
      setIsSubmitted(true);
      
      // Clear form on successful submission
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
      setErrors({});
      
      // Hide success message after 5 seconds
      setTimeout(() => setIsSubmitted(false), 5000);
      
    } catch (error) {
      console.error('Form submission error:', error);
      setSecurityWarning('An error occurred while submitting the form. Please try again.');
    }
  };

  return (
    <div className="relative">
      {/* Security Indicator */}
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-2xl font-bold text-white flex items-center">
          <FiSend className="mr-3 text-primary-400" />
          Contact Form
        </h3>
        <div className="flex items-center text-green-400 text-sm">
          <FiShield className="mr-1" />
          <span>Secure</span>
        </div>
      </div>

      {/* Success Message */}
      {isSubmitted && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 p-4 bg-green-500/20 border border-green-400/50 text-green-400 rounded-lg backdrop-blur-sm flex items-start"
        >
          <FiShield className="mr-2 mt-0.5 flex-shrink-0" />
          <span>🎉 Your message has been sent successfully! I'll get back to you soon.</span>
        </motion.div>
      )}

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
            <li>• All data is validated and sanitized</li>
            <li>• No personal data is stored permanently</li>
            <li>• SSL/TLS encryption in transit</li>
          </ul>
        </div>
        
        {/* Submit Button */}
        <motion.button
          type="submit"
          disabled={isSubmitting}
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
              Send Message
            </>
          )}
        </motion.button>
      </form>
    </div>
  );
};

export default SecureContactForm;