import React, { useMemo } from 'react';
import { ResponsiveLine } from '@nivo/line';
import { Box, Paper, Typography, useTheme, alpha, Skeleton, IconButton, Menu, MenuItem, Tooltip } from '@mui/material';
import { MoreVert, GetApp, Timeline, Fullscreen } from '@mui/icons-material';
import { formatNumber } from '../../utils/formatters';

interface DataPoint {
  x: string | number;
  y: number;
  percentage?: number;
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
        stroke: alpha(theme.palette.divider, 0.1),
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
    crosshair: {
      line: {
        stroke: theme.palette.divider,
        strokeWidth: 1,
        strokeOpacity: 0.35,
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
            ${alpha(theme.palette.primary.main, 0.1)} 0%, 
            ${alpha(theme.palette.primary.main, 0.3)} 100%
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
              <IconButton size="small" onClick={onDownload}>
                <GetApp fontSize="small" />
              </IconButton>
            </Tooltip>
          )}
          {onViewTrend && (
            <Tooltip title="Ver tendência">
              <IconButton size="small" onClick={onViewTrend}>
                <Timeline fontSize="small" />
              </IconButton>
            </Tooltip>
          )}
          {onToggleFullscreen && (
            <Tooltip title="Tela cheia">
              <IconButton size="small" onClick={onToggleFullscreen}>
                <Fullscreen fontSize="small" />
              </IconButton>
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
          <MenuItem onClick={() => {
            handleClose();
            onToggleFullscreen?.();
          }}>
            Tela Cheia
          </MenuItem>
        </Menu>
      </Box>
      <Box sx={{ height: height - 100 }}>
        <ResponsiveLine
          data={data}
          margin={{ 
            top: 20, 
            right: showLegend ? 110 : 20, 
            bottom: 50, 
            left: 60 
          }}
          xScale={{ type: 'point' }}
          yScale={{ 
            type: 'linear', 
            min: 'auto', 
            max: 'auto',
            stacked: false,
            reverse: false 
          }}
          curve="monotoneX"
          axisTop={null}
          axisRight={null}
          axisBottom={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: -45,
            legend: '',
            legendOffset: 36,
            legendPosition: 'middle',
          }}
          axisLeft={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: '',
            legendOffset: -40,
            legendPosition: 'middle',
            format: formatNumber,
          }}
          enableGridX={false}
          enableGridY={true}
          pointSize={8}
          pointColor={{ theme: 'background' }}
          pointBorderWidth={2}
          pointBorderColor={{ from: 'serieColor' }}
          pointLabelYOffset={-12}
          enableArea={true}
          areaOpacity={0.1}
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
              itemsSpacing: 0,
              itemDirection: 'left-to-right',
              itemWidth: 80,
              itemHeight: 20,
              itemOpacity: 0.75,
              symbolSize: 12,
              symbolShape: 'circle',
              symbolBorderColor: 'rgba(0, 0, 0, .5)',
              effects: [
                {
                  on: 'hover',
                  style: {
                    itemBackground: alpha(theme.palette.action.hover, 0.1),
                    itemOpacity: 1
                  }
                }
              ]
            }
          ] : []}
          theme={chartTheme}
          tooltip={({ point }) => (
            <Box
              sx={{
                background: alpha(theme.palette.background.paper, 0.95),
                padding: 1.5,
                border: `1px solid ${theme.palette.divider}`,
                borderRadius: 1,
                boxShadow: theme.shadows[3],
                backdropFilter: 'blur(8px)',
              }}
            >
              <Typography
                variant="subtitle2"
                sx={{ 
                  color: point.color,
                  mb: 0.5,
                  fontWeight: 600
                }}
              >
                {point.seriesId}
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  color: theme.palette.text.primary,
                  fontWeight: 500,
                  mb: 0.5
                }}
              >
                {String(point.data.x)}
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  color: theme.palette.text.secondary
                }}
              >
                {formatNumber(point.data.y)}
              </Typography>
              {point.data.percentage !== undefined && (
                <Typography
                  variant="caption"
                  sx={{
                    color: point.data.percentage > 0 
                      ? theme.palette.success.main 
                      : theme.palette.error.main,
                    display: 'block',
                    mt: 0.5
                  }}
                >
                  {point.data.percentage > 0 ? '+' : ''}{point.data.percentage}%
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