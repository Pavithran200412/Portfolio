// Security monitoring and logging utilities
import { sanitizeLogs } from './privacy';

class SecurityMonitor {
  constructor() {
    this.events = [];
    this.maxEvents = 100; // Keep last 100 events
    this.alertThresholds = {
      failedAttempts: 5,
      timeWindow: 15 * 60 * 1000, // 15 minutes
      suspiciousPatterns: 3
    };
  }

  logEvent(type, data, severity = 'info') {
    const event = {
      id: this.generateEventId(),
      type,
      data: sanitizeLogs(data),
      severity,
      timestamp: new Date().toISOString(),
      userAgent: navigator.userAgent,
      url: window.location.href
    };

    this.events.push(event);
    
    // Keep only recent events
    if (this.events.length > this.maxEvents) {
      this.events = this.events.slice(-this.maxEvents);
    }

    // Check for security alerts
    this.checkSecurityAlerts(event);

    // Log to console in development
    if (process.env.NODE_ENV === 'development') {
      console.log(`[Security Monitor] ${severity.toUpperCase()}: ${type}`, data);
    }

    return event.id;
  }

  generateEventId() {
    return `evt_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  checkSecurityAlerts(event) {
    const recentEvents = this.getRecentEvents();
    
    // Check for failed form submissions
    if (event.type === 'form_submission_failed') {
      const failedAttempts = recentEvents.filter(e => 
        e.type === 'form_submission_failed' && 
        e.data.email === event.data.email
      ).length;

      if (failedAttempts >= this.alertThresholds.failedAttempts) {
        this.triggerAlert('multiple_failed_submissions', {
          email: event.data.email,
          attempts: failedAttempts
        });
      }
    }

    // Check for XSS attempts
    if (event.type === 'xss_attempt') {
      this.triggerAlert('xss_detected', event.data);
    }

    // Check for rate limiting violations
    if (event.type === 'rate_limit_exceeded') {
      this.triggerAlert('rate_limit_violation', event.data);
    }

    // Check for suspicious patterns
    const suspiciousEvents = recentEvents.filter(e => 
      ['xss_attempt', 'rate_limit_exceeded', 'invalid_input'].includes(e.type)
    ).length;

    if (suspiciousEvents >= this.alertThresholds.suspiciousPatterns) {
      this.triggerAlert('suspicious_activity_pattern', {
        eventCount: suspiciousEvents,
        timeWindow: this.alertThresholds.timeWindow
      });
    }
  }

  getRecentEvents(timeWindow = this.alertThresholds.timeWindow) {
    const cutoff = Date.now() - timeWindow;
    return this.events.filter(event => 
      new Date(event.timestamp).getTime() > cutoff
    );
  }

  triggerAlert(alertType, data) {
    const alert = {
      id: this.generateEventId(),
      type: alertType,
      data,
      timestamp: new Date().toISOString(),
      severity: 'critical'
    };

    // Log critical alert
    console.warn('[SECURITY ALERT]', alert);

    // In production, this would send to a security monitoring service
    if (process.env.NODE_ENV === 'production') {
      this.sendToSecurityService(alert);
    }

    // Store alert locally for admin review
    this.storeAlert(alert);
  }

  sendToSecurityService(alert) {
    // This would integrate with services like:
    // - Sentry for error tracking
    // - LogRocket for session replay
    // - Custom security monitoring endpoint
    
    fetch('/api/security/alert', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(alert)
    }).catch(error => {
      console.error('Failed to send security alert:', error);
    });
  }

  storeAlert(alert) {
    try {
      const alerts = JSON.parse(localStorage.getItem('security_alerts') || '[]');
      alerts.push(alert);
      
      // Keep only last 50 alerts
      const recentAlerts = alerts.slice(-50);
      localStorage.setItem('security_alerts', JSON.stringify(recentAlerts));
    } catch (error) {
      console.error('Failed to store security alert:', error);
    }
  }

  getStoredAlerts() {
    try {
      return JSON.parse(localStorage.getItem('security_alerts') || '[]');
    } catch (error) {
      console.error('Failed to retrieve security alerts:', error);
      return [];
    }
  }

  clearAlerts() {
    localStorage.removeItem('security_alerts');
    this.events = [];
  }

  // Performance monitoring
  measurePerformance(operation, fn) {
    const start = performance.now();
    const result = fn();
    const duration = performance.now() - start;

    this.logEvent('performance_measurement', {
      operation,
      duration: Math.round(duration * 100) / 100,
      timestamp: new Date().toISOString()
    });

    return result;
  }

  // Network request monitoring
  monitorNetworkRequest(url, method, status, duration) {
    this.logEvent('network_request', {
      url: this.sanitizeUrl(url),
      method,
      status,
      duration,
      success: status >= 200 && status < 300
    });
  }

  sanitizeUrl(url) {
    try {
      const urlObj = new URL(url);
      // Remove sensitive query parameters
      const sensitiveParams = ['token', 'key', 'password', 'secret'];
      sensitiveParams.forEach(param => {
        if (urlObj.searchParams.has(param)) {
          urlObj.searchParams.set(param, '[REDACTED]');
        }
      });
      return urlObj.toString();
    } catch {
      return '[INVALID_URL]';
    }
  }

  // Generate security report
  generateSecurityReport() {
    const recentEvents = this.getRecentEvents(24 * 60 * 60 * 1000); // Last 24 hours
    const alerts = this.getStoredAlerts();

    const report = {
      generatedAt: new Date().toISOString(),
      timeWindow: '24 hours',
      summary: {
        totalEvents: recentEvents.length,
        criticalAlerts: alerts.filter(a => a.severity === 'critical').length,
        warningEvents: recentEvents.filter(e => e.severity === 'warning').length,
        errorEvents: recentEvents.filter(e => e.severity === 'error').length
      },
      eventsByType: this.groupEventsByType(recentEvents),
      recentAlerts: alerts.slice(-10), // Last 10 alerts
      recommendations: this.generateRecommendations(recentEvents, alerts)
    };

    return report;
  }

  groupEventsByType(events) {
    return events.reduce((acc, event) => {
      acc[event.type] = (acc[event.type] || 0) + 1;
      return acc;
    }, {});
  }

  generateRecommendations(events, alerts) {
    const recommendations = [];

    // Check for high error rates
    const errorRate = events.filter(e => e.severity === 'error').length / events.length;
    if (errorRate > 0.1) {
      recommendations.push('High error rate detected. Review error logs and implement additional error handling.');
    }

    // Check for security alerts
    if (alerts.length > 0) {
      recommendations.push('Security alerts detected. Review and investigate suspicious activities.');
    }

    // Check for performance issues
    const performanceEvents = events.filter(e => e.type === 'performance_measurement');
    const slowOperations = performanceEvents.filter(e => e.data.duration > 1000);
    if (slowOperations.length > 0) {
      recommendations.push('Slow operations detected. Consider performance optimization.');
    }

    return recommendations;
  }
}

// Create global security monitor instance
export const securityMonitor = new SecurityMonitor();

// Auto-monitor page load performance
window.addEventListener('load', () => {
  securityMonitor.logEvent('page_load', {
    loadTime: performance.now(),
    url: window.location.href
  });
});

// Monitor unhandled errors
window.addEventListener('error', (event) => {
  securityMonitor.logEvent('javascript_error', {
    message: event.message,
    filename: event.filename,
    lineno: event.lineno,
    colno: event.colno
  }, 'error');
});

// Monitor unhandled promise rejections
window.addEventListener('unhandledrejection', (event) => {
  securityMonitor.logEvent('unhandled_promise_rejection', {
    reason: event.reason?.toString() || 'Unknown reason'
  }, 'error');
});

export default SecurityMonitor;