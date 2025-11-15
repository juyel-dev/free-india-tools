// App Constants

export const CATEGORIES = [
  { id: 'ai', name: 'AI Tools', icon: '🤖', color: '#8B5CF6' },
  { id: 'design', name: 'Design', icon: '🎨', color: '#EC4899' },
  { id: 'jee-neet', name: 'JEE/NEET', icon: '📚', color: '#10B981' },
  { id: 'freelancing', name: 'Freelancing', icon: '💼', color: '#F59E0B' },
  { id: 'development', name: 'Development', icon: '💻', color: '#3B82F6' },
  { id: 'productivity', name: 'Productivity', icon: '⚡', color: '#EF4444' },
  { id: 'education', name: 'Education', icon: '🎓', color: '#14B8A6' },
  { id: 'marketing', name: 'Marketing', icon: '📢', color: '#F97316' },
  { id: 'video', name: 'Video Editing', icon: '🎬', color: '#6366F1' },
  { id: 'writing', name: 'Writing', icon: '✍️', color: '#84CC16' },
]

export const TOOL_STATUS = {
  PENDING: 'pending',
  APPROVED: 'approved',
  REJECTED: 'rejected',
}

export const USER_ROLES = {
  USER: 'user',
  MODERATOR: 'moderator',
  ADMIN: 'admin',
}

export const FILTER_OPTIONS = {
  TRENDING: 'trending',
  NEWEST: 'newest',
  TOP_RATED: 'top_rated',
  MADE_IN_INDIA: 'made_in_india',
}

export const RATING_STARS = [1, 2, 3, 4, 5]

export const COLORS = {
  SAFFRON: '#FF9933',
  GREEN: '#138808',
  BLUE: '#000080',
  WHITE: '#FFFFFF',
}

export const FEATURE_FLAGS = {
  NO_LOGIN: 'noLogin',
  MADE_IN_INDIA: 'madeInIndia',
  FREE_FOREVER: 'freeForever',
}

export const TOAST_TYPES = {
  SUCCESS: 'success',
  ERROR: 'error',
  WARNING: 'warning',
  INFO: 'info',
}

export const KEYBOARD_SHORTCUTS = {
  SEARCH: '/',
  SEARCH_ALT: 'k',
  ESCAPE: 'Escape',
}

export const PAGINATION = {
  ITEMS_PER_PAGE: 12,
  INITIAL_PAGE: 1,
}

export const IMAGE_UPLOAD = {
  MAX_SIZE: 5 * 1024 * 1024, // 5MB
  ALLOWED_TYPES: ['image/jpeg', 'image/png', 'image/webp', 'image/gif'],
}

export const VALIDATION = {
  TOOL_NAME_MIN: 3,
  TOOL_NAME_MAX: 50,
  DESCRIPTION_MIN: 20,
  DESCRIPTION_MAX: 500,
  URL_PATTERN: /^https?:\/\/.+/,
  EMAIL_PATTERN: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
}

export const ADMIN_EMAIL = import.meta.env.VITE_ADMIN_EMAIL || ''
