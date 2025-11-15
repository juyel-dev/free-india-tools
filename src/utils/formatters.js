// Data Formatting Functions

export const formatNumber = (num) => {
  if (typeof num !== 'number') return '0'
  
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1).replace(/\.0$/, '') + 'M'
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1).replace(/\.0$/, '') + 'K'
  }
  return num.toString()
}

export const formatCurrency = (amount, currency = '₹') => {
  if (typeof amount !== 'number') return `${currency}0`
  return `${currency}${amount.toLocaleString('en-IN')}`
}

export const formatDate = (date, format = 'relative') => {
  if (!date) return ''
  
  const d = date instanceof Date ? date : new Date(date)
  
  if (format === 'relative') {
    const now = new Date()
    const diff = now - d
    
    const seconds = Math.floor(diff / 1000)
    const minutes = Math.floor(seconds / 60)
    const hours = Math.floor(minutes / 60)
    const days = Math.floor(hours / 24)
    const months = Math.floor(days / 30)
    const years = Math.floor(days / 365)
    
    if (years > 0) return `${years}y ago`
    if (months > 0) return `${months}mo ago`
    if (days > 0) return `${days}d ago`
    if (hours > 0) return `${hours}h ago`
    if (minutes > 0) return `${minutes}m ago`
    return 'Just now'
  }
  
  if (format === 'short') {
    return d.toLocaleDateString('en-IN', { 
      day: 'numeric', 
      month: 'short' 
    })
  }
  
  if (format === 'long') {
    return d.toLocaleDateString('en-IN', { 
      day: 'numeric', 
      month: 'long', 
      year: 'numeric' 
    })
  }
  
  return d.toLocaleDateString('en-IN')
}

export const formatTime = (date) => {
  if (!date) return ''
  
  const d = date instanceof Date ? date : new Date(date)
  return d.toLocaleTimeString('en-IN', { 
    hour: '2-digit', 
    minute: '2-digit' 
  })
}

export const formatDateTime = (date) => {
  if (!date) return ''
  return `${formatDate(date, 'long')} at ${formatTime(date)}`
}

export const formatPercentage = (value, total) => {
  if (total === 0) return '0%'
  const percentage = (value / total) * 100
  return `${percentage.toFixed(1)}%`
}

export const formatRating = (rating) => {
  if (typeof rating !== 'number') return '0.0'
  return rating.toFixed(1)
}

export const formatFileSize = (bytes) => {
  if (bytes === 0) return '0 Bytes'
  
  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  
  return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i]
}

export const formatPhoneNumber = (phone) => {
  if (!phone) return ''
  
  // Remove all non-numeric characters
  const cleaned = phone.replace(/\D/g, '')
  
  // Format as Indian phone number
  if (cleaned.length === 10) {
    return `+91 ${cleaned.slice(0, 5)} ${cleaned.slice(5)}`
  }
  
  return phone
}

export const formatUrl = (url) => {
  if (!url) return ''
  
  try {
    const urlObj = new URL(url)
    return urlObj.hostname.replace('www.', '')
  } catch {
    return url
  }
}

export const formatText = (text, maxLength = 100) => {
  if (!text) return ''
  if (text.length <= maxLength) return text
  return text.substring(0, maxLength) + '...'
}

export const formatUsername = (email) => {
  if (!email) return 'User'
  return email.split('@')[0]
}

export const formatInitials = (name) => {
  if (!name) return '?'
  return name
    .split(' ')
    .map(word => word[0])
    .join('')
    .toUpperCase()
    .substring(0, 2)
}

export const formatSlug = (text) => {
  if (!text) return ''
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim()
}

export const formatSearchQuery = (query) => {
  if (!query) return ''
  return query.trim().toLowerCase()
}

export const formatTags = (tags) => {
  if (!Array.isArray(tags)) return []
  return tags.map(tag => tag.toLowerCase().trim())
}
