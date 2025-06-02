import { useState, useEffect } from 'react';
import { 
  NetworkData, 
  DateRange, 
  LineChartSeries, 
  EngagementData,
  InsightData,
  Post 
} from '../types/dashboard';
import {
  generateNetworkData,
  generateLineChartData,
  generateEngagementData,
  generateInsights,
  generateTopPosts
} from '../api/services/mockData';

interface DashboardData {
  networkData: NetworkData;
  lineChartData: LineChartSeries[];
  engagementData: EngagementData[];
  insights: InsightData[];
  topPosts: Post[];
  isLoading: boolean;
}

export const useDashboardData = (dateRange: DateRange): DashboardData => {
  const [data, setData] = useState<DashboardData>({
    networkData: {} as NetworkData,
    lineChartData: [],
    engagementData: [],
    insights: [],
    topPosts: [],
    isLoading: true
  });

  useEffect(() => {
    const fetchData = async () => {
      setData(prev => ({ ...prev, isLoading: true }));

      // Simulando delay de API
      await new Promise(resolve => setTimeout(resolve, 500));

      const networkData = generateNetworkData(dateRange.start, dateRange.end);
      const lineChartData = generateLineChartData(dateRange.start, dateRange.end);
      const engagementData = generateEngagementData(dateRange.start, dateRange.end);
      const insights = generateInsights(networkData);
      const topPosts = generateTopPosts(dateRange.start, dateRange.end);

      setData({
        networkData,
        lineChartData,
        engagementData,
        insights,
        topPosts,
        isLoading: false
      });
    };

    fetchData();
  }, [dateRange]);

  return data;
};