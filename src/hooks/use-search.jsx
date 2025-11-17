import { useState, useEffect } from 'react';

export function useSearch() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    category: '',
    rating: '',
    noLogin: false,
    madeInIndia: false,
  });
  const [recentSearches, setRecentSearches] = useState([]);

  // Load recent searches from localStorage
  useEffect(() => {
    const savedSearches = localStorage.getItem('recentSearches');
    if (savedSearches) {
      setRecentSearches(JSON.parse(savedSearches));
    }
  }, []);

  // Save recent searches to localStorage
  useEffect(() => {
    if (searchQuery) {
      setRecentSearches((prev) => {
        const newSearches = [searchQuery, ...prev].filter(
          (search, index, self) => self.indexOf(search) === index
        );
        localStorage.setItem('recentSearches', JSON.stringify(newSearches.slice(0, 10)));
        return newSearches.slice(0, 10);
      });
    }
  }, [searchQuery]);

  return {
    searchQuery,
    setSearchQuery,
    filters,
    setFilters,
    recentSearches,
  };
}
