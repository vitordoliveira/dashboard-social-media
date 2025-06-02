import React, { useMemo } from 'react';
import { Typography, Box, Skeleton, Paper, useTheme, alpha, Fade, Grow } from '@mui/material';
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
  const theme = useTheme();
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
      icon: <Facebook sx={{ fontSize: 32, color: '#1877F2' }} />,
      color: '#1877F2'
    },
    {
      title: "Twitter Followers",
      value: networkData.twitter?.followers.toLocaleString() ?? '0',
      change: networkData.twitter?.engagement ?? 0,
      icon: <Twitter sx={{ fontSize: 32, color: '#1DA1F2' }} />,
      color: '#1DA1F2'
    },
    {
      title: "Instagram Followers",
      value: networkData.instagram?.followers.toLocaleString() ?? '0',
      change: networkData.instagram?.engagement ?? 0,
      icon: <Instagram sx={{ fontSize: 32, color: '#E4405F' }} />,
      color: '#E4405F'
    },
    {
      title: "LinkedIn Followers",
      value: networkData.linkedin?.followers.toLocaleString() ?? '0',
      change: networkData.linkedin?.engagement ?? 0,
      icon: <LinkedIn sx={{ fontSize: 32, color: '#0A66C2' }} />,
      color: '#0A66C2'
    }
  ], [networkData]);

  return (
    <Box sx={{ 
      p: { xs: 2, sm: 3 },
      maxWidth: '1600px',
      margin: '0 auto',
      width: '100%',
      minHeight: '100vh',
      background: alpha(theme.palette.background.default, 0.6)
    }}>
      {/* Header com filtro de data */}
      <Fade in={true} timeout={1000}>
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'space-between',
          alignItems: 'center',
          mb: 4,
          mt: 2,
          flexWrap: 'wrap',
          gap: 2
        }}>
          <Typography 
            variant="h5" 
            component="h1"
            sx={{
              fontWeight: 600,
              color: theme.palette.text.primary,
              fontSize: { xs: '1.5rem', sm: '2rem' }
            }}
          >
            Dashboard Overview
          </Typography>
          <DateRangeFilter 
            value={dateRangeType} 
            onChange={onDateRangeChange}
          />
        </Box>
      </Fade>

      {/* Cards de estatísticas */}
      <Box sx={{
        display: 'grid',
        gridTemplateColumns: {
          xs: '1fr',
          sm: 'repeat(2, 1fr)',
          lg: 'repeat(4, 1fr)',
        },
        gap: 3,
        mb: 4,
      }}>
        {statsCards.map((card, index) => (
          <Grow
            key={card.title}
            in={!isLoading}
            timeout={(index + 1) * 200}
          >
            <Box>
              {isLoading ? (
                <Skeleton 
                  variant="rectangular"
                  height={120}
                  sx={{ 
                    borderRadius: 2,
                    background: alpha(theme.palette.primary.main, 0.1)
                  }}
                />
              ) : (
                <StatsCard
                  title={card.title}
                  value={card.value}
                  change={card.change}
                  icon={card.icon}
                  color={card.color}
                />
              )}
            </Box>
          </Grow>
        ))}
      </Box>

      {/* Cards de Insights */}
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
            <Fade key={`skeleton-${index}`} in={true} timeout={(index + 1) * 200}>
              <Skeleton 
                variant="rectangular"
                height={160}
                sx={{ 
                  borderRadius: 2,
                  background: alpha(theme.palette.primary.main, 0.1)
                }}
              />
            </Fade>
          ))
        ) : (
          insights.map((insight, index) => (
            <Grow
              key={`insight-${index}`}
              in={true}
              timeout={(index + 1) * 200}
            >
              <Box>
                <InsightCard {...insight} />
              </Box>
            </Grow>
          ))
        )}
      </Box>

      {/* Layout dos gráficos e posts */}
      <Box sx={{
        display: 'grid',
        gridTemplateColumns: {
          xs: '1fr',
          lg: '2fr 1fr',
        },
        gap: 3,
      }}>
        {/* Coluna dos gráficos */}
        <Fade in={!isLoading} timeout={800}>
          <Box sx={{ display: 'grid', gap: 3 }}>
            {isLoading ? (
              <>
                <Skeleton 
                  variant="rectangular" 
                  height={400} 
                  sx={{ 
                    borderRadius: 2,
                    background: alpha(theme.palette.primary.main, 0.1)
                  }} 
                />
                <Skeleton 
                  variant="rectangular" 
                  height={400} 
                  sx={{ 
                    borderRadius: 2,
                    background: alpha(theme.palette.primary.main, 0.1)
                  }} 
                />
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
        </Fade>

        {/* Coluna lateral */}
        <Fade in={!isLoading} timeout={1000}>
          <Box>
            {isLoading ? (
              <Skeleton 
                variant="rectangular" 
                height={820} 
                sx={{ 
                  borderRadius: 2,
                  background: alpha(theme.palette.primary.main, 0.1)
                }} 
              />
            ) : (
              <TopPosts posts={topPosts} />
            )}
          </Box>
        </Fade>
      </Box>
    </Box>
  );
};

export default Dashboard;