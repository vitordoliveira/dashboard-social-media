import { Theme, ThemeOptions, alpha, createTheme } from '@mui/material';

// Tokens de Design
const designTokens = {
  borderRadius: {
    xs: 4,
    sm: 8,
    md: 12,
    lg: 16,
    xl: 24
  },
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32
  },
  transitions: {
    duration: {
      shortest: 150,
      shorter: 200,
      short: 250,
      standard: 300,
      complex: 375,
      enteringScreen: 225,
      leavingScreen: 195,
    },
    easing: {
      easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
      easeOut: 'cubic-bezier(0.0, 0, 0.2, 1)',
      easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
      sharp: 'cubic-bezier(0.4, 0, 0.6, 1)',
    },
  }
};

// Paletas Predefinidas
export const colorPalettes = {
  blue: {
    light: '#90CAF9',
    main: '#2196F3',
    dark: '#1565C0',
  },
  indigo: {
    light: '#9FA8DA',
    main: '#3F51B5',
    dark: '#283593',
  },
  purple: {
    light: '#B39DDB',
    main: '#673AB7',
    dark: '#4527A0',
  },
  teal: {
    light: '#80CBC4',
    main: '#009688',
    dark: '#00695C',
  },
  green: {
    light: '#81C784',
    main: '#4CAF50',
    dark: '#2E7D32',
  },
  amber: {
    light: '#FFD54F',
    main: '#FFC107',
    dark: '#FF8F00',
  }
} as const;

// Cores das Redes Sociais
export const socialColors = {
  facebook: '#1877F2',
  twitter: '#1DA1F2',
  instagram: '#E4405F',
  linkedin: '#0A66C2',
  youtube: '#FF0000',
  pinterest: '#E60023',
  tiktok: '#000000'
} as const;

// Configurações de Densidade
const densityPresets = {
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

// Funções de Utilidade
export const getGradient = (color: string, opacity?: { start?: number; end?: number }) => {
  const start = opacity?.start ?? 0.2;
  const end = opacity?.end ?? 0.1;
  return `linear-gradient(135deg, ${alpha(color, start)} 0%, ${alpha(color, end)} 100%)`;
};

export const getOverlayGradient = (color: string) => 
  `linear-gradient(rgba(0, 0, 0, 0) 0%, ${alpha(color, 0.2)} 100%)`;

export const getSocialGradient = (network: keyof typeof socialColors) => 
  getGradient(socialColors[network]);

// Interface para as opções do tema customizado
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

  const baseTheme = createTheme({
    palette: {
      mode,
      primary: {
        main: primaryColor,
        light: alpha(primaryColor, 0.8),
        dark: alpha(primaryColor, 0.9), // Alterado de 1.2 para 0.9
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

// Presets de Tema
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