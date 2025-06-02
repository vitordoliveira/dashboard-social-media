import React from 'react';
import { ThemeProvider, createTheme, CssBaseline } from '@mui/material';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { Facebook, Twitter, Instagram, LinkedIn } from '@mui/icons-material';
import Header from './components/layout/Header';
import StatsCard from './components/dashboard/StatsCard';
import LineChart from './components/charts/LineChart';

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

// Dados de exemplo para o gráfico
// ... imports permanecem os mesmos ...

const lineChartData = [
  {
    id: 'Facebook',
    color: '#1877F2', // Cor oficial do Facebook
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
    color: '#1DA1F2', // Cor oficial do Twitter
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
    color: '#E4405F', // Cor oficial do Instagram
    data: [
      { x: 'Jan', y: 20000 },
      { x: 'Feb', y: 21000 },
      { x: 'Mar', y: 21800 },
      { x: 'Apr', y: 22500 },
      { x: 'May', y: 23092 },
    ],
  },
];

// ... resto do código permanece o mesmo ...

function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Box>
        <Header />
        <Container sx={{ mt: 4 }}>
          {/* Cards de estatísticas */}
          <Box sx={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: 3,
            mb: 4,
          }}>
            <Box sx={{ flexBasis: { xs: '100%', sm: '45%', md: '22%' } }}>
              <StatsCard
                title="Facebook Followers"
                value="12,493"
                change={2.5}
                icon={<Facebook sx={{ fontSize: 40 }} />}
              />
            </Box>
            <Box sx={{ flexBasis: { xs: '100%', sm: '45%', md: '22%' } }}>
              <StatsCard
                title="Twitter Followers"
                value="8,239"
                change={-1.2}
                icon={<Twitter sx={{ fontSize: 40 }} />}
              />
            </Box>
            <Box sx={{ flexBasis: { xs: '100%', sm: '45%', md: '22%' } }}>
              <StatsCard
                title="Instagram Followers"
                value="23,092"
                change={5.7}
                icon={<Instagram sx={{ fontSize: 40 }} />}
              />
            </Box>
            <Box sx={{ flexBasis: { xs: '100%', sm: '45%', md: '22%' } }}>
              <StatsCard
                title="LinkedIn Followers"
                value="4,899"
                change={3.2}
                icon={<LinkedIn sx={{ fontSize: 40 }} />}
              />
            </Box>
          </Box>

          {/* Gráfico de linha */}
          <Box sx={{ mt: 4 }}>
            <LineChart 
              data={lineChartData}
              title="Crescimento de Seguidores"
            />
          </Box>
        </Container>
      </Box>
    </ThemeProvider>
  );
}

export default App;