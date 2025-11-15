import { useState, useEffect } from 'react';
import { Search, Filter, Sparkles } from 'lucide-react';
import ToolCard from '@/components/react/tool-card';
import { SkeletonToolCard } from '@/components/ui/skeleton';
import Button from '@/components/ui/button';
import { useTools } from '@/hooks/use-tools';
import { useSearch } from '@/hooks/use-search';
import { CATEGORIES, SORT_OPTIONS } from '@/utils/constants';
import { clsx } from 'clsx';

const HomePage = () => {
  const { tools, loading } = useTools();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('latest');
  const [showFilters, setShowFilters] = useState(false);

  const { searchQuery, setSearchQuery, filteredItems } = useSearch(
    tools.filter((tool) =>
      selectedCategory === 'all' ? true : tool.category === selectedCategory
    ),
    ['name', 'description', 'category']
  );

  // Sort filtered items
  const sortedTools = [...filteredItems].sort((a, b) => {
    const sortOption = SORT_OPTIONS.find((opt) => opt.id === sortBy);
    if (!sortOption) return 0;

    const aValue = a[sortOption.field];
    const bValue = b[sortOption.field];

    if (sortOption.order === 'desc') {
      return bValue > aValue ? 1 : -1;
    }
    return aValue > bValue ? 1 : -1;
  });

  // Separate featured tools
  const featuredTools = sortedTools.filter((tool) => tool.featured);
  const regularTools = sortedTools.filter((tool) => !tool.featured);

  return (
    <div className="min-h-screen pb-20 md:pb-8">
      {/* Hero Section */}
      <div className="hero-gradient border-b border-gray-200 dark:border-dark-800">
        <div className="container py-12 md:py-16">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 text-sm font-medium mb-6">
              <Sparkles size={16} />
              Discover the Best AI Tools
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-4 gradient-text">
              Find Your Perfect AI Tool
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
              Browse {tools.length}+ AI tools for writing, design, coding, and more. All in one place.
            </p>

            {/* Search Bar */}
            <div className="relative max-w-2xl mx-auto">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search AI tools..."
                className="w-full pl-12 pr-4 py-4 rounded-xl border border-gray-300 dark:border-dark-700 bg-white dark:bg-dark-800 text-gray-900 dark:text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 shadow-lg"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="container py-8">
        {/* Categories */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Categories</h2>
            <Button
              variant="ghost"
              size="sm"
              icon={<Filter size={16} />}
              onClick={() => setShowFilters(!showFilters)}
              className="md:hidden"
            >
              Filters
            </Button>
          </div>

          <div className="flex gap-2 overflow-x-auto no-scrollbar pb-2">
            {CATEGORIES.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={clsx(
                  'flex items-center gap-2 px-4 py-2 rounded-lg whitespace-nowrap text-sm font-medium transition-all',
                  selectedCategory === category.id
                    ? 'bg-primary-600 text-white shadow-md'
                    : 'bg-white dark:bg-dark-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-dark-700 border border-gray-200 dark:border-dark-700'
                )}
              >
                <span>{category.icon}</span>
                <span>{category.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Sort Options */}
        <div className="flex items-center justify-between mb-6">
          <div className="text-sm text-gray-600 dark:text-gray-400">
            {searchQuery ? (
              <span>
                Found <strong>{sortedTools.length}</strong> results for "{searchQuery}"
              </span>
            ) : (
              <span>
                Showing <strong>{sortedTools.length}</strong> tools
              </span>
            )}
          </div>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-3 py-1.5 rounded-lg border border-gray-300 dark:border-dark-700 bg-white dark:bg-dark-800 text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
          >
            {SORT_OPTIONS.map((option) => (
              <option key={option.id} value={option.id}>
                {option.name}
              </option>
            ))}
          </select>
        </div>

        {/* Featured Tools */}
        {featuredTools.length > 0 && !searchQuery && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
              <Sparkles className="text-yellow-500" />
              Featured Tools
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredTools.map((tool) => (
                <ToolCard key={tool.id} tool={tool} />
              ))}
            </div>
          </div>
        )}

        {/* All Tools */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <SkeletonToolCard key={i} />
            ))}
          </div>
        ) : regularTools.length > 0 ? (
          <>
            {featuredTools.length > 0 && !searchQuery && (
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                All Tools
              </h2>
            )}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {regularTools.map((tool) => (
                <ToolCard key={tool.id} tool={tool} />
              ))}
            </div>
          </>
        ) : (
          <div className="empty-state">
            <div className="empty-state-icon">
              <Search size={64} />
            </div>
            <h3 className="empty-state-title">No tools found</h3>
            <p className="empty-state-description">
              Try adjusting your search or filters to find what you're looking for.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;
