import { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext(null);

export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
};

export const ThemeProvider = ({ children }) => {
    // Check for saved theme preference or default to 'dark'
    const [theme, setTheme] = useState(() => {
        // Check if we're in a browser environment
        if (typeof window !== 'undefined') {
            const savedTheme = localStorage.getItem('theme');
            return savedTheme || 'dark';
        }
        return 'dark';
    });

    useEffect(() => {
        // Apply theme to document root
        if (typeof window !== 'undefined') {
            const root = document.documentElement;
            root.setAttribute('data-theme', theme);
            localStorage.setItem('theme', theme);
        }
    }, [theme]);

    const toggleTheme = () => {
        setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
    };

    const value = {
        theme,
        toggleTheme,
        isDark: theme === 'dark',
        isLight: theme === 'light',
    };

    return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};

