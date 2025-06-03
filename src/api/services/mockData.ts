import { NetworkData, Post, InsightData, LineChartSeries, EngagementData } from '../../types/dashboard';
import { AnalyticsData, PerformanceMetrics, AudienceMetrics, ContentPerformance, TimingAnalysis } from '../../types/analytics';
import { subDays, format, eachDayOfInterval, addDays } from 'date-fns';
import { ptBR } from 'date-fns/locale';

// Helper para gerar números aleatórios dentro de um intervalo
const randomInRange = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min;

// Todas as funções existentes permanecem iguais
export const generateNetworkData = (startDate: Date, endDate: Date): NetworkData => {
  const daysRange = Math.floor((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
  const multiplier = daysRange / 30;

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
  const dates = eachDayOfInterval({ start: startDate, end: endDate });
  const dataPoints = Math.min(Math.max(7, Math.floor(dates.length / 7)), 14); // Entre 7 e 14 pontos
  const interval = Math.floor(dates.length / dataPoints);

  const generateDataPoints = (baseValue: number, volatility: number) => {
    return Array.from({ length: dataPoints }, (_, i) => {
      const date = dates[Math.min(i * interval, dates.length - 1)];
      const trend = (i / dataPoints) * volatility;
      const noise = (Math.random() - 0.5) * volatility * 0.5;
      return {
        x: format(date, 'dd/MM', { locale: ptBR }),
        y: Math.floor(baseValue * (1 + trend + noise))
      };
    });
  };

  return [
    {
      id: 'Facebook',
      color: '#1877F2',
      data: generateDataPoints(12000, 0.25)
    },
    {
      id: 'Twitter',
      color: '#1DA1F2',
      data: generateDataPoints(8000, 0.15)
    },
    {
      id: 'Instagram',
      color: '#E4405F',
      data: generateDataPoints(23000, 0.35)
    },
    {
      id: 'LinkedIn',
      color: '#0A66C2',
      data: generateDataPoints(4800, 0.20)
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
  const bestTimeInsight: InsightData = {
    title: 'Melhor Horário',
    description: 'Posts entre 18h e 20h têm 47% mais engajamento',
    trend: 'up',
    percentage: 47,
    tooltip: 'Baseado na análise dos últimos 30 dias de posts'
  };

  const contentInsight: InsightData = {
    title: 'Conteúdo Popular',
    description: 'Vídeos curtos têm 3x mais interações que outros formatos',
    trend: 'up',
    percentage: 300,
    tooltip: 'Comparado com a média de outros tipos de conteúdo'
  };

  const bestPlatform = 
    networkData.instagram.engagement > networkData.facebook.engagement ? 
    { name: 'Instagram', value: networkData.instagram.engagement } : 
    { name: 'Facebook', value: networkData.facebook.engagement };

  const growthInsight: InsightData = {
    title: 'Crescimento',
    description: `${bestPlatform.name} lidera em crescimento este mês`,
    trend: 'up',
    percentage: Math.round(bestPlatform.value * 10) / 10,
    tooltip: 'Taxa de crescimento em relação ao mês anterior'
  };

  return [bestTimeInsight, contentInsight, growthInsight];
};

export const generateTopPosts = (startDate: Date, endDate: Date): Post[] => {
  return [
    {
      id: '1',
      network: 'instagram',
      content: '🚀 Nova coleção Outono/Inverno chegando! #ModaConsciente #Sustentabilidade',
      engagement: randomInRange(2000, 3000),
      timestamp: new Date().toISOString(),
      likes: randomInRange(1500, 2000),
      comments: randomInRange(100, 300),
      shares: randomInRange(400, 700),
      url: 'https://instagram.com/post/1'
    },
    {
      id: '2',
      network: 'facebook',
      content: '📢 Super promoção de fim de semana! Desconto de 30% em todas as peças.',
      engagement: randomInRange(1500, 2500),
      timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
      likes: randomInRange(800, 1200),
      comments: randomInRange(200, 400),
      shares: randomInRange(500, 900),
      url: 'https://facebook.com/post/2'
    },
    {
      id: '3',
      network: 'twitter',
      content: '🎉 Em breve: Colaboração especial com @designerfamoso! Fiquem ligados!',
      engagement: randomInRange(800, 1200),
      timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
      likes: randomInRange(400, 600),
      comments: randomInRange(100, 200),
      shares: randomInRange(300, 500),
      url: 'https://twitter.com/post/3'
    },
    {
      id: '4',
      network: 'linkedin',
      content: 'Orgulhosos em anunciar nossa nova iniciativa de sustentabilidade...',
      engagement: randomInRange(500, 1000),
      timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
      likes: randomInRange(200, 400),
      comments: randomInRange(50, 150),
      shares: randomInRange(250, 450),
      url: 'https://linkedin.com/post/4'
    }
  ];
};

// Novas funções para Analytics
export const generateAnalyticsData = (startDate: Date, endDate: Date): AnalyticsData => {
  const generatePerformanceMetrics = (): PerformanceMetrics => ({
    impressions: randomInRange(50000, 100000),
    reach: randomInRange(25000, 50000),
    engagement: randomInRange(10000, 25000),
    clicks: randomInRange(5000, 10000),
    shares: randomInRange(1000, 5000),
    saves: randomInRange(500, 2000),
    previousPeriod: {
      impressions: randomInRange(45000, 95000),
      reach: randomInRange(20000, 45000),
      engagement: randomInRange(8000, 20000),
      clicks: randomInRange(4000, 9000),
      shares: randomInRange(800, 4000),
      saves: randomInRange(400, 1800),
    }
  });

  const generateAudienceMetrics = (): AudienceMetrics => ({
    totalFollowers: randomInRange(50000, 1000000),
    followersGrowth: randomInRange(1000, 10000),
    activeFollowers: randomInRange(25000, 500000),
    demographics: {
      age: {
        '13-17': randomInRange(5, 10),
        '18-24': randomInRange(15, 25),
        '25-34': randomInRange(25, 35),
        '35-44': randomInRange(15, 25),
        '45-54': randomInRange(5, 15),
        '55+': randomInRange(2, 8),
      },
      gender: {
        male: randomInRange(45, 55),
        female: randomInRange(40, 50),
        other: randomInRange(2, 5),
      },
      topLocations: [
        {
          country: 'Brasil',
          city: 'São Paulo',
          count: randomInRange(10000, 50000),
          percentage: randomInRange(15, 25),
        },
        {
          country: 'Brasil',
          city: 'Rio de Janeiro',
          count: randomInRange(8000, 30000),
          percentage: randomInRange(10, 20),
        },
        {
          country: 'Brasil',
          city: 'Belo Horizonte',
          count: randomInRange(5000, 20000),
          percentage: randomInRange(5, 15),
        },
      ],
    },
  });

  const generateContentPerformance = (): ContentPerformance[] => [
    {
      type: 'image',
      count: randomInRange(50, 100),
      engagement: randomInRange(25000, 50000),
      reach: randomInRange(50000, 100000),
      avgEngagementRate: randomInRange(2, 5),
    },
    {
      type: 'video',
      count: randomInRange(20, 50),
      engagement: randomInRange(35000, 75000),
      reach: randomInRange(70000, 150000),
      avgEngagementRate: randomInRange(3, 8),
    },
    {
      type: 'carousel',
      count: randomInRange(15, 30),
      engagement: randomInRange(30000, 60000),
      reach: randomInRange(60000, 120000),
      avgEngagementRate: randomInRange(2, 6),
    },
  ];

  const generateTimingAnalysis = (): TimingAnalysis => ({
    bestDays: [
      { day: 'Segunda', engagement: randomInRange(500, 1000), reach: randomInRange(2000, 5000) },
      { day: 'Quarta', engagement: randomInRange(500, 1000), reach: randomInRange(2000, 5000) },
      { day: 'Sexta', engagement: randomInRange(500, 1000), reach: randomInRange(2000, 5000) },
    ],
    bestHours: Array.from({ length: 24 }, (_, hour) => ({
      hour,
      engagement: randomInRange(200, 1000),
      reach: randomInRange(1000, 5000),
    })),
  });

  const generateNetworkAnalytics = () => ({
    performance: generatePerformanceMetrics(),
    audience: generateAudienceMetrics(),
    content: generateContentPerformance(),
    timing: generateTimingAnalysis(),
  });

  const networkAnalytics = {
    facebook: generateNetworkAnalytics(),
    instagram: generateNetworkAnalytics(),
    twitter: generateNetworkAnalytics(),
    linkedin: generateNetworkAnalytics(),
  };

  const totalFollowers = Object.values(networkAnalytics)
    .reduce((sum, network) => sum + network.audience.totalFollowers, 0);

  const totalEngagement = Object.values(networkAnalytics)
    .reduce((sum, network) => sum + network.performance.engagement, 0);

  return {
    networkAnalytics,
    globalStats: {
      totalFollowers,
      totalEngagement,
      averageEngagementRate: (totalEngagement / totalFollowers) * 100,
      topPerformingNetwork: 'instagram',
      mostEngagingContentType: 'video',
    },
    dateRange: {
      start: startDate,
      end: endDate,
    },
    isLoading: false,
  };
};