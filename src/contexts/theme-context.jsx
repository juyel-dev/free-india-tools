import { createContext, useState, useEffect } from 'react';
import { storage } from '@/utils/helpers';
import { STORAGE_KEYS } from '@/utils/constants';
import { trackThemeChange } from '@/services/analytics';

export const ThemeContext = createContext({});

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(() => {
    // Check local storage first
    const savedTheme = storage.get(STORAGE_KEYS.THEME);
    if (savedTheme) return savedTheme;

    // Check system preference
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark';
    }

    return 'light';
  });

  useEffect(() => {
    const root = window.document.documentElement;

    // Remove old theme class
    root.classList.remove('light', 'dark');

    // Add new theme class
    root.classList.add(theme);

    // Save to local storage
    storage.set(STORAGE_KEYS.THEME, theme);
  }, [theme]);

  // Listen for system theme changes
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

    const handleChange = (e) => {
      const savedTheme = storage.get(STORAGE_KEYS.THEME);
      // Only auto-change if user hasn't manually set a preference
      if (!savedTheme) {
        setTheme(e.matches ? 'dark' : 'light');
      }
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    trackThemeChange(newTheme);
  };

  const setLightTheme = () => {
    setTheme('light');
    trackThemeChange('light');
  };

  const setDarkTheme = () => {
    setTheme('dark');
    trackThemeChange('dark');
  };

  const value = {
    theme,
    toggleTheme,
    setLightTheme,
    setDarkTheme,
    isDark: theme === 'dark',
    isLight: theme === 'light',
  };

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};

export default ThemeContext;
