import '@mui/material/styles';

declare module '@mui/material/styles' {
  interface Theme {
    status: {
      danger: string;
    };
  }

  interface ThemeOptions {
    status?: {
      danger?: string;
    };
    density?: 'comfortable' | 'compact' | 'dense';
  }

  interface CustomThemeOptions extends ThemeOptions {
    mode?: 'light' | 'dark';
    primaryColor?: string;
    borderRadius?: number;
    density?: 'comfortable' | 'compact' | 'dense';
  }
}

// Adicionando tipagens para componentes específicos
declare module '@mui/material/Button' {
  interface ButtonPropsColorOverrides {
    neutral: true;
  }
}

declare module '@mui/material/Paper' {
  interface PaperPropsVariantOverrides {
    gradient: true;
  }
}

declare module '@mui/material/styles/createPalette' {
  interface TypeBackground {
    gradient?: string;
  }

  interface PaletteOptions {
    neutral?: PaletteColorOptions;
  }

  interface Palette {
    neutral?: PaletteColor;
  }
}

export {};