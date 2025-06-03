import React from 'react';
import { 
  Box, 
  Typography, 
  Paper, 
  Button, 
  useTheme, 
  alpha,
  Container
} from '@mui/material';
import { Construction, ArrowBack } from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';
import type { CommonPageProps } from '../types/ui/routes';
import { findRouteByPath } from '../config/routes';

const ComingSoon: React.FC<CommonPageProps> = ({
  dateRange,
  dateRangeType,
  onDateRangeChange
}) => {
  const theme = useTheme();
  const location = useLocation();
  const navigate = useNavigate();
  const isDarkMode = theme.palette.mode === 'dark';
  
  // Encontrar o título da página atual com base na rota
  const currentRoute = findRouteByPath(location.pathname);
  const pageTitle = currentRoute?.title || 'Página';

  return (
    <Container maxWidth="md">
      <Paper 
        elevation={isDarkMode ? 0 : 2}
        sx={{
          p: 4,
          borderRadius: 2,
          textAlign: 'center',
          border: isDarkMode ? `1px solid ${alpha(theme.palette.divider, 0.1)}` : 'none',
          background: isDarkMode 
            ? alpha(theme.palette.background.paper, 0.8)
            : theme.palette.background.paper,
          position: 'relative',
          overflow: 'hidden',
          mt: 4,
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '4px',
            background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.primary.light})`,
          }
        }}
      >
        <Construction 
          sx={{ 
            fontSize: 80, 
            color: theme.palette.primary.main,
            mb: 2,
            opacity: 0.8
          }} 
        />
        
        <Typography 
          variant="h4" 
          component="h1" 
          gutterBottom
          sx={{ 
            fontWeight: 700, 
            mb: 2,
            background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.primary.light})`,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            display: 'inline-block'
          }}
        >
          {pageTitle} em Desenvolvimento
        </Typography>
        
        <Typography 
          variant="body1" 
          color="text.secondary" 
          sx={{ 
            mb: 4, 
            fontSize: '1.1rem', 
            maxWidth: '600px', 
            mx: 'auto' 
          }}
        >
          Esta funcionalidade está em desenvolvimento e estará disponível em breve. Estamos trabalhando para trazer a melhor experiência possível para esta área do dashboard.
        </Typography>
        
        <Button 
          variant="contained" 
          color="primary" 
          size="large"
          startIcon={<ArrowBack />}
          onClick={() => navigate('/')}
          sx={{
            px: 4,
            py: 1.2,
            borderRadius: 2,
            textTransform: 'none',
            fontWeight: 600,
            fontSize: '1rem',
            boxShadow: '0 4px 14px rgba(0, 118, 255, 0.39)',
            '&:hover': {
              boxShadow: '0 6px 20px rgba(0, 118, 255, 0.23)',
              transform: 'translateY(-1px)'
            },
            transition: 'all 0.2s'
          }}
        >
          Voltar para Dashboard
        </Button>
      </Paper>
    </Container>
  );
};

export default ComingSoon;