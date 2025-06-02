import { useState, useEffect } from 'react';
import { colorPalettes, themePresets, type ThemePreset } from '../theme'; // Atualizado

export interface ThemeSettings {
  mode: 'light' | 'dark';
  primaryColor: string;
  menuStyle: 'default' | 'compact' | 'mini';
  density: 'comfortable' | 'compact' | 'dense';
  borderRadius: number;
  preset: ThemePreset | 'custom';
  isRounded: boolean;
  hasShadows: boolean;
  enableTransitions: boolean;
  showBreadcrumbs: boolean;
}

const defaultSettings: ThemeSettings = {
  mode: 'dark',
  primaryColor: colorPalettes.blue.main,
  menuStyle: 'default',
  density: 'comfortable',
  borderRadius: 8,
  preset: 'modern',
  isRounded: true,
  hasShadows: true,
  enableTransitions: true,
  showBreadcrumbs: true
};

const STORAGE_KEY = 'app_theme_settings';

export const useThemeSettings = () => {
  const [settings, setSettings] = useState<ThemeSettings>(() => {
    try {
      const savedSettings = localStorage.getItem(STORAGE_KEY);
      if (savedSettings) {
        const parsedSettings = JSON.parse(savedSettings);
        // Validar configurações salvas
        const isValidMode = ['light', 'dark'].includes(parsedSettings.mode);
        const isValidMenuStyle = ['default', 'compact', 'mini'].includes(parsedSettings.menuStyle);
        const isValidDensity = ['comfortable', 'compact', 'dense'].includes(parsedSettings.density);
        const isValidPreset = ['modern', 'minimal', 'classic', 'custom'].includes(parsedSettings.preset);

        if (!isValidMode || !isValidMenuStyle || !isValidDensity || !isValidPreset) {
          console.warn('Invalid theme settings found, resetting to defaults');
          return defaultSettings;
        }

        return {
          ...defaultSettings,
          ...parsedSettings
        };
      }
      return defaultSettings;
    } catch (error) {
      console.error('Failed to load theme settings:', error);
      return defaultSettings;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
    } catch (error) {
      console.error('Failed to save theme settings:', error);
    }
  }, [settings]);

  const updateSettings = (newSettings: Partial<ThemeSettings>) => {
    setSettings(prev => {
      const updated = { ...prev, ...newSettings };
      
      // Se um preset for selecionado, aplicar suas configurações
      if (newSettings.preset && newSettings.preset !== 'custom') {
        const presetConfig = themePresets[newSettings.preset];
        return {
          ...updated,
          ...presetConfig,
          preset: newSettings.preset
        };
      }

      return updated;
    });
  };

  const resetToDefaults = () => {
    setSettings(defaultSettings);
  };

  const applyPreset = (preset: ThemePreset) => {
    updateSettings({
      ...themePresets[preset],
      preset
    });
  };

  return { 
    settings, 
    updateSettings,
    resetToDefaults,
    applyPreset
  };
};

export type { ThemePreset };