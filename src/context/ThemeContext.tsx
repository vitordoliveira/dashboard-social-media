import React, { createContext, useContext } from 'react';
import { useThemeSettings } from '../hooks/useThemeSettings';
import type { ThemeSettings } from '../hooks/useThemeSettings';

interface ThemeContextType {
  themeSettings: ThemeSettings;
  updateTheme: (settings: Partial<ThemeSettings>) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { settings, updateSettings } = useThemeSettings();

  return (
    <ThemeContext.Provider value={{ 
      themeSettings: settings, 
      updateTheme: updateSettings 
    }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useThemeContext = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useThemeContext must be used within a ThemeProvider');
  }
  return context;
};