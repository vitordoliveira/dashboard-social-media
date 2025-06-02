import React from 'react';
import { Card, CardContent, Typography, Box, Tooltip, useTheme, alpha } from '@mui/material';
import { TrendingUp, TrendingDown, Info, Timeline, Speed, Leaderboard } from '@mui/icons-material';

interface InsightCardProps {
  title: string;
  description: string;
  trend: 'up' | 'down' | 'neutral';
  percentage?: number;
  tooltip?: string;
}

const InsightCard: React.FC<InsightCardProps> = ({ 
  title, 
  description, 
  trend, 
  percentage,
  tooltip
}) => {
  const theme = useTheme();

  const getIcon = () => {
    if (title.toLowerCase().includes('horário')) return Timeline;
    if (title.toLowerCase().includes('conteúdo')) return Leaderboard;
    return Speed;
  };

  const IconComponent = getIcon();
  const isPositive = trend === 'up';
  const trendColor = isPositive ? theme.palette.success.main : theme.palette.error.main;

  return (
    <Card sx={{ 
      height: '100%',
      background: `linear-gradient(135deg, 
        ${alpha(theme.palette.background.paper, 0.8)} 0%, 
        ${alpha(theme.palette.background.paper, 0.95)} 100%)`,
      backdropFilter: 'blur(10px)',
      border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
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
        background: `linear-gradient(90deg, ${alpha(trendColor, 0.3)} 0%, ${alpha(trendColor, 0.1)} 100%)`
      },
      '&::after': {
        content: '""',
        position: 'absolute',
        top: '50%',
        right: '-10%',
        width: '200px',
        height: '200px',
        background: `radial-gradient(circle, ${alpha(trendColor, 0.05)} 0%, transparent 70%)`,
        transform: 'translateY(-50%)',
        pointerEvents: 'none'
      }
    }}>
      <CardContent sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
        <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 2 }}>
          <Box 
            className="icon-wrapper"
            sx={{ 
              p: 1,
              borderRadius: 2,
              bgcolor: alpha(trendColor, 0.1),
              display: 'flex',
              mr: 2,
              transition: 'transform 0.3s ease-in-out'
            }}
          >
            <IconComponent sx={{ color: trendColor }} />
          </Box>
          <Box sx={{ flexGrow: 1 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 0.5 }}>
              <Typography 
                variant="subtitle1" 
                sx={{ 
                  fontWeight: 600,
                  color: theme.palette.text.primary,
                  flexGrow: 1
                }}
              >
                {title}
              </Typography>
              {tooltip && (
                <Tooltip 
                  title={tooltip}
                  arrow
                  placement="top"
                >
                  <Info 
                    fontSize="small" 
                    sx={{ 
                      color: alpha(theme.palette.text.secondary, 0.7),
                      ml: 1,
                      cursor: 'help'
                    }} 
                  />
                </Tooltip>
              )}
            </Box>
          </Box>
        </Box>

        <Typography 
          variant="body2" 
          sx={{ 
            mb: 2,
            flexGrow: 1,
            color: alpha(theme.palette.text.secondary, 0.9)
          }}
        >
          {description}
        </Typography>

        <Box 
          sx={{ 
            display: 'flex', 
            alignItems: 'center',
            p: 1.5,
            borderRadius: 1,
            bgcolor: alpha(trendColor, 0.1),
          }}
        >
          <Box 
            sx={{ 
              display: 'flex', 
              alignItems: 'center',
              gap: 1,
              flexGrow: 1
            }}
          >
            {isPositive ? (
              <TrendingUp sx={{ color: trendColor }} />
            ) : (
              <TrendingDown sx={{ color: trendColor }} />
            )}
            {percentage && (
              <Typography
                variant="body2"
                sx={{
                  color: trendColor,
                  fontWeight: 'medium',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 0.5
                }}
              >
                <strong>{percentage}%</strong>
                <span style={{ color: alpha(theme.palette.text.secondary, 0.7) }}>
                  vs período anterior
                </span>
              </Typography>
            )}
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

export default InsightCard;