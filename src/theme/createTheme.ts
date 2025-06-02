import { Theme, ThemeOptions, alpha, createTheme as createMuiTheme } from '@mui/material';
import { colorPalettes } from './constants/colors';
import { densityPresets } from './constants/presets';
import { designTokens } from './constants/tokens';

export interface CustomThemeOptions extends ThemeOptions {
  mode?: 'light' | 'dark';
  primaryColor?: string;
  density?: keyof typeof densityPresets;
  borderRadius?: number;
}

export const createCustomTheme = (options: CustomThemeOptions): Theme => {
  const {
    mode = 'dark',
    density = 'comfortable',
    primaryColor = colorPalettes.blue.main,
    borderRadius = designTokens.borderRadius.sm,
  } = options;

  const densitySettings = densityPresets[density];

  const baseTheme = createMuiTheme({
    palette: {
      mode,
      primary: {
        main: primaryColor,
        light: alpha(primaryColor, 0.8),
        dark: alpha(primaryColor, 0.9),
        contrastText: '#fff'
      },
      background: {
        default: mode === 'dark' ? '#121212' : '#f5f5f5',
        paper: mode === 'dark' ? '#1E1E1E' : '#ffffff',
      },
      text: {
        primary: mode === 'dark' ? '#ffffff' : '#2B3445',
        secondary: mode === 'dark' ? '#B0B7C3' : '#373F50',
      },
    },
    typography: {
      fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
      fontSize: 14 * densitySettings.fontSize,
      h1: {
        fontSize: '2.5rem',
        fontWeight: 600,
        lineHeight: 1.2
      },
      h2: {
        fontSize: '2rem',
        fontWeight: 600,
        lineHeight: 1.3
      },
      h3: {
        fontSize: '1.75rem',
        fontWeight: 600,
        lineHeight: 1.3
      },
      h4: {
        fontSize: '1.5rem',
        fontWeight: 600,
        lineHeight: 1.4
      },
      h5: {
        fontSize: '1.25rem',
        fontWeight: 600,
        lineHeight: 1.4
      },
      h6: {
        fontSize: '1rem',
        fontWeight: 600,
        lineHeight: 1.4
      },
      subtitle1: {
        fontSize: '1rem',
        fontWeight: 500,
        lineHeight: 1.4
      },
      subtitle2: {
        fontSize: '0.875rem',
        fontWeight: 500,
        lineHeight: 1.4
      },
      body1: {
        fontSize: '1rem',
        lineHeight: 1.5
      },
      body2: {
        fontSize: '0.875rem',
        lineHeight: 1.5
      },
      button: {
        textTransform: 'none',
        fontWeight: 600
      }
    },
    shape: {
      borderRadius
    },
    spacing: 8 * densitySettings.spacing,
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: borderRadius,
            textTransform: 'none',
            fontWeight: 600,
            padding: '6px 16px'
          }
        }
      },
      MuiCard: {
        styleOverrides: {
          root: {
            borderRadius: borderRadius,
            backgroundImage: 'none'
          }
        }
      },
      MuiPaper: {
        styleOverrides: {
          root: {
            backgroundImage: 'none'
          }
        }
      },
      MuiTableCell: {
        styleOverrides: {
          root: {
            borderBottom: `1px solid ${mode === 'dark' ? alpha('#fff', 0.1) : alpha('#000', 0.1)}`
          }
        }
      }
    }
  });

  return baseTheme;
};