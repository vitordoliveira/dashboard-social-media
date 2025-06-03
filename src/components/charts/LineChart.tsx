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
  ZoomOut,
  TrendingUp
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
  lineWidth = 3, // Aumentamos a largura da linha para maior visibilidade
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
      grid: isDarkMode ? alpha(theme.palette.divider, 0.12) : alpha(theme.palette.divider, 0.2),
      background: isDarkMode 
        ? alpha(theme.palette.background.paper, 0.6)
        : alpha(theme.palette.background.paper, 0.8),
      tooltip: isDarkMode
        ? alpha(theme.palette.background.paper, 0.95)
        : alpha(theme.palette.background.paper, 0.95),
      tooltipBorder: isDarkMode 
        ? alpha(theme.palette.primary.main, 0.3) 
        : alpha(theme.palette.primary.main, 0.2),
      crosshair: isDarkMode
        ? alpha(theme.palette.primary.main, 0.5)
        : alpha(theme.palette.primary.main, 0.4),
      tickLabels: isDarkMode
        ? alpha(theme.palette.text.secondary, 0.85)
        : theme.palette.text.secondary
    };
    
    return baseColors;
  }, [theme, isDarkMode]);

  // Gere uma paleta de cores para os gráficos se não houver cores fornecidas
  const generateChartColors = useMemo(() => {
    // Cores mais vibrantes para o tema escuro
    const defaultColors = isDarkMode ? [
      alpha(socialColors.facebook, 1),
      alpha(socialColors.twitter, 1), 
      alpha(socialColors.instagram, 1), 
      alpha(socialColors.linkedin, 1),
      alpha(colorPalettes.purple.main, 1),
      alpha(colorPalettes.teal.main, 1),
      alpha(colorPalettes.amber.main, 1),
      alpha(colorPalettes.green.main, 1)
    ] : [
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
  }, [data, isDarkMode]);

  // Tema do gráfico baseado na paleta do Material UI
  const chartTheme = useMemo(() => ({
    background: 'transparent',
    textColor: chartColors.tickLabels,
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
          fill: chartColors.tickLabels,
          fontSize: 11,
          fontFamily: theme.typography.fontFamily,
          fontWeight: 500, // Aumentada a espessura para melhor legibilidade
        },
      },
      legend: {
        text: {
          fill: theme.palette.text.primary,
          fontSize: 12,
          fontWeight: 600, // Aumentada a espessura para melhor legibilidade
          fontFamily: theme.typography.fontFamily,
        }
      }
    },
    grid: {
      line: {
        stroke: chartColors.grid,
        strokeWidth: 1,
        strokeDasharray: isDarkMode ? '3 5' : '2 4', // Ajustado para melhor visibilidade
      },
    },
    legends: {
      text: {
        fill: theme.palette.text.secondary,
        fontSize: 12, // Aumentado o tamanho para melhor legibilidade
        fontFamily: theme.typography.fontFamily,
        fontWeight: 500, // Adicionada a espessura para melhor legibilidade
      },
    },
    tooltip: {
      container: {
        background: chartColors.tooltip,
        color: theme.palette.text.primary,
        fontSize: 12,
        fontFamily: theme.typography.fontFamily,
        borderRadius: 8,
        boxShadow: isDarkMode ? '0 4px 20px rgba(0,0,0,0.25)' : theme.shadows[3],
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
        overflow: 'hidden', // Para garantir que o brilho não ultrapasse o contêiner
        '&:hover': {
          boxShadow: isDarkMode ? `0 4px 20px ${alpha('#000', 0.15)}` : theme.shadows[3],
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
            fontSize: '1.05rem',
            fontWeight: 600,
            display: 'flex',
            alignItems: 'center',
            gap: 1
          }}
        >
          <TrendingUp sx={{ 
            color: theme.palette.primary.main, 
            fontSize: '1.2rem',
            filter: isDarkMode ? 'drop-shadow(0 0 1px rgba(255,255,255,0.2))' : 'none'
          }} />
          {title}
        </Typography>
        <Box sx={{ display: 'flex', gap: 0.5 }}>
          {!isMobile && (
            <>
              <Tooltip title="Diminuir zoom" arrow>
                <IconButton 
                  size="small" 
                  onClick={() => handleZoom('out')}
                  disabled={zoomLevel <= 0.5}
                  sx={{ 
                    color: theme.palette.text.secondary,
                    '&:hover': {
                      color: theme.palette.primary.main,
                      bgcolor: alpha(theme.palette.primary.main, 0.1),
                    },
                    '&.Mui-disabled': {
                      color: alpha(theme.palette.text.disabled, 0.5)
                    }
                  }}
                >
                  <ZoomOut fontSize="small" />
                </IconButton>
              </Tooltip>
              <Tooltip title="Aumentar zoom" arrow>
                <IconButton 
                  size="small" 
                  onClick={() => handleZoom('in')}
                  disabled={zoomLevel >= 2}
                  sx={{ 
                    color: theme.palette.text.secondary,
                    '&:hover': {
                      color: theme.palette.primary.main,
                      bgcolor: alpha(theme.palette.primary.main, 0.1),
                    },
                    '&.Mui-disabled': {
                      color: alpha(theme.palette.text.disabled, 0.5)
                    }
                  }}
                >
                  <ZoomIn fontSize="small" />
                </IconButton>
              </Tooltip>
            </>
          )}
          
          {onDownload && (
            <Tooltip title="Exportar dados" arrow>
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
            <Tooltip title="Análise de tendência" arrow>
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
            <Tooltip title="Tela cheia" arrow>
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
            right: showLegend ? 150 : 30, // Aumentamos o espaço para a legenda
            bottom: 50, // Aumentamos para dar mais espaço aos rótulos 
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
            tickPadding: 10, // Aumentado o espaçamento
            tickRotation: isMobile ? -45 : 0, // Girar em dispositivos móveis
            legend: '',
            legendOffset: 40, // Aumentado o offset para afastar o título
            renderTick: (tick) => {
              // Personalização de ticks para melhorar a legibilidade
              return (
                <g transform={`translate(${tick.x},${tick.y})`}>
                  <line stroke={theme.palette.divider} strokeWidth={1} y1={0} y2={5} />
                  <text
                    textAnchor="middle"
                    dominantBaseline="text-before-edge"
                    style={{
                      fill: chartColors.tickLabels,
                      fontSize: 11,
                      fontFamily: theme.typography.fontFamily,
                      fontWeight: 500
                    }}
                    y={10}
                  >
                    {tick.value}
                  </text>
                </g>
              );
            }
          }}
          axisLeft={{
            tickSize: 5,
            tickPadding: 12,
            tickRotation: 0,
            legend: '',
            legendOffset: -45, // Aumentado para afastar do eixo
            format: value => {
              if (value >= 1000000) return `${(value/1000000).toFixed(1)}M`;
              if (value >= 1000) return `${(value/1000).toFixed(0)}K`;
              return value;
            },
            renderTick: (tick) => {
              // Personalização de ticks para melhorar a legibilidade
              return (
                <g transform={`translate(${tick.x},${tick.y})`}>
                  <line stroke={theme.palette.divider} strokeWidth={1} x1={0} x2={-5} />
                  <text
                    textAnchor="end"
                    dominantBaseline="middle"
                    style={{
                      fill: chartColors.tickLabels,
                      fontSize: 11,
                      fontFamily: theme.typography.fontFamily,
                      fontWeight: 500
                    }}
                    x={-12}
                  >
                    {tick.value >= 1000000
                      ? `${(tick.value/1000000).toFixed(1)}M`
                      : tick.value >= 1000
                      ? `${(tick.value/1000).toFixed(0)}K`
                      : tick.value}
                  </text>
                </g>
              );
            }
          }}
          enableGridX={enableGridX}
          enableGridY={enableGridY}
          gridYValues={5} // Especificamos o número de linhas da grade 
          pointSize={enablePoints ? 8 : 0}
          pointColor={{ theme: 'background' }}
          pointBorderWidth={2}
          pointBorderColor={{ from: 'serieColor' }}
          pointLabelYOffset={-12}
          enableArea={enableArea}
          areaBaselineValue={0}
          areaOpacity={0.15}
          enableSlices="x"
          crosshairType="cross" // Alterado para cross para melhor visualização
          lineWidth={lineWidth}
          legends={showLegend ? [
            {
              anchor: 'right',
              direction: 'column',
              justify: false,
              translateX: 120,
              translateY: 0,
              itemsSpacing: 12, // Aumentado o espaçamento entre itens
              itemDirection: 'left-to-right',
              itemWidth: 100,
              itemHeight: 20, // Aumentado a altura para melhor clicabilidade
              itemOpacity: 0.85,
              symbolSize: 12, // Aumentado o tamanho do símbolo
              symbolShape: 'circle',
              symbolBorderColor: 'rgba(0, 0, 0, .5)',
              effects: [
                {
                  on: 'hover',
                  style: {
                    itemBackground: alpha(theme.palette.background.paper, 0.7),
                    itemOpacity: 1,
                    symbolSize: 14 // Aumentar no hover
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
            tension: 150, // Ajustado para animação mais suave
            friction: 30, // Ajustado para animação mais suave 
            clamp: false, 
            precision: 0.01, 
            velocity: 0
          }}
          tooltip={({ point }) => (
            <Box
              sx={{
                p: 1.8, // Aumentado o padding
                bgcolor: chartColors.tooltip,
                border: `1px solid ${chartColors.tooltipBorder}`,
                borderRadius: 2,
                boxShadow: isDarkMode 
                  ? '0 4px 20px rgba(0,0,0,0.25)' 
                  : '0 4px 20px rgba(0,0,0,0.15)',
                maxWidth: 200, // Aumentado a largura máxima
                backdropFilter: 'blur(8px)',
              }}
            >
              <Typography
                sx={{ 
                  color: point.seriesColor,
                  fontSize: '0.9rem', // Aumentado
                  fontWeight: 600,
                  mb: 0.8, // Aumentado
                  display: 'flex',
                  alignItems: 'center',
                  gap: 0.8
                }}
              >
                <Box
                  sx={{
                    width: 12, // Aumentado
                    height: 12, // Aumentado
                    borderRadius: '50%',
                    bgcolor: point.seriesColor,
                    boxShadow: isDarkMode 
                      ? `0 0 5px ${alpha(point.seriesColor, 0.5)}` 
                      : 'none' // Efeito de brilho em modo escuro
                  }}
                />
                {point.seriesId}
              </Typography>
              
              <Box sx={{ display: 'flex', flexDirection: 'column', mt: 0.8 }}>
                <Typography 
                  variant="caption" 
                  sx={{ 
                    color: theme.palette.text.secondary,
                    fontSize: '0.8rem', // Aumentado
                    fontWeight: 500 // Aumentado
                  }}
                >
                  {point.data.xFormatted || point.data.x}
                </Typography>
                <Typography
                  sx={{
                    color: theme.palette.text.primary,
                    fontSize: '1rem', // Aumentado
                    fontWeight: 600,
                    mt: 0.5,
                    textShadow: isDarkMode ? '0 0 1px rgba(255,255,255,0.2)' : 'none'
                  }}
                >
                  {point.data.formattedY || formatNumber(point.data.y)}
                </Typography>
                {point.data.percentage !== undefined && (
                  <Typography
                    sx={{
                      color: point.data.percentage > 0 ? colorPalettes.green.main : colorPalettes.amber.dark,
                      fontSize: '0.825rem', // Aumentado
                      fontWeight: 600,
                      mt: 0.8, // Aumentado
                      display: 'flex',
                      alignItems: 'center',
                      gap: 0.5,
                      textShadow: isDarkMode ? '0 0 1px rgba(0,0,0,0.3)' : 'none'
                    }}
                  >
                    {point.data.percentage > 0 ? '+' : ''}{point.data.percentage.toFixed(1)}%
                  </Typography>
                )}
              </Box>
            </Box>
          )}
          // Sombra nas linhas para maior destaque
          defs={[
            {
              id: 'line-gradient',
              type: 'linearGradient',
              colors: [
                { offset: 0, color: isDarkMode ? alpha(theme.palette.primary.main, 0.2) : alpha(theme.palette.primary.main, 0.1) },
                { offset: 100, color: isDarkMode ? 'rgba(0, 0, 0, 0)' : 'rgba(255, 255, 255, 0)' }
              ]
            }
          ]}
          // Adiciona sombras às linhas para maior destaque em tema escuro
          layers={[
            'grid',
            'axes',
            'crosshair',
            'lines',
            'points',
            'slices',
            'mesh',
            'legends',
          ]}
        />
      </Box>
    </Paper>
  );
};

export default LineChart;