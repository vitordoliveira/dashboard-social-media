import React from 'react';
import { Card, CardContent, Typography, Box } from '@mui/material';
import { ArrowUpward, ArrowDownward } from '@mui/icons-material';

interface StatsCardProps {
  title: string;
  value: string | number;
  change?: number;
  icon?: React.ReactNode;
}

// ... imports permanecem os mesmos ...

const StatsCard = ({ title, value, change, icon }: StatsCardProps) => {
  return (
    <Card 
      sx={{ 
        height: '100%',
        borderRadius: 2,
        transition: 'transform 0.2s, box-shadow 0.2s',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: (theme) => `0 4px 20px 0 ${theme.palette.mode === 'dark' ? 'rgba(0,0,0,0.5)' : 'rgba(0,0,0,0.1)'}`,
        }
      }}
    >
      <CardContent>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Box>
            <Typography color="text.secondary" gutterBottom>
              {title}
            </Typography>
            <Typography variant="h4" component="div" sx={{ mb: 1 }}>
              {value}
            </Typography>
            {change !== undefined && (
              <Box display="flex" alignItems="center">
                {change >= 0 ? (
                  <ArrowUpward fontSize="small" sx={{ color: 'success.main' }} />
                ) : (
                  <ArrowDownward fontSize="small" sx={{ color: 'error.main' }} />
                )}
                <Typography
                  variant="body2"
                  sx={{ 
                    color: change >= 0 ? 'success.main' : 'error.main',
                    ml: 0.5 
                  }}
                >
                  {Math.abs(change)}%
                </Typography>
              </Box>
            )}
          </Box>
          {icon && (
            <Box sx={{ 
              color: 'text.secondary',
              opacity: 0.8,
              transition: 'opacity 0.2s',
              '&:hover': {
                opacity: 1
              }
            }}>
              {icon}
            </Box>
          )}
        </Box>
      </CardContent>
    </Card>
  );
};

export default StatsCard;