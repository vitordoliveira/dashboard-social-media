import React, { useMemo, useState } from 'react';
import { ResponsiveLine } from '@nivo/line';
import { 
  Box, 
  Paper, 
  Typography, 
  useTheme, 
  alpha, 
  Skeleton, 
  IconButton, 
  Menu, 
  MenuItem,
  Tooltip,
  useMediaQuery
} from '@mui/material';
import { 
  MoreVert, 
  GetApp, 
  Timeline, 
  Fullscreen,
  ZoomIn,
  ZoomOut
} from '@mui/icons-material';
import { formatNumber } from '../../utils/formatters';
import { colorPalettes, socialColors } from '../../theme/constants/colors';

interface DataPoint {
  x: string | number;
  y: number;
  percentage?: number;
  formattedY?: string;
}

interface Series {
  id: string;
  data: DataPoint[];
  color?: string;
}

interface LineChartProps {
  data: Series[];
  title: string;
  height?: number;
  showLegend?: boolean;
  isLoading?: boolean;
  enableArea?: boolean;
  enableGridX?: boolean;
  enableGridY?: boolean;
  enablePoints?: boolean;
  lineWidth?: number;
  onDownload?: () => void;
  onToggleFullscreen?: () => void;
  onViewTrend?: () => void;
}

const LineChart: React.FC<LineChartProps> = ({ 
  data, 
  title, 
  height = 400,
  showLegend = true,
  isLoading = false,
  enableArea = false,
  enableGridX = false,
  enableGridY = true,
  enablePoints = true,
  lineWidth = 2.5,
  onDownload,
  onToggleFullscreen,
  onViewTrend
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [zoomLevel, setZoomLevel] = useState(1);
  const open = Boolean(anchorEl);

  // Função que permite zoom no gráfico
  const handleZoom = (direction: 'in' | 'out') => {
    setZoomLevel(prev => {
      if (direction === 'in' && prev < 2) return prev + 0.25;
      if (direction === 'out' && prev > 0.5) return prev - 0.25;
      return prev;
    });
  };

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  // Determine se estamos usando o tema escuro ou claro
  const isDarkMode = theme.palette.mode === 'dark';

  // Cores específicas para o tema escuro e claro
  const chartColors = useMemo(() => {
    const baseColors = {
      grid: isDarkMode ? alpha(theme.palette.divider, 0.1) : alpha(theme.palette.divider, 0.2),
      background: isDarkMode 
        ? alpha(theme.palette.background.paper, 0.6)
        : alpha(theme.palette.background.paper, 0.8),
      tooltip: isDarkMode
        ? alpha(theme.palette.background.paper, 0.95)
        : alpha(theme.palette.background.paper, 0.95),
      tooltipBorder: isDarkMode 
        ? theme.palette.divider 
        : alpha(theme.palette.primary.main, 0.2),
      crosshair: isDarkMode
        ? alpha(theme.palette.primary.main, 0.4)
        : alpha(theme.palette.primary.main, 0.3)
    };
    
    return baseColors;
  }, [theme, isDarkMode]);

  // Gere uma paleta de cores para os gráficos se não houver cores fornecidas
  const generateChartColors = useMemo(() => {
    const defaultColors = [
      socialColors.facebook,
      socialColors.twitter, 
      socialColors.instagram, 
      socialColors.linkedin,
      colorPalettes.purple.main,
      colorPalettes.teal.main,
      colorPalettes.amber.main,
      colorPalettes.green.main
    ];

    const usedColors = data.map((series, index) => 
      series.color || defaultColors[index % defaultColors.length]
    );

    return usedColors;
  }, [data]);

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
        stroke: chartColors.grid,
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
        background: chartColors.tooltip,
        color: theme.palette.text.primary,
        fontSize: 12,
        fontFamily: theme.typography.fontFamily,
        borderRadius: 8,
        boxShadow: theme.shadows[3],
        border: `1px solid ${chartColors.tooltipBorder}`,
      },
    },
    crosshair: {
      line: {
        stroke: chartColors.crosshair,
        strokeWidth: 1.5,
        strokeDasharray: '5 5',
        strokeOpacity: 0.8,
      }
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
      link: {
        stroke: theme.palette.primary.main,
        strokeWidth: 1,
        outlineWidth: 2,
        outlineColor: theme.palette.background.paper,
        outlineOpacity: 1,
      },
      outline: {
        stroke: theme.palette.primary.main,
        strokeWidth: 2,
        outlineWidth: 2,
        outlineColor: theme.palette.background.paper,
        outlineOpacity: 1,
      },
      symbol: {
        fill: theme.palette.primary.main,
        outlineWidth: 2,
        outlineColor: theme.palette.background.paper,
        outlineOpacity: 1,
      }
    }
  }), [theme, chartColors, isDarkMode]);

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
          transition: 'all 0.3s ease',
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
        '&:hover': {
          boxShadow: isDarkMode ? `0 4px 20px ${alpha('#000', 0.1)}` : theme.shadows[3],
        },
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '4px',
          background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.primary.light})`,
          borderRadius: '8px 8px 0 0',
          opacity: 0.8,
        }
      }}
    >
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        mb: 2,
        position: 'relative',
        zIndex: 1
      }}>
        <Typography 
          variant="h6"
          sx={{ 
            color: theme.palette.text.primary,
            fontSize: '1rem',
            fontWeight: 600,
          }}
        >
          {title}
        </Typography>
        <Box sx={{ display: 'flex', gap: 0.5 }}>
          {!isMobile && (
            <>
              <Tooltip title="Diminuir zoom">
                <IconButton 
                  size="small" 
                  onClick={() => handleZoom('out')}
                  disabled={zoomLevel <= 0.5}
                  sx={{ 
                    color: theme.palette.text.secondary,
                    '&:hover': {
                      color: theme.palette.primary.main,
                      bgcolor: alpha(theme.palette.primary.main, 0.1),
                    }
                  }}
                >
                  <ZoomOut fontSize="small" />
                </IconButton>
              </Tooltip>
              <Tooltip title="Aumentar zoom">
                <IconButton 
                  size="small" 
                  onClick={() => handleZoom('in')}
                  disabled={zoomLevel >= 2}
                  sx={{ 
                    color: theme.palette.text.secondary,
                    '&:hover': {
                      color: theme.palette.primary.main,
                      bgcolor: alpha(theme.palette.primary.main, 0.1),
                    }
                  }}
                >
                  <ZoomIn fontSize="small" />
                </IconButton>
              </Tooltip>
            </>
          )}
          
          {onDownload && (
            <Tooltip title="Exportar dados">
              <IconButton 
                size="small" 
                onClick={onDownload}
                sx={{ 
                  color: theme.palette.text.secondary,
                  '&:hover': {
                    color: theme.palette.primary.main,
                    bgcolor: alpha(theme.palette.primary.main, 0.1),
                  }
                }}
              >
                <GetApp fontSize="small" />
              </IconButton>
            </Tooltip>
          )}
          
          {onViewTrend && (
            <Tooltip title="Análise de tendência">
              <IconButton 
                size="small" 
                onClick={onViewTrend}
                sx={{ 
                  color: theme.palette.text.secondary,
                  '&:hover': {
                    color: theme.palette.primary.main,
                    bgcolor: alpha(theme.palette.primary.main, 0.1),
                  }
                }}
              >
                <Timeline fontSize="small" />
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
                    bgcolor: alpha(theme.palette.primary.main, 0.1),
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
            aria-label="Mais opções"
            sx={{ 
              color: theme.palette.text.secondary,
              '&:hover': {
                color: theme.palette.primary.main,
                bgcolor: alpha(theme.palette.primary.main, 0.1),
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
              onDownload?.();
            }}>
              <GetApp sx={{ mr: 1.5, fontSize: 18 }} /> Exportar CSV
            </MenuItem>
          )}
          {onViewTrend && (
            <MenuItem onClick={() => {
              handleClose();
              onViewTrend?.();
            }}>
              <Timeline sx={{ mr: 1.5, fontSize: 18 }} /> Análise de Tendência
            </MenuItem>
          )}
          {onToggleFullscreen && (
            <MenuItem onClick={() => {
              handleClose();
              onToggleFullscreen?.();
            }}>
              <Fullscreen sx={{ mr: 1.5, fontSize: 18 }} /> Tela Cheia
            </MenuItem>
          )}
        </Menu>
      </Box>
      
      <Box 
        sx={{ 
          height: `calc(${height - 70}px)`,
          transform: `scale(${zoomLevel})`,
          transformOrigin: 'center center',
          transition: 'transform 0.3s ease'
        }}
      >
        <ResponsiveLine
          data={data}
          margin={{ 
            top: 20, 
            right: showLegend ? 120 : 30, 
            bottom: 40, 
            left: 60 
          }}
          xScale={{ type: 'point' }}
          yScale={{ 
            type: 'linear', 
            min: 'auto', 
            max: 'auto',
            stacked: false,
            reverse: false,
            nice: true
          }}
          curve="monotoneX"
          axisTop={null}
          axisRight={null}
          axisBottom={{
            tickSize: 5,
            tickPadding: 8,
            tickRotation: 0,
            legend: '',
            legendOffset: 35,
          }}
          axisLeft={{
            tickSize: 5,
            tickPadding: 12,
            tickRotation: 0,
            legend: '',
            legendOffset: -40,
            format: value => {
              if (value >= 1000000) return `${(value/1000000).toFixed(1)}M`;
              if (value >= 1000) return `${(value/1000).toFixed(0)}K`;
              return value;
            },
          }}
          enableGridX={enableGridX}
          enableGridY={enableGridY}
          pointSize={enablePoints ? 8 : 0}
          pointColor={{ theme: 'background' }}
          pointBorderWidth={2}
          pointBorderColor={{ from: 'serieColor' }}
          pointLabelYOffset={-12}
          enableArea={enableArea}
          areaBaselineValue={0}
          areaOpacity={0.15}
          enableSlices="x"
          crosshairType="x"
          lineWidth={lineWidth}
          legends={showLegend ? [
            {
              anchor: 'right',
              direction: 'column',
              justify: false,
              translateX: 100,
              translateY: 0,
              itemsSpacing: 10,
              itemDirection: 'left-to-right',
              itemWidth: 100,
              itemHeight: 18,
              itemOpacity: 0.85,
              symbolSize: 10,
              symbolShape: 'circle',
              symbolBorderColor: 'rgba(0, 0, 0, .5)',
              effects: [
                {
                  on: 'hover',
                  style: {
                    itemBackground: alpha(theme.palette.background.paper, 0.7),
                    itemOpacity: 1
                  }
                }
              ]
            }
          ] : []}
          theme={chartTheme}
          colors={generateChartColors}
          useMesh={true}
          animate={true}
          motionConfig={{
            mass: 1, 
            tension: 170, 
            friction: 26, 
            clamp: false, 
            precision: 0.01, 
            velocity: 0
          }}
          tooltip={({ point }) => (
            <Box
              sx={{
                p: 1.5,
                bgcolor: chartColors.tooltip,
                border: `1px solid ${chartColors.tooltipBorder}`,
                borderRadius: 2,
                boxShadow: theme.shadows[3],
                maxWidth: 180,
                backdropFilter: 'blur(8px)',
              }}
            >
              <Typography
                sx={{ 
                  color: point.seriesColor,
                  fontSize: '0.875rem',
                  fontWeight: 600,
                  mb: 0.5,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 0.8
                }}
              >
                <Box
                  sx={{
                    width: 10,
                    height: 10,
                    borderRadius: '50%',
                    bgcolor: point.seriesColor,
                  }}
                />
                {point.seriesId}
              </Typography>
              
              <Box sx={{ display: 'flex', flexDirection: 'column', mt: 0.5 }}>
                <Typography variant="caption" color="text.secondary">
                  {point.data.xFormatted || point.data.x}
                </Typography>
                <Typography
                  sx={{
                    color: theme.palette.text.primary,
                    fontSize: '0.875rem',
                    fontWeight: 600,
                    mt: 0.5
                  }}
                >
                  {point.data.formattedY || formatNumber(point.data.y)}
                </Typography>
                {point.data.percentage !== undefined && (
                  <Typography
                    sx={{
                      color: point.data.percentage > 0 ? colorPalettes.green.main : colorPalettes.amber.dark,
                      fontSize: '0.75rem',
                      fontWeight: 600,
                      mt: 0.5,
                      display: 'flex',
                      alignItems: 'center',
                      gap: 0.5
                    }}
                  >
                    {point.data.percentage > 0 ? '+' : ''}{point.data.percentage.toFixed(1)}%
                  </Typography>
                )}
              </Box>
            </Box>
          )}
        />
      </Box>
    </Paper>
  );
};

export default LineChart;