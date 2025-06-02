import { alpha } from '@mui/material';
import { socialColors } from '../constants/colors';

export const getGradient = (color: string, opacity?: { start?: number; end?: number }) => {
  const start = opacity?.start ?? 0.2;
  const end = opacity?.end ?? 0.1;
  return `linear-gradient(135deg, ${alpha(color, start)} 0%, ${alpha(color, end)} 100%)`;
};

export const getOverlayGradient = (color: string) => 
  `linear-gradient(rgba(0, 0, 0, 0) 0%, ${alpha(color, 0.2)} 100%)`;

export const getSocialGradient = (network: keyof typeof socialColors) => 
  getGradient(socialColors[network]);