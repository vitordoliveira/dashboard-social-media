import React from 'react';
import { Card, CardContent, Typography, Box, Tooltip, useTheme, alpha, Icon } from '@mui/material';
import { 
  TrendingUp, 
  TrendingDown, 
  Info, 
  Timeline, 
  Speed, 
  Leaderboard, 
  Equalizer,
  BubbleChart,
  ShowChart
} from '@mui/icons-material';
import { colorPalettes } from '../../theme/constants/colors';

interface InsightCardProps {
  title: string;
  description: string;
  trend: 'up' | 'down' | 'neutral';
  percentage?: number;
  tooltip?: string;
  icon?: React.ReactNode;
  color?: string;
  animation?: boolean;
}

const InsightCard: React.FC<InsightCardProps> = ({ 
  title, 
  description, 
  trend, 
  percentage,
  tooltip,
  icon,
  color,
  animation = true
}) => {
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === 'dark';

  // Automaticamente seleciona um ícone com base no título se nenhum for fornecido
  const getIcon = () => {
    if (icon) return icon;
    if (title.toLowerCase().includes('horário')) return <Timeline />;
    if (title.toLowerCase().includes('conteúdo')) return <Leaderboard />;
    if (title.toLowerCase().includes('crescimento')) return <ShowChart />;
    if (title.toLowerCase().includes('engaj')) return <BubbleChart />;
    if (title.toLowerCase().includes('padrão') || title.toLowerCase().includes('padroes')) return <Equalizer />;
    return <Speed />;
  };

  const IconComponent = getIcon();
  const isPositive = trend === 'up';
  const isNeutral = trend === 'neutral';
  
  // Define a cor com base na tendência ou na cor personalizada
  const getTrendColor = () => {
    if (color) return color;
    if (isNeutral) return theme.palette.info.main;
    return isPositive ? colorPalettes.green.main : colorPalettes.amber.dark;
  };
  
  const trendColor = getTrendColor();

  return (
    <Card 
      elevation={isDarkMode ? 0 : 2}
      sx={{ 
        height: '100%',
        backgroundColor: theme.palette.background.paper,
        borderRadius: 2,
        border: isDarkMode ? `1px solid ${alpha(theme.palette.divider, 0.1)}` : 'none',
        position: 'relative',
        overflow: 'hidden',
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        '&:hover': {
          transform: animation ? 'translateY(-4px)' : 'none',
          boxShadow: animation ? theme.shadows[isDarkMode ? 4 : 8] : 'none',
          '& .icon-wrapper': {
            transform: animation ? 'scale(1.08) rotate(-5deg)' : 'none',
          }
        },
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '4px',
          background: `linear-gradient(90deg, ${alpha(trendColor, isDarkMode ? 0.7 : 0.8)} 0%, ${alpha(trendColor, isDarkMode ? 0.2 : 0.3)} 100%)`,
          opacity: isDarkMode ? 0.8 : 1
        },
      }}
    >
      <CardContent sx={{ 
        height: '100%', 
        display: 'flex', 
        flexDirection: 'column',
        p: 3,
        "&:last-child": { pb: 3 } // Sobrescreve o padding-bottom padrão do MUI
      }}>
        <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 2.5, position: 'relative', zIndex: 1 }}>
          <Box 
            className="icon-wrapper"
            sx={{ 
              p: 1.5,
              borderRadius: '14px',
              bgcolor: alpha(trendColor, isDarkMode ? 0.15 : 0.12),
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              mr: 2,
              color: trendColor,
              boxShadow: `0 4px 12px ${alpha(trendColor, isDarkMode ? 0.25 : 0.15)}`,
              transition: 'all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)'
            }}
          >
            {IconComponent}
          </Box>
          <Box sx={{ flexGrow: 1 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 0.5 }}>
              <Typography 
                variant="h6" 
                sx={{ 
                  fontWeight: 600,
                  color: theme.palette.text.primary,
                  flexGrow: 1,
                  fontSize: { xs: '0.95rem', md: '1rem' },
                  lineHeight: 1.4
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
                      cursor: 'help',
                      fontSize: '1rem',
                      '&:hover': {
                        color: theme.palette.text.primary
                      },
                      transition: 'color 0.2s ease'
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
            mb: 'auto',
            color: alpha(theme.palette.text.secondary, 0.9),
            lineHeight: 1.6,
            fontSize: '0.875rem'
          }}
        >
          {description}
        </Typography>

        <Box 
          sx={{ 
            display: 'flex', 
            alignItems: 'center',
            p: 1.5,
            borderRadius: '10px',
            bgcolor: alpha(trendColor, isDarkMode ? 0.15 : 0.08),
            mt: 2.5,
            border: `1px solid ${alpha(trendColor, isDarkMode ? 0.2 : 0.12)}`,
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
            {!isNeutral && (
              isPositive ? (
                <TrendingUp sx={{ color: trendColor, fontSize: '1.25rem' }} />
              ) : (
                <TrendingDown sx={{ color: trendColor, fontSize: '1.25rem' }} />
              )
            )}
            <Box sx={{
              display: 'flex',
              alignItems: 'baseline',
              gap: 0.8,
              flexWrap: 'wrap'
            }}>
              {percentage !== undefined && (
                <Typography
                  variant="body2"
                  sx={{
                    color: trendColor,
                    fontWeight: 700,
                    fontSize: '0.95rem',
                  }}
                >
                  {isPositive ? '+' : ''}{percentage}%
                </Typography>
              )}
              <Typography
                variant="caption"
                sx={{
                  color: alpha(theme.palette.text.secondary, 0.85),
                  fontWeight: 500,
                  fontSize: '0.75rem',
                }}
              >
                vs período anterior
              </Typography>
            </Box>
          </Box>
        </Box>
        
        {/* Efeito de gradiente sutil no fundo */}
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            right: '-20%',
            width: '200px',
            height: '200px',
            background: `radial-gradient(circle, ${alpha(trendColor, isDarkMode ? 0.08 : 0.05)} 0%, transparent 70%)`,
            transform: 'translateY(-50%)',
            pointerEvents: 'none',
            zIndex: 0,
            opacity: 0.8,
          }}
        />
      </CardContent>
    </Card>
  );
};

export default InsightCard;