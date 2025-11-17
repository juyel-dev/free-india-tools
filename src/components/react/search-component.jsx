import React, { useState, useEffect } from 'react';
import { Search, X, Sliders, Tag, Star, Flag, IndianRupee } from 'lucide-react';
import Input from '../ui/input';
import Button from '../ui/button';
import { useSearch } from '../../hooks/use-search';

const SearchComponent = ({ onSearch }) => {
  const { searchQuery, setSearchQuery, filters, setFilters, recentSearches } =
    useSearch();
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);

  const handleSearch = (e) => {
    e.preventDefault();
    onSearch(searchQuery, filters);
  };

  const handleFilterChange = (filterName, value) => {
    setFilters((prev) => ({ ...prev, [filterName]: value }));
  };

  const clearFilters = () => {
    setFilters({
      category: '',
      rating: '',
      noLogin: false,
      madeInIndia: false,
    });
  };

  return (
    <div className="relative">
      <form onSubmit={handleSearch} className="relative">
        <div className="relative">
          <Input
            type="text"
            placeholder="Search tools by name, category, or tags..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            icon={Search}
            className="pr-20"
          />
          <div className="absolute right-0 top-0 h-full flex items-center">
            {searchQuery && (
              <button
                type="button"
                className="p-2 text-gray-400 hover:text-gray-500"
                onClick={() => setSearchQuery('')}
              >
                <X className="h-5 w-5" />
              </button>
            )}
            <button
              type="button"
              className="p-2 text-gray-400 hover:text-gray-500"
              onClick={() => setIsFiltersOpen(!isFiltersOpen)}
            >
              <Sliders className="h-5 w-5" />
            </button>
          </div>
        </div>
      </form>

      {isFiltersOpen && (
        <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg shadow-inner">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Category
              </label>
              <select
                value={filters.category}
                onChange={(e) => handleFilterChange('category', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-saffron focus:border-saffron"
              >
                <option value="">All Categories</option>
                <option value="ai">AI Tools</option>
                <option value="design">Design</option>
                <option value="education">JEE/NEET</option>
                <option value="freelancing">Freelancing</option>
                <option value="development">Development</option>
                <option value="productivity">Productivity</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Minimum Rating
              </label>
              <select
                value={filters.rating}
                onChange={(e) => handleFilterChange('rating', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-saffron focus:border-saffron"
              >
                <option value="">Any Rating</option>
                <option value="3">3+ Stars</option>
                <option value="4">4+ Stars</option>
                <option value="4.5">4.5+ Stars</option>
              </select>
            </div>
          </div>

          <div className="mt-4 space-y-2">
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={filters.noLogin}
                onChange={(e) => handleFilterChange('noLogin', e.target.checked)}
                className="rounded text-saffron focus:ring-saffron"
              />
              <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">
                No Login Required
              </span>
            </label>

            <label className="flex items-center">
              <input
                type="checkbox"
                checked={filters.madeInIndia}
                onChange={(e) =>
                  handleFilterChange('madeInIndia', e.target.checked)
                }
                className="rounded text-saffron focus:ring-saffron"
              />
              <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">
                Made in India
              </span>
            </label>
          </div>

          <div className="mt-4 flex justify-between">
            <Button variant="outline" size="sm" onClick={clearFilters}>
              Clear Filters
            </Button>
            <Button
              variant="primary"
              size="sm"
              onClick={() => {
                onSearch(searchQuery, filters);
                setIsFiltersOpen(false);
              }}
            >
              Apply Filters
            </Button>
          </div>
        </div>
      )}

      {recentSearches.length > 0 && !isFiltersOpen && (
        <div className="mt-2 p-2 bg-gray-50 dark:bg-gray-800 rounded-lg">
          <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">
            Recent searches:
          </p>
          <div className="flex flex-wrap gap-2">
            {recentSearches.map((search, index) => (
              <button
                key={index}
                type="button"
                className="px-2 py-1 bg-white dark:bg-gray-700 text-xs rounded-full hover:bg-gray-100 dark:hover:bg-gray-600"
                onClick={() => {
                  setSearchQuery(search);
                  onSearch(search, filters);
                }}
              >
                {search}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchComponent;
