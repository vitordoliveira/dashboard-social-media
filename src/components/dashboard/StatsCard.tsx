import React from 'react';
import { Box, Card, Typography, alpha, useTheme, Tooltip } from '@mui/material';
import { TrendingUp, TrendingDown } from '@mui/icons-material';
import { formatNumber, formatPercentage } from '../../utils/formatters';
import { getGradient } from '../../utils/theme';

interface StatsCardProps {
  title: string;
  value: string | number;
  change: number;
  icon: React.ReactNode;
  color?: string;
}

const StatsCard: React.FC<StatsCardProps> = ({
  title,
  value,
  change,
  icon,
  color = '#90caf9'
}) => {
  const theme = useTheme();
  const formattedValue = typeof value === 'number' ? formatNumber(value) : value;
  const formattedChange = formatPercentage(change);
  const isPositive = change >= 0;

  return (
    <Card
      sx={{
        p: 3,
        background: getGradient(color),
        border: 1,
        borderColor: 'divider',
        position: 'relative',
        overflow: 'hidden',
        transition: 'all 0.3s ease-in-out',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: theme.shadows[8],
          '& .icon-wrapper': {
            transform: 'scale(1.1)',
          }
        },
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '4px',
          background: `linear-gradient(90deg, ${alpha(color, 0.6)} 0%, ${alpha(color, 0.2)} 100%)`
        },
        '&::after': {
          content: '""',
          position: 'absolute',
          top: '50%',
          right: '-10%',
          width: '200px',
          height: '200px',
          background: `radial-gradient(circle, ${alpha(color, 0.1)} 0%, transparent 70%)`,
          transform: 'translateY(-50%)',
          pointerEvents: 'none'
        }
      }}
    >
      <Box sx={{ position: 'relative', zIndex: 1 }}>
        <Box 
          sx={{ 
            display: 'flex', 
            alignItems: 'center', 
            mb: 2,
            justifyContent: 'space-between'
          }}
        >
          <Box 
            className="icon-wrapper"
            sx={{ 
              p: 1.5,
              borderRadius: 2,
              bgcolor: alpha(color, 0.15),
              display: 'flex',
              transition: 'transform 0.3s ease-in-out',
              boxShadow: `0 4px 12px ${alpha(color, 0.15)}`
            }}
          >
            {icon}
          </Box>
          <Tooltip title="Comparação com o período anterior" arrow placement="top">
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 0.5,
                background: alpha(
                  isPositive ? theme.palette.success.main : theme.palette.error.main,
                  0.1
                ),
                color: isPositive ? theme.palette.success.main : theme.palette.error.main,
                py: 0.5,
                px: 1,
                borderRadius: 1,
                fontSize: '0.75rem',
                fontWeight: 'medium'
              }}
            >
              {isPositive ? (
                <TrendingUp fontSize="small" />
              ) : (
                <TrendingDown fontSize="small" />
              )}
              {formattedChange}
            </Box>
          </Tooltip>
        </Box>

        <Typography 
          variant="h4" 
          sx={{ 
            mb: 1, 
            fontWeight: 'bold',
            background: `linear-gradient(45deg, ${theme.palette.text.primary} 30%, ${alpha(theme.palette.text.primary, 0.7)} 90%)`,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}
        >
          {formattedValue}
        </Typography>

        <Typography
          variant="subtitle2"
          sx={{
            color: alpha(theme.palette.text.secondary, 0.8),
            fontWeight: 'medium',
            fontSize: '0.875rem'
          }}
        >
          {title}
        </Typography>

        <Box
          sx={{
            mt: 2,
            pt: 2,
            borderTop: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
            display: 'flex',
            alignItems: 'center',
            gap: 1
          }}
        >
          <Typography
            variant="caption"
            sx={{
              color: alpha(theme.palette.text.secondary, 0.7),
              fontSize: '0.75rem'
            }}
          >
            vs último período
          </Typography>
        </Box>
      </Box>
    </Card>
  );
};

export default StatsCard;