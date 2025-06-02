import { colorPalettes } from './colors';
import { designTokens } from './tokens';

export const densityPresets = {
  comfortable: {
    spacing: 1,
    fontSize: 1
  },
  compact: {
    spacing: 0.875,
    fontSize: 0.875
  },
  dense: {
    spacing: 0.75,
    fontSize: 0.75
  }
} as const;

export const themePresets = {
  modern: {
    mode: 'dark' as const,
    primaryColor: colorPalettes.blue.main,
    density: 'comfortable' as const,
    borderRadius: designTokens.borderRadius.md
  },
  minimal: {
    mode: 'light' as const,
    primaryColor: colorPalettes.indigo.main,
    density: 'compact' as const,
    borderRadius: designTokens.borderRadius.sm
  },
  classic: {
    mode: 'light' as const,
    primaryColor: colorPalettes.teal.main,
    density: 'comfortable' as const,
    borderRadius: designTokens.borderRadius.xs
  }
} as const;

export type ThemePreset = keyof typeof themePresets;