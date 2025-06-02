// Define os tipos de métricas de performance para cada rede social
export interface PerformanceMetrics {
  impressions: number;
  reach: number;
  engagement: number;
  clicks: number;
  shares: number;
  saves: number;
  previousPeriod: {
    impressions: number;
    reach: number;
    engagement: number;
    clicks: number;
    shares: number;
    saves: number;
  };
}

// Define as métricas de audiência
export interface AudienceMetrics {
  totalFollowers: number;
  followersGrowth: number;
  activeFollowers: number;
  demographics: {
    age: {
      '13-17': number;
      '18-24': number;
      '25-34': number;
      '35-44': number;
      '45-54': number;
      '55+': number;
    };
    gender: {
      male: number;
      female: number;
      other: number;
    };
    topLocations: Array<{
      country: string;
      city: string;
      count: number;
      percentage: number;
    }>;
  };
}

// Define os tipos de conteúdo e suas métricas
export interface ContentPerformance {
  type: 'image' | 'video' | 'carousel' | 'text' | 'link';
  count: number;
  engagement: number;
  reach: number;
  avgEngagementRate: number;
}

// Define os horários de melhor performance
export interface TimingAnalysis {
  bestDays: Array<{
    day: string;
    engagement: number;
    reach: number;
  }>;
  bestHours: Array<{
    hour: number;
    engagement: number;
    reach: number;
  }>;
}

// Define as métricas por rede social
export interface NetworkAnalytics {
  facebook: {
    performance: PerformanceMetrics;
    audience: AudienceMetrics;
    content: ContentPerformance[];
    timing: TimingAnalysis;
  };
  instagram: {
    performance: PerformanceMetrics;
    audience: AudienceMetrics;
    content: ContentPerformance[];
    timing: TimingAnalysis;
  };
  twitter: {
    performance: PerformanceMetrics;
    audience: AudienceMetrics;
    content: ContentPerformance[];
    timing: TimingAnalysis;
  };
  linkedin: {
    performance: PerformanceMetrics;
    audience: AudienceMetrics;
    content: ContentPerformance[];
    timing: TimingAnalysis;
  };
}

// Define o tipo principal que será usado na página Analytics
export interface AnalyticsData {
  networkAnalytics: NetworkAnalytics;
  globalStats: {
    totalFollowers: number;
    totalEngagement: number;
    averageEngagementRate: number;
    topPerformingNetwork: keyof NetworkAnalytics;
    mostEngagingContentType: ContentPerformance['type'];
  };
  dateRange: {
    start: Date;
    end: Date;
  };
  isLoading: boolean;
}

// Define as props da página Analytics
export interface AnalyticsProps {
  dateRange: {
    start: Date;
    end: Date;
  };
  dateRangeType: string;
  onDateRangeChange: (type: string, range?: { start: Date; end: Date }) => void;
}