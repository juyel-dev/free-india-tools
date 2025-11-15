import { analytics } from './firebase';
import { logEvent as firebaseLogEvent } from 'firebase/analytics';

// Log custom events
export const logEvent = (eventName, eventParams = {}) => {
  try {
    if (analytics) {
      firebaseLogEvent(analytics, eventName, eventParams);
    }

    // Also log to console in development
    if (import.meta.env.DEV) {
      console.log('Analytics Event:', eventName, eventParams);
    }
  } catch (error) {
    console.error('Analytics error:', error);
  }
};

// Track page views
export const trackPageView = (pageName, path) => {
  logEvent('page_view', {
    page_title: pageName,
    page_path: path,
    page_location: window.location.href,
  });
};

// Track tool views
export const trackToolView = (toolId, toolName) => {
  logEvent('view_tool', {
    tool_id: toolId,
    tool_name: toolName,
  });
};

// Track tool clicks
export const trackToolClick = (toolId, toolName, url) => {
  logEvent('click_tool', {
    tool_id: toolId,
    tool_name: toolName,
    destination_url: url,
  });
};

// Track tool submissions
export const trackToolSubmission = (toolName, category) => {
  logEvent('submit_tool', {
    tool_name: toolName,
    category: category,
  });
};

// Track search queries
export const trackSearch = (query, resultsCount) => {
  logEvent('search', {
    search_term: query,
    results_count: resultsCount,
  });
};

// Track user signups
export const trackSignup = (method = 'email') => {
  logEvent('sign_up', {
    method: method,
  });
};

// Track user logins
export const trackLogin = (method = 'email') => {
  logEvent('login', {
    method: method,
  });
};

// Track favorites
export const trackFavorite = (toolId, toolName, action = 'add') => {
  logEvent('favorite', {
    tool_id: toolId,
    tool_name: toolName,
    action: action, // 'add' or 'remove'
  });
};

// Track shares
export const trackShare = (toolId, toolName, method) => {
  logEvent('share', {
    tool_id: toolId,
    tool_name: toolName,
    method: method, // 'copy_link', 'twitter', 'facebook', etc.
  });
};

// Track reports
export const trackReport = (toolId, reason) => {
  logEvent('report_tool', {
    tool_id: toolId,
    reason: reason,
  });
};

// Track errors
export const trackError = (errorName, errorMessage) => {
  logEvent('error', {
    error_name: errorName,
    error_message: errorMessage,
  });
};

// Track performance metrics
export const trackPerformance = (metricName, value) => {
  logEvent('performance', {
    metric_name: metricName,
    value: value,
  });
};

// Track category filters
export const trackCategoryFilter = (category) => {
  logEvent('filter_category', {
    category: category,
  });
};

// Track pricing filters
export const trackPricingFilter = (pricing) => {
  logEvent('filter_pricing', {
    pricing: pricing,
  });
};

// Track rating filters
export const trackRatingFilter = (rating) => {
  logEvent('filter_rating', {
    rating: rating,
  });
};

// Track theme changes
export const trackThemeChange = (theme) => {
  logEvent('change_theme', {
    theme: theme,
  });
};

// Track profile updates
export const trackProfileUpdate = () => {
  logEvent('update_profile');
};

// User timing for performance
export const trackTiming = (category, variable, value, label = '') => {
  logEvent('timing_complete', {
    name: variable,
    value: value,
    event_category: category,
    event_label: label,
  });
};

export default {
  logEvent,
  trackPageView,
  trackToolView,
  trackToolClick,
  trackToolSubmission,
  trackSearch,
  trackSignup,
  trackLogin,
  trackFavorite,
  trackShare,
  trackReport,
  trackError,
  trackPerformance,
  trackCategoryFilter,
  trackPricingFilter,
  trackRatingFilter,
  trackThemeChange,
  trackProfileUpdate,
  trackTiming,
};
