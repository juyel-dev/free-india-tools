// Category data with icons and descriptions
export const categories = [
  {
    id: 'all',
    name: 'All Tools',
    icon: '🌐',
    color: 'gray',
    description: 'Browse all AI tools',
    count: 0,
  },
  {
    id: 'writing',
    name: 'Writing',
    icon: '✍️',
    color: 'blue',
    description: 'AI tools for writing, content creation, and copywriting',
    count: 0,
  },
  {
    id: 'design',
    name: 'Design',
    icon: '🎨',
    color: 'purple',
    description: 'AI-powered design and creative tools',
    count: 0,
  },
  {
    id: 'coding',
    name: 'Coding',
    icon: '💻',
    color: 'green',
    description: 'AI coding assistants and development tools',
    count: 0,
  },
  {
    id: 'marketing',
    name: 'Marketing',
    icon: '📈',
    color: 'pink',
    description: 'AI marketing and advertising tools',
    count: 0,
  },
  {
    id: 'video',
    name: 'Video',
    icon: '🎥',
    color: 'red',
    description: 'AI video creation and editing tools',
    count: 0,
  },
  {
    id: 'audio',
    name: 'Audio',
    icon: '🎵',
    color: 'yellow',
    description: 'AI audio and music generation tools',
    count: 0,
  },
  {
    id: 'productivity',
    name: 'Productivity',
    icon: '⚡',
    color: 'orange',
    description: 'AI productivity and workflow tools',
    count: 0,
  },
  {
    id: 'research',
    name: 'Research',
    icon: '🔬',
    color: 'indigo',
    description: 'AI research and analysis tools',
    count: 0,
  },
  {
    id: 'chatbot',
    name: 'Chatbot',
    icon: '💬',
    color: 'teal',
    description: 'AI chatbots and conversational AI',
    count: 0,
  },
  {
    id: 'image',
    name: 'Image',
    icon: '🖼️',
    color: 'cyan',
    description: 'AI image generation and editing',
    count: 0,
  },
  {
    id: 'seo',
    name: 'SEO',
    icon: '🔍',
    color: 'lime',
    description: 'AI SEO and optimization tools',
    count: 0,
  },
  {
    id: 'other',
    name: 'Other',
    icon: '📦',
    color: 'slate',
    description: 'Other AI tools',
    count: 0,
  },
];

export const getCategoryById = (id) => {
  return categories.find((cat) => cat.id === id) || categories[0];
};

export const getCategoryColor = (categoryId) => {
  const category = getCategoryById(categoryId);
  return category.color;
};

export const getCategoryIcon = (categoryId) => {
  const category = getCategoryById(categoryId);
  return category.icon;
};

export default categories;
