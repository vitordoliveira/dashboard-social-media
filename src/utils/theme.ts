import { alpha } from '@mui/material';

export const getGradient = (color: string) => `linear-gradient(135deg, ${alpha(color, 0.2)} 0%, ${alpha(color, 0.1)} 100%)`;

export const chartColors = {
  facebook: '#1877F2',
  twitter: '#1DA1F2',
  instagram: '#E4405F',
  linkedin: '#0A66C2'
};