import React, { createContext, useContext } from 'react';
import { useThemeSettings } from '../hooks/useThemeSettings';
import type { ThemeSettings, ThemePreset } from '../hooks/useThemeSettings';
import { Theme } from '@mui/material';
import { createCustomTheme } from '../theme'; // Atualizado

interface ThemeContextType {
  themeSettings: ThemeSettings;
  updateTheme: (settings: Partial<ThemeSettings>) => void;
  resetToDefaults: () => void;
  applyPreset: (preset: ThemePreset) => void;
  theme: Theme;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { settings, updateSettings, resetToDefaults, applyPreset } = useThemeSettings();

  // Criar o tema MUI com base nas configurações
  const theme = createCustomTheme({
    mode: settings.mode,
    primaryColor: settings.primaryColor,
    density: settings.density,
    borderRadius: settings.borderRadius
  });

  return (
    <ThemeContext.Provider value={{ 
      themeSettings: settings, 
      updateTheme: updateSettings,
      resetToDefaults,
      applyPreset,
      theme
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