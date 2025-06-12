// Privacy and data protection utilities
import { secureStorage } from './security';

// Privacy settings management
export class PrivacyManager {
  constructor() {
    this.settings = this.loadSettings();
  }

  loadSettings() {
    const defaultSettings = {
      analytics: false,
      cookies: false,
      personalizedContent: false,
      thirdPartyIntegrations: false,
      dataRetention: '30days', // 30days, 90days, 1year
      consentTimestamp: null,
      version: '1.0'
    };

    const saved = secureStorage.getItem('privacy_settings');
    return saved ? { ...defaultSettings, ...saved } : defaultSettings;
  }

  saveSettings(newSettings) {
    this.settings = {
      ...this.settings,
      ...newSettings,
      consentTimestamp: new Date().toISOString()
    };
    secureStorage.setItem('privacy_settings', this.settings);
    this.applySettings();
  }

  applySettings() {
    // Apply analytics settings
    if (!this.settings.analytics) {
      this.disableAnalytics();
    }

    // Apply cookie settings
    if (!this.settings.cookies) {
      this.clearNonEssentialCookies();
    }

    // Apply third-party integration settings
    if (!this.settings.thirdPartyIntegrations) {
      this.disableThirdPartyIntegrations();
    }
  }

  disableAnalytics() {
    // Disable Google Analytics, if present
    if (window.gtag) {
      window.gtag('config', 'GA_MEASUREMENT_ID', {
        anonymize_ip: true,
        allow_google_signals: false,
        allow_ad_personalization_signals: false
      });
    }

    // Disable other analytics
    if (window._paq) {
      window._paq.push(['optUserOut']);
    }
  }

  clearNonEssentialCookies() {
    // Get all cookies
    const cookies = document.cookie.split(';');
    
    // Essential cookies that should not be deleted
    const essentialCookies = ['theme', 'privacy_settings', 'session_token'];
    
    cookies.forEach(cookie => {
      const [name] = cookie.split('=');
      const cookieName = name.trim();
      
      if (!essentialCookies.includes(cookieName)) {
        // Delete non-essential cookie
        document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
      }
    });
  }

  disableThirdPartyIntegrations() {
    // Disable social media widgets
    const socialWidgets = document.querySelectorAll('[data-social-widget]');
    socialWidgets.forEach(widget => {
      widget.style.display = 'none';
    });

    // Disable external fonts if privacy is strict
    const externalFonts = document.querySelectorAll('link[href*="fonts.googleapis.com"]');
    externalFonts.forEach(font => {
      if (this.settings.thirdPartyIntegrations === false) {
        font.disabled = true;
      }
    });
  }

  hasConsent(feature) {
    return this.settings[feature] === true;
  }

  getConsentStatus() {
    return {
      hasConsent: this.settings.consentTimestamp !== null,
      timestamp: this.settings.consentTimestamp,
      settings: this.settings
    };
  }

  revokeConsent() {
    this.settings = {
      analytics: false,
      cookies: false,
      personalizedContent: false,
      thirdPartyIntegrations: false,
      dataRetention: '30days',
      consentTimestamp: null,
      version: '1.0'
    };
    secureStorage.removeItem('privacy_settings');
    this.clearAllData();
  }

  clearAllData() {
    // Clear all stored data except essential
    const essentialKeys = ['theme'];
    
    Object.keys(localStorage).forEach(key => {
      if (!essentialKeys.includes(key)) {
        localStorage.removeItem(key);
      }
    });

    // Clear session storage
    sessionStorage.clear();

    // Clear cookies
    this.clearNonEssentialCookies();
  }

  scheduleDataDeletion() {
    const retentionPeriods = {
      '30days': 30 * 24 * 60 * 60 * 1000,
      '90days': 90 * 24 * 60 * 60 * 1000,
      '1year': 365 * 24 * 60 * 60 * 1000
    };

    const retentionMs = retentionPeriods[this.settings.dataRetention];
    const deleteAt = Date.now() + retentionMs;

    secureStorage.setItem('data_deletion_scheduled', {
      deleteAt,
      period: this.settings.dataRetention
    });
  }

  checkScheduledDeletion() {
    const scheduled = secureStorage.getItem('data_deletion_scheduled');
    if (scheduled && Date.now() >= scheduled.deleteAt) {
      this.clearAllData();
      secureStorage.removeItem('data_deletion_scheduled');
      return true;
    }
    return false;
  }
}

// Data minimization utilities
export const dataMinimizer = {
  // Remove unnecessary metadata from form submissions
  cleanFormData: (data) => {
    const cleaned = { ...data };
    
    // Remove browser fingerprinting data in production
    delete cleaned.userAgent;
    delete cleaned.referrer;
    delete cleaned.screenResolution;
    delete cleaned.timezone;
    
    return cleaned;
  },

  // Anonymize IP addresses
  anonymizeIP: (ip) => {
    if (!ip) return null;
    
    // IPv4: Remove last octet
    if (ip.includes('.')) {
      const parts = ip.split('.');
      return `${parts[0]}.${parts[1]}.${parts[2]}.0`;
    }
    
    // IPv6: Remove last 64 bits
    if (ip.includes(':')) {
      const parts = ip.split(':');
      return parts.slice(0, 4).join(':') + '::';
    }
    
    return null;
  },

  // Remove PII from logs
  sanitizeLogs: (logData) => {
    const sanitized = JSON.stringify(logData);
    
    // Remove email patterns
    const emailRegex = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g;
    const phoneRegex = /(\+?\d{1,3}[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}/g;
    const ipRegex = /\b(?:\d{1,3}\.){3}\d{1,3}\b/g;
    
    return sanitized
      .replace(emailRegex, '[EMAIL_REDACTED]')
      .replace(phoneRegex, '[PHONE_REDACTED]')
      .replace(ipRegex, '[IP_REDACTED]');
  }
};

// GDPR compliance utilities
export const gdprCompliance = {
  // Generate data export for user
  exportUserData: async (userId) => {
    const userData = {
      personalInfo: secureStorage.getItem(`user_${userId}`),
      preferences: secureStorage.getItem('privacy_settings'),
      submissions: secureStorage.getItem(`submissions_${userId}`),
      exportDate: new Date().toISOString(),
      dataRetentionPolicy: '30 days from last activity'
    };

    return userData;
  },

  // Delete all user data
  deleteUserData: async (userId) => {
    const keysToDelete = [
      `user_${userId}`,
      `submissions_${userId}`,
      `analytics_${userId}`,
      `preferences_${userId}`
    ];

    keysToDelete.forEach(key => {
      secureStorage.removeItem(key);
    });

    return {
      deleted: true,
      timestamp: new Date().toISOString(),
      deletedKeys: keysToDelete
    };
  },

  // Check if data processing is lawful
  checkLawfulBasis: (processingType) => {
    const lawfulBases = {
      'contact_form': 'legitimate_interest', // Responding to inquiries
      'analytics': 'consent', // Requires explicit consent
      'marketing': 'consent', // Requires explicit consent
      'security': 'legitimate_interest', // Protecting the website
      'legal_compliance': 'legal_obligation' // Required by law
    };

    return lawfulBases[processingType] || 'consent';
  }
};

// Initialize privacy manager
export const privacyManager = new PrivacyManager();

// Auto-check for scheduled data deletion on load
privacyManager.checkScheduledDeletion();