import React from 'react';
import { Box, Typography, Grid, useTheme, alpha } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import { useAnalyticsData } from '../hooks/useAnalyticsData';
import { AnalyticsProps } from '../types/analytics';
import DateRangeFilter from '../components/dashboard/DateRangeFilter';

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
      <AnimatePresence mode="wait">
        {/* Header com filtro de data */}
        <motion.div
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
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <Grid container spacing={3}>
            {stats.map((stat) => {
              const gridProps = {
                item: true,
                xs: 12,
                md: 6,
                lg: 3
              };
              
              return (
                <Grid {...gridProps} key={stat.title}>
                  <motion.div variants={itemVariants}>
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
                </Grid>
              );
            })}
          </Grid>
        </motion.div>
      </AnimatePresence>
    </Box>
  );
};

export default Analytics;