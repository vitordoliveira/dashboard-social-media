import React, { useMemo } from 'react';
import { ResponsiveBar, BarTooltipProps } from '@nivo/bar';
import { Box, Paper, Typography, useTheme, alpha, Skeleton, IconButton, Menu, MenuItem, Tooltip } from '@mui/material';
import { MoreVert, GetApp, Timeline, Fullscreen } from '@mui/icons-material';
import { formatNumber } from '../../utils/formatters';
import { EngagementData } from '../../types/dashboard';

interface BarDatum extends EngagementData {
  [key: string]: string | number;
}

interface BarChartProps {
  data: EngagementData[];
  title: string;
  height?: number;
  showLegend?: boolean;
  isLoading?: boolean;
  onDownload?: () => void;
  onToggleFullscreen?: () => void;
  onViewTrend?: () => void;
}

// Labels amigáveis para os tipos de engajamento em português
const engagementLabels = {
  likes: "Curtidas",
  comments: "Comentários",
  shares: "Compartilhamentos"
};

const CustomTooltip = ({ id, value, color, indexValue }: BarTooltipProps<BarDatum>) => {
  const theme = useTheme();
  const label = typeof id === 'string' ? (engagementLabels[id as keyof typeof engagementLabels] || id) : String(id);
  
  return (
    <Box
      sx={{
        background: alpha(theme.palette.background.paper, 0.9),
        padding: 1.5,
        border: `1px solid ${theme.palette.divider}`,
        borderRadius: 1,
        boxShadow: theme.shadows[3],
        backdropFilter: 'blur(8px)',
        maxWidth: 200,
      }}
    >
      <Typography
        variant="subtitle2"
        sx={{ 
          color: theme.palette.text.primary,
          mb: 0.5,
          fontWeight: 600
        }}
      >
        {String(indexValue)}
      </Typography>
      <Box sx={{ 
        display: 'flex', 
        alignItems: 'center', 
        gap: 0.5,
        color,
        mb: 0.5
      }}>
        <Box
          sx={{
            width: 8,
            height: 8,
            borderRadius: '50%',
            bgcolor: color,
          }}
        />
        <Typography variant="body2" sx={{ fontWeight: 600 }}>
          {label}
        </Typography>
      </Box>
      <Typography
        variant="body2"
        sx={{
          color: theme.palette.text.secondary
        }}
      >
        {formatNumber(value)}
      </Typography>
    </Box>
  );
};

// Interface para o item de legenda
interface LegendItem {
  id: string;
  color: string;
  fill?: string;
}

const BarChart: React.FC<BarChartProps> = ({ 
  data, 
  title, 
  height = 400,
  showLegend = true,
  isLoading = false,
  onDownload,
  onToggleFullscreen,
  onViewTrend
}) => {
  const theme = useTheme();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const chartColors = useMemo(() => ({
    likes: theme.palette.primary.main,
    comments: theme.palette.secondary.main,
    shares: theme.palette.success.main
  }), [theme]);

  const chartTheme = useMemo(() => ({
    background: 'transparent',
    textColor: theme.palette.text.secondary,
    fontSize: 11,
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
        },
      },
    },
    grid: {
      line: {
        stroke: alpha(theme.palette.divider, 0.05),
        strokeWidth: 1,
      },
    },
    legends: {
      text: {
        fill: theme.palette.text.secondary,
        fontSize: 11,
      },
    },
    tooltip: {
      container: {
        background: theme.palette.background.paper,
        color: theme.palette.text.primary,
        fontSize: 12,
      },
    },
  }), [theme]);

  if (isLoading) {
    return (
      <Paper 
        sx={{ 
          p: 3, 
          height, 
          backgroundImage: 'none'
        }}
      >
        <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Skeleton variant="text" width={200} height={32} />
          <Skeleton variant="circular" width={40} height={40} />
        </Box>
        <Skeleton variant="rectangular" height={height - 100} />
      </Paper>
    );
  }

  // Renderiza a legenda traduzida
  const renderLegend = (width: number, height: number, legendItems: LegendItem[]) => {
    if (!showLegend) return null;
    
    return (
      <g transform={`translate(${width - 120}, ${height / 2 - 50})`}>
        {legendItems.map((item, i) => {
          const label = engagementLabels[item.id as keyof typeof engagementLabels] || item.id;
          
          return (
            <g key={i} transform={`translate(0, ${i * 25})`}>
              <circle 
                cx={6} 
                cy={6} 
                r={6} 
                fill={item.color} 
              />
              <text 
                x={20} 
                y={9} 
                style={{ 
                  fill: theme.palette.text.secondary,
                  fontSize: 11
                }}
              >
                {label}
              </text>
            </g>
          );
        })}
      </g>
    );
  };

  return (
    <Paper 
      sx={{ 
        p: 3, 
        height,
        backgroundImage: 'none',
        position: 'relative',
        overflow: 'hidden',
        transition: 'all 0.3s ease-in-out',
        '&:hover': {
          boxShadow: theme.shadows[4]
        },
        '&:before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '4px',
          background: `linear-gradient(90deg, 
            ${alpha(theme.palette.primary.main, 0.05)} 0%, 
            ${alpha(theme.palette.primary.main, 0.15)} 100%
          )`,
        }
      }}
    >
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        mb: 3
      }}>
        <Typography 
          variant="h6" 
          sx={{ 
            fontWeight: 600,
            color: theme.palette.text.primary
          }}
        >
          {title}
        </Typography>
        <Box sx={{ display: 'flex', gap: 1 }}>
          {onDownload && (
            <Tooltip title="Exportar dados">
              <span>
                <IconButton size="small" onClick={onDownload}>
                  <GetApp fontSize="small" />
                </IconButton>
              </span>
            </Tooltip>
          )}
          {onViewTrend && (
            <Tooltip title="Ver tendência">
              <span>
                <IconButton size="small" onClick={onViewTrend}>
                  <Timeline fontSize="small" />
                </IconButton>
              </span>
            </Tooltip>
          )}
          {onToggleFullscreen && (
            <Tooltip title="Tela cheia">
              <span>
                <IconButton size="small" onClick={onToggleFullscreen}>
                  <Fullscreen fontSize="small" />
                </IconButton>
              </span>
            </Tooltip>
          )}
          <IconButton
            size="small"
            onClick={handleClick}
            aria-controls={open ? 'chart-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
          >
            <MoreVert fontSize="small" />
          </IconButton>
        </Box>
        <Menu
          id="chart-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            'aria-labelledby': 'chart-button',
          }}
        >
          {onDownload && (
            <MenuItem 
              key="export"
              onClick={() => {
                handleClose();
                onDownload();
              }}
            >
              Exportar CSV
            </MenuItem>
          )}
          {onViewTrend && (
            <MenuItem 
              key="trend"
              onClick={() => {
                handleClose();
                onViewTrend();
              }}
            >
              Análise de Tendência
            </MenuItem>
          )}
          {onToggleFullscreen && (
            <MenuItem 
              key="fullscreen"
              onClick={() => {
                handleClose();
                onToggleFullscreen();
              }}
            >
              Tela Cheia
            </MenuItem>
          )}
        </Menu>
      </Box>
      <Box sx={{ height: height - 100 }}>
        <ResponsiveBar<BarDatum>
          data={data as BarDatum[]}
          keys={['likes', 'comments', 'shares']}
          indexBy="network"
          margin={{ 
            top: 20, 
            right: showLegend ? 130 : 20, 
            bottom: 50, 
            left: 60 
          }}
          padding={0.3}
          valueScale={{ type: 'linear' }}
          indexScale={{ type: 'band', round: true }}
          colors={({ id }) => chartColors[id as keyof typeof chartColors]}
          borderRadius={4}
          borderColor={{
            from: 'color',
            modifiers: [['darker', 0.6]],
          }}
          axisTop={null}
          axisRight={null}
          axisBottom={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: '',
            legendPosition: 'middle',
            legendOffset: 40
          }}
          axisLeft={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: '',
            legendPosition: 'middle',
            legendOffset: -40,
            format: formatNumber
          }}
          enableLabel={false}
          labelSkipWidth={12}
          labelSkipHeight={12}
          labelTextColor={{
            from: 'color',
            modifiers: [['darker', 1.6]],
          }}
          theme={chartTheme}
          tooltip={CustomTooltip}
          animate={true}
          motionConfig={{
            mass: 1,
            tension: 170,
            friction: 26,
            clamp: false,
            precision: 0.01,
            velocity: 0
          }}
          layers={[
            'grid',
            'axes',
            'bars',
            'markers',
            'annotations',
            ({ bars }) => {
              // Extrair as cores e IDs para a legenda
              const legendItems: LegendItem[] = [];
              if (bars && bars.length > 0) {
                // Agrupar por ID e pegar apenas um representante de cada
                const idSet = new Set<string>();
                bars.forEach(bar => {
                  if (bar.data.id && !idSet.has(bar.data.id as string)) {
                    idSet.add(bar.data.id as string);
                    legendItems.push({
                      id: bar.data.id as string,
                      color: bar.color
                    });
                  }
                });
              }

              const width = bars && bars[0]?.width ? bars[0].width + bars[0].x + 130 : 500;
              const height = bars && bars[0]?.height ? bars[0].height + 50 : 300;

              return renderLegend(width, height, legendItems);
            }
          ]}
        />
      </Box>
    </Paper>
  );
};

export default BarChart;