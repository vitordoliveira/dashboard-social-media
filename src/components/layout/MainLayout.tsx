import React, { useState, useEffect } from 'react';
import { Box, useMediaQuery, useTheme, Breadcrumbs, Link, Typography, LinearProgress } from '@mui/material';
import { useLocation, Link as RouterLink } from 'react-router-dom';
import { useThemeContext } from '../../context/ThemeContext';
import Header from './Header';
import Sidebar from './Sidebar';
import { getMainLayoutStyles, DRAWER_WIDTH } from './styles'; // Atualizado

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

  const styles = getMainLayoutStyles(theme, sidebarOpen);

  useEffect(() => {
    if (isSmallScreen) {
      setSidebarOpen(false);
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
    <Box sx={styles.root}>
      {/* Sidebar */}
      <Sidebar 
        open={sidebarOpen} 
        onToggle={handleDrawerToggle}
        currentPath={location.pathname}
      />
      
      {/* Main content */}
      <Box component="main" sx={styles.main}>
        {/* Header */}
        <Header 
          sidebarOpen={sidebarOpen}
          onSidebarToggle={handleDrawerToggle}
          userName="vitordoliveira"
          pageTitle={pageTitle}
          notificationsCount={3}
        />

        {/* Loading indicator */}
        {isLoading && (
          <LinearProgress sx={styles.loadingBar} />
        )}

        {/* Breadcrumbs */}
        {themeSettings.showBreadcrumbs && (
          <Box sx={styles.breadcrumbsContainer}>
            <Breadcrumbs aria-label="breadcrumb">
              {currentBreadcrumbs.map((item, index) => {
                const isLast = index === currentBreadcrumbs.length - 1;
                return isLast ? (
                  <Typography 
                    key={item.path} 
                    color="text.primary"
                    variant="body2"
                    fontWeight="medium"
                  >
                    {item.label}
                  </Typography>
                ) : (
                  <Link
                    key={item.path}
                    component={RouterLink}
                    to={item.path}
                    sx={styles.breadcrumbLink}
                    variant="body2"
                  >
                    {item.label}
                  </Link>
                );
              })}
            </Breadcrumbs>
          </Box>
        )}

        {/* Page content */}
        <Box sx={styles.content}>
          {children}
        </Box>
      </Box>

      {/* Overlay for small screens when sidebar is open */}
      {isSmallScreen && sidebarOpen && (
        <Box
          sx={styles.overlay}
          onClick={handleDrawerToggle}
        />
      )}
    </Box>
  );
};

export default MainLayout;