import React from 'react';
import { Box, Typography, Paper, useTheme, alpha, Container } from '@mui/material';
import { Settings as SettingsIcon } from '@mui/icons-material';
import ThemeSettings from '../components/settings/ThemeSettings';
import type { CommonPageProps } from '../types/ui/routes';

const Settings: React.FC<CommonPageProps> = ({ 
  dateRange, 
  dateRangeType, 
  onDateRangeChange 
}) => {
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === 'dark';

  return (
    <Container maxWidth="lg" disableGutters>
      <Box sx={{ mb: 3, display: 'flex', alignItems: 'center', gap: 1 }}>
        <SettingsIcon 
          sx={{ 
            color: theme.palette.primary.main,
            fontSize: 28,
            filter: isDarkMode ? 'drop-shadow(0 0 1px rgba(255,255,255,0.2))' : 'none'
          }} 
        />
        <Typography 
          variant="h5" 
          sx={{ 
            fontWeight: 600,
            color: theme.palette.text.primary 
          }}
        >
          Configurações
        </Typography>
      </Box>
      
      <Paper
        elevation={isDarkMode ? 0 : 1}
        sx={{
          borderRadius: 2,
          overflow: 'hidden',
          border: isDarkMode ? `1px solid ${alpha(theme.palette.divider, 0.1)}` : 'none',
          position: 'relative',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '4px',
            background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.primary.light})`,
          }
        }}
      >
        <ThemeSettings />
      </Paper>
    </Container>
  );
};

export default Settings;