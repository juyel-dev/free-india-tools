import { useState, useEffect, useMemo } from 'react';
import { debounce } from '@/utils/helpers';
import { SEARCH_DEBOUNCE_TIME } from '@/utils/constants';
import { trackSearch } from '@/services/analytics';

export const useSearch = (items = [], searchFields = ['name', 'description']) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');

  // Debounce search query
  useEffect(() => {
    const handler = debounce(() => {
      setDebouncedQuery(searchQuery);
      if (searchQuery) {
        trackSearch(searchQuery, filteredItems.length);
      }
    }, SEARCH_DEBOUNCE_TIME);

    handler();
  }, [searchQuery]);

  // Filter items based on search query
  const filteredItems = useMemo(() => {
    if (!debouncedQuery.trim()) {
      return items;
    }

    const query = debouncedQuery.toLowerCase();

    return items.filter((item) => {
      return searchFields.some((field) => {
        const value = item[field];
        if (typeof value === 'string') {
          return value.toLowerCase().includes(query);
        }
        if (Array.isArray(value)) {
          return value.some((v) =>
            typeof v === 'string' && v.toLowerCase().includes(query)
          );
        }
        return false;
      });
    });
  }, [items, debouncedQuery, searchFields]);

  return {
    searchQuery,
    setSearchQuery,
    filteredItems,
    resultsCount: filteredItems.length,
    hasResults: filteredItems.length > 0,
    isSearching: searchQuery.trim() !== '',
  };
};

export default useSearch;
