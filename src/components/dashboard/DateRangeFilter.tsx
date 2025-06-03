import React, { useState, useEffect } from 'react';
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
  ButtonBase,
  useMediaQuery
} from '@mui/material';
import {
  CalendarMonth,
  ChevronLeft,
  ChevronRight,
  Today,
  DateRange as DateRangeIcon,
  RestartAlt,
  ArrowForward,
  CheckCircle
} from '@mui/icons-material';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { 
  format, 
  subDays, 
  startOfDay, 
  endOfDay, 
  isToday, 
  isSameDay, 
  addDays, 
  subMonths, 
  startOfMonth, 
  endOfMonth, 
  startOfYear,
  differenceInDays
} from 'date-fns';
import { ptBR } from 'date-fns/locale';

interface DateRange {
  start: Date;
  end: Date;
}

interface DateRangeFilterProps {
  value: string;
  onChange: (value: string, dateRange?: DateRange) => void;
  onCustomRangeChange?: (range: DateRange) => void;
  position?: 'left' | 'right' | 'center';
  showCompare?: boolean;
}

const predefinedRanges = [
  { label: '7D', value: '7days', days: 7 },
  { label: '30D', value: '30days', days: 30 },
  { label: '90D', value: '90days', days: 90 },
  { label: '1A', value: '1year', days: 365 },
];

const quickPresets = [
  { label: 'Hoje', value: 'today', days: 0, icon: <Today fontSize="small" /> },
  { label: 'Últimos 7 dias', value: '7days', days: 7 },
  { label: 'Últimos 30 dias', value: '30days', days: 30 },
  { label: 'Este mês', value: 'thisMonth', custom: true },
  { label: 'Mês passado', value: 'lastMonth', custom: true },
  { label: 'Últimos 3 meses', value: '90days', days: 90 },
  { label: 'Este ano', value: 'thisYear', custom: true },
];

const DateRangeFilter: React.FC<DateRangeFilterProps> = ({ 
  value, 
  onChange,
  onCustomRangeChange,
  position = 'left',
  showCompare = false
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isDarkMode = theme.palette.mode === 'dark';
  
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const [customRange, setCustomRange] = useState<DateRange>({
    start: subDays(new Date(), 30),
    end: new Date()
  });
  const [compareMode, setCompareMode] = useState<boolean>(false);
  const [compareRange, setCompareRange] = useState<DateRange | null>(null);
  const [currentRange, setCurrentRange] = useState<DateRange>({
    start: subDays(new Date(), 30),
    end: new Date()
  });

  // Atualizar customRange e currentRange baseado no valor atual
  useEffect(() => {
    const end = new Date();
    let start: Date;
    let rangeEnd: Date = end;
    
    if (value === 'custom') {
      // Se for custom, mantenha o range já definido
      return;
    } else if (value === 'today') {
      start = startOfDay(end);
      rangeEnd = endOfDay(end);
    } else if (value === 'thisMonth') {
      start = startOfMonth(end);
    } else if (value === 'lastMonth') {
      const lastMonth = subMonths(end, 1);
      start = startOfMonth(lastMonth);
      rangeEnd = endOfMonth(lastMonth);
    } else if (value === 'thisYear') {
      start = startOfYear(end);
    } else {
      // Para valores padrão que usam dias
      const range = predefinedRanges.find(r => r.value === value) || 
                    quickPresets.find(p => p.value === value && typeof p.days === 'number');
      const days = range?.days || 30;
      start = startOfDay(subDays(end, days));
    }
    
    const newRange = {
      start,
      end: rangeEnd
    };
    
    setCustomRange(newRange);
    setCurrentRange(newRange);
  }, [value]);

  const handleToggleChange = (
    event: React.MouseEvent<HTMLElement>,
    newValue: string | null
  ) => {
    if (newValue !== null) {
      const end = new Date();
      let start: Date;
      let rangeEnd: Date = end;
      
      // Verificar se é um dos presets personalizados
      if (newValue === 'today') {
        start = startOfDay(end);
        rangeEnd = endOfDay(end);
      } else if (newValue === 'thisMonth') {
        start = startOfMonth(end);
      } else if (newValue === 'lastMonth') {
        const lastMonth = subMonths(end, 1);
        start = startOfMonth(lastMonth);
        rangeEnd = endOfMonth(lastMonth);
      } else if (newValue === 'thisYear') {
        start = startOfYear(end);
      } else {
        // Buscar dias dos períodos predefinidos
        const range = predefinedRanges.find(r => r.value === newValue) ||
                     quickPresets.find(p => p.value === newValue && typeof p.days === 'number');
        const days = range?.days || 30;
        start = startOfDay(subDays(end, days));
      }
      
      const dateRange = {
        start,
        end: rangeEnd
      };
      
      onChange(newValue, dateRange);
      setCurrentRange(dateRange);
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
    setCurrentRange(customRange);
    handleClose();
  };

  // Função melhorada para navegar entre períodos
  const handleQuickNav = (direction: 'prev' | 'next') => {
    // Calcular a duração do período atual em dias
    const rangeStart = currentRange.start;
    const rangeEnd = currentRange.end;
    const rangeDays = differenceInDays(rangeEnd, rangeStart) + 1; // +1 para incluir o próprio dia
    
    let newStart: Date;
    let newEnd: Date;
    
    if (direction === 'prev') {
      // Período anterior: move o período atual para trás
      newEnd = subDays(rangeStart, 1); // Dia anterior ao início atual
      newStart = subDays(newEnd, rangeDays - 1); // Mantém a mesma duração
    } else {
      // Próximo período: move o período atual para frente
      // Não permitir avançar além de hoje
      if (isToday(rangeEnd)) {
        return; // Se já estiver no dia atual, não faz nada
      }
      
      newStart = addDays(rangeEnd, 1); // Dia seguinte ao fim atual
      newEnd = addDays(newStart, rangeDays - 1); // Mantém a mesma duração
      
      // Se o novo fim ultrapassar hoje, ajusta para hoje
      const today = new Date();
      if (newEnd > today) {
        newEnd = today;
        newStart = subDays(newEnd, rangeDays - 1);
      }
    }
    
    const newRange = { start: newStart, end: newEnd };
    
    // Para períodos personalizados, mantenha o valor 'custom'
    if (value === 'custom') {
      setCustomRange(newRange);
      onChange('custom', newRange);
    } 
    // Para períodos pré-definidos, mantenha o mesmo valor
    else {
      onChange(value, newRange);
    }
    
    setCurrentRange(newRange);
  };

  const handlePresetClick = (preset: typeof quickPresets[0]) => {
    const end = new Date();
    let start: Date;
    let rangeEnd: Date = end;
    
    if (preset.custom) {
      if (preset.value === 'thisMonth') {
        start = startOfMonth(end);
      } else if (preset.value === 'lastMonth') {
        const lastMonth = subMonths(end, 1);
        start = startOfMonth(lastMonth);
        rangeEnd = endOfMonth(lastMonth);
      } else if (preset.value === 'thisYear') {
        start = startOfYear(end);
      } else {
        start = startOfDay(subDays(end, 30)); // Fallback
      }
    } else if (preset.value === 'today') {
      start = startOfDay(end);
      rangeEnd = endOfDay(end);
    } else {
      const days = typeof preset.days === 'number' ? preset.days : 30;
      start = startOfDay(subDays(end, days));
    }
    
    const dateRange = { start, end: rangeEnd };
    onChange(preset.value, dateRange);
    setCurrentRange(dateRange);
    handleClose();
  };

  const formatDateRange = () => {
    return `${format(currentRange.start, 'dd MMM', { locale: ptBR })} - ${format(currentRange.end, 'dd MMM', { locale: ptBR })}`;
  };

  const isNextDisabled = isToday(currentRange.end);

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={ptBR}>
      <Box sx={{ 
        display: 'flex', 
        alignItems: 'center', 
        gap: 1,
        justifyContent: position === 'center' ? 'center' : position === 'right' ? 'flex-end' : 'flex-start',
        flexWrap: isMobile ? 'wrap' : 'nowrap'
      }}>
        <Tooltip title="Período anterior">
          <IconButton 
            size="small" 
            onClick={() => handleQuickNav('prev')}
            sx={{ 
              bgcolor: isDarkMode 
                ? alpha(theme.palette.primary.main, 0.15) 
                : alpha(theme.palette.primary.main, 0.08),
              color: theme.palette.primary.main,
              width: 32,
              height: 32,
              borderRadius: '8px',
              '&:hover': {
                bgcolor: isDarkMode 
                  ? alpha(theme.palette.primary.main, 0.25) 
                  : alpha(theme.palette.primary.main, 0.12),
              },
              transition: 'all 0.2s ease'
            }}
          >
            <ChevronLeft fontSize="small" />
          </IconButton>
        </Tooltip>

        <Paper sx={{ 
          p: '2px',
          display: 'flex',
          alignItems: 'center',
          gap: '2px',
          bgcolor: isDarkMode 
            ? alpha(theme.palette.background.paper, 0.8) 
            : theme.palette.background.paper,
          backdropFilter: 'blur(8px)',
          border: `1px solid ${alpha(theme.palette.divider, isDarkMode ? 0.1 : 0.08)}`,
          borderRadius: '10px',
          boxShadow: isDarkMode ? 'none' : '0 2px 6px rgba(0,0,0,0.04)'
        }}>
          <ToggleButtonGroup
            value={value}
            exclusive
            onChange={handleToggleChange}
            aria-label="período de data"
            size="small"
            sx={{
              '& .MuiToggleButton-root': {
                px: { xs: 1.5, md: 2 },
                py: 0.6,
                border: 'none',
                borderRadius: '8px',
                mx: '2px',
                fontSize: '0.8125rem',
                fontWeight: 600,
                color: theme.palette.text.secondary,
                '&.Mui-selected': {
                  bgcolor: isDarkMode 
                    ? alpha(theme.palette.primary.main, 0.2) 
                    : alpha(theme.palette.primary.main, 0.12),
                  color: theme.palette.primary.main,
                  '&:hover': {
                    bgcolor: isDarkMode 
                      ? alpha(theme.palette.primary.main, 0.3) 
                      : alpha(theme.palette.primary.main, 0.18),
                  }
                },
                '&:hover': {
                  bgcolor: isDarkMode 
                    ? alpha(theme.palette.action.hover, 0.1) 
                    : alpha(theme.palette.action.hover, 0.05),
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

          <Tooltip title="Selecionar período personalizado">
            <IconButton 
              size="small"
              onClick={handleCustomClick}
              sx={{ 
                mx: '2px',
                bgcolor: value === 'custom' || !predefinedRanges.find(r => r.value === value)
                  ? isDarkMode 
                    ? alpha(theme.palette.primary.main, 0.2) 
                    : alpha(theme.palette.primary.main, 0.12)
                  : 'transparent',
                color: value === 'custom' || !predefinedRanges.find(r => r.value === value)
                  ? theme.palette.primary.main
                  : theme.palette.text.secondary,
                borderRadius: '8px',
                width: 32,
                height: 32,
                '&:hover': {
                  bgcolor: value === 'custom' 
                    ? isDarkMode 
                      ? alpha(theme.palette.primary.main, 0.3) 
                      : alpha(theme.palette.primary.main, 0.18)
                    : isDarkMode 
                      ? alpha(theme.palette.action.hover, 0.15) 
                      : alpha(theme.palette.action.hover, 0.08)
                },
                transition: 'all 0.2s ease'
              }}
            >
              <CalendarMonth fontSize="small" />
            </IconButton>
          </Tooltip>
        </Paper>

        <Tooltip title="Próximo período">
          <span>
            <IconButton 
              size="small" 
              onClick={() => handleQuickNav('next')}
              disabled={isNextDisabled}
              sx={{ 
                bgcolor: isDarkMode 
                  ? alpha(theme.palette.primary.main, 0.15) 
                  : alpha(theme.palette.primary.main, 0.08),
                color: theme.palette.primary.main,
                width: 32,
                height: 32,
                borderRadius: '8px',
                '&:hover': {
                  bgcolor: isDarkMode 
                    ? alpha(theme.palette.primary.main, 0.25) 
                    : alpha(theme.palette.primary.main, 0.12),
                },
                '&.Mui-disabled': {
                  bgcolor: alpha(theme.palette.action.disabled, isDarkMode ? 0.2 : 0.1),
                  color: alpha(theme.palette.text.disabled, 0.5),
                },
                transition: 'all 0.2s ease'
              }}
            >
              <ChevronRight fontSize="small" />
            </IconButton>
          </span>
        </Tooltip>

        <Typography 
          variant="body2" 
          sx={{ 
            ml: { xs: 0, md: 1 },
            mt: { xs: isMobile ? 1 : 0, md: 0 },
            color: alpha(theme.palette.text.primary, 0.85),
            fontSize: '0.875rem',
            fontWeight: 500,
            display: 'flex',
            alignItems: 'center',
            gap: 0.5,
            flexBasis: isMobile ? '100%' : 'auto',
            justifyContent: isMobile ? 'center' : 'flex-start',
            p: isMobile ? 0.5 : 0,
            bgcolor: isMobile 
              ? isDarkMode 
                ? alpha(theme.palette.background.paper, 0.4) 
                : alpha(theme.palette.background.default, 0.6)
              : 'transparent',
            borderRadius: isMobile ? 1 : 0
          }}
        >
          <DateRangeIcon 
            fontSize="small" 
            sx={{ 
              color: theme.palette.primary.main,
              opacity: 0.8,
              fontSize: '1rem'
            }} 
          />
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
            elevation: isDarkMode ? 4 : 6,
            sx: {
              mt: 1,
              width: 320,
              overflow: 'hidden',
              border: isDarkMode ? `1px solid ${alpha(theme.palette.divider, 0.1)}` : 'none',
              borderRadius: '12px',
              boxShadow: isDarkMode 
                ? `0 4px 20px ${alpha(theme.palette.common.black, 0.3)}` 
                : `0 8px 25px ${alpha(theme.palette.common.black, 0.15)}`,
              '& .MuiInputBase-root': {
                borderRadius: '10px'
              }
            }
          }}
        >
          <Box sx={{ 
            p: 0,
            background: theme.palette.background.paper,
          }}>
            <Box sx={{ 
              p: 2,
              borderBottom: `1px solid ${alpha(theme.palette.divider, isDarkMode ? 0.1 : 0.05)}`,
              bgcolor: isDarkMode 
                ? alpha(theme.palette.primary.main, 0.08)
                : alpha(theme.palette.primary.main, 0.04)
            }}>
              <Typography 
                variant="subtitle1"
                sx={{ 
                  fontWeight: 600,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1,
                  color: theme.palette.text.primary
                }}
              >
                <DateRangeIcon 
                  sx={{ 
                    color: theme.palette.primary.main,
                    fontSize: '1.25rem'
                  }} 
                />
                Selecionar Período
              </Typography>
            </Box>

            <Box sx={{ p: 2 }}>
              <Stack spacing={2.5}>
                <Box>
                  <Typography 
                    variant="caption" 
                    sx={{ 
                      color: alpha(theme.palette.text.secondary, 0.8),
                      mb: 1,
                      display: 'block',
                      fontSize: '0.75rem',
                      fontWeight: 600,
                      textTransform: 'uppercase',
                      letterSpacing: '0.5px'
                    }}
                  >
                    Períodos Predefinidos
                  </Typography>
                  <Stack spacing={0.5}>
                    {quickPresets.map(preset => (
                      <ButtonBase
                        key={preset.value}
                        onClick={() => handlePresetClick(preset)}
                        sx={{
                          p: 1,
                          borderRadius: '8px',
                          justifyContent: 'flex-start',
                          transition: 'all 0.2s',
                          color: value === preset.value 
                            ? theme.palette.primary.main
                            : theme.palette.text.primary,
                          bgcolor: value === preset.value
                            ? isDarkMode 
                              ? alpha(theme.palette.primary.main, 0.15)
                              : alpha(theme.palette.primary.main, 0.08)
                            : 'transparent',
                          position: 'relative',
                          '&:hover': {
                            bgcolor: value === preset.value
                              ? isDarkMode 
                                ? alpha(theme.palette.primary.main, 0.2)
                                : alpha(theme.palette.primary.main, 0.12)
                              : isDarkMode 
                                ? alpha(theme.palette.action.hover, 0.1)
                                : alpha(theme.palette.action.hover, 0.05)
                          }
                        }}
                      >
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, width: '100%' }}>
                          {preset.icon ? preset.icon : (
                            <DateRangeIcon fontSize="small" />
                          )}
                          <Typography variant="body2" sx={{ flexGrow: 1 }}>
                            {preset.label}
                          </Typography>
                          {value === preset.value && (
                            <CheckCircle 
                              fontSize="small" 
                              sx={{ 
                                color: theme.palette.primary.main,
                                fontSize: '1rem' 
                              }} 
                            />
                          )}
                        </Box>
                      </ButtonBase>
                    ))}
                  </Stack>
                </Box>

                <Divider sx={{ 
                  opacity: isDarkMode ? 0.1 : 0.6, 
                  my: 1
                }} />

                <Box>
                  <Typography 
                    variant="caption" 
                    sx={{ 
                      color: alpha(theme.palette.text.secondary, 0.8),
                      mb: 1,
                      display: 'block',
                      fontSize: '0.75rem',
                      fontWeight: 600,
                      textTransform: 'uppercase',
                      letterSpacing: '0.5px'
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
                          setCustomRange(prev => ({ ...prev, start: startOfDay(newValue) }));
                        }
                      }}
                      maxDate={customRange.end}
                      slotProps={{
                        textField: {
                          size: "small",
                          fullWidth: true,
                        }
                      }}
                    />
                    <DatePicker
                      label="Data Final"
                      value={customRange.end}
                      onChange={(newValue) => {
                        if (newValue) {
                          setCustomRange(prev => ({ ...prev, end: endOfDay(newValue) }));
                        }
                      }}
                      minDate={customRange.start}
                      maxDate={new Date()}
                      slotProps={{
                        textField: {
                          size: "small",
                          fullWidth: true,
                        }
                      }}
                    />
                  </Stack>
                </Box>

                {showCompare && (
                  <>
                    <Divider sx={{ opacity: isDarkMode ? 0.1 : 0.6, my: 1 }} />
                    
                    <Box>
                      <Typography 
                        variant="caption" 
                        sx={{ 
                          color: alpha(theme.palette.text.secondary, 0.8),
                          mb: 1,
                          display: 'block',
                          fontSize: '0.75rem',
                          fontWeight: 600,
                          textTransform: 'uppercase',
                          letterSpacing: '0.5px'
                        }}
                      >
                        Comparar com
                      </Typography>
                      {/* Implementação para comparação de períodos pode ser adicionada aqui */}
                    </Box>
                  </>
                )}

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
                    sx={{
                      borderRadius: '10px',
                      textTransform: 'none',
                      py: 1
                    }}
                  >
                    Cancelar
                  </Button>
                  <Button 
                    variant="contained" 
                    onClick={handleApplyCustomRange}
                    endIcon={<ArrowForward />}
                    fullWidth
                    sx={{
                      borderRadius: '10px',
                      textTransform: 'none',
                      py: 1,
                      bgcolor: theme.palette.primary.main,
                      '&:hover': {
                        bgcolor: theme.palette.primary.dark
                      }
                    }}
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