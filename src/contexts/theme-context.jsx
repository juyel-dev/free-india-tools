import { createContext, useContext } from 'react';
import { useTheme } from '../hooks/use-theme';

// Create Theme Context
const ThemeContext = createContext();

// Theme Provider
export function ThemeProvider({ children }) {
  const theme = useTheme();
  return <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>;
}

// এই হুকটা রি-এক্সপোর্ট করো (সবচেয়ে জরুরি!)
export { useTheme };

// Optional: Custom hook (যদি দরকার হয়)
export function useThemeContext() {
  return useContext(ThemeContext);
}
