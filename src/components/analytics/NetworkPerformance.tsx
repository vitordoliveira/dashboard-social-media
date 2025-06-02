import React from 'react';
import { Box, Typography } from '@mui/material';
import LineChart from '../charts/LineChart';
import { NetworkAnalytics } from '../../types/analytics';

interface NetworkPerformanceProps {
  networkData: NetworkAnalytics;
  isLoading: boolean;
  dateRange: {
    start: Date;
    end: Date;
  };
}

const NetworkPerformance: React.FC<NetworkPerformanceProps> = ({
  networkData,
  isLoading,
  dateRange,
}) => {
  const networkColors = {
    linkedin: '#fad258', // Amarelo
    twitter: '#52e9ab', // Verde
    instagram: '#ff6b6b', // Vermelho
    facebook: '#d4d4d4'  // Cinza
  };

  const formatValue = (value: number): string => {
    if (value >= 1000000) return `${(value/1000000).toFixed(1)}M`;
    if (value >= 1000) return `${(value/1000).toFixed(0)}K`;
    return value.toString();
  };

  const formatPercentage = (current: number, previous: number): number => {
    if (previous === 0) return 0;
    return Number(((current - previous) / previous * 100).toFixed(1));
  };

  const metrics = [
    {
      title: 'Impressões por Rede',
      data: Object.entries(networkData).map(([network, data]) => ({
        id: network.charAt(0).toUpperCase() + network.slice(1),
        color: networkColors[network as keyof NetworkAnalytics],
        data: [
          {
            x: 'Anterior',
            y: data.performance.previousPeriod.impressions,
            formattedY: formatValue(data.performance.previousPeriod.impressions)
          },
          {
            x: 'Atual',
            y: data.performance.impressions,
            formattedY: formatValue(data.performance.impressions),
            percentage: formatPercentage(
              data.performance.impressions,
              data.performance.previousPeriod.impressions
            )
          }
        ]
      }))
    },
    {
      title: 'Alcance por Rede',
      data: Object.entries(networkData).map(([network, data]) => ({
        id: network.charAt(0).toUpperCase() + network.slice(1),
        color: networkColors[network as keyof NetworkAnalytics],
        data: [
          {
            x: 'Anterior',
            y: data.performance.previousPeriod.reach,
            formattedY: formatValue(data.performance.previousPeriod.reach)
          },
          {
            x: 'Atual',
            y: data.performance.reach,
            formattedY: formatValue(data.performance.reach),
            percentage: formatPercentage(
              data.performance.reach,
              data.performance.previousPeriod.reach
            )
          }
        ]
      }))
    },
    {
      title: 'Engajamento por Rede',
      data: Object.entries(networkData).map(([network, data]) => ({
        id: network.charAt(0).toUpperCase() + network.slice(1),
        color: networkColors[network as keyof NetworkAnalytics],
        data: [
          {
            x: 'Anterior',
            y: data.performance.previousPeriod.engagement,
            formattedY: formatValue(data.performance.previousPeriod.engagement)
          },
          {
            x: 'Atual',
            y: data.performance.engagement,
            formattedY: formatValue(data.performance.engagement),
            percentage: formatPercentage(
              data.performance.engagement,
              data.performance.previousPeriod.engagement
            )
          }
        ]
      }))
    }
  ];

  const getCSVData = (metricTitle: string, data: any[]) => {
    const headers = ['Rede Social', 'Período Anterior', 'Período Atual', 'Variação (%)'];
    const rows = data.map(item => [
      item.id,
      item.data[0].y,
      item.data[1].y,
      `${item.data[1].percentage}%`
    ]);

    return [headers, ...rows]
      .map(row => row.join(','))
      .join('\n');
  };

  const downloadCSV = (title: string, data: any[]) => {
    const csvContent = getCSVData(title, data);
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    
    link.setAttribute('href', url);
    link.setAttribute('download', `${title.toLowerCase().replace(/ /g, '_')}_${dateRange.start.toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <Box sx={{ mb: 4 }}>
      <Typography 
        variant="subtitle1" 
        sx={{ 
          mb: 3,
          color: '#fff',
          fontWeight: 500,
          fontSize: '1rem'
        }}
      >
        Performance por Rede Social
      </Typography>
      <Box 
        sx={{ 
          display: 'grid',
          gap: 3,
          gridTemplateColumns: {
            xs: '1fr',
            md: 'repeat(3, 1fr)'
          }
        }}
      >
        {metrics.map((metric) => (
          <LineChart
            key={metric.title}
            data={metric.data}
            title={metric.title}
            height={350}
            showLegend
            isLoading={isLoading}
            onDownload={() => downloadCSV(metric.title, metric.data)}
            onViewTrend={() => {
              console.log(`Visualizando tendência de ${metric.title}`);
            }}
          />
        ))}
      </Box>
    </Box>
  );
};

export default NetworkPerformance;