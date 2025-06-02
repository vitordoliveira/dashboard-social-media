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

const CustomTooltip = ({ id, value, color, indexValue }: BarTooltipProps<BarDatum>) => {
  const theme = useTheme();
  
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
          {String(id)}
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
          legends={showLegend ? [
            {
              dataFrom: 'keys',
              anchor: 'bottom-right',
              direction: 'column',
              justify: false,
              translateX: 120,
              translateY: 0,
              itemsSpacing: 2,
              itemWidth: 100,
              itemHeight: 20,
              itemDirection: 'left-to-right',
              itemOpacity: 0.85,
              symbolSize: 12,
              symbolShape: 'circle',
              effects: [
                {
                  on: 'hover',
                  style: {
                    itemOpacity: 1,
                    symbolSize: 14,
                  }
                }
              ]
            }
          ] : []}
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
        />
      </Box>
    </Paper>
  );
};

export default BarChart;