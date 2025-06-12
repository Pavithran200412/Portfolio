// Security utilities for data protection and validation
import CryptoJS from 'crypto-js';

// Environment-based encryption key (in production, use proper key management)
const ENCRYPTION_KEY = import.meta.env.VITE_ENCRYPTION_KEY || 'default-dev-key-change-in-production';

// Data encryption utility
export const encryptData = (data) => {
  try {
    const encrypted = CryptoJS.AES.encrypt(JSON.stringify(data), ENCRYPTION_KEY).toString();
    return encrypted;
  } catch (error) {
    console.error('Encryption failed:', error);
    return null;
  }
};

// Data decryption utility
export const decryptData = (encryptedData) => {
  try {
    const bytes = CryptoJS.AES.decrypt(encryptedData, ENCRYPTION_KEY);
    const decrypted = bytes.toString(CryptoJS.enc.Utf8);
    return JSON.parse(decrypted);
  } catch (error) {
    console.error('Decryption failed:', error);
    return null;
  }
};

// Input sanitization
export const sanitizeInput = (input) => {
  if (typeof input !== 'string') return input;
  
  return input
    .replace(/[<>]/g, '') // Remove potential HTML tags
    .replace(/javascript:/gi, '') // Remove javascript: protocols
    .replace(/on\w+=/gi, '') // Remove event handlers
    .trim();
};

// Email validation with enhanced security
export const validateEmail = (email) => {
  const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
  return emailRegex.test(email) && email.length <= 254;
};

// Phone number validation
export const validatePhone = (phone) => {
  const phoneRegex = /^\+?[\d\s\-\(\)]{10,15}$/;
  return phoneRegex.test(phone.replace(/\s/g, ''));
};

// Rate limiting utility
class RateLimiter {
  constructor(maxAttempts = 5, windowMs = 15 * 60 * 1000) { // 5 attempts per 15 minutes
    this.attempts = new Map();
    this.maxAttempts = maxAttempts;
    this.windowMs = windowMs;
  }

  isAllowed(identifier) {
    const now = Date.now();
    const userAttempts = this.attempts.get(identifier) || [];
    
    // Remove old attempts outside the window
    const validAttempts = userAttempts.filter(time => now - time < this.windowMs);
    
    if (validAttempts.length >= this.maxAttempts) {
      return false;
    }
    
    validAttempts.push(now);
    this.attempts.set(identifier, validAttempts);
    return true;
  }

  getRemainingTime(identifier) {
    const userAttempts = this.attempts.get(identifier) || [];
    if (userAttempts.length === 0) return 0;
    
    const oldestAttempt = Math.min(...userAttempts);
    const remainingTime = this.windowMs - (Date.now() - oldestAttempt);
    return Math.max(0, remainingTime);
  }
}

export const formRateLimiter = new RateLimiter();

// Content Security Policy headers (for reference)
export const CSP_HEADERS = {
  'Content-Security-Policy': [
    "default-src 'self'",
    "script-src 'self' 'unsafe-inline' 'unsafe-eval'", // Note: In production, remove unsafe-inline and unsafe-eval
    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
    "font-src 'self' https://fonts.gstatic.com",
    "img-src 'self' data: https: blob:",
    "connect-src 'self' https:",
    "frame-src 'none'",
    "object-src 'none'",
    "base-uri 'self'"
  ].join('; ')
};

// Security headers for reference
export const SECURITY_HEADERS = {
  'X-Content-Type-Options': 'nosniff',
  'X-Frame-Options': 'DENY',
  'X-XSS-Protection': '1; mode=block',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'Permissions-Policy': 'camera=(), microphone=(), geolocation=()'
};

// Secure local storage wrapper
export const secureStorage = {
  setItem: (key, value) => {
    try {
      const encrypted = encryptData(value);
      if (encrypted) {
        localStorage.setItem(key, encrypted);
        return true;
      }
      return false;
    } catch (error) {
      console.error('Secure storage set failed:', error);
      return false;
    }
  },

  getItem: (key) => {
    try {
      const encrypted = localStorage.getItem(key);
      if (encrypted) {
        return decryptData(encrypted);
      }
      return null;
    } catch (error) {
      console.error('Secure storage get failed:', error);
      return null;
    }
  },

  removeItem: (key) => {
    try {
      localStorage.removeItem(key);
      return true;
    } catch (error) {
      console.error('Secure storage remove failed:', error);
      return false;
    }
  }
};

// Generate secure session token
export const generateSecureToken = () => {
  const array = new Uint8Array(32);
  crypto.getRandomValues(array);
  return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
};

// Detect potential XSS attempts
export const detectXSS = (input) => {
  const xssPatterns = [
    /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,
    /javascript:/gi,
    /on\w+\s*=/gi,
    /<iframe\b[^<]*(?:(?!<\/iframe>)<[^<]*)*<\/iframe>/gi,
    /<object\b[^<]*(?:(?!<\/object>)<[^<]*)*<\/object>/gi,
    /<embed\b[^<]*(?:(?!<\/embed>)<[^<]*)*<\/embed>/gi
  ];
  
  return xssPatterns.some(pattern => pattern.test(input));
};

// Secure form data processing
export const processFormData = (formData) => {
  const processed = {};
  
  for (const [key, value] of Object.entries(formData)) {
    // Sanitize input
    const sanitized = sanitizeInput(value);
    
    // Check for XSS
    if (detectXSS(sanitized)) {
      throw new Error('Potentially malicious content detected');
    }
    
    // Additional validation based on field type
    if (key === 'email' && !validateEmail(sanitized)) {
      throw new Error('Invalid email format');
    }
    
    if (key === 'phone' && sanitized && !validatePhone(sanitized)) {
      throw new Error('Invalid phone format');
    }
    
    processed[key] = sanitized;
  }
  
  return processed;
};