import React, { useMemo } from 'react';
import { ResponsiveLine } from '@nivo/line';
import { Box, Paper, Typography, useTheme, alpha, Skeleton, IconButton, Menu, MenuItem } from '@mui/material';
import { MoreVert, GetApp, Timeline } from '@mui/icons-material';
import { formatNumber } from '../../utils/formatters';

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

  const chartTheme = useMemo(() => ({
    background: 'transparent',
    textColor: '#8F8F8F',
    fontSize: 11,
    axis: {
      domain: {
        line: {
          stroke: '#333333',
          strokeWidth: 1,
        },
      },
      ticks: {
        line: {
          stroke: '#333333',
          strokeWidth: 1,
        },
        text: {
          fill: '#8F8F8F',
          fontSize: 11,
          fontFamily: 'Inter, sans-serif'
        },
      },
    },
    grid: {
      line: {
        stroke: '#282828',
        strokeWidth: 1,
      },
    },
    legends: {
      text: {
        fill: '#8F8F8F',
        fontSize: 11,
        fontFamily: 'Inter, sans-serif'
      },
    },
    tooltip: {
      container: {
        background: '#1A1A1A',
        color: '#FFFFFF',
        fontSize: 11,
        fontFamily: 'Inter, sans-serif',
        borderRadius: 4,
        boxShadow: '0 4px 8px rgba(0,0,0,0.25)'
      },
    },
    crosshair: {
      line: {
        stroke: '#404040',
        strokeWidth: 1,
        strokeDasharray: '4 4'
      }
    }
  }), []);

  if (isLoading) {
    return (
      <Paper 
        elevation={0}
        sx={{ 
          p: 2, 
          height, 
          bgcolor: '#1A1A1A',
          border: '1px solid #282828',
          borderRadius: 1
        }}
      >
        <Box sx={{ mb: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Skeleton variant="text" width={200} height={24} sx={{ bgcolor: '#282828' }} />
          <Skeleton variant="circular" width={32} height={32} sx={{ bgcolor: '#282828' }} />
        </Box>
        <Skeleton 
          variant="rectangular" 
          height={height - 60}
          sx={{ bgcolor: '#282828', borderRadius: 1 }}
        />
      </Paper>
    );
  }

  return (
    <Paper 
      elevation={0}
      sx={{ 
        p: 2, 
        height, 
        bgcolor: '#1A1A1A',
        position: 'relative',
        overflow: 'hidden',
        border: '1px solid #282828',
        borderRadius: 1
      }}
    >
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        mb: 2
      }}>
        <Typography 
          sx={{ 
            color: '#FFFFFF',
            fontSize: '0.875rem',
            fontWeight: 500,
            fontFamily: 'Inter, sans-serif'
          }}
        >
          {title}
        </Typography>
        <Box sx={{ display: 'flex', gap: 0.5 }}>
          {onDownload && (
            <IconButton 
              size="small" 
              onClick={onDownload}
              sx={{ 
                color: '#8F8F8F',
                '&:hover': {
                  color: '#FFFFFF',
                  bgcolor: 'rgba(255,255,255,0.1)'
                }
              }}
            >
              <GetApp sx={{ fontSize: 16 }} />
            </IconButton>
          )}
          {onViewTrend && (
            <IconButton 
              size="small" 
              onClick={onViewTrend}
              sx={{ 
                color: '#8F8F8F',
                '&:hover': {
                  color: '#FFFFFF',
                  bgcolor: 'rgba(255,255,255,0.1)'
                }
              }}
            >
              <Timeline sx={{ fontSize: 16 }} />
            </IconButton>
          )}
          <IconButton
            size="small"
            onClick={handleClick}
            sx={{ 
              color: '#8F8F8F',
              '&:hover': {
                color: '#FFFFFF',
                bgcolor: 'rgba(255,255,255,0.1)'
              }
            }}
          >
            <MoreVert sx={{ fontSize: 16 }} />
          </IconButton>
        </Box>
        <Menu
          id="chart-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          PaperProps={{
            sx: {
              bgcolor: '#1A1A1A',
              border: '1px solid #282828',
              borderRadius: 1,
              '& .MuiMenuItem-root': {
                color: '#FFFFFF',
                fontSize: '0.875rem',
                fontFamily: 'Inter, sans-serif',
                '&:hover': {
                  bgcolor: 'rgba(255,255,255,0.1)'
                }
              }
            }
          }}
        >
          <MenuItem onClick={() => {
            handleClose();
            onDownload?.();
          }}>
            Exportar CSV
          </MenuItem>
          <MenuItem onClick={() => {
            handleClose();
            onViewTrend?.();
          }}>
            Análise de Tendência
          </MenuItem>
        </Menu>
      </Box>
      <Box sx={{ height: height - 60 }}>
        <ResponsiveLine
          data={data}
          margin={{ 
            top: 10, 
            right: showLegend ? 110 : 20, 
            bottom: 30, 
            left: 50 
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
            tickPadding: 5,
            tickRotation: 0,
          }}
          axisLeft={{
            tickSize: 5,
            tickPadding: 8,
            tickRotation: 0,
            format: value => {
              if (value >= 1000000) return `${(value/1000000).toFixed(1)}M`;
              if (value >= 1000) return `${(value/1000).toFixed(0)}K`;
              return value;
            },
          }}
          enableGridX={true}
          enableGridY={true}
          pointSize={4}
          pointColor="#1A1A1A"
          pointBorderWidth={2}
          pointBorderColor={{ from: 'serieColor' }}
          enableArea={false}
          lineWidth={1.5}
          useMesh={true}
          enableSlices="x"
          crosshairType="cross"
          legends={showLegend ? [
            {
              anchor: 'right',
              direction: 'column',
              justify: false,
              translateX: 100,
              translateY: 0,
              itemsSpacing: 4,
              itemDirection: 'left-to-right',
              itemWidth: 90,
              itemHeight: 18,
              itemOpacity: 1,
              symbolSize: 6,
              symbolShape: 'circle',
              effects: [
                {
                  on: 'hover',
                  style: {
                    itemBackground: '#282828',
                    itemOpacity: 1
                  }
                }
              ]
            }
          ] : []}
          theme={chartTheme}
          colors={data.map(d => d.color || '#000')}
          tooltip={({ point }) => (
            <Box
              sx={{
                p: 1,
                bgcolor: '#1A1A1A',
                border: '1px solid #282828',
                borderRadius: 1,
              }}
            >
              <Typography
                sx={{ 
                  color: point.seriesColor,
                  fontSize: '0.75rem',
                  fontWeight: 600,
                  mb: 0.5
                }}
              >
                {point.seriesId}
              </Typography>
              <Typography
                sx={{
                  color: '#FFFFFF',
                  fontSize: '0.75rem',
                  fontWeight: 500
                }}
              >
                {point.data.formattedY || formatNumber(point.data.y)}
              </Typography>
              {point.data.percentage !== undefined && (
                <Typography
                  sx={{
                    color: point.data.percentage > 0 ? '#4CAF50' : '#F44336',
                    fontSize: '0.75rem',
                    fontWeight: 600,
                    mt: 0.5
                  }}
                >
                  {point.data.percentage > 0 ? '+' : ''}{point.data.percentage.toFixed(1)}%
                </Typography>
              )}
            </Box>
          )}
        />
      </Box>
    </Paper>
  );
};

export default LineChart;