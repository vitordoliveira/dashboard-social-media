import React, { useMemo } from 'react';
import { Typography, Box, Skeleton, Paper, useTheme, alpha } from '@mui/material';
import { Facebook, Twitter, Instagram, LinkedIn } from '@mui/icons-material';
import { motion, AnimatePresence, domAnimation, LazyMotion } from 'framer-motion';
import StatsCard from '../components/dashboard/StatsCard';
import LineChart from '../components/charts/LineChart';
// Importando o NetworkEngagementChart e sua interface
import NetworkEngagementChart, { EngagementData } from '../components/charts/NetworkEngagementChart';
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

// Componente wrapper para animações
const MotionBox = motion.create(Box);

const Dashboard: React.FC<DashboardProps> = ({
  dateRange,
  dateRangeType,
  onDateRangeChange
}) => {
  const theme = useTheme();
  const { 
    networkData, 
    lineChartData, 
    engagementData, // Certifique-se que isso é do tipo EngagementData[]
    insights, 
    topPosts, 
    isLoading 
  } = useDashboardData(dateRange);

  const statsCards = useMemo(() => [
    {
      id: 'facebook',
      title: "Seguidores do Facebook",
      value: networkData.facebook?.followers.toLocaleString() ?? '0',
      change: networkData.facebook?.engagement ?? 0,
      icon: <Facebook sx={{ fontSize: 32, color: '#1877F2' }} />,
      color: '#1877F2'
    },
    {
      id: 'twitter',
      title: "Seguidores do Twitter",
      value: networkData.twitter?.followers.toLocaleString() ?? '0',
      change: networkData.twitter?.engagement ?? 0,
      icon: <Twitter sx={{ fontSize: 32, color: '#1DA1F2' }} />,
      color: '#1DA1F2'
    },
    {
      id: 'instagram',
      title: "Seguidores do Instagram",
      value: networkData.instagram?.followers.toLocaleString() ?? '0',
      change: networkData.instagram?.engagement ?? 0,
      icon: <Instagram sx={{ fontSize: 32, color: '#E4405F' }} />,
      color: '#E4405F'
    },
    {
      id: 'linkedin',
      title: "Seguidores do LinkedIn",
      value: networkData.linkedin?.followers.toLocaleString() ?? '0',
      change: networkData.linkedin?.engagement ?? 0,
      icon: <LinkedIn sx={{ fontSize: 32, color: '#0A66C2' }} />,
      color: '#0A66C2'
    }
  ], [networkData]);

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

  // Função para lidar com a exportação de dados, se necessário
  const handleExportData = () => {
    console.log("Exportando dados de engajamento...");
    // Lógica de exportação aqui
  };

  // Função para lidar com o modo de tela cheia, se necessário
  const handleFullscreen = () => {
    console.log("Ativando modo tela cheia...");
    // Lógica de tela cheia aqui
  };

  // Garantir que os dados de engajamento estejam no formato correto
  const formattedEngagementData: EngagementData[] = useMemo(() => {
    if (!engagementData || engagementData.length === 0) return [];
    
    // Se necessário, converta os dados para o formato correto
    return engagementData.map(item => ({
      network: String(item.network),
      likes: Number(item.likes || 0),
      comments: Number(item.comments || 0),
      shares: Number(item.shares || 0)
    }));
  }, [engagementData]);

  return (
    <LazyMotion features={domAnimation}>
      <Box sx={{ 
        p: { xs: 2, sm: 3 },
        maxWidth: '1600px',
        margin: '0 auto',
        width: '100%',
        minHeight: '100vh',
        background: alpha(theme.palette.background.default, 0.6)
      }}>
        {/* Header com filtro de data */}
        <MotionBox
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
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
            Visão Geral do Dashboard
          </Typography>
          <DateRangeFilter 
            value={dateRangeType} 
            onChange={onDateRangeChange}
          />
        </MotionBox>

        {/* Cards de estatísticas */}
        <MotionBox
          key="stats-container"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          sx={{
            display: 'grid',
            gridTemplateColumns: {
              xs: '1fr',
              sm: 'repeat(2, 1fr)',
              lg: 'repeat(4, 1fr)',
            },
            gap: 3,
            mb: 4,
          }}
        >
          {statsCards.map((card) => (
            <MotionBox
              key={card.id}
              variants={itemVariants}
              layoutId={card.id}
            >
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
            </MotionBox>
          ))}
        </MotionBox>

        {/* Cards de Insights */}
        <MotionBox
          key="insights-container"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          sx={{
            display: 'grid',
            gridTemplateColumns: {
              xs: '1fr',
              md: 'repeat(3, 1fr)',
            },
            gap: 3,
            mb: 4,
          }}
        >
          {isLoading ? (
            Array(3).fill(0).map((_, index) => (
              <MotionBox
                key={`skeleton-insight-${index}`}
                variants={itemVariants}
                layoutId={`insight-skeleton-${index}`}
              >
                <Skeleton 
                  variant="rectangular"
                  height={160}
                  sx={{ 
                    borderRadius: 2,
                    background: alpha(theme.palette.primary.main, 0.1)
                  }}
                />
              </MotionBox>
            ))
          ) : (
            insights.map((insight, index) => (
              <MotionBox
                key={`insight-${insight.title}`}
                variants={itemVariants}
                layoutId={`insight-${index}`}
              >
                <InsightCard {...insight} />
              </MotionBox>
            ))
          )}
        </MotionBox>

        {/* Layout dos gráficos e posts - CORRIGIDO PARA ALINHAMENTO */}
        <MotionBox
          key="charts-container"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          sx={{
            display: 'grid',
            gridTemplateColumns: {
              xs: '1fr',
              lg: '2fr 1fr',
            },
            gap: 3,
            alignItems: 'start', // Alinha os itens pelo topo
          }}
        >
          {/* Coluna dos gráficos */}
          <MotionBox 
            key="charts-column"
            variants={itemVariants}
            sx={{ 
              display: 'flex', 
              flexDirection: 'column', 
              gap: 3,
            }}
          >
            {isLoading ? (
              <>
                <Skeleton 
                  variant="rectangular" 
                  height={400} 
                  sx={{ 
                    borderRadius: 2,
                    background: alpha(theme.palette.primary.main, 0.1),
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
                <NetworkEngagementChart 
                  data={formattedEngagementData}
                  title="Engajamento por Rede Social"
                  showLegend={true}
                  height={400}
                  onDownload={handleExportData}
                  onToggleFullscreen={handleFullscreen}
                  isLoading={isLoading}
                />
              </>
            )}
          </MotionBox>

          {/* Coluna lateral para posts */}
          <MotionBox 
            key="posts-column"
            variants={itemVariants}
            sx={{ 
              height: '100%',
            }}
          >
            {isLoading ? (
              <Skeleton 
                variant="rectangular" 
                height={825} // Ajusta para a mesma altura dos dois gráficos (400 + 400 + gap de 25)
                sx={{ 
                  borderRadius: 2,
                  background: alpha(theme.palette.primary.main, 0.1)
                }} 
              />
            ) : (
              <Box
                sx={{
                  height: '100%', // Ocupa toda a altura disponível
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                <TopPosts 
                  posts={topPosts} 
                  maxPosts={4} // Mostra apenas 4 posts para caber na altura dos dois gráficos
                  isLoading={isLoading}
                  onViewAll={() => console.log('Ver todos os posts')}
                />
              </Box>
            )}
          </MotionBox>
        </MotionBox>
      </Box>
    </LazyMotion>
  );
};

export default Dashboard;