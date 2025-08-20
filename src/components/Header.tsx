import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Moon, Sun } from 'lucide-react';

interface ThemeContextType {
  isDarkMode: boolean;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType>({
  isDarkMode: false,
  toggleTheme: () => {},
});

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add('dark-theme');
    } else {
      document.body.classList.remove('dark-theme');
    }
  }, [isDarkMode]);

  const toggleTheme = () => setIsDarkMode(prev => !prev);

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);

const Header = () => {
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <header>
      <img src="../images/Timeline logo.jpg" alt="Timeline logo" width="50" />
      <div className="theme-toggle">
        <input
          type="checkbox"
          id="theme-switch"
          checked={isDarkMode}
          onChange={toggleTheme}
        />
        <label htmlFor="theme-switch">Dark Mode</label>
      </div>
    </header>
  );
};

export default Header;
