// Form Validation Functions

import { VALIDATION } from './constants'

export const validateEmail = (email) => {
  if (!email) {
    return { valid: false, error: 'Email is required' }
  }
  if (!VALIDATION.EMAIL_PATTERN.test(email)) {
    return { valid: false, error: 'Invalid email format' }
  }
  return { valid: true, error: null }
}

export const validatePassword = (password) => {
  if (!password) {
    return { valid: false, error: 'Password is required' }
  }
  if (password.length < 6) {
    return { valid: false, error: 'Password must be at least 6 characters' }
  }
  return { valid: true, error: null }
}

export const validateToolName = (name) => {
  if (!name) {
    return { valid: false, error: 'Tool name is required' }
  }
  if (name.length < VALIDATION.TOOL_NAME_MIN) {
    return { valid: false, error: `Tool name must be at least ${VALIDATION.TOOL_NAME_MIN} characters` }
  }
  if (name.length > VALIDATION.TOOL_NAME_MAX) {
    return { valid: false, error: `Tool name must not exceed ${VALIDATION.TOOL_NAME_MAX} characters` }
  }
  return { valid: true, error: null }
}

export const validateUrl = (url) => {
  if (!url) {
    return { valid: false, error: 'URL is required' }
  }
  if (!VALIDATION.URL_PATTERN.test(url)) {
    return { valid: false, error: 'URL must start with http:// or https://' }
  }
  try {
    new URL(url)
    return { valid: true, error: null }
  } catch {
    return { valid: false, error: 'Invalid URL format' }
  }
}

export const validateDescription = (description) => {
  if (!description) {
    return { valid: false, error: 'Description is required' }
  }
  if (description.length < VALIDATION.DESCRIPTION_MIN) {
    return { valid: false, error: `Description must be at least ${VALIDATION.DESCRIPTION_MIN} characters` }
  }
  if (description.length > VALIDATION.DESCRIPTION_MAX) {
    return { valid: false, error: `Description must not exceed ${VALIDATION.DESCRIPTION_MAX} characters` }
  }
  return { valid: true, error: null }
}

export const validateCategory = (category) => {
  if (!category) {
    return { valid: false, error: 'Category is required' }
  }
  return { valid: true, error: null }
}

export const validateImage = (file) => {
  if (!file) {
    return { valid: true, error: null } // Image is optional
  }
  
  // Check file size
  if (file.size > 5 * 1024 * 1024) { // 5MB
    return { valid: false, error: 'Image size must be less than 5MB' }
  }
  
  // Check file type
  const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif']
  if (!allowedTypes.includes(file.type)) {
    return { valid: false, error: 'Only JPEG, PNG, WebP, and GIF images are allowed' }
  }
  
  return { valid: true, error: null }
}

export const validateToolForm = (formData) => {
  const errors = {}
  
  const nameValidation = validateToolName(formData.name)
  if (!nameValidation.valid) errors.name = nameValidation.error
  
  const urlValidation = validateUrl(formData.link)
  if (!urlValidation.valid) errors.link = urlValidation.error
  
  const descValidation = validateDescription(formData.description)
  if (!descValidation.valid) errors.description = descValidation.error
  
  const categoryValidation = validateCategory(formData.category)
  if (!categoryValidation.valid) errors.category = categoryValidation.error
  
  return {
    valid: Object.keys(errors).length === 0,
    errors
  }
}

export const validateLoginForm = (formData) => {
  const errors = {}
  
  const emailValidation = validateEmail(formData.email)
  if (!emailValidation.valid) errors.email = emailValidation.error
  
  const passwordValidation = validatePassword(formData.password)
  if (!passwordValidation.valid) errors.password = passwordValidation.error
  
  return {
    valid: Object.keys(errors).length === 0,
    errors
  }
}

export const validateSignupForm = (formData) => {
  const errors = {}
  
  if (!formData.displayName) {
    errors.displayName = 'Name is required'
  }
  
  const emailValidation = validateEmail(formData.email)
  if (!emailValidation.valid) errors.email = emailValidation.error
  
  const passwordValidation = validatePassword(formData.password)
  if (!passwordValidation.valid) errors.password = passwordValidation.error
  
  if (formData.password !== formData.confirmPassword) {
    errors.confirmPassword = 'Passwords do not match'
  }
  
  return {
    valid: Object.keys(errors).length === 0,
    errors
  }
}
