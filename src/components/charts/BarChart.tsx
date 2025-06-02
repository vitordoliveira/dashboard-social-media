import React from 'react';
import { ResponsiveBar } from '@nivo/bar';
import { Box, Paper, Typography } from '@mui/material';

interface BarChartProps {
  data: Array<{
    network: string;
    likes: number;
    comments: number;
    shares: number;
  }>;
  title: string;
}

const BarChart: React.FC<BarChartProps> = ({ data, title }) => {
  return (
    <Paper sx={{ p: 2, height: 400 }}>
      <Typography variant="h6" gutterBottom>
        {title}
      </Typography>
      <Box sx={{ height: 350 }}>
        <ResponsiveBar
          data={data}
          keys={['likes', 'comments', 'shares']}
          indexBy="network"
          margin={{ top: 20, right: 130, bottom: 50, left: 60 }}
          padding={0.3}
          valueScale={{ type: 'linear' }}
          indexScale={{ type: 'band', round: true }}
          colors={{ scheme: 'nivo' }}
          borderRadius={4}
          borderColor={{
            from: 'color',
            modifiers: [['darker', 1.6]],
          }}
          axisTop={null}
          axisRight={null}
          axisBottom={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
          }}
          axisLeft={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
          }}
          labelSkipWidth={12}
          labelSkipHeight={12}
          legends={[
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
              symbolSize: 20,
            },
          ]}
          theme={{
            axis: {
              ticks: {
                text: {
                  fill: '#888',
                },
              },
            },
            legends: {
              text: {
                fill: '#888',
              },
            },
          }}
        />
      </Box>
    </Paper>
  );
};

export default BarChart;