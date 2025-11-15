// Tool Categories
export const CATEGORIES = [
  { id: 'all', name: 'All Tools', icon: '🌐', color: 'gray' },
  { id: 'writing', name: 'Writing', icon: '✍️', color: 'blue' },
  { id: 'design', name: 'Design', icon: '🎨', color: 'purple' },
  { id: 'coding', name: 'Coding', icon: '💻', color: 'green' },
  { id: 'marketing', name: 'Marketing', icon: '📈', color: 'pink' },
  { id: 'video', name: 'Video', icon: '🎥', color: 'red' },
  { id: 'audio', name: 'Audio', icon: '🎵', color: 'yellow' },
  { id: 'productivity', name: 'Productivity', icon: '⚡', color: 'orange' },
  { id: 'research', name: 'Research', icon: '🔬', color: 'indigo' },
  { id: 'chatbot', name: 'Chatbot', icon: '💬', color: 'teal' },
  { id: 'image', name: 'Image', icon: '🖼️', color: 'cyan' },
  { id: 'seo', name: 'SEO', icon: '🔍', color: 'lime' },
  { id: 'other', name: 'Other', icon: '📦', color: 'slate' },
];

// Tool Status
export const TOOL_STATUS = {
  PENDING: 'pending',
  APPROVED: 'approved',
  REJECTED: 'rejected',
  FEATURED: 'featured',
};

// Tool Features/Pricing
export const PRICING_TYPES = [
  { id: 'free', name: 'Free', icon: '🆓' },
  { id: 'freemium', name: 'Freemium', icon: '💎' },
  { id: 'paid', name: 'Paid', icon: '💰' },
  { id: 'trial', name: 'Free Trial', icon: '⏰' },
];

// User Roles
export const USER_ROLES = {
  USER: 'user',
  ADMIN: 'admin',
  MODERATOR: 'moderator',
};

// Sort Options
export const SORT_OPTIONS = [
  { id: 'latest', name: 'Latest', field: 'createdAt', order: 'desc' },
  { id: 'popular', name: 'Most Popular', field: 'clicks', order: 'desc' },
  { id: 'rating', name: 'Top Rated', field: 'rating', order: 'desc' },
  { id: 'name', name: 'A-Z', field: 'name', order: 'asc' },
];

// Report Reasons
export const REPORT_REASONS = [
  { id: 'spam', name: 'Spam or Misleading' },
  { id: 'inappropriate', name: 'Inappropriate Content' },
  { id: 'broken', name: 'Broken Link' },
  { id: 'duplicate', name: 'Duplicate Entry' },
  { id: 'wrong-category', name: 'Wrong Category' },
  { id: 'other', name: 'Other' },
];

// Rating Stars
export const RATING_STARS = [1, 2, 3, 4, 5];

// Pagination
export const ITEMS_PER_PAGE = 12;
export const ITEMS_PER_PAGE_ADMIN = 20;

// Local Storage Keys
export const STORAGE_KEYS = {
  THEME: 'graphz-theme',
  RECENT_SEARCHES: 'graphz-recent-searches',
  FAVORITES: 'graphz-favorites',
  VIEW_MODE: 'graphz-view-mode',
};

// API Endpoints (if using external APIs)
export const API_ENDPOINTS = {
  // Add your API endpoints here
};

// Social Media Links
export const SOCIAL_LINKS = {
  twitter: 'https://twitter.com/graphz',
  facebook: 'https://facebook.com/graphz',
  instagram: 'https://instagram.com/graphz',
  linkedin: 'https://linkedin.com/company/graphz',
};

// Feature Flags
export const FEATURES = {
  ENABLE_COMMENTS: false,
  ENABLE_RATINGS: true,
  ENABLE_FAVORITES: true,
  ENABLE_SHARE: true,
  ENABLE_REPORTS: true,
  ENABLE_ANALYTICS: true,
  ENABLE_PWA: true,
};

// Admin Stats Update Interval (ms)
export const STATS_UPDATE_INTERVAL = 30000; // 30 seconds

// Toast Duration (ms)
export const TOAST_DURATION = 5000;

// Image Upload Constraints
export const IMAGE_CONSTRAINTS = {
  MAX_SIZE: 5 * 1024 * 1024, // 5MB
  ALLOWED_TYPES: ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif'],
  DIMENSIONS: {
    MIN_WIDTH: 200,
    MIN_HEIGHT: 200,
    MAX_WIDTH: 2000,
    MAX_HEIGHT: 2000,
  },
};

// Tool Submission Validation
export const TOOL_VALIDATION = {
  NAME: {
    MIN_LENGTH: 2,
    MAX_LENGTH: 100,
  },
  DESCRIPTION: {
    MIN_LENGTH: 20,
    MAX_LENGTH: 500,
  },
  URL: {
    PATTERN: /^https?:\/\/.+\..+/,
  },
};

// Search Debounce Time (ms)
export const SEARCH_DEBOUNCE_TIME = 300;

// Animation Durations
export const ANIMATION = {
  FAST: 150,
  NORMAL: 200,
  SLOW: 300,
};

export default {
  CATEGORIES,
  TOOL_STATUS,
  PRICING_TYPES,
  USER_ROLES,
  SORT_OPTIONS,
  REPORT_REASONS,
  RATING_STARS,
  ITEMS_PER_PAGE,
  STORAGE_KEYS,
  FEATURES,
};
