import React from 'react';
import { ResponsiveBar } from '@nivo/bar';
import { Box, Paper, Typography, useTheme, alpha } from '@mui/material';
import { formatNumber } from '../../utils/formatters';

interface BarChartProps {
  data: Array<{
    network: string;
    likes: number;
    comments: number;
    shares: number;
  }>;
  title: string;
  height?: number;
  showLegend?: boolean;
}

const CustomTooltip = ({ id, value, color, indexValue }: any) => {
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
      <div style={{ color: theme.palette.text.primary, marginBottom: '4px' }}>
        <strong>{indexValue}</strong>
      </div>
      <div style={{ color: color, display: 'flex', alignItems: 'center', gap: '4px' }}>
        <span style={{
          width: '8px',
          height: '8px',
          borderRadius: '50%',
          background: color,
          display: 'inline-block'
        }}/>
        <strong>{id}</strong>
      </div>
      <div style={{ color: theme.palette.text.secondary, marginTop: '4px' }}>
        {formatNumber(value)}
      </div>
    </div>
  );
};

const BarChart: React.FC<BarChartProps> = ({ 
  data, 
  title, 
  height = 400,
  showLegend = true 
}) => {
  const theme = useTheme();

  const chartColors = {
    likes: theme.palette.primary.main,
    comments: theme.palette.secondary.main,
    shares: theme.palette.success.main
  };

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
        <ResponsiveBar
          data={data}
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
            format: (value) => formatNumber(value)
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