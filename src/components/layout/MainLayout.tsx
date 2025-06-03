import React, { useState, useEffect } from 'react';
import { Box, useMediaQuery, useTheme, Breadcrumbs, Link, Typography, LinearProgress } from '@mui/material';
import { useLocation, Link as RouterLink } from 'react-router-dom';
import { useThemeContext } from '../../context/ThemeContext';
import Header from './Header';
import Sidebar from './Sidebar';
import { getMainLayoutStyles } from './styles';

interface MainLayoutProps {
  children: React.ReactNode;
}

interface BreadcrumbItem {
  path: string;
  label: string;
}

const routeMap: Record<string, BreadcrumbItem[]> = {
  '/': [{ path: '/', label: 'Dashboard' }],
  '/analytics': [
    { path: '/', label: 'Dashboard' },
    { path: '/analytics', label: 'Analytics' }
  ],
  '/schedule': [
    { path: '/', label: 'Dashboard' },
    { path: '/schedule', label: 'Agendar Posts' }
  ],
  '/monitoring': [
    { path: '/', label: 'Dashboard' },
    { path: '/monitoring', label: 'Monitoramento' }
  ],
  '/reports': [
    { path: '/', label: 'Dashboard' },
    { path: '/reports', label: 'Relatórios' }
  ],
  '/settings': [
    { path: '/', label: 'Dashboard' },
    { path: '/settings', label: 'Configurações' }
  ]
};

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const theme = useTheme();
  const { themeSettings } = useThemeContext();
  const location = useLocation();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('md'));
  const [sidebarOpen, setSidebarOpen] = useState(!isSmallScreen);
  const [isLoading, setIsLoading] = useState(false);
  const [pageTitle, setPageTitle] = useState('');

  // Obtenha os estilos atualizados
  const styles = getMainLayoutStyles(theme, sidebarOpen);

  useEffect(() => {
    if (isSmallScreen) {
      setSidebarOpen(false);
    } else {
      // No desktop, mantenha a sidebar aberta por padrão
      setSidebarOpen(true);
    }
  }, [isSmallScreen]);

  useEffect(() => {
    const currentRoute = routeMap[location.pathname];
    if (currentRoute) {
      setPageTitle(currentRoute[currentRoute.length - 1].label);
    }
    setIsLoading(true);
    const timer = setTimeout(() => setIsLoading(false), 500);
    return () => clearTimeout(timer);
  }, [location]);

  const handleDrawerToggle = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const currentBreadcrumbs = routeMap[location.pathname] || [];

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', overflow: 'hidden' }}>
      <Sidebar 
        open={sidebarOpen} 
        onToggle={handleDrawerToggle}
        currentPath={location.pathname}
      />
      
      <Box 
        component="main" 
        sx={{
          flexGrow: 1,
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'auto'
        }}
      >
        <Header 
          sidebarOpen={sidebarOpen}
          onSidebarToggle={handleDrawerToggle}
          userName="vitordoliveira"
          pageTitle={pageTitle}
          notificationsCount={3}
        />

        {/* Loading indicator */}
        {isLoading && <LinearProgress sx={styles.loadingBar} />}

        {/* Breadcrumbs */}
        {themeSettings.showBreadcrumbs && (
          <Box sx={styles.breadcrumbsContainer}>
            <Breadcrumbs aria-label="breadcrumb" separator="›">
              {currentBreadcrumbs.map((item, index) => {
                const isLast = index === currentBreadcrumbs.length - 1;
                return isLast ? (
                  <Typography 
                    key={item.path} 
                    color="text.primary"
                    fontWeight={600}
                    fontSize="0.875rem"
                  >
                    {item.label}
                  </Typography>
                ) : (
                  <Link
                    key={item.path}
                    component={RouterLink}
                    to={item.path}
                    sx={styles.breadcrumbLink}
                    underline="none"
                  >
                    {item.label}
                  </Link>
                );
              })}
            </Breadcrumbs>
          </Box>
        )}

        <Box sx={{
          p: { xs: 2, sm: 3 },
          flexGrow: 1,
          background: theme.palette.background.default,
          overflowX: 'hidden',
        }}>
          {children}
        </Box>
      </Box>

      {/* Overlay for mobile when sidebar is open */}
      {isSmallScreen && sidebarOpen && (
        <Box
          onClick={handleDrawerToggle}
          sx={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            bgcolor: 'rgba(0,0,0,0.5)',
            zIndex: theme.zIndex.drawer - 1,
            backdropFilter: 'blur(4px)',
          }}
        />
      )}
    </Box>
  );
};

export default MainLayout;