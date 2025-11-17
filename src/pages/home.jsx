import React, { useState, useEffect } from 'react';
import { useTools } from '../hooks/use-tools';
import { useAuth } from '../contexts/auth-context';
import ToolCard from '../components/react/tool-card';
import SearchComponent from '../components/react/search-component';
import Skeleton from '../components/ui/skeleton';
import Card from '../components/ui/card';
import { Star, Flame, Clock, IndianRupee } from 'lucide-react';

const Home = () => {
  const { tools, loading, favoriteTool, reportTool } = useTools();
  const { user } = useAuth();
  const [filteredTools, setFilteredTools] = useState([]);
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    category: '',
    rating: '',
    noLogin: false,
    madeInIndia: false,
  });

  useEffect(() => {
    let result = [...tools];

    // Apply search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (tool) =>
          tool.name.toLowerCase().includes(query) ||
          tool.description.toLowerCase().includes(query) ||
          tool.tags.some((tag) => tag.toLowerCase().includes(query))
      );
    }

    // Apply filters
    if (filters.category) {
      result = result.filter((tool) => tool.category === filters.category);
    }
    if (filters.rating) {
      result = result.filter((tool) => tool.rating >= parseFloat(filters.rating));
    }
    if (filters.noLogin) {
      result = result.filter((tool) => tool.noLogin);
    }
    if (filters.madeInIndia) {
      result = result.filter((tool) => tool.madeInIndia);
    }

    // Apply active filter
    switch (activeFilter) {
      case 'trending':
        result.sort((a, b) => b.clicks - a.clicks);
        break;
      case 'newest':
        result.sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
        break;
      case 'top-rated':
        result.sort((a, b) => b.rating - a.rating);
        break;
      case 'made-in-india':
        result = result.filter((tool) => tool.madeInIndia);
        break;
      default:
        // Default sorting (could be by featured, etc.)
        result.sort((a, b) => {
          if (a.featured && !b.featured) return -1;
          if (!a.featured && b.featured) return 1;
          return b.rating - a.rating;
        });
    }

    setFilteredTools(result);
  }, [tools, searchQuery, filters, activeFilter]);

  const handleSearch = (query, newFilters) => {
    setSearchQuery(query);
    setFilters(newFilters);
  };

  const filterOptions = [
    { id: 'all', label: 'All Tools', icon: null },
    { id: 'trending', label: 'Trending', icon: Flame },
    { id: 'newest', label: 'Newest', icon: Clock },
    { id: 'top-rated', label: 'Top Rated', icon: Star },
    { id: 'made-in-india', label: 'Made in India', icon: IndianRupee },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">
          Discover Free Tools
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Browse our collection of 100% free tools for students, freelancers,
          and startups
        </p>
      </div>

      <SearchComponent onSearch={handleSearch} />

      <div className="mt-6">
        <div className="flex overflow-x-auto pb-2 mb-4">
          {filterOptions.map((filter) => (
            <button
              key={filter.id}
              onClick={() => setActiveFilter(filter.id)}
              className={`flex items-center px-4 py-2 rounded-full text-sm font-medium mr-2 whitespace-nowrap ${
                activeFilter === filter.id
                  ? 'bg-saffron text-white'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
              }`}
            >
              {filter.icon && (
                <filter.icon className="h-4 w-4 mr-2" />
              )}
              {filter.label}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, index) => (
              <Skeleton key={index} type="card" />
            ))}
          </div>
        ) : filteredTools.length === 0 ? (
          <Card padding="lg" className="text-center">
            <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">
              No tools found
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Try adjusting your search or filters
            </p>
          </Card>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTools.map((tool) => (
              <ToolCard
                key={tool.id}
                tool={tool}
                onFavorite={favoriteTool}
                onReport={reportTool}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
