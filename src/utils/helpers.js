// Utility Helper Functions

export const copyToClipboard = async (text) => {
  try {
    await navigator.clipboard.writeText(text)
    return true
  } catch (error) {
    console.error('Failed to copy:', error)
    return false
  }
}

export const formatNumber = (num) => {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + 'M'
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'K'
  }
  return num.toString()
}

export const formatDate = (date) => {
  if (!date) return ''
  
  const d = date instanceof Date ? date : new Date(date)
  const now = new Date()
  const diff = now - d
  
  const seconds = Math.floor(diff / 1000)
  const minutes = Math.floor(seconds / 60)
  const hours = Math.floor(minutes / 60)
  const days = Math.floor(hours / 24)
  
  if (days > 7) {
    return d.toLocaleDateString('en-IN', { 
      day: 'numeric', 
      month: 'short', 
      year: 'numeric' 
    })
  }
  if (days > 0) return `${days}d ago`
  if (hours > 0) return `${hours}h ago`
  if (minutes > 0) return `${minutes}m ago`
  return 'Just now'
}

export const truncateText = (text, maxLength = 100) => {
  if (!text) return ''
  if (text.length <= maxLength) return text
  return text.substring(0, maxLength) + '...'
}

export const slugify = (text) => {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim()
}

export const debounce = (func, wait = 300) => {
  let timeout
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout)
      func(...args)
    }
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
  }
}

export const generateId = () => {
  return `${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
}

export const getInitials = (name) => {
  if (!name) return '?'
  return name
    .split(' ')
    .map(word => word[0])
    .join('')
    .toUpperCase()
    .substring(0, 2)
}

export const isValidUrl = (url) => {
  try {
    new URL(url)
    return true
  } catch {
    return false
  }
}

export const getAverageRating = (ratings) => {
  if (!ratings || ratings.length === 0) return 0
  const sum = ratings.reduce((acc, rating) => acc + rating, 0)
  return (sum / ratings.length).toFixed(1)
}

export const sortByKey = (array, key, order = 'asc') => {
  return [...array].sort((a, b) => {
    if (order === 'asc') {
      return a[key] > b[key] ? 1 : -1
    }
    return a[key] < b[key] ? 1 : -1
  })
}

export const filterBySearch = (items, searchTerm, keys) => {
  if (!searchTerm) return items
  
  const term = searchTerm.toLowerCase()
  return items.filter(item => 
    keys.some(key => 
      item[key]?.toLowerCase().includes(term)
    )
  )
}

export const getRandomColor = () => {
  const colors = ['#3B82F6', '#8B5CF6', '#EC4899', '#10B981', '#F59E0B', '#EF4444']
  return colors[Math.floor(Math.random() * colors.length)]
}

export const calculatePercentage = (value, total) => {
  if (total === 0) return 0
  return Math.round((value / total) * 100)
}

export const groupBy = (array, key) => {
  return array.reduce((result, item) => {
    const group = item[key]
    if (!result[group]) {
      result[group] = []
    }
    result[group].push(item)
    return result
  }, {})
}

export const removeDuplicates = (array, key) => {
  return array.filter((item, index, self) =>
    index === self.findIndex(t => t[key] === item[key])
  )
}

export const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms))
