// Tool Categories Data

export const categories = [
  {
    id: 'ai',
    name: 'AI Tools',
    icon: '🤖',
    color: '#8B5CF6',
    description: 'Artificial Intelligence powered tools for automation and creativity'
  },
  {
    id: 'design',
    name: 'Design',
    icon: '🎨',
    color: '#EC4899',
    description: 'Graphic design, UI/UX, and creative tools'
  },
  {
    id: 'jee-neet',
    name: 'JEE/NEET',
    icon: '📚',
    color: '#10B981',
    description: 'Study materials and tools for competitive exams'
  },
  {
    id: 'freelancing',
    name: 'Freelancing',
    icon: '💼',
    color: '#F59E0B',
    description: 'Tools for freelancers and remote workers'
  },
  {
    id: 'development',
    name: 'Development',
    icon: '💻',
    color: '#3B82F6',
    description: 'Coding, programming, and development tools'
  },
  {
    id: 'productivity',
    name: 'Productivity',
    icon: '⚡',
    color: '#EF4444',
    description: 'Tools to boost your productivity and efficiency'
  },
  {
    id: 'education',
    name: 'Education',
    icon: '🎓',
    color: '#14B8A6',
    description: 'Learning resources and educational platforms'
  },
  {
    id: 'marketing',
    name: 'Marketing',
    icon: '📢',
    color: '#F97316',
    description: 'Digital marketing and social media tools'
  },
  {
    id: 'video',
    name: 'Video Editing',
    icon: '🎬',
    color: '#6366F1',
    description: 'Video editing and production tools'
  },
  {
    id: 'writing',
    name: 'Writing',
    icon: '✍️',
    color: '#84CC16',
    description: 'Writing, editing, and content creation tools'
  },
]

export const getCategoryById = (id) => {
  return categories.find(cat => cat.id === id)
}

export const getCategoryColor = (id) => {
  const category = getCategoryById(id)
  return category ? category.color : '#6B7280'
}

export const getCategoryIcon = (id) => {
  const category = getCategoryById(id)
  return category ? category.icon : '🔧'
}

export default categories
