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
  FilterList
} from '@mui/icons-material';
import { formatNumber } from '../../utils/formatters';
import { socialColors, colorPalettes } from '../../theme/constants/colors';

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

// Interface estendida para dados de barras do Nivo
type BarItem = {
  data: EngagementData;
  id?: string | number;
  value: number;
  index: number;
  indexValue: string;
  color: string;
};

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

  // Cores para cada tipo de engajamento usando a paleta do projeto
  const engagementColors = useMemo(() => ({
    likes: colorPalettes.blue.main,
    comments: colorPalettes.purple.main,
    shares: colorPalettes.green.main
  }), []);

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
          p: 2.5,
          height, 
          bgcolor: theme.palette.background.paper,
          borderRadius: 2,
          border: isDarkMode ? `1px solid ${alpha(theme.palette.divider, 0.1)}` : 'none',
        }}
      >
        <Box sx={{ mb: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Skeleton variant="text" width={200} height={28} sx={{ 
            bgcolor: isDarkMode ? alpha(theme.palette.divider, 0.1) : alpha(theme.palette.divider, 0.1)
          }} />
          <Skeleton variant="circular" width={32} height={32} sx={{ 
            bgcolor: isDarkMode ? alpha(theme.palette.divider, 0.1) : alpha(theme.palette.divider, 0.1)
          }} />
        </Box>
        <Skeleton 
          variant="rectangular" 
          height={height - 80}
          sx={{ 
            bgcolor: isDarkMode ? alpha(theme.palette.divider, 0.1) : alpha(theme.palette.divider, 0.1),
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
        p: 2.5,
        height,
        bgcolor: theme.palette.background.paper,
        position: 'relative',
        borderRadius: 2,
        border: isDarkMode ? `1px solid ${alpha(theme.palette.divider, 0.1)}` : 'none',
        transition: 'all 0.3s ease',
        overflowX: 'hidden',
        overflowY: 'hidden',
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
            ${colorPalettes.blue.main} 0%, 
            ${colorPalettes.blue.light} 100%)`,
          opacity: 0.8,
          borderRadius: '8px 8px 0 0',
        }
      }}
    >
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        mb: 2,
        flexWrap: isMobile ? 'wrap' : 'nowrap',
        gap: isMobile ? 2 : 0,
        position: 'relative',
        zIndex: 1,
      }}>
        <Typography 
          variant="h6" 
          sx={{ 
            fontWeight: 600,
            color: theme.palette.text.primary,
            display: 'flex',
            alignItems: 'center',
            gap: 1,
            fontSize: '1rem',
          }}
        >
          <FilterList sx={{ color: colorPalettes.blue.main }} />
          {title}
        </Typography>
        
        <Box sx={{ display: 'flex', gap: 0.5, alignItems: 'center' }}>
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
                  bgcolor: alpha(colorPalettes.blue.main, isDarkMode ? 0.2 : 0.1),
                  color: colorPalettes.blue.main,
                  '&:hover': {
                    bgcolor: alpha(colorPalettes.blue.main, isDarkMode ? 0.25 : 0.15),
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
                    color: colorPalettes.blue.main,
                    bgcolor: alpha(colorPalettes.blue.main, 0.1),
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
                    color: colorPalettes.blue.main,
                    bgcolor: alpha(colorPalettes.blue.main, 0.1),
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
                color: colorPalettes.blue.main,
                bgcolor: alpha(colorPalettes.blue.main, 0.1),
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
            elevation: 3,
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
      
      {/* Container do gráfico */}
      <Box sx={{ 
        height: `calc(${height - 70}px)`,
        width: '100%',
        position: 'relative',
      }}>
        <ResponsiveBar
          data={data}
          keys={['likes', 'comments', 'shares']}
          indexBy="network"
          margin={{ 
            top: 20, 
            right: showLegend ? 150 : 30,
            bottom: 40, 
            left: 60 
          }}
          padding={0.3}
          innerPadding={isMobile ? 1 : 2}
          groupMode={viewMode}
          valueScale={{ type: 'linear', nice: true }}
          indexScale={{ type: 'band', round: true }}
          // @ts-ignore - A tipagem está errada, mas o código funciona
          colors={(bar) => {
            // @ts-ignore - Biblioteca espera `id` mesmo que TypeScript não reconheça
            if (!bar || !bar.id) return colorPalettes.blue.main;
            // @ts-ignore
            return engagementColors[bar.id as keyof typeof engagementColors] || colorPalettes.blue.main;
          }}
          borderRadius={3}
          borderWidth={1}
          // @ts-ignore - A tipagem está errada, mas o código funciona
          borderColor={(bar) => {
            // @ts-ignore - Biblioteca espera `id` mesmo que TypeScript não reconheça
            if (!bar || !bar.id) return alpha(colorPalettes.blue.main, 0.4);
            // @ts-ignore
            const color = engagementColors[bar.id as keyof typeof engagementColors] || colorPalettes.blue.main;
            return isDarkMode ? alpha(color, 0.4) : alpha(color, 0.8);
          }}
          enableGridY={true}
          gridYValues={5}
          defs={[
            ...Object.entries(engagementColors).map(([key, color]) => ({
              id: `gradient-${key}`,
              type: 'linearGradient',
              colors: [
                { offset: 0, color: alpha(color, isDarkMode ? 0.8 : 0.9) },
                { offset: 100, color: alpha(color, isDarkMode ? 0.35 : 0.5) }
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
            legend: '',
            legendPosition: 'middle',
            legendOffset: 35,
            truncateTickAt: 0,
          }}
          axisLeft={{
            tickSize: 5,
            tickPadding: 12,
            tickRotation: 0,
            legend: '',
            legendPosition: 'middle',
            legendOffset: -40,
            format: (value) => {
              if (value >= 1000000) return `${(value/1000000).toFixed(1)}M`;
              if (value >= 1000) return `${(value/1000).toFixed(0)}K`;
              return value;
            },
            truncateTickAt: 0
          }}
          enableGridX={false}
          enableLabel={!isMobile && viewMode !== 'grouped'}
          labelSkipWidth={32}
          labelSkipHeight={16}
          labelTextColor={{
            from: 'color',
            modifiers: [['darker', isDarkMode ? 3 : 4]],
          }}
          theme={{
            ...chartTheme,
            grid: {
              line: {
                stroke: alpha(theme.palette.divider, isDarkMode ? 0.08 : 0.15),
                strokeWidth: 1,
                strokeDasharray: isDarkMode ? '3 3' : '2 4', 
              },
            },
            axis: {
              ...chartTheme.axis,
              ticks: {
                ...chartTheme.axis.ticks,
                line: {
                  stroke: alpha(theme.palette.divider, 0.4),
                  strokeWidth: 1,
                },
              }
            }
          }}
          animate={true}
          motionConfig={{
            mass: 1,
            tension: 170,
            friction: 26,
            clamp: false,
            precision: 0.01,
            velocity: 0
          }}
          // @ts-ignore - A tipagem está errada, mas o código funciona
          tooltip={({ id, value, color, indexValue, data: tooltipData }) => {
            return (
              <Box
                sx={{
                  p: 1.5,
                  maxWidth: 180,
                  bgcolor: isDarkMode 
                    ? alpha(theme.palette.background.paper, 0.95) 
                    : theme.palette.background.paper,
                  borderRadius: 2,
                  boxShadow: theme.shadows[3],
                  border: `1px solid ${
                    isDarkMode 
                      ? alpha(theme.palette.divider, 0.2) 
                      : alpha(theme.palette.primary.main, 0.1)
                  }`,
                  backdropFilter: 'blur(8px)',
                }}
              >
                <Box
                  sx={{ 
                    display: 'flex',
                    alignItems: 'center',
                    gap: 0.8,
                    color: getSocialColor(String(indexValue)),
                    fontSize: '0.875rem',
                    fontWeight: 600,
                    mb: 0.5
                  }}
                >
                  <Box
                    sx={{
                      width: 10,
                      height: 10,
                      borderRadius: '50%',
                      bgcolor: getSocialColor(String(indexValue)),
                    }}
                  />
                  <Typography 
                    component="span"
                    sx={{ 
                      color: 'inherit',
                      fontSize: 'inherit',
                      fontWeight: 'inherit'
                    }}
                  >
                    {indexValue}
                  </Typography>
                </Box>
                
                <Box sx={{ display: 'flex', flexDirection: 'column', mt: 0.5 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.8, mt: 0.5 }}>
                    <Box 
                      sx={{ 
                        width: 10, 
                        height: 10, 
                        borderRadius: '50%', 
                        bgcolor: color 
                      }}
                    />
                    <Box
                      sx={{
                        display: 'flex', 
                        justifyContent: 'space-between', 
                        width: '100%',
                        color: theme.palette.text.primary,
                        fontSize: '0.875rem',
                      }}
                    >
                      <Typography 
                        component="span"
                        sx={{
                          fontWeight: 500,
                          fontSize: 'inherit',
                          color: 'inherit',
                        }}
                      >
                        {engagementLabels[id as keyof typeof engagementLabels] || id}:
                      </Typography>
                      <Typography 
                        component="span"
                        sx={{
                          fontWeight: 600,
                          fontSize: 'inherit',
                          color: 'inherit',
                        }}
                      >
                        {formatNumber(value)}
                      </Typography>
                    </Box>
                  </Box>
                  
                  {/* Apenas mostrar outros tipos de engajamento se for stacked */}
                  {viewMode === 'stacked' && (
                    <Box sx={{ mt: 1, pl: 2.5 }}>
                      {Object.entries(engagementLabels)
                        .filter(([key]) => key !== (id as string))
                        .map(([key, label]) => (
                          <Box 
                            key={key}
                            sx={{ 
                              display: 'flex', 
                              justifyContent: 'space-between', 
                              width: '100%',
                              color: alpha(theme.palette.text.secondary, 0.8),
                              mb: 0.5,
                              fontSize: '0.75rem'
                            }}
                          >
                            <Typography 
                              component="span"
                              variant="caption"
                              sx={{ color: 'inherit', fontSize: 'inherit' }}
                            >
                              {label}:
                            </Typography>
                            <Typography 
                              component="span"
                              variant="caption"
                              sx={{ color: 'inherit', fontSize: 'inherit' }}
                            >
                              {formatNumber(tooltipData[key] as number)}
                            </Typography>
                          </Box>
                        ))}
                    </Box>
                  )}
                </Box>
                
                {/* Total para a rede */}
                <Box sx={{ 
                  mt: 1.5, 
                  pt: 0.5,
                  borderTop: `1px solid ${alpha(theme.palette.divider, 0.1)}`
                }}>
                  <Box
                    sx={{ 
                      display: 'flex', 
                      justifyContent: 'space-between', 
                      fontWeight: 500,
                      fontSize: '0.75rem',
                    }}
                  >
                    <Typography 
                      component="span" 
                      variant="body2"
                      sx={{ fontSize: 'inherit', fontWeight: 500 }}
                    >
                      Total:
                    </Typography>
                    <Typography 
                      component="span" 
                      variant="body2"
                      sx={{ 
                        fontSize: 'inherit', 
                        fontWeight: 600,
                        color: theme.palette.text.primary 
                      }}
                    >
                      {formatNumber(getTotalEngagement(tooltipData))}
                    </Typography>
                  </Box>
                </Box>
              </Box>
            );
          }}
          role="application"
          ariaLabel="Engajamento por rede social"
          // @ts-ignore
          barAriaLabel={e => {
            // @ts-ignore
            const label = engagementLabels[e.id as keyof typeof engagementLabels] || e.id;
            return `${e.indexValue}: ${label}: ${e.value}`;
          }}
          legends={[
            {
              dataFrom: 'keys',
              anchor: 'right',
              direction: 'column',
              justify: false,
              translateX: 120,
              translateY: 0,
              itemWidth: 100,
              itemHeight: 20,
              itemsSpacing: 8,
              itemDirection: 'left-to-right',
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
              data: [
                {
                  id: 'likes',
                  label: 'Curtidas',
                  color: colorPalettes.blue.main
                },
                {
                  id: 'comments',
                  label: 'Comentários',
                  color: colorPalettes.purple.main
                },
                {
                  id: 'shares',
                  label: 'Compartilhamentos',
                  color: colorPalettes.green.main
                }
              ]
            }
          ]}
        />
      </Box>
    </Paper>
  );
};

export default NetworkEngagementChart;