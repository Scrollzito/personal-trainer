import { createContext, useContext, useEffect, useState } from 'react';

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [isDark, setIsDark] = useState(() => {
    try {
      const saved = localStorage.getItem('theme');
      if (saved) return saved === 'dark';
    } catch (error) {
      console.warn('Theme preference is unavailable:', error);
    }
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light');
    try {
      localStorage.setItem('theme', isDark ? 'dark' : 'light');
    } catch (error) {
      console.warn('Theme preference could not be saved:', error);
    }
  }, [isDark]);

  return (
    <ThemeContext.Provider value={{ isDark, toggle: () => setIsDark(d => !d) }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => useContext(ThemeContext);
