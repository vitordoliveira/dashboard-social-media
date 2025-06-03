import React, { useMemo } from 'react';
import { Box, Card, Typography, alpha, useTheme, Tooltip, Skeleton, useMediaQuery } from '@mui/material';
import { TrendingUp, TrendingDown, InfoOutlined } from '@mui/icons-material';
import { formatNumber, formatPercentage } from '../../utils/formatters';
import { getGradient } from '../../utils/theme';
import { colorPalettes, socialColors } from '../../theme/constants/colors';

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
  social?: 'facebook' | 'twitter' | 'instagram' | 'linkedin' | 'youtube' | 'pinterest' | 'tiktok';
  additionalStats?: Array<{
    label: string;
    value: string | number;
    change?: number;
  }>;
}

const StatsCard: React.FC<StatsCardProps> = ({
  title,
  value,
  change,
  icon,
  color,
  previousValue,
  isLoading = false,
  tooltip,
  period = 'vs último período',
  social,
  additionalStats
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isDarkMode = theme.palette.mode === 'dark';
  
  // Determinar a cor com base na propriedade social (se fornecida)
  const cardColor = useMemo(() => {
    if (social && socialColors[social]) {
      return socialColors[social];
    }
    return color || theme.palette.primary.main;
  }, [color, social, theme.palette.primary.main]);

  const formattedValue = typeof value === 'number' ? formatNumber(value) : value;
  const formattedChange = formatPercentage(change);
  const isPositive = change >= 0;

  // Cores para variações positivas e negativas
  const trendColors = {
    positive: {
      text: colorPalettes.green.main,
      bg: alpha(colorPalettes.green.main, isDarkMode ? 0.15 : 0.1),
    },
    negative: {
      text: colorPalettes.amber.dark,
      bg: alpha(colorPalettes.amber.dark, isDarkMode ? 0.15 : 0.1),
    }
  };

  if (isLoading) {
    return (
      <Card
        elevation={isDarkMode ? 0 : 2}
        sx={{
          p: 3,
          backgroundColor: theme.palette.background.paper,
          borderRadius: 2,
          border: isDarkMode ? `1px solid ${alpha(theme.palette.divider, 0.1)}` : 'none',
          position: 'relative',
          overflow: 'hidden',
          height: '100%'
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
          <Skeleton 
            variant="rectangular" 
            width={48} 
            height={48} 
            sx={{ 
              borderRadius: '12px',
              bgcolor: isDarkMode ? alpha(theme.palette.divider, 0.1) : alpha(theme.palette.divider, 0.2)
            }} 
          />
          <Skeleton 
            variant="rectangular" 
            width={80} 
            height={28} 
            sx={{ 
              borderRadius: '6px',
              bgcolor: isDarkMode ? alpha(theme.palette.divider, 0.1) : alpha(theme.palette.divider, 0.2)
            }} 
          />
        </Box>
        <Skeleton 
          variant="text" 
          width="60%" 
          height={40}
          sx={{ 
            mb: 1,
            bgcolor: isDarkMode ? alpha(theme.palette.divider, 0.1) : alpha(theme.palette.divider, 0.2)
          }} 
        />
        <Skeleton 
          variant="text" 
          width="40%" 
          height={24}
          sx={{ 
            bgcolor: isDarkMode ? alpha(theme.palette.divider, 0.1) : alpha(theme.palette.divider, 0.2)
          }} 
        />
        <Box sx={{ mt: 2, pt: 2, borderTop: `1px solid ${alpha(theme.palette.divider, 0.1)}` }}>
          <Skeleton 
            variant="text" 
            width="80%" 
            height={20}
            sx={{ 
              bgcolor: isDarkMode ? alpha(theme.palette.divider, 0.1) : alpha(theme.palette.divider, 0.2)
            }} 
          />
        </Box>
      </Card>
    );
  }

  return (
    <Card
      elevation={isDarkMode ? 0 : 2}
      sx={{
        p: 3,
        backgroundColor: theme.palette.background.paper,
        borderRadius: 2,
        border: isDarkMode ? `1px solid ${alpha(theme.palette.divider, 0.1)}` : 'none',
        position: 'relative',
        overflow: 'hidden',
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: theme.shadows[isDarkMode ? 4 : 8],
          '& .icon-wrapper': {
            transform: 'scale(1.05) rotate(-5deg)',
          }
        },
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '4px',
          background: getGradient(cardColor, { start: 1, end: 0.2 }),
          opacity: isDarkMode ? 0.8 : 1,
        },
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Box sx={{ position: 'relative', zIndex: 1, flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
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
              borderRadius: '16px',
              bgcolor: alpha(cardColor, isDarkMode ? 0.2 : 0.15),
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)',
              boxShadow: `0 4px 12px ${alpha(cardColor, isDarkMode ? 0.25 : 0.2)}`,
              color: cardColor
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
                  justifyContent: 'center',
                  gap: 0.5,
                  background: isPositive ? trendColors.positive.bg : trendColors.negative.bg,
                  color: isPositive ? trendColors.positive.text : trendColors.negative.text,
                  py: 0.6,
                  px: 1.2,
                  borderRadius: '8px',
                  fontSize: '0.75rem',
                  fontWeight: 600,
                  height: '28px',
                  minWidth: '60px',
                  boxShadow: `0 2px 6px ${alpha(
                    isPositive ? trendColors.positive.text : trendColors.negative.text, 
                    0.15
                  )}`,
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
                    cursor: 'help',
                    '&:hover': {
                      color: theme.palette.text.primary
                    }
                  }} 
                />
              </Tooltip>
            )}
          </Box>
        </Box>

        <Typography 
          variant="h4" 
          sx={{ 
            mb: 0.5, 
            fontWeight: 700,
            fontSize: { xs: '1.5rem', md: '1.75rem' },
            letterSpacing: '-0.5px',
            color: theme.palette.text.primary,
            lineHeight: 1.2
          }}
        >
          {formattedValue}
        </Typography>

        <Typography
          variant="subtitle2"
          sx={{
            color: alpha(theme.palette.text.secondary, 0.9),
            fontWeight: 500,
            fontSize: '0.875rem',
            mb: 'auto'
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
              gridTemplateColumns: `repeat(${Math.min(additionalStats.length, 3)}, 1fr)`,
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
                    mb: 0.5,
                    fontSize: '0.7rem',
                    textTransform: 'uppercase',
                    fontWeight: 600,
                    letterSpacing: '0.5px'
                  }}
                >
                  {stat.label}
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 0.8 }}>
                  <Typography
                    variant="body2"
                    sx={{
                      fontWeight: 600,
                      color: theme.palette.text.primary,
                      fontSize: '0.875rem'
                    }}
                  >
                    {typeof stat.value === 'number' ? formatNumber(stat.value) : stat.value}
                  </Typography>
                  {stat.change !== undefined && (
                    <Typography
                      variant="caption"
                      sx={{
                        fontSize: '0.65rem',
                        fontWeight: 700,
                        color: stat.change >= 0 ? trendColors.positive.text : trendColors.negative.text,
                      }}
                    >
                      {stat.change >= 0 ? '+' : ''}{formatPercentage(stat.change)}
                    </Typography>
                  )}
                </Box>
              </Box>
            ))}
          </Box>
        )}

        {(!additionalStats || additionalStats.length === 0) && previousValue !== undefined && (
          <Box
            sx={{
              mt: 2,
              pt: 2,
              borderTop: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}
          >
            <Typography
              variant="caption"
              sx={{
                color: alpha(theme.palette.text.secondary, 0.7),
                fontSize: '0.7rem',
                textTransform: 'uppercase',
                fontWeight: 600,
                letterSpacing: '0.5px'
              }}
            >
              Período anterior
            </Typography>
            <Typography
              variant="body2"
              sx={{
                fontWeight: 600,
                color: theme.palette.text.primary
              }}
            >
              {formatNumber(previousValue)}
            </Typography>
          </Box>
        )}

        {(!additionalStats || additionalStats.length === 0) && previousValue === undefined && (
          <Box
            sx={{
              mt: 2,
              pt: 2,
              borderTop: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}
          >
            <Typography
              variant="caption"
              sx={{
                color: alpha(theme.palette.text.secondary, 0.7),
                fontSize: '0.7rem',
                textTransform: 'uppercase',
                fontWeight: 600,
                letterSpacing: '0.5px'
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