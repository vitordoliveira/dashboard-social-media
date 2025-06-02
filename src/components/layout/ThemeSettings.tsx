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
  Stack,
  Button,
  Tooltip,
  IconButton,
  alpha,
  ToggleButtonGroup,
  ToggleButton,
  Alert,
  Chip,
} from '@mui/material';
import {
  Palette,
  DarkMode,
  LightMode,
  SettingsBackupRestore,
  Check,
  Style,
  Architecture,
  Speed,
  RadioButtonUnchecked,
  Animation,
  ViewCompact,
  ViewStream,
  ViewWeek,
} from '@mui/icons-material';
import { useThemeContext } from '../../context/ThemeContext';
import { colorPalettes, themePresets } from '../../utils/theme';

const densityOptions = [
  { value: 'comfortable', label: 'Confortável', icon: ViewStream },
  { value: 'compact', label: 'Compacto', icon: ViewCompact },
  { value: 'dense', label: 'Denso', icon: ViewWeek },
];

const ThemeSettings = () => {
  const { themeSettings, updateTheme, resetToDefaults, applyPreset } = useThemeContext();
  const theme = useTheme();

  const handlePresetChange = (preset: string) => {
    if (preset in themePresets) {
      applyPreset(preset as keyof typeof themePresets);
    }
  };

  return (
    <Paper 
      sx={{ 
        p: 3,
        background: `linear-gradient(135deg, 
          ${alpha(theme.palette.background.paper, 0.95)} 0%, 
          ${alpha(theme.palette.background.paper, 0.9)} 100%)`,
        backdropFilter: 'blur(10px)',
        border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
      }}
    >
      <Stack spacing={4}>
        {/* Cabeçalho */}
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Typography variant="h6" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Style />
            Personalização
          </Typography>
          <Tooltip title="Restaurar Padrões">
            <IconButton onClick={resetToDefaults} size="small">
              <SettingsBackupRestore />
            </IconButton>
          </Tooltip>
        </Box>

        {/* Presets de Tema */}
        <Box>
          <Typography variant="subtitle2" color="text.secondary" gutterBottom>
            Presets
          </Typography>
          <Stack direction="row" spacing={1}>
            {Object.entries(themePresets).map(([key, preset]) => (
              <Tooltip key={key} title={key.charAt(0).toUpperCase() + key.slice(1)}>
                <Chip
                  label={key.charAt(0).toUpperCase() + key.slice(1)}
                  onClick={() => handlePresetChange(key)}
                  variant={themeSettings.preset === key ? "filled" : "outlined"}
                  color={themeSettings.preset === key ? "primary" : "default"}
                  sx={{ 
                    borderRadius: 1,
                    '& .MuiChip-label': {
                      px: 2
                    }
                  }}
                />
              </Tooltip>
            ))}
          </Stack>
        </Box>

        <Divider />

        {/* Modo Claro/Escuro */}
        <Box>
          <Typography variant="subtitle2" color="text.secondary" gutterBottom>
            Aparência
          </Typography>
          <ToggleButtonGroup
            value={themeSettings.mode}
            exclusive
            onChange={(_, value) => value && updateTheme({ mode: value })}
            sx={{ width: '100%' }}
          >
            <ToggleButton 
              value="light" 
              sx={{ flex: 1, gap: 1 }}
            >
              <LightMode fontSize="small" />
              Claro
            </ToggleButton>
            <ToggleButton 
              value="dark"
              sx={{ flex: 1, gap: 1 }}
            >
              <DarkMode fontSize="small" />
              Escuro
            </ToggleButton>
          </ToggleButtonGroup>
        </Box>

        <Divider />

        {/* Cor Principal */}
        <Box>
          <Typography variant="subtitle2" color="text.secondary" gutterBottom sx={{ mb: 2 }}>
            Cor do Tema
          </Typography>
          <Box 
            sx={{ 
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(48px, 1fr))',
              gap: 1 
            }}
          >
            {Object.entries(colorPalettes).map(([name, palette]) => (
              <Tooltip key={name} title={name.charAt(0).toUpperCase() + name.slice(1)}>
                <Box
                  onClick={() => updateTheme({ primaryColor: palette.main })}
                  sx={{
                    width: 48,
                    height: 48,
                    borderRadius: 1,
                    bgcolor: palette.main,
                    cursor: 'pointer',
                    position: 'relative',
                    transition: 'all 0.2s',
                    border: `2px solid ${
                      themeSettings.primaryColor === palette.main
                        ? palette.light
                        : 'transparent'
                    }`,
                    '&:hover': {
                      transform: 'scale(1.1)',
                    },
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  {themeSettings.primaryColor === palette.main && (
                    <Check sx={{ color: '#fff' }} />
                  )}
                </Box>
              </Tooltip>
            ))}
          </Box>
        </Box>

        <Divider />

        {/* Densidade */}
        <Box>
          <Typography variant="subtitle2" color="text.secondary" gutterBottom>
            Densidade da Interface
          </Typography>
          <ToggleButtonGroup
            value={themeSettings.density}
            exclusive
            onChange={(_, value) => value && updateTheme({ density: value })}
            sx={{ width: '100%' }}
          >
            {densityOptions.map((option) => {
              const Icon = option.icon;
              return (
                <ToggleButton 
                  key={option.value}
                  value={option.value}
                  sx={{ flex: 1, gap: 1 }}
                >
                  <Icon fontSize="small" />
                  {option.label}
                </ToggleButton>
              );
            })}
          </ToggleButtonGroup>
        </Box>

        <Divider />

        {/* Estilo do Menu */}
        <Box>
          <Typography variant="subtitle2" color="text.secondary" gutterBottom>
            Layout do Menu
          </Typography>
          <RadioGroup
            value={themeSettings.menuStyle}
            onChange={(e) => updateTheme({ menuStyle: e.target.value as 'default' | 'compact' | 'mini' })}
          >
            <Stack direction="row" spacing={2}>
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
              <FormControlLabel 
                value="mini" 
                control={<Radio />} 
                label="Mini"
              />
            </Stack>
          </RadioGroup>
        </Box>

        <Divider />

        {/* Opções Adicionais */}
        <Box>
          <Typography variant="subtitle2" color="text.secondary" gutterBottom>
            Outras Opções
          </Typography>
          <Stack spacing={2}>
            <FormControlLabel
              control={
                <Switch
                  checked={themeSettings.isRounded}
                  onChange={(e) => updateTheme({ isRounded: e.target.checked })}
                />
              }
              label="Cantos Arredondados"
            />
            <FormControlLabel
              control={
                <Switch
                  checked={themeSettings.hasShadows}
                  onChange={(e) => updateTheme({ hasShadows: e.target.checked })}
                />
              }
              label="Sombras"
            />
            <FormControlLabel
              control={
                <Switch
                  checked={themeSettings.enableTransitions}
                  onChange={(e) => updateTheme({ enableTransitions: e.target.checked })}
                />
              }
              label="Animações"
            />
            <FormControlLabel
              control={
                <Switch
                  checked={themeSettings.showBreadcrumbs}
                  onChange={(e) => updateTheme({ showBreadcrumbs: e.target.checked })}
                />
              }
              label="Mostrar Navegação"
            />
          </Stack>
        </Box>

        {themeSettings.preset === 'custom' && (
          <Alert severity="info" sx={{ mt: 2 }}>
            Você está usando configurações personalizadas. Selecione um preset para voltar às configurações predefinidas.
          </Alert>
        )}
      </Stack>
    </Paper>
  );
};

export default ThemeSettings;