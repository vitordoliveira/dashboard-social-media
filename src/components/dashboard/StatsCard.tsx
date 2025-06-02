import React from 'react';
import { Box, Card, Typography, alpha, useTheme, Tooltip, Skeleton } from '@mui/material';
import { TrendingUp, TrendingDown, InfoOutlined } from '@mui/icons-material';
import { formatNumber, formatPercentage } from '../../utils/formatters';
import { getGradient } from '../../utils/theme';

interface StatsCardProps {
  title: string;
  value: string | number;
  change: number;
  icon: React.ReactNode;
  color?: string;
  previousValue?: number;
  isLoading?: boolean;
  tooltip?: string;
  period?: string;
  additionalStats?: Array<{
    label: string;
    value: string | number;
  }>;
}

const StatsCard: React.FC<StatsCardProps> = ({
  title,
  value,
  change,
  icon,
  color = '#90caf9',
  previousValue,
  isLoading = false,
  tooltip,
  period = 'vs último período',
  additionalStats
}) => {
  const theme = useTheme();
  const formattedValue = typeof value === 'number' ? formatNumber(value) : value;
  const formattedChange = formatPercentage(change);
  const isPositive = change >= 0;

  if (isLoading) {
    return (
      <Card
        sx={{
          p: 3,
          background: getGradient(color),
          border: 1,
          borderColor: 'divider',
          position: 'relative',
          overflow: 'hidden',
          height: '100%'
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
          <Skeleton variant="rectangular" width={48} height={48} sx={{ borderRadius: 2 }} />
          <Skeleton variant="rectangular" width={80} height={24} sx={{ borderRadius: 1 }} />
        </Box>
        <Skeleton variant="text" width="60%" height={40} sx={{ mb: 1 }} />
        <Skeleton variant="text" width="40%" height={24} />
        <Box sx={{ mt: 2, pt: 2, borderTop: `1px solid ${alpha(theme.palette.divider, 0.1)}` }}>
          <Skeleton variant="text" width="80%" height={20} />
        </Box>
      </Card>
    );
  }

  return (
    <Card
      sx={{
        p: 3,
        background: getGradient(color),
        border: 1,
        borderColor: 'divider',
        position: 'relative',
        overflow: 'hidden',
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: theme.shadows[8],
          '& .icon-wrapper': {
            transform: 'scale(1.1)'
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
              transition: 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              boxShadow: `0 4px 12px ${alpha(color, 0.15)}`
            }}
          >
            {icon}
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Tooltip 
              title={`Variação: ${formattedChange} (${period})`}
              arrow 
              placement="top"
            >
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
            {tooltip && (
              <Tooltip title={tooltip} arrow placement="top">
                <InfoOutlined 
                  sx={{ 
                    fontSize: 18, 
                    color: alpha(theme.palette.text.secondary, 0.7),
                    cursor: 'help'
                  }} 
                />
              </Tooltip>
            )}
          </Box>
        </Box>

        <Typography 
          variant="h4" 
          sx={{ 
            mb: 1, 
            fontWeight: 'bold',
            background: `linear-gradient(45deg, ${theme.palette.text.primary} 30%, ${alpha(theme.palette.text.primary, 0.7)} 90%)`,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            letterSpacing: '-0.5px'
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

        {additionalStats && additionalStats.length > 0 && (
          <Box
            sx={{
              mt: 2,
              pt: 2,
              borderTop: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(80px, 1fr))',
              gap: 2
            }}
          >
            {additionalStats.map((stat, index) => (
              <Box key={index}>
                <Typography
                  variant="caption"
                  sx={{
                    color: alpha(theme.palette.text.secondary, 0.7),
                    display: 'block',
                    mb: 0.5
                  }}
                >
                  {stat.label}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    fontWeight: 'medium',
                    color: theme.palette.text.primary
                  }}
                >
                  {typeof stat.value === 'number' ? formatNumber(stat.value) : stat.value}
                </Typography>
              </Box>
            ))}
          </Box>
        )}

        {(!additionalStats || additionalStats.length === 0) && (
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
              {period}
            </Typography>
          </Box>
        )}
      </Box>
    </Card>
  );
};

export default StatsCard;