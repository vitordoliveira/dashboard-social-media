import { useState, useEffect } from 'react';
import { AnalyticsData, ContentPerformance } from '../types/analytics';
import { generateAnalyticsData } from '../api/services/mockData';

export const useAnalyticsData = (dateRange: { start: Date; end: Date }): AnalyticsData => {
  const [data, setData] = useState<AnalyticsData>({
    networkAnalytics: {
      facebook: {
        performance: {
          impressions: 0,
          reach: 0,
          engagement: 0,
          clicks: 0,
          shares: 0,
          saves: 0,
          previousPeriod: {
            impressions: 0,
            reach: 0,
            engagement: 0,
            clicks: 0,
            shares: 0,
            saves: 0,
          }
        },
        audience: {
          totalFollowers: 0,
          followersGrowth: 0,
          activeFollowers: 0,
          demographics: {
            age: {
              '13-17': 0,
              '18-24': 0,
              '25-34': 0,
              '35-44': 0,
              '45-54': 0,
              '55+': 0,
            },
            gender: {
              male: 0,
              female: 0,
              other: 0,
            },
            topLocations: []
          }
        },
        content: [],
        timing: {
          bestDays: [],
          bestHours: []
        }
      },
      instagram: {
        performance: {
          impressions: 0,
          reach: 0,
          engagement: 0,
          clicks: 0,
          shares: 0,
          saves: 0,
          previousPeriod: {
            impressions: 0,
            reach: 0,
            engagement: 0,
            clicks: 0,
            shares: 0,
            saves: 0,
          }
        },
        audience: {
          totalFollowers: 0,
          followersGrowth: 0,
          activeFollowers: 0,
          demographics: {
            age: {
              '13-17': 0,
              '18-24': 0,
              '25-34': 0,
              '35-44': 0,
              '45-54': 0,
              '55+': 0,
            },
            gender: {
              male: 0,
              female: 0,
              other: 0,
            },
            topLocations: []
          }
        },
        content: [],
        timing: {
          bestDays: [],
          bestHours: []
        }
      },
      twitter: {
        performance: {
          impressions: 0,
          reach: 0,
          engagement: 0,
          clicks: 0,
          shares: 0,
          saves: 0,
          previousPeriod: {
            impressions: 0,
            reach: 0,
            engagement: 0,
            clicks: 0,
            shares: 0,
            saves: 0,
          }
        },
        audience: {
          totalFollowers: 0,
          followersGrowth: 0,
          activeFollowers: 0,
          demographics: {
            age: {
              '13-17': 0,
              '18-24': 0,
              '25-34': 0,
              '35-44': 0,
              '45-54': 0,
              '55+': 0,
            },
            gender: {
              male: 0,
              female: 0,
              other: 0,
            },
            topLocations: []
          }
        },
        content: [],
        timing: {
          bestDays: [],
          bestHours: []
        }
      },
      linkedin: {
        performance: {
          impressions: 0,
          reach: 0,
          engagement: 0,
          clicks: 0,
          shares: 0,
          saves: 0,
          previousPeriod: {
            impressions: 0,
            reach: 0,
            engagement: 0,
            clicks: 0,
            shares: 0,
            saves: 0,
          }
        },
        audience: {
          totalFollowers: 0,
          followersGrowth: 0,
          activeFollowers: 0,
          demographics: {
            age: {
              '13-17': 0,
              '18-24': 0,
              '25-34': 0,
              '35-44': 0,
              '45-54': 0,
              '55+': 0,
            },
            gender: {
              male: 0,
              female: 0,
              other: 0,
            },
            topLocations: []
          }
        },
        content: [],
        timing: {
          bestDays: [],
          bestHours: []
        }
      }
    },
    globalStats: {
      totalFollowers: 0,
      totalEngagement: 0,
      averageEngagementRate: 0,
      topPerformingNetwork: 'facebook',
      mostEngagingContentType: 'image',
    },
    dateRange: {
      start: new Date(),
      end: new Date(),
    },
    isLoading: true,
  });

  useEffect(() => {
    const fetchData = async () => {
      setData(prev => ({ ...prev, isLoading: true }));

      // Simulando delay de API
      await new Promise(resolve => setTimeout(resolve, 1000));

      const analyticsData = generateAnalyticsData(dateRange.start, dateRange.end);
      setData(analyticsData);
    };

    fetchData();
  }, [dateRange]);

  return data;
};