import React from 'react';
import { Box, Typography, useTheme } from '@mui/material';
import LineChart from '../charts/LineChart';
import { NetworkAnalytics } from '../../types/analytics';

interface AudienceMetricsProps {
  networkData: NetworkAnalytics;
  isLoading: boolean;
  dateRange: {
    start: Date;
    end: Date;
  };
}

const AudienceMetrics: React.FC<AudienceMetricsProps> = ({
  networkData,
  isLoading,
  dateRange,
}) => {
  const theme = useTheme();

  const networkColors = {
    facebook: '#d4d4d4',  // Cinza
    instagram: '#ff6b6b', // Vermelho
    twitter: '#52e9ab',   // Verde
    linkedin: '#fad258'   // Amarelo
  };

  const formatValue = (value: number): string => {
    if (value >= 1000000) return `${(value/1000000).toFixed(1)}M`;
    if (value >= 1000) return `${(value/1000).toFixed(0)}K`;
    return value.toString();
  };

  const metrics = [
    {
      title: 'Crescimento de Seguidores',
      data: Object.entries(networkData).map(([network, data]) => ({
        id: network.charAt(0).toUpperCase() + network.slice(1),
        color: networkColors[network as keyof NetworkAnalytics],
        data: [
          {
            x: 'Anterior',
            y: data.audience.totalFollowers - (data.audience.totalFollowers * data.audience.followersGrowth / 100),
            formattedY: formatValue(data.audience.totalFollowers - (data.audience.totalFollowers * data.audience.followersGrowth / 100))
          },
          {
            x: 'Atual',
            y: data.audience.totalFollowers,
            formattedY: formatValue(data.audience.totalFollowers),
            percentage: data.audience.followersGrowth
          }
        ]
      }))
    },
    {
      title: 'Seguidores Ativos',
      data: Object.entries(networkData).map(([network, data]) => ({
        id: network.charAt(0).toUpperCase() + network.slice(1),
        color: networkColors[network as keyof NetworkAnalytics],
        data: [
          {
            x: 'Anterior',
            y: data.audience.activeFollowers * 0.9, // Simulando valor anterior
            formattedY: formatValue(data.audience.activeFollowers * 0.9)
          },
          {
            x: 'Atual',
            y: data.audience.activeFollowers,
            formattedY: formatValue(data.audience.activeFollowers),
            percentage: ((data.audience.activeFollowers / data.audience.totalFollowers) * 100)
          }
        ]
      }))
    },
    {
      title: 'Distribuição por Gênero',
      data: Object.entries(networkData).map(([network, data]) => ({
        id: network.charAt(0).toUpperCase() + network.slice(1),
        color: networkColors[network as keyof NetworkAnalytics],
        data: [
          {
            x: 'Masculino',
            y: data.audience.demographics.gender.male,
            formattedY: `${data.audience.demographics.gender.male}%`
          },
          {
            x: 'Feminino',
            y: data.audience.demographics.gender.female,
            formattedY: `${data.audience.demographics.gender.female}%`
          },
          {
            x: 'Outro',
            y: data.audience.demographics.gender.other,
            formattedY: `${data.audience.demographics.gender.other}%`
          }
        ]
      }))
    }
  ];

  const getCSVData = (metricTitle: string, data: any[]) => {
    const headers = ['Rede Social', ...data[0].data.map((d: any) => d.x), 'Variação (%)'];
    const rows = data.map(item => [
      item.id,
      ...item.data.map((d: any) => d.y),
      item.data[1]?.percentage ? `${item.data[1].percentage.toFixed(2)}%` : 'N/A'
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
    <Box sx={{ mb: 4, mt: 4 }}>
      <Typography 
        variant="h6" 
        sx={{ 
          mb: 3,
          color: '#fff',
          fontWeight: 600
        }}
      >
        Métricas de Audiência
      </Typography>
      <Box 
        sx={{ 
          display: 'grid',
          gap: 3,
          gridTemplateColumns: {
            xs: '1fr',
            md: 'repeat(2, 1fr)',
            lg: 'repeat(3, 1fr)'
          }
        }}
      >
        {metrics.map((metric) => (
          <LineChart
            key={metric.title}
            data={metric.data}
            title={metric.title}
            height={400}
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

export default AudienceMetrics;