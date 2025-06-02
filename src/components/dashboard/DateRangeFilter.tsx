import React, { useState } from 'react';
import {
  Box,
  ToggleButton,
  ToggleButtonGroup,
  Paper,
  IconButton,
  Popover,
  Button,
  Stack,
  Typography,
  Tooltip,
  useTheme,
  alpha,
  Divider,
  ButtonBase
} from '@mui/material';
import {
  CalendarMonth,
  ChevronLeft,
  ChevronRight,
  Today,
  DateRange as DateRangeIcon,
  RestartAlt,
  ArrowForward
} from '@mui/icons-material';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { format, subDays, startOfDay, endOfDay, isToday, isSameDay, addDays } from 'date-fns';
import { ptBR } from 'date-fns/locale';

interface DateRange {
  start: Date;
  end: Date;
}

interface DateRangeFilterProps {
  value: string;
  onChange: (value: string, dateRange?: DateRange) => void;
  onCustomRangeChange?: (range: DateRange) => void;
}

const predefinedRanges = [
  { label: '7D', value: '7days', days: 7 },
  { label: '30D', value: '30days', days: 30 },
  { label: '90D', value: '90days', days: 90 },
  { label: '1Y', value: '1year', days: 365 },
];

const quickPresets = [
  { label: 'Últimos 7 dias', value: '7days', days: 7 },
  { label: 'Últimos 30 dias', value: '30days', days: 30 },
  { label: 'Este mês', value: 'thisMonth', days: 30 },
  { label: 'Mês passado', value: 'lastMonth', days: 60 },
  { label: 'Últimos 3 meses', value: '90days', days: 90 },
  { label: 'Este ano', value: 'thisYear', days: 365 },
];

const DateRangeFilter: React.FC<DateRangeFilterProps> = ({ 
  value, 
  onChange,
  onCustomRangeChange 
}) => {
  const theme = useTheme();
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const [customRange, setCustomRange] = useState<DateRange>({
    start: subDays(new Date(), 30),
    end: new Date()
  });

  const handleToggleChange = (
    event: React.MouseEvent<HTMLElement>,
    newValue: string | null
  ) => {
    if (newValue !== null) {
      const range = predefinedRanges.find(r => r.value === newValue);
      if (range) {
        const end = endOfDay(new Date());
        const start = startOfDay(subDays(end, range.days));
        onChange(newValue, { start, end });
      }
    }
  };

  const handleCustomClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleApplyCustomRange = () => {
    onChange('custom', customRange);
    onCustomRangeChange?.(customRange);
    handleClose();
  };

  const handleQuickNav = (direction: 'prev' | 'next') => {
    const range = predefinedRanges.find(r => r.value === value);
    if (range) {
      const days = range.days;
      const end = direction === 'next' 
        ? new Date() 
        : subDays(new Date(), days * 2);
      const start = subDays(end, days);
      onChange(value, { start, end });
    }
  };

  const handlePresetClick = (preset: typeof quickPresets[0]) => {
    const end = endOfDay(new Date());
    const start = startOfDay(subDays(end, preset.days));
    onChange(preset.value, { start, end });
    handleClose();
  };

  const formatDateRange = () => {
    const range = predefinedRanges.find(r => r.value === value);
    if (range) {
      const end = new Date();
      const start = subDays(end, range.days);
      return `${format(start, 'dd MMM', { locale: ptBR })} - ${format(end, 'dd MMM', { locale: ptBR })}`;
    }
    return value === 'custom' 
      ? `${format(customRange.start, 'dd MMM', { locale: ptBR })} - ${format(customRange.end, 'dd MMM', { locale: ptBR })}`
      : '';
  };

  const isDateRangeToday = () => {
    const end = new Date();
    return isSameDay(customRange.end, end);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={ptBR}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <Tooltip title="Período anterior">
          <IconButton 
            size="small" 
            onClick={() => handleQuickNav('prev')}
            sx={{ 
              bgcolor: alpha(theme.palette.primary.main, 0.1),
              '&:hover': {
                bgcolor: alpha(theme.palette.primary.main, 0.2),
              }
            }}
          >
            <ChevronLeft />
          </IconButton>
        </Tooltip>

        <Paper sx={{ 
          p: 0.5,
          display: 'flex',
          alignItems: 'center',
          gap: 1,
          bgcolor: alpha(theme.palette.background.paper, 0.8),
          backdropFilter: 'blur(8px)',
          border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
        }}>
          <ToggleButtonGroup
            value={value}
            exclusive
            onChange={handleToggleChange}
            aria-label="date range"
            size="small"
            sx={{
              '& .MuiToggleButton-root': {
                px: 2,
                py: 0.5,
                border: 'none',
                borderRadius: 1,
                '&.Mui-selected': {
                  bgcolor: alpha(theme.palette.primary.main, 0.15),
                  color: theme.palette.primary.main,
                  '&:hover': {
                    bgcolor: alpha(theme.palette.primary.main, 0.25),
                  }
                }
              }
            }}
          >
            {predefinedRanges.map(range => (
              <ToggleButton 
                key={range.value} 
                value={range.value} 
                aria-label={range.label}
              >
                {range.label}
              </ToggleButton>
            ))}
          </ToggleButtonGroup>

          <Divider orientation="vertical" flexItem />

          <Tooltip title="Selecionar período personalizado">
            <IconButton 
              size="small"
              onClick={handleCustomClick}
              sx={{ 
                bgcolor: value === 'custom' 
                  ? alpha(theme.palette.primary.main, 0.15)
                  : 'transparent',
                color: value === 'custom'
                  ? theme.palette.primary.main
                  : theme.palette.text.primary,
                '&:hover': {
                  bgcolor: value === 'custom' 
                    ? alpha(theme.palette.primary.main, 0.25)
                    : alpha(theme.palette.action.hover, 0.1)
                }
              }}
            >
              <CalendarMonth />
            </IconButton>
          </Tooltip>
        </Paper>

        <Tooltip title="Próximo período">
          <IconButton 
            size="small" 
            onClick={() => handleQuickNav('next')}
            disabled={isDateRangeToday()}
            sx={{ 
              bgcolor: alpha(theme.palette.primary.main, 0.1),
              '&:hover': {
                bgcolor: alpha(theme.palette.primary.main, 0.2),
              }
            }}
          >
            <ChevronRight />
          </IconButton>
        </Tooltip>

        <Typography 
          variant="body2" 
          sx={{ 
            ml: 1,
            color: theme.palette.text.secondary,
            fontSize: '0.875rem',
            fontWeight: 500
          }}
        >
          {formatDateRange()}
        </Typography>

        <Popover
          open={Boolean(anchorEl)}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          PaperProps={{
            sx: {
              mt: 1,
              width: 320,
              overflow: 'hidden',
              boxShadow: theme.shadows[8]
            }
          }}
        >
          <Box sx={{ 
            p: 0,
            background: theme.palette.background.paper,
          }}>
            <Box sx={{ 
              p: 2,
              borderBottom: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
              bgcolor: alpha(theme.palette.primary.main, 0.05)
            }}>
              <Typography 
                variant="subtitle1"
                sx={{ 
                  fontWeight: 600,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1
                }}
              >
                <DateRangeIcon sx={{ color: theme.palette.primary.main }} />
                Selecionar Período
              </Typography>
            </Box>

            <Box sx={{ p: 2 }}>
              <Stack spacing={2}>
                <Box>
                  <Typography 
                    variant="caption" 
                    sx={{ 
                      color: theme.palette.text.secondary,
                      mb: 1,
                      display: 'block'
                    }}
                  >
                    Períodos Predefinidos
                  </Typography>
                  <Stack spacing={1}>
                    {quickPresets.map(preset => (
                      <ButtonBase
                        key={preset.value}
                        onClick={() => handlePresetClick(preset)}
                        sx={{
                          p: 1,
                          borderRadius: 1,
                          justifyContent: 'flex-start',
                          transition: 'all 0.2s',
                          '&:hover': {
                            bgcolor: alpha(theme.palette.action.hover, 0.1)
                          }
                        }}
                      >
                        <Typography variant="body2">
                          {preset.label}
                        </Typography>
                      </ButtonBase>
                    ))}
                  </Stack>
                </Box>

                <Divider />

                <Box>
                  <Typography 
                    variant="caption" 
                    sx={{ 
                      color: theme.palette.text.secondary,
                      mb: 1,
                      display: 'block'
                    }}
                  >
                    Período Personalizado
                  </Typography>
                  <Stack spacing={2}>
                    <DatePicker
                      label="Data Inicial"
                      value={customRange.start}
                      onChange={(newValue) => {
                        if (newValue) {
                          setCustomRange(prev => ({ ...prev, start: newValue }));
                        }
                      }}
                      maxDate={customRange.end}
                      slotProps={{
                        textField: {
                          size: "small",
                          fullWidth: true
                        }
                      }}
                    />
                    <DatePicker
                      label="Data Final"
                      value={customRange.end}
                      onChange={(newValue) => {
                        if (newValue) {
                          setCustomRange(prev => ({ ...prev, end: newValue }));
                        }
                      }}
                      minDate={customRange.start}
                      maxDate={new Date()}
                      slotProps={{
                        textField: {
                          size: "small",
                          fullWidth: true
                        }
                      }}
                    />
                  </Stack>
                </Box>

                <Box sx={{ 
                  display: 'flex',
                  gap: 1,
                  mt: 1
                }}>
                  <Button 
                    variant="outlined"
                    onClick={handleClose}
                    startIcon={<RestartAlt />}
                    fullWidth
                  >
                    Cancelar
                  </Button>
                  <Button 
                    variant="contained" 
                    onClick={handleApplyCustomRange}
                    startIcon={<ArrowForward />}
                    fullWidth
                  >
                    Aplicar
                  </Button>
                </Box>
              </Stack>
            </Box>
          </Box>
        </Popover>
      </Box>
    </LocalizationProvider>
  );
};

export default DateRangeFilter;