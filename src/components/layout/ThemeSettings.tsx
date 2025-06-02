import React from 'react';
import {
  Box,
  Typography,
  Switch,
  FormControlLabel,
  RadioGroup,
  Radio,
  Divider,
  Slider,
  Paper,
  useTheme,
  Stack
} from '@mui/material';
import { useThemeContext } from '../../context/ThemeContext';

const colorOptions = [
  { name: 'Default Blue', value: '#90caf9' },
  { name: 'Royal Purple', value: '#b39ddb' },
  { name: 'Forest Green', value: '#81c784' },
  { name: 'Sunset Orange', value: '#ffb74d' },
  { name: 'Ruby Red', value: '#e57373' },
  { name: 'Ocean Blue', value: '#64b5f6' }
];

const fontSizeOptions = [
  { value: 0.8, label: 'Pequeno' },
  { value: 1, label: 'Médio' },
  { value: 1.2, label: 'Grande' }
];

const ThemeSettings = () => {
  const { themeSettings, updateTheme } = useThemeContext();
  const theme = useTheme();

  return (
    <Paper sx={{ p: 3 }}>
      <Typography variant="h6" gutterBottom>
        Personalização
      </Typography>

      <Stack spacing={4}>
        {/* Modo Claro/Escuro */}
        <Box>
          <Typography variant="subtitle1" gutterBottom fontWeight="medium">
            Aparência
          </Typography>
          <FormControlLabel
            control={
              <Switch
                checked={themeSettings.mode === 'dark'}
                onChange={(e) => updateTheme({ mode: e.target.checked ? 'dark' : 'light' })}
              />
            }
            label="Modo Escuro"
          />
        </Box>

        <Divider />

        {/* Cor Principal */}
        <Box>
          <Typography variant="subtitle1" gutterBottom fontWeight="medium">
            Cor do Tema
          </Typography>
          <RadioGroup
            row
            value={themeSettings.primaryColor}
            onChange={(e) => updateTheme({ primaryColor: e.target.value })}
          >
            {colorOptions.map((color) => (
              <FormControlLabel
                key={color.value}
                value={color.value}
                control={
                  <Radio
                    sx={{
                      '&, &.Mui-checked': {
                        color: color.value,
                      },
                    }}
                  />
                }
                label={
                  <Box
                    sx={{
                      width: 24,
                      height: 24,
                      bgcolor: color.value,
                      borderRadius: 1,
                      boxShadow: 1,
                    }}
                  />
                }
                sx={{ mr: 2 }}
              />
            ))}
          </RadioGroup>
        </Box>

        <Divider />

        {/* Estilo do Menu */}
        <Box>
          <Typography variant="subtitle1" gutterBottom fontWeight="medium">
            Layout do Menu
          </Typography>
          <RadioGroup
            value={themeSettings.menuStyle}
            onChange={(e) => updateTheme({ menuStyle: e.target.value as 'default' | 'compact' })}
          >
            <FormControlLabel 
              value="default" 
              control={<Radio />} 
              label="Padrão"
            />
            <FormControlLabel 
              value="compact" 
              control={<Radio />} 
              label="Compacto"
            />
          </RadioGroup>
        </Box>

        <Divider />

        {/* Tamanho da Fonte */}
        <Box>
          <Typography variant="subtitle1" gutterBottom fontWeight="medium">
            Tamanho da Fonte
          </Typography>
          <Slider
            value={themeSettings.fontSize}
            min={0.8}
            max={1.2}
            step={0.1}
            marks={fontSizeOptions}
            onChange={(_, value) => updateTheme({ fontSize: value as number })}
            sx={{ maxWidth: 300 }}
          />
        </Box>
      </Stack>
    </Paper>
  );
};

export default ThemeSettings;