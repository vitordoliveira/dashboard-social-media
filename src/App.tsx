import React, { useState } from 'react';
import { ThemeProvider, createTheme, CssBaseline, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import { Facebook, Twitter, Instagram, LinkedIn } from '@mui/icons-material';
import Header from './components/layout/Header';
import Sidebar from './components/layout/Sidebar';
import StatsCard from './components/dashboard/StatsCard';
import LineChart from './components/charts/LineChart';
import BarChart from './components/charts/BarChart';
import DateRangeFilter from './components/dashboard/DateRangeFilter';
import InsightCard from './components/dashboard/InsightCard';
import TopPosts from './components/dashboard/TopPosts';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#90caf9',
    },
    secondary: {
      main: '#f48fb1',
    },
    background: {
      default: '#1a1a1a',
      paper: '#2d2d2d',
    },
  },
});

const DRAWER_WIDTH = 240;

const lineChartData = [
  {
    id: 'Facebook',
    color: '#1877F2',
    data: [
      { x: 'Jan', y: 10000 },
      { x: 'Feb', y: 10500 },
      { x: 'Mar', y: 11200 },
      { x: 'Apr', y: 11800 },
      { x: 'May', y: 12493 },
    ],
  },
  {
    id: 'Twitter',
    color: '#1DA1F2',
    data: [
      { x: 'Jan', y: 7000 },
      { x: 'Feb', y: 7300 },
      { x: 'Mar', y: 7800 },
      { x: 'Apr', y: 8100 },
      { x: 'May', y: 8239 },
    ],
  },
  {
    id: 'Instagram',
    color: '#E4405F',
    data: [
      { x: 'Jan', y: 20000 },
      { x: 'Feb', y: 21000 },
      { x: 'Mar', y: 21800 },
      { x: 'Apr', y: 22500 },
      { x: 'May', y: 23092 },
    ],
  },
];

const engagementData = [
  {
    network: 'Facebook',
    likes: 45231,
    comments: 12450,
    shares: 8392,
  },
  {
    network: 'Twitter',
    likes: 32891,
    comments: 15234,
    shares: 12543,
  },
  {
    network: 'Instagram',
    likes: 89234,
    comments: 23456,
    shares: 5678,
  },
  {
    network: 'LinkedIn',
    likes: 12543,
    comments: 4321,
    shares: 2134,
  },
];

const insights = [
  {
    title: 'Melhor Horário',
    description: 'Posts entre 18h e 20h tem 47% mais engajamento',
    trend: 'up' as const,
    percentage: 47,
    tooltip: 'Baseado nos últimos 30 dias'
  },
  {
    title: 'Conteúdo Popular',
    description: 'Vídeos curtos têm 3x mais interações',
    trend: 'up' as const,
    percentage: 300,
    tooltip: 'Comparado a outros formatos'
  },
  {
    title: 'Crescimento',
    description: 'Instagram lidera em novos seguidores',
    trend: 'up' as const,
    percentage: 28,
    tooltip: 'Último trimestre'
  }
];

const topPosts = [
  {
    id: '1',
    network: 'instagram' as const,
    content: 'Lançamento da nova coleção 🚀',
    engagement: 2547,
    timestamp: '2h atrás'
  },
  {
    id: '2',
    network: 'facebook' as const,
    content: 'Promoção especial de fim de semana!',
    engagement: 1823,
    timestamp: '5h atrás'
  },
  {
    id: '3',
    network: 'twitter' as const,
    content: 'Novidades chegando em breve...',
    engagement: 945,
    timestamp: '1d atrás'
  }
];

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [dateRange, setDateRange] = useState('30days');

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Box sx={{ 
        display: 'flex', 
        minHeight: '100vh',
        backgroundColor: 'background.default'
      }}>
        <Sidebar open={sidebarOpen} onToggle={() => setSidebarOpen(!sidebarOpen)} />
        
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            ml: sidebarOpen ? `${DRAWER_WIDTH}px` : 0,
            transition: theme => theme.transitions.create(['margin'], {
              easing: theme.transitions.easing.sharp,
              duration: theme.transitions.duration.leavingScreen,
            }),
          }}
        >
          <Header sidebarOpen={sidebarOpen} />
          
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
              <DateRangeFilter value={dateRange} onChange={setDateRange} />
            </Box>

            {/* Cards de estatísticas */}
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
              <StatsCard
                title="Facebook Followers"
                value="12,493"
                change={2.5}
                icon={<Facebook sx={{ fontSize: 40, color: '#1877F2' }} />}
              />
              <StatsCard
                title="Twitter Followers"
                value="8,239"
                change={-1.2}
                icon={<Twitter sx={{ fontSize: 40, color: '#1DA1F2' }} />}
              />
              <StatsCard
                title="Instagram Followers"
                value="23,092"
                change={5.7}
                icon={<Instagram sx={{ fontSize: 40, color: '#E4405F' }} />}
              />
              <StatsCard
                title="LinkedIn Followers"
                value="4,899"
                change={3.2}
                icon={<LinkedIn sx={{ fontSize: 40, color: '#0A66C2' }} />}
              />
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
              {insights.map((insight, index) => (
                <InsightCard key={index} {...insight} />
              ))}
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
              <Box sx={{ display: 'grid', gap: 3 }}>
                <LineChart 
                  data={lineChartData}
                  title="Crescimento de Seguidores"
                />
                <BarChart 
                  data={engagementData}
                  title="Engajamento por Rede Social"
                />
              </Box>
              {/* Coluna lateral */}
              <TopPosts posts={topPosts} />
            </Box>
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default App;