import { NetworkData, Post, InsightData, LineChartSeries, EngagementData } from '../types/dashboard';
import { subDays, format } from 'date-fns';

export const generateNetworkData = (startDate: Date, endDate: Date): NetworkData => {
  // Simulando dados que mudam com base no período selecionado
  const daysRange = Math.floor((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
  const multiplier = daysRange / 30; // Usando 30 dias como base

  return {
    facebook: {
      followers: Math.floor(12493 * multiplier),
      engagement: 2.5,
      posts: Math.floor(45 * multiplier),
      reach: Math.floor(50000 * multiplier),
      previousFollowers: Math.floor(12200 * multiplier),
      previousEngagement: 2.3
    },
    twitter: {
      followers: Math.floor(8239 * multiplier),
      engagement: -1.2,
      posts: Math.floor(89 * multiplier),
      reach: Math.floor(35000 * multiplier),
      previousFollowers: Math.floor(8340 * multiplier),
      previousEngagement: -0.8
    },
    instagram: {
      followers: Math.floor(23092 * multiplier),
      engagement: 5.7,
      posts: Math.floor(62 * multiplier),
      reach: Math.floor(85000 * multiplier),
      previousFollowers: Math.floor(21850 * multiplier),
      previousEngagement: 4.9
    },
    linkedin: {
      followers: Math.floor(4899 * multiplier),
      engagement: 3.2,
      posts: Math.floor(28 * multiplier),
      reach: Math.floor(15000 * multiplier),
      previousFollowers: Math.floor(4750 * multiplier),
      previousEngagement: 2.8
    }
  };
};

export const generateLineChartData = (startDate: Date, endDate: Date): LineChartSeries[] => {
  const daysRange = Math.floor((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
  const dataPoints = Math.min(Math.max(5, Math.floor(daysRange / 7)), 12); // Entre 5 e 12 pontos

  const generateDataPoints = (baseValue: number, growth: number) => {
    return Array.from({ length: dataPoints }, (_, i) => {
      const date = subDays(endDate, Math.floor((daysRange / (dataPoints - 1)) * (dataPoints - 1 - i)));
      return {
        x: format(date, 'MMM dd'),
        y: Math.floor(baseValue * (1 + (growth * i) / 100))
      };
    });
  };

  return [
    {
      id: 'Facebook',
      color: '#1877F2',
      data: generateDataPoints(10000, 2.5)
    },
    {
      id: 'Twitter',
      color: '#1DA1F2',
      data: generateDataPoints(7000, 1.8)
    },
    {
      id: 'Instagram',
      color: '#E4405F',
      data: generateDataPoints(20000, 1.5)
    }
  ];
};

export const generateEngagementData = (startDate: Date, endDate: Date): EngagementData[] => {
  const daysRange = Math.floor((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
  const multiplier = daysRange / 30;

  return [
    {
      network: 'Facebook',
      likes: Math.floor(45231 * multiplier),
      comments: Math.floor(12450 * multiplier),
      shares: Math.floor(8392 * multiplier),
    },
    {
      network: 'Twitter',
      likes: Math.floor(32891 * multiplier),
      comments: Math.floor(15234 * multiplier),
      shares: Math.floor(12543 * multiplier),
    },
    {
      network: 'Instagram',
      likes: Math.floor(89234 * multiplier),
      comments: Math.floor(23456 * multiplier),
      shares: Math.floor(5678 * multiplier),
    },
    {
      network: 'LinkedIn',
      likes: Math.floor(12543 * multiplier),
      comments: Math.floor(4321 * multiplier),
      shares: Math.floor(2134 * multiplier),
    }
  ];
};

export const generateInsights = (networkData: NetworkData): InsightData[] => {
  return [
    {
      title: 'Melhor Horário',
      description: 'Posts entre 18h e 20h tem 47% mais engajamento',
      trend: 'up',
      percentage: 47,
      tooltip: 'Baseado nos últimos 30 dias'
    },
    {
      title: 'Conteúdo Popular',
      description: 'Vídeos curtos têm 3x mais interações',
      trend: 'up',
      percentage: 300,
      tooltip: 'Comparado a outros formatos'
    },
    {
      title: 'Crescimento',
      description: `${networkData.instagram.engagement > networkData.facebook.engagement ? 'Instagram' : 'Facebook'} lidera em novos seguidores`,
      trend: 'up',
      percentage: Math.max(networkData.instagram.engagement, networkData.facebook.engagement),
      tooltip: 'Último período'
    }
  ];
};

export const generateTopPosts = (startDate: Date, endDate: Date): Post[] => {
  return [
    {
      id: '1',
      network: 'instagram',
      content: 'Lançamento da nova coleção 🚀',
      engagement: 2547,
      timestamp: '2h atrás'
    },
    {
      id: '2',
      network: 'facebook',
      content: 'Promoção especial de fim de semana!',
      engagement: 1823,
      timestamp: '5h atrás'
    },
    {
      id: '3',
      network: 'twitter',
      content: 'Novidades chegando em breve...',
      engagement: 945,
      timestamp: '1d atrás'
    }
  ];
};