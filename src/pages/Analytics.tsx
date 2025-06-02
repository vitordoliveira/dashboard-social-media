import React from 'react';
import { Box, Typography, useTheme, alpha, styled } from '@mui/material';
import { motion } from 'framer-motion';
import { useAnalyticsData } from '../hooks/useAnalyticsData';
import { AnalyticsProps } from '../types/analytics';
import DateRangeFilter from '../components/dashboard/DateRangeFilter';
import NetworkPerformance from '../components/analytics/NetworkPerformance';
import AudienceMetrics from '../components/analytics/AudienceMetrics';

const StatsGrid = styled(Box)(({ theme }) => ({
  display: 'grid',
  gap: theme.spacing(3),
  gridTemplateColumns: 'repeat(1, 1fr)',
  [theme.breakpoints.up('sm')]: {
    gridTemplateColumns: 'repeat(2, 1fr)',
  },
  [theme.breakpoints.up('md')]: {
    gridTemplateColumns: 'repeat(4, 1fr)',
  },
}));

const Analytics: React.FC<AnalyticsProps> = ({ dateRange, dateRangeType, onDateRangeChange }) => {
  const theme = useTheme();
  const { networkAnalytics, globalStats, isLoading } = useAnalyticsData(dateRange);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  const stats = [
    {
      title: 'Total de Seguidores',
      value: isLoading ? '-' : globalStats.totalFollowers.toLocaleString(),
      color: theme.palette.primary.main
    },
    {
      title: 'Engajamento Total',
      value: isLoading ? '-' : globalStats.totalEngagement.toLocaleString(),
      color: theme.palette.secondary.main
    },
    {
      title: 'Taxa Média de Engajamento',
      value: isLoading ? '-' : `${globalStats.averageEngagementRate.toFixed(2)}%`,
      color: theme.palette.success.main
    },
    {
      title: 'Rede com Melhor Desempenho',
      value: isLoading ? '-' : globalStats.topPerformingNetwork,
      color: theme.palette.info.main
    }
  ];

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
      <motion.div
        key="header"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Box
          sx={{ 
            display: 'flex', 
            justifyContent: 'space-between',
            alignItems: 'center',
            mb: 4,
            mt: 2,
            flexWrap: 'wrap',
            gap: 2
          }}
        >
          <Typography 
            variant="h5" 
            component="h1"
            sx={{
              fontWeight: 600,
              color: theme.palette.text.primary,
              fontSize: { xs: '1.5rem', sm: '2rem' }
            }}
          >
            Analytics Detalhado
          </Typography>
          <DateRangeFilter 
            value={dateRangeType} 
            onChange={onDateRangeChange}
          />
        </Box>
      </motion.div>

      {/* Global Stats */}
      <motion.div
        key="stats"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <StatsGrid>
          {stats.map((stat, index) => (
            <motion.div key={`stat-${index}`} variants={itemVariants}>
              <Box
                sx={{
                  p: 3,
                  bgcolor: alpha(stat.color, 0.1),
                  borderRadius: 2,
                  border: `1px solid ${alpha(stat.color, 0.2)}`
                }}
              >
                <Typography variant="subtitle2" color="textSecondary">
                  {stat.title}
                </Typography>
                <Typography 
                  variant="h4" 
                  sx={{ 
                    mt: 1, 
                    textTransform: stat.title.includes('Rede') ? 'capitalize' : 'none' 
                  }}
                >
                  {stat.value}
                </Typography>
              </Box>
            </motion.div>
          ))}
        </StatsGrid>
      </motion.div>

      {/* Network Performance */}
      <Box sx={{ mt: 4 }}>
        <motion.div
          key="network"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <NetworkPerformance 
            networkData={networkAnalytics}
            isLoading={isLoading}
            dateRange={dateRange}
          />
        </motion.div>
      </Box>

      {/* Audience Metrics */}
      <Box sx={{ mt: 4 }}>
        <motion.div
          key="audience"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <AudienceMetrics 
            networkData={networkAnalytics}
            isLoading={isLoading}
            dateRange={dateRange}
          />
        </motion.div>
      </Box>
    </Box>
  );
};

export default Analytics;