import React, { useMemo, useState } from 'react';
import { ResponsiveBar } from '@nivo/bar';
import { 
  Box, 
  Paper, 
  Typography, 
  useTheme, 
  alpha, 
  IconButton, 
  Menu, 
  MenuItem, 
  Tooltip,
  useMediaQuery,
  Skeleton,
  ToggleButtonGroup,
  ToggleButton
} from '@mui/material';
import { 
  MoreVert, 
  GetApp, 
  Fullscreen, 
  FilterList,
  Share as ShareIcon,
  Favorite,
  Comment
} from '@mui/icons-material';
import { formatNumber } from '../../utils/formatters';
import { socialColors } from '../../theme/constants/colors';

// Definimos a interface para os dados de engajamento
export interface EngagementData {
  network: string;
  likes: number;
  comments: number;
  shares: number;
  [key: string]: string | number;
}

interface NetworkEngagementChartProps {
  data: EngagementData[];
  title?: string;
  height?: number;
  showLegend?: boolean;
  isLoading?: boolean;
  onDownload?: () => void;
  onToggleFullscreen?: () => void;
}

const NetworkEngagementChart: React.FC<NetworkEngagementChartProps> = ({ 
  data, 
  title = "Engajamento por Rede Social",
  height = 400,
  showLegend = true,
  isLoading = false,
  onDownload,
  onToggleFullscreen
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isDarkMode = theme.palette.mode === 'dark';
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [viewMode, setViewMode] = useState<'stacked' | 'grouped'>('stacked');
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleViewModeChange = (
    event: React.MouseEvent<HTMLElement>,
    newMode: 'stacked' | 'grouped',
  ) => {
    if (newMode !== null) {
      setViewMode(newMode);
    }
  };

  // Cores para cada tipo de engajamento
  const engagementColors = useMemo(() => ({
    likes: theme.palette.primary.main,
    comments: theme.palette.secondary.main,
    shares: theme.palette.success.main
  }), [theme]);

  // Labels amigáveis para os tipos de engajamento
  const engagementLabels = {
    likes: "Curtidas",
    comments: "Comentários",
    shares: "Compartilhamentos"
  };

  // Tema do gráfico baseado na paleta do Material UI
  const chartTheme = useMemo(() => ({
    background: 'transparent',
    textColor: theme.palette.text.secondary,
    fontSize: 12,
    fontFamily: theme.typography.fontFamily,
    axis: {
      domain: {
        line: {
          stroke: theme.palette.divider,
          strokeWidth: 1,
        },
      },
      ticks: {
        line: {
          stroke: theme.palette.divider,
          strokeWidth: 1,
        },
        text: {
          fill: theme.palette.text.secondary,
          fontSize: 11,
          fontFamily: theme.typography.fontFamily,
        },
      },
      legend: {
        text: {
          fill: theme.palette.text.primary,
          fontSize: 12,
          fontWeight: 500,
          fontFamily: theme.typography.fontFamily,
        }
      }
    },
    grid: {
      line: {
        stroke: alpha(theme.palette.divider, isDarkMode ? 0.1 : 0.2),
        strokeWidth: 1,
        strokeDasharray: isDarkMode ? '4 4' : '2 4',
      },
    },
    legends: {
      text: {
        fill: theme.palette.text.secondary,
        fontSize: 11,
        fontFamily: theme.typography.fontFamily,
      },
    },
    tooltip: {
      container: {
        background: isDarkMode 
          ? alpha(theme.palette.background.paper, 0.95)
          : theme.palette.background.paper,
        color: theme.palette.text.primary,
        fontSize: 12,
        fontFamily: theme.typography.fontFamily,
        borderRadius: 8,
        boxShadow: theme.shadows[3],
        border: `1px solid ${
          isDarkMode 
            ? alpha(theme.palette.divider, 0.2) 
            : alpha(theme.palette.primary.main, 0.1)
        }`,
      },
    },
    annotations: {
      text: {
        fontSize: 13,
        fontFamily: theme.typography.fontFamily,
        fill: theme.palette.text.primary,
        outlineWidth: 2,
        outlineColor: theme.palette.background.paper,
        outlineOpacity: 1,
      },
    }
  }), [theme, isDarkMode]);

  // Função para obter a cor associada a cada rede social
  const getSocialColor = (network: string): string => {
    const networkLower = network.toLowerCase();
    if (networkLower.includes('facebook')) return socialColors.facebook;
    if (networkLower.includes('twitter')) return socialColors.twitter;
    if (networkLower.includes('instagram')) return socialColors.instagram;
    if (networkLower.includes('linkedin')) return socialColors.linkedin;
    if (networkLower.includes('youtube')) return socialColors.youtube;
    if (networkLower.includes('pinterest')) return socialColors.pinterest;
    if (networkLower.includes('tiktok')) return socialColors.tiktok;
    return theme.palette.primary.main;
  };

  // Função para obter o total de engajamento para uma rede
  const getTotalEngagement = (networkData: EngagementData): number => {
    return (networkData.likes || 0) + 
           (networkData.comments || 0) + 
           (networkData.shares || 0);
  };

  // Componentes para o estado de carregamento
  if (isLoading) {
    return (
      <Paper 
        elevation={isDarkMode ? 0 : 1}
        sx={{ 
          p: 3, 
          height, 
          bgcolor: theme.palette.background.paper,
          borderRadius: 2,
          border: isDarkMode ? `1px solid ${alpha(theme.palette.divider, 0.1)}` : 'none',
        }}
      >
        <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Skeleton variant="text" width={200} height={32} sx={{ 
            bgcolor: isDarkMode ? alpha(theme.palette.divider, 0.1) : alpha(theme.palette.divider, 0.2)
          }} />
          <Skeleton variant="circular" width={40} height={40} sx={{ 
            bgcolor: isDarkMode ? alpha(theme.palette.divider, 0.1) : alpha(theme.palette.divider, 0.2)
          }} />
        </Box>
        <Skeleton 
          variant="rectangular" 
          height={height - 100} 
          sx={{ 
            bgcolor: isDarkMode ? alpha(theme.palette.divider, 0.1) : alpha(theme.palette.divider, 0.2),
            borderRadius: 1
          }} 
        />
      </Paper>
    );
  }

  return (
    <Paper 
      elevation={isDarkMode ? 0 : 1}
      sx={{ 
        p: 3, 
        height,
        bgcolor: theme.palette.background.paper,
        position: 'relative',
        overflow: 'hidden',
        borderRadius: 2,
        border: isDarkMode ? `1px solid ${alpha(theme.palette.divider, 0.1)}` : 'none',
        transition: 'all 0.3s ease',
        '&:hover': {
          boxShadow: isDarkMode ? `0 4px 20px ${alpha('#000', 0.1)}` : theme.shadows[3],
        },
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '4px',
          background: `linear-gradient(90deg, 
            ${theme.palette.primary.main} 0%, 
            ${theme.palette.primary.light} 100%)`,
          opacity: 0.8
        }
      }}
    >
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        mb: 3,
        flexWrap: isMobile ? 'wrap' : 'nowrap',
        gap: isMobile ? 2 : 0
      }}>
        <Typography 
          variant="h6" 
          sx={{ 
            fontWeight: 600,
            color: theme.palette.text.primary,
            display: 'flex',
            alignItems: 'center',
            gap: 1
          }}
        >
          <FilterList sx={{ color: theme.palette.primary.main }} />
          {title}
        </Typography>
        
        <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
          <ToggleButtonGroup
            value={viewMode}
            exclusive
            onChange={handleViewModeChange}
            aria-label="chart view mode"
            size="small"
            sx={{
              height: 32,
              '& .MuiToggleButton-root': {
                px: 1.5,
                py: 0.5,
                fontSize: '0.75rem',
                fontWeight: 600,
                textTransform: 'none',
                borderColor: alpha(theme.palette.divider, 0.1),
                '&.Mui-selected': {
                  bgcolor: alpha(theme.palette.primary.main, isDarkMode ? 0.2 : 0.1),
                  color: theme.palette.primary.main,
                  '&:hover': {
                    bgcolor: alpha(theme.palette.primary.main, isDarkMode ? 0.25 : 0.15),
                  }
                }
              }
            }}
          >
            <ToggleButton value="stacked" aria-label="stacked view">
              Empilhado
            </ToggleButton>
            <ToggleButton value="grouped" aria-label="grouped view">
              Agrupado
            </ToggleButton>
          </ToggleButtonGroup>
          
          {onDownload && (
            <Tooltip title="Exportar dados">
              <IconButton 
                size="small" 
                onClick={onDownload}
                sx={{ 
                  color: theme.palette.text.secondary,
                  '&:hover': {
                    color: theme.palette.primary.main,
                    bgcolor: alpha(theme.palette.primary.main, 0.08),
                  }
                }}
              >
                <GetApp fontSize="small" />
              </IconButton>
            </Tooltip>
          )}
          
          {onToggleFullscreen && (
            <Tooltip title="Tela cheia">
              <IconButton 
                size="small" 
                onClick={onToggleFullscreen}
                sx={{ 
                  color: theme.palette.text.secondary,
                  '&:hover': {
                    color: theme.palette.primary.main,
                    bgcolor: alpha(theme.palette.primary.main, 0.08),
                  }
                }}
              >
                <Fullscreen fontSize="small" />
              </IconButton>
            </Tooltip>
          )}
          
          <IconButton
            size="small"
            onClick={handleClick}
            aria-label="mais opções"
            sx={{ 
              color: theme.palette.text.secondary,
              '&:hover': {
                color: theme.palette.primary.main,
                bgcolor: alpha(theme.palette.primary.main, 0.08),
              }
            }}
          >
            <MoreVert fontSize="small" />
          </IconButton>
        </Box>
        
        <Menu
          id="chart-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          PaperProps={{
            elevation: isDarkMode ? 3 : 6,
            sx: {
              overflow: 'visible',
              filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.15))',
              bgcolor: theme.palette.background.paper,
              borderRadius: 2,
              mt: 1.5,
              minWidth: 180,
              border: isDarkMode ? `1px solid ${alpha(theme.palette.divider, 0.1)}` : 'none',
              '& .MuiMenuItem-root': {
                fontSize: '0.875rem',
                py: 1,
              }
            }
          }}
          transformOrigin={{ horizontal: 'right', vertical: 'top' }}
          anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        >
          {onDownload && (
            <MenuItem onClick={() => {
              handleClose();
              onDownload();
            }}>
              <GetApp sx={{ mr: 1.5, fontSize: 18 }} /> Exportar CSV
            </MenuItem>
          )}
          
          {onToggleFullscreen && (
            <MenuItem onClick={() => {
              handleClose();
              onToggleFullscreen();
            }}>
              <Fullscreen sx={{ mr: 1.5, fontSize: 18 }} /> Tela Cheia
            </MenuItem>
          )}
        </Menu>
      </Box>
      
      <Box sx={{ height: height - 100, width: '100%' }}>
        <ResponsiveBar
          data={data}
          keys={['likes', 'comments', 'shares']}
          indexBy="network"
          margin={{ 
            top: 20, 
            right: showLegend ? 150 : 30, 
            bottom: 60, 
            left: 60 
          }}
          padding={0.3}
          groupMode={viewMode}
          valueScale={{ type: 'linear' }}
          indexScale={{ type: 'band', round: true }}
          // Usando any para evitar erros de tipo
          colors={(bar: any) => {
            if (!bar || !bar.id) return theme.palette.primary.main;
            const key = String(bar.id);
            return engagementColors[key as keyof typeof engagementColors] || theme.palette.primary.main;
          }}
          borderRadius={4}
          // Usando any para evitar erros de tipo
          borderColor={(bar: any) => {
            if (!bar || !bar.id) return alpha(theme.palette.primary.main, 0.4);
            const key = String(bar.id);
            const color = engagementColors[key as keyof typeof engagementColors] || theme.palette.primary.main;
            return isDarkMode ? alpha(color, 0.4) : alpha(color, 0.8);
          }}
          borderWidth={1}
          defs={[
            {
              id: 'dots',
              type: 'patternDots',
              background: 'inherit',
              color: theme.palette.text.secondary,
              size: 4,
              padding: 1,
              stagger: true
            },
            {
              id: 'lines',
              type: 'patternLines',
              background: 'inherit',
              color: theme.palette.text.secondary,
              rotation: -45,
              lineWidth: 6,
              spacing: 10
            },
            ...Object.entries(engagementColors).map(([key, color]) => ({
              id: `gradient-${key}`,
              type: 'linearGradient',
              colors: [
                { offset: 0, color: alpha(color, isDarkMode ? 0.7 : 0.8) },
                { offset: 100, color: alpha(color, isDarkMode ? 0.3 : 0.4) }
              ],
            }))
          ]}
          fill={[
            { match: { id: 'likes' }, id: 'gradient-likes' },
            { match: { id: 'comments' }, id: 'gradient-comments' },
            { match: { id: 'shares' }, id: 'gradient-shares' }
          ]}
          axisTop={null}
          axisRight={null}
          axisBottom={{
            tickSize: 5,
            tickPadding: 8,
            tickRotation: 0,
            legend: 'Redes Sociais',
            legendPosition: 'middle',
            legendOffset: 40,
            truncateTickAt: 0
          }}
          axisLeft={{
            tickSize: 5,
            tickPadding: 8,
            tickRotation: 0,
            legend: 'Engajamentos',
            legendPosition: 'middle',
            legendOffset: -50,
            format: (value) => formatNumber(value as number),
            truncateTickAt: 0
          }}
          enableGridX={false}
          enableLabel={!isMobile}
          labelSkipWidth={32}
          labelSkipHeight={12}
          labelTextColor={{
            from: 'color',
            modifiers: [['darker', isDarkMode ? 2 : 3]],
          }}
          legends={showLegend ? [
            {
              dataFrom: 'keys',
              anchor: 'bottom-right',
              direction: 'column',
              justify: false,
              translateX: 120,
              translateY: 0,
              itemsSpacing: 8,
              itemDirection: 'left-to-right',
              itemWidth: 120,
              itemHeight: 24,
              itemOpacity: 0.85,
              symbolSize: 12,
              symbolShape: 'circle',
              symbolBorderColor: 'rgba(0, 0, 0, .5)',
              effects: [
                {
                  on: 'hover',
                  style: {
                    itemOpacity: 1,
                    symbolSize: 14
                  }
                }
              ],
              itemTextColor: theme.palette.text.secondary
            }
          ] : []}
          theme={chartTheme}
          animate={true}
          motionConfig={{
            mass: 1,
            tension: 170,
            friction: 26,
            clamp: false,
            precision: 0.01,
            velocity: 0
          }}
          // Usando um tooltip mais simples para evitar problemas de tipo
          tooltip={(props) => {
            // Usando any para evitar problemas de tipo
            const data = props.data as any;
            const id = props.id as string;
            const value = props.value as number;
            const color = props.color as string;
            const indexValue = props.indexValue as string;
            
            return (
              <Box
                sx={{
                  p: 1.5,
                  maxWidth: 200,
                  bgcolor: 'background.paper',
                  borderRadius: 1,
                  boxShadow: 3
                }}
              >
                <Box sx={{ mb: 1 }}>
                  <Typography variant="subtitle2">
                    {indexValue} - {engagementLabels[id as keyof typeof engagementLabels]}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {formatNumber(value)}
                  </Typography>
                </Box>
              </Box>
            );
          }}
          role="application"
          ariaLabel="Engajamento por rede social"
          barAriaLabel={e => `${e.indexValue}: ${e.id}: ${e.value}`}
        />
      </Box>
      
      {/* Legenda de ícones */}
      <Box 
        sx={{ 
          display: 'flex', 
          justifyContent: 'center', 
          gap: 4, 
          mt: 2,
          flexWrap: 'wrap'
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.8 }}>
          <Favorite fontSize="small" sx={{ color: engagementColors.likes }} />
          <Typography variant="caption" sx={{ color: theme.palette.text.secondary, fontWeight: 500 }}>
            Curtidas
          </Typography>
        </Box>
        
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.8 }}>
          <Comment fontSize="small" sx={{ color: engagementColors.comments }} />
          <Typography variant="caption" sx={{ color: theme.palette.text.secondary, fontWeight: 500 }}>
            Comentários
          </Typography>
        </Box>
        
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.8 }}>
          <ShareIcon fontSize="small" sx={{ color: engagementColors.shares }} />
          <Typography variant="caption" sx={{ color: theme.palette.text.secondary, fontWeight: 500 }}>
            Compartilhamentos
          </Typography>
        </Box>
      </Box>
    </Paper>
  );
};

export default NetworkEngagementChart;