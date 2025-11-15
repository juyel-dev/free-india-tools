import { TOOL_VALIDATION } from './constants';

// Email Validation
export const validateEmail = (email) => {
  if (!email) return 'Email is required';
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) return 'Please enter a valid email address';
  return null;
};

// Password Validation
export const validatePassword = (password) => {
  if (!password) return 'Password is required';
  if (password.length < 6) return 'Password must be at least 6 characters';
  if (password.length > 128) return 'Password must be less than 128 characters';
  return null;
};

// Tool Name Validation
export const validateToolName = (name) => {
  if (!name || !name.trim()) return 'Tool name is required';
  if (name.length < TOOL_VALIDATION.NAME.MIN_LENGTH) {
    return `Tool name must be at least ${TOOL_VALIDATION.NAME.MIN_LENGTH} characters`;
  }
  if (name.length > TOOL_VALIDATION.NAME.MAX_LENGTH) {
    return `Tool name must be less than ${TOOL_VALIDATION.NAME.MAX_LENGTH} characters`;
  }
  return null;
};

// Tool Description Validation
export const validateToolDescription = (description) => {
  if (!description || !description.trim()) return 'Description is required';
  if (description.length < TOOL_VALIDATION.DESCRIPTION.MIN_LENGTH) {
    return `Description must be at least ${TOOL_VALIDATION.DESCRIPTION.MIN_LENGTH} characters`;
  }
  if (description.length > TOOL_VALIDATION.DESCRIPTION.MAX_LENGTH) {
    return `Description must be less than ${TOOL_VALIDATION.DESCRIPTION.MAX_LENGTH} characters`;
  }
  return null;
};

// URL Validation
export const validateUrl = (url) => {
  if (!url || !url.trim()) return 'URL is required';

  try {
    const urlObj = new URL(url);
    if (!['http:', 'https:'].includes(urlObj.protocol)) {
      return 'URL must start with http:// or https://';
    }
    return null;
  } catch {
    return 'Please enter a valid URL';
  }
};

// Category Validation
export const validateCategory = (category) => {
  if (!category) return 'Please select a category';
  return null;
};

// Pricing Validation
export const validatePricing = (pricing) => {
  if (!pricing) return 'Please select a pricing type';
  return null;
};

// Image URL Validation
export const validateImageUrl = (url) => {
  if (!url || !url.trim()) return 'Image is required';

  const imageUrlRegex = /\.(jpg|jpeg|png|webp|gif)$/i;
  if (!imageUrlRegex.test(url) && !url.includes('cloudinary')) {
    return 'Please upload a valid image (jpg, jpeg, png, webp, gif)';
  }

  return null;
};

// Rating Validation
export const validateRating = (rating) => {
  if (rating === null || rating === undefined) return 'Rating is required';
  if (rating < 1 || rating > 5) return 'Rating must be between 1 and 5';
  return null;
};

// Form Validation
export const validateToolForm = (formData) => {
  const errors = {};

  const nameError = validateToolName(formData.name);
  if (nameError) errors.name = nameError;

  const descriptionError = validateToolDescription(formData.description);
  if (descriptionError) errors.description = descriptionError;

  const urlError = validateUrl(formData.url);
  if (urlError) errors.url = urlError;

  const categoryError = validateCategory(formData.category);
  if (categoryError) errors.category = categoryError;

  const pricingError = validatePricing(formData.pricing);
  if (pricingError) errors.pricing = pricingError;

  const imageError = validateImageUrl(formData.imageUrl);
  if (imageError) errors.imageUrl = imageError;

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};

// Login Form Validation
export const validateLoginForm = (formData) => {
  const errors = {};

  const emailError = validateEmail(formData.email);
  if (emailError) errors.email = emailError;

  const passwordError = validatePassword(formData.password);
  if (passwordError) errors.password = passwordError;

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};

// Signup Form Validation
export const validateSignupForm = (formData) => {
  const errors = {};

  // Name validation
  if (!formData.name || !formData.name.trim()) {
    errors.name = 'Name is required';
  } else if (formData.name.length < 2) {
    errors.name = 'Name must be at least 2 characters';
  }

  const emailError = validateEmail(formData.email);
  if (emailError) errors.email = emailError;

  const passwordError = validatePassword(formData.password);
  if (passwordError) errors.password = passwordError;

  // Confirm password validation
  if (!formData.confirmPassword) {
    errors.confirmPassword = 'Please confirm your password';
  } else if (formData.password !== formData.confirmPassword) {
    errors.confirmPassword = 'Passwords do not match';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};

// File Validation
export const validateFile = (file, options = {}) => {
  const {
    maxSize = 5 * 1024 * 1024, // 5MB default
    allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif'],
  } = options;

  if (!file) return 'Please select a file';

  if (file.size > maxSize) {
    return `File size must be less than ${maxSize / (1024 * 1024)}MB`;
  }

  if (!allowedTypes.includes(file.type)) {
    return 'Invalid file type. Please upload an image file';
  }

  return null;
};

// Report Form Validation
export const validateReportForm = (formData) => {
  const errors = {};

  if (!formData.reason) {
    errors.reason = 'Please select a reason';
  }

  if (!formData.description || !formData.description.trim()) {
    errors.description = 'Please provide a description';
  } else if (formData.description.length < 10) {
    errors.description = 'Description must be at least 10 characters';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};

export default {
  validateEmail,
  validatePassword,
  validateToolName,
  validateToolDescription,
  validateUrl,
  validateCategory,
  validatePricing,
  validateImageUrl,
  validateRating,
  validateToolForm,
  validateLoginForm,
  validateSignupForm,
  validateFile,
  validateReportForm,
};
