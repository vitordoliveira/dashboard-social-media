import React from 'react';
import {
  Box,
  ToggleButton,
  ToggleButtonGroup,
  Paper,
} from '@mui/material';

interface DateRangeFilterProps {
  value: string;
  onChange: (value: string) => void;
}

const DateRangeFilter: React.FC<DateRangeFilterProps> = ({ value, onChange }) => {
  const handleChange = (
    event: React.MouseEvent<HTMLElement>,
    newValue: string | null
  ) => {
    if (newValue !== null) {
      onChange(newValue);
    }
  };

  return (
    <Paper 
      sx={{ 
        p: 1,
        display: 'flex',
        justifyContent: 'center',
        backgroundColor: 'background.paper',
      }}
    >
      <ToggleButtonGroup
        value={value}
        exclusive
        onChange={handleChange}
        aria-label="date range"
        size="small"
      >
        <ToggleButton value="7days" aria-label="7 days">
          7D
        </ToggleButton>
        <ToggleButton value="30days" aria-label="30 days">
          30D
        </ToggleButton>
        <ToggleButton value="90days" aria-label="90 days">
          90D
        </ToggleButton>
        <ToggleButton value="1year" aria-label="1 year">
          1Y
        </ToggleButton>
      </ToggleButtonGroup>
    </Paper>
  );
};

export default DateRangeFilter;