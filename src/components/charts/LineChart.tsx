import React from 'react';
import { ResponsiveLine } from '@nivo/line';
import { Box, Paper, Typography } from '@mui/material';

interface DataPoint {
  x: string | number;
  y: number;
}

interface LineChartProps {
  data: {
    id: string;
    data: DataPoint[];
  }[];
  title: string;
}

const LineChart: React.FC<LineChartProps> = ({ data, title }) => {
  return (
    <Paper sx={{ p: 2, height: 400 }}>
      <Typography variant="h6" gutterBottom>
        {title}
      </Typography>
      <Box sx={{ height: 350 }}>
        <ResponsiveLine
          data={data}
          margin={{ top: 10, right: 30, bottom: 50, left: 60 }}
          xScale={{ type: 'point' }}
          yScale={{ type: 'linear', min: 'auto', max: 'auto' }}
          curve="monotoneX"
          axisTop={null}
          axisRight={null}
          axisBottom={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: -45,
          }}
          axisLeft={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
          }}
          pointSize={8}
          pointColor={{ theme: 'background' }}
          pointBorderWidth={2}
          pointBorderColor={{ from: 'serieColor' }}
          pointLabelYOffset={-12}
          enableArea={true}
          areaOpacity={0.1}
          enableGridX={false}
          theme={{
            axis: {
              ticks: {
                text: {
                  fill: '#888',
                },
              },
            },
            grid: {
              line: {
                stroke: '#444',
              },
            },
          }}
        />
      </Box>
    </Paper>
  );
};

export default LineChart;