export interface ThemeSettings {
  mode: 'light' | 'dark';
  primaryColor: string;
  menuStyle: 'default' | 'compact';
  fontSize: number;
  borderRadius: number;
}

export interface ThemeContextType {
  themeSettings: ThemeSettings;
  updateTheme: (settings: Partial<ThemeSettings>) => void;
}