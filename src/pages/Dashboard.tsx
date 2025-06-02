import React, { useMemo } from 'react';
import { Typography, Box, Fade, Skeleton } from '@mui/material';
import { Facebook, Twitter, Instagram, LinkedIn } from '@mui/icons-material';
import StatsCard from '../components/dashboard/StatsCard';
import LineChart from '../components/charts/LineChart';
import BarChart from '../components/charts/BarChart';
import DateRangeFilter from '../components/dashboard/DateRangeFilter';
import InsightCard from '../components/dashboard/InsightCard';
import TopPosts from '../components/dashboard/TopPosts';
import { useDashboardData } from '../hooks/useDashboardData';
import { DateRange } from '../types/dashboard';

interface DashboardProps {
  dateRange: DateRange;
  dateRangeType: string;
  onDateRangeChange: (type: string, range?: DateRange) => void;
}

const Dashboard: React.FC<DashboardProps> = ({
  dateRange,
  dateRangeType,
  onDateRangeChange
}) => {
  const { 
    networkData, 
    lineChartData, 
    engagementData, 
    insights, 
    topPosts, 
    isLoading 
  } = useDashboardData(dateRange);

  const statsCards = useMemo(() => [
    {
      title: "Facebook Followers",
      value: networkData.facebook?.followers.toLocaleString() ?? '0',
      change: networkData.facebook?.engagement ?? 0,
      icon: <Facebook sx={{ fontSize: 40, color: '#1877F2' }} />
    },
    {
      title: "Twitter Followers",
      value: networkData.twitter?.followers.toLocaleString() ?? '0',
      change: networkData.twitter?.engagement ?? 0,
      icon: <Twitter sx={{ fontSize: 40, color: '#1DA1F2' }} />
    },
    {
      title: "Instagram Followers",
      value: networkData.instagram?.followers.toLocaleString() ?? '0',
      change: networkData.instagram?.engagement ?? 0,
      icon: <Instagram sx={{ fontSize: 40, color: '#E4405F' }} />
    },
    {
      title: "LinkedIn Followers",
      value: networkData.linkedin?.followers.toLocaleString() ?? '0',
      change: networkData.linkedin?.engagement ?? 0,
      icon: <LinkedIn sx={{ fontSize: 40, color: '#0A66C2' }} />
    }
  ], [networkData]);

  return (
    <Box sx={{ 
      p: { xs: 2, sm: 3 },
      maxWidth: '1600px',
      margin: '0 auto',
      width: '100%'
    }}>
      {/* Header com filtro de data */}
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'space-between',
        alignItems: 'center',
        mb: 4,
        mt: 2
      }}>
        <Typography variant="h5" component="h1">
          Dashboard Overview
        </Typography>
        <DateRangeFilter 
          value={dateRangeType} 
          onChange={onDateRangeChange}
        />
      </Box>

      {/* Cards de estatísticas */}
      <Fade in={!isLoading} timeout={500}>
        <Box sx={{
          display: 'grid',
          gridTemplateColumns: {
            xs: '1fr',
            sm: 'repeat(2, 1fr)',
            md: 'repeat(4, 1fr)',
          },
          gap: 3,
          mb: 4,
        }}>
          {statsCards.map((card, index) => (
            isLoading ? (
              <Skeleton 
                key={index}
                variant="rectangular"
                height={120}
                sx={{ borderRadius: 1 }}
              />
            ) : (
              <StatsCard
                key={index}
                title={card.title}
                value={card.value}
                change={card.change}
                icon={card.icon}
              />
            )
          ))}
        </Box>
      </Fade>

      {/* Cards de Insights */}
      <Fade in={!isLoading} timeout={700}>
        <Box sx={{
          display: 'grid',
          gridTemplateColumns: {
            xs: '1fr',
            md: 'repeat(3, 1fr)',
          },
          gap: 3,
          mb: 4,
        }}>
          {isLoading ? (
            Array(3).fill(0).map((_, index) => (
              <Skeleton 
                key={index}
                variant="rectangular"
                height={160}
                sx={{ borderRadius: 1 }}
              />
            ))
          ) : (
            insights.map((insight, index) => (
              <InsightCard key={index} {...insight} />
            ))
          )}
        </Box>
      </Fade>

      {/* Layout dos gráficos e posts */}
      <Fade in={!isLoading} timeout={900}>
        <Box sx={{
          display: 'grid',
          gridTemplateColumns: {
            xs: '1fr',
            lg: '2fr 1fr',
          },
          gap: 3,
        }}>
          {/* Coluna dos gráficos */}
          <Box sx={{ display: 'grid', gap: 3 }}>
            {isLoading ? (
              <>
                <Skeleton variant="rectangular" height={300} sx={{ borderRadius: 1 }} />
                <Skeleton variant="rectangular" height={300} sx={{ borderRadius: 1 }} />
              </>
            ) : (
              <>
                <LineChart 
                  data={lineChartData}
                  title="Crescimento de Seguidores"
                />
                <BarChart 
                  data={engagementData}
                  title="Engajamento por Rede Social"
                />
              </>
            )}
          </Box>
          {/* Coluna lateral */}
          {isLoading ? (
            <Skeleton variant="rectangular" height={400} sx={{ borderRadius: 1 }} />
          ) : (
            <TopPosts posts={topPosts} />
          )}
        </Box>
      </Fade>
    </Box>
  );
};

export default Dashboard;