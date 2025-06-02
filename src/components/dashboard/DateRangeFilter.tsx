import React, { useState } from 'react';
import {
  Box,
  ToggleButton,
  ToggleButtonGroup,
  Paper,
  IconButton,
  Popover,
  TextField,
  Button,
  Stack,
  Typography,
  Tooltip,
} from '@mui/material';
import {
  CalendarMonth,
  ChevronLeft,
  ChevronRight,
} from '@mui/icons-material';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { format, subDays, startOfDay, endOfDay } from 'date-fns';
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

const DateRangeFilter: React.FC<DateRangeFilterProps> = ({ 
  value, 
  onChange,
  onCustomRangeChange 
}) => {
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

  const formatDateRange = () => {
    const range = predefinedRanges.find(r => r.value === value);
    if (range) {
      const end = new Date();
      const start = subDays(end, range.days);
      return `${format(start, 'dd/MM/yyyy')} - ${format(end, 'dd/MM/yyyy')}`;
    }
    return value === 'custom' 
      ? `${format(customRange.start, 'dd/MM/yyyy')} - ${format(customRange.end, 'dd/MM/yyyy')}`
      : '';
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={ptBR}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <Tooltip title="Período anterior">
          <IconButton 
            size="small" 
            onClick={() => handleQuickNav('prev')}
            sx={{ bgcolor: 'background.paper' }}
          >
            <ChevronLeft />
          </IconButton>
        </Tooltip>

        <Paper sx={{ 
          p: 1,
          display: 'flex',
          alignItems: 'center',
          gap: 2,
          backgroundColor: 'background.paper',
        }}>
          <ToggleButtonGroup
            value={value}
            exclusive
            onChange={handleToggleChange}
            aria-label="date range"
            size="small"
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
                bgcolor: value === 'custom' ? 'primary.main' : 'transparent',
                '&:hover': { bgcolor: value === 'custom' ? 'primary.dark' : 'action.hover' }
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
            sx={{ bgcolor: 'background.paper' }}
          >
            <ChevronRight />
          </IconButton>
        </Tooltip>

        <Typography variant="body2" sx={{ ml: 1, color: 'text.secondary' }}>
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
        >
          <Box sx={{ p: 3 }}>
            <Stack spacing={2}>
              <Typography variant="subtitle1">
                Período Personalizado
              </Typography>
              <DatePicker
                label="Data Inicial"
                value={customRange.start}
                onChange={(newValue) => {
                  if (newValue) {
                    setCustomRange(prev => ({ ...prev, start: newValue }));
                  }
                }}
                maxDate={customRange.end}
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
              />
              <Button 
                variant="contained" 
                onClick={handleApplyCustomRange}
                fullWidth
              >
                Aplicar
              </Button>
            </Stack>
          </Box>
        </Popover>
      </Box>
    </LocalizationProvider>
  );
};

export default DateRangeFilter;