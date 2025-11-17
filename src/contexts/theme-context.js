import { createContext, useContext } from 'react';
import { useTheme } from '../hooks/use-theme';

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const theme = useTheme();
  return <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>;
}

export function useThemeContext() {
  return useContext(ThemeContext);
}
