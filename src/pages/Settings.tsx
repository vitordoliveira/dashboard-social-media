import React from 'react';
import { Box, Typography } from '@mui/material';
import ThemeSettings from '../components/settings/ThemeSettings';

const Settings = () => {
  return (
    <Box sx={{ p: 3, maxWidth: '600px' }}>
      <Typography variant="h5" gutterBottom>
        Configurações
      </Typography>
      <Box sx={{ mt: 3 }}>
        <ThemeSettings />
      </Box>
    </Box>
  );
};

export default Settings;