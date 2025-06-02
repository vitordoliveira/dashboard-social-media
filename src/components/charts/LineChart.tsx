import React from 'react';
import { ResponsiveLine } from '@nivo/line';
import { Box, Paper, Typography, useTheme, alpha } from '@mui/material';
import { formatNumber } from '../../utils/formatters';

interface DataPoint {
  x: string | number;
  y: number;
}

interface LineChartProps {
  data: {
    id: string;
    data: DataPoint[];
    color?: string;
  }[];
  title: string;
  height?: number;
  showLegend?: boolean;
}

const CustomTooltip = ({ point }: any) => {
  const theme = useTheme();
  
  return (
    <div
      style={{
        background: alpha(theme.palette.background.paper, 0.9),
        padding: '12px',
        border: `1px solid ${theme.palette.divider}`,
        borderRadius: '8px',
        boxShadow: theme.shadows[3],
      }}
    >
      <div style={{ color: point.serieColor, marginBottom: '4px' }}>
        <strong>{point.serieId}</strong>
      </div>
      <div style={{ color: theme.palette.text.primary }}>
        <strong>{point.data.xFormatted}</strong>
      </div>
      <div style={{ color: theme.palette.text.secondary }}>
        {formatNumber(point.data.y)}
      </div>
    </div>
  );
};

const LineChart: React.FC<LineChartProps> = ({ 
  data, 
  title, 
  height = 400,
  showLegend = true 
}) => {
  const theme = useTheme();

  const chartTheme = {
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
  };

  return (
    <Paper 
      sx={{ 
        p: 3, 
        height, 
        backgroundImage: 'none',
        position: 'relative',
        overflow: 'hidden',
        '&:before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '4px',
          background: (theme) => `linear-gradient(90deg, ${alpha(theme.palette.primary.main, 0.1)} 0%, ${alpha(theme.palette.primary.main, 0.3)} 100%)`,
        }
      }}
    >
      <Typography variant="h6" gutterBottom sx={{ mb: 3 }}>
        {title}
      </Typography>
      <Box sx={{ height: height - 100 }}>
        <ResponsiveLine
          data={data}
          margin={{ top: 20, right: showLegend ? 110 : 20, bottom: 50, left: 60 }}
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
            format: (value) => formatNumber(value),
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
          tooltip={CustomTooltip}
        />
      </Box>
    </Paper>
  );
};

export default LineChart;