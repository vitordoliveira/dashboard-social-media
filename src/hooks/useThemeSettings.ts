import { useState, useEffect } from 'react';

interface ThemeSettings {
  mode: 'light' | 'dark';
  primaryColor: string;
  menuStyle: 'default' | 'compact';
  fontSize: number;
  borderRadius: number;
}

const defaultSettings: ThemeSettings = {
  mode: 'dark',
  primaryColor: '#90caf9',
  menuStyle: 'default',
  fontSize: 1,
  borderRadius: 8
};

export const useThemeSettings = () => {
  const [settings, setSettings] = useState<ThemeSettings>(() => {
    try {
      const savedSettings = localStorage.getItem('themeSettings');
      return savedSettings ? { ...defaultSettings, ...JSON.parse(savedSettings) } : defaultSettings;
    } catch {
      return defaultSettings;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('themeSettings', JSON.stringify(settings));
    } catch (error) {
      console.error('Failed to save theme settings:', error);
    }
  }, [settings]);

  const updateSettings = (newSettings: Partial<ThemeSettings>) => {
    setSettings((prev: ThemeSettings) => ({
      ...prev,
      ...newSettings
    }));
  };

  return { settings, updateSettings };
};

export type { ThemeSettings };