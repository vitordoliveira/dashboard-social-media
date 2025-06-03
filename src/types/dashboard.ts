export interface SocialMetrics {
  followers: number;
  engagement: number;
  posts: number;
  reach: number;
  previousFollowers: number;
  previousEngagement: number;
}

export interface NetworkData {
  facebook: SocialMetrics;
  twitter: SocialMetrics;
  instagram: SocialMetrics;
  linkedin: SocialMetrics;
}

export interface DateRange {
  start: Date;
  end: Date;
}

export interface Post {
  id: string;
  network: 'facebook' | 'twitter' | 'instagram' | 'linkedin';
  content: string;
  engagement: number;
  timestamp: string;
  likes?: number;
  comments?: number;
  shares?: number;
  url?: string;
}

export interface InsightData {
  title: string;
  description: string;
  trend: 'up' | 'down' | 'neutral';
  percentage: number;
  tooltip?: string;
}

export interface ChartDataPoint {
  x: string;
  y: number;
}

export interface LineChartSeries {
  id: string;
  color: string;
  data: ChartDataPoint[];
}

export interface EngagementData {
  network: string;
  likes: number;
  comments: number;
  shares: number;
}