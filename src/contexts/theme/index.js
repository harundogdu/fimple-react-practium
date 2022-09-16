import { createContext, useContext, useEffect, useState } from 'react';

const initialState = {
  theme: JSON.parse(localStorage.getItem('theme')) || 'light'
};

const ThemeContext = createContext(initialState);

const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(initialState.theme);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', JSON.stringify(newTheme));
  };

  const value = {
    theme,
    toggleTheme
  };

  useEffect(() => {
    document.body.className = theme;
  }, [theme]);

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
};

const useTheme = () => useContext(ThemeContext);

export default ThemeProvider;
export { useTheme };
