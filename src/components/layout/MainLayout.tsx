import React, { useState, useEffect } from 'react';
import { Box, Drawer, useMediaQuery, useTheme, Breadcrumbs, Link, Typography, LinearProgress } from '@mui/material';
import { useLocation, Link as RouterLink } from 'react-router-dom';
import Header from './Header';
import Sidebar from './Sidebar';

interface MainLayoutProps {
  children: React.ReactNode;
}

const DRAWER_WIDTH = 240;

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
  const location = useLocation();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('md'));
  const [sidebarOpen, setSidebarOpen] = useState(!isSmallScreen);
  const [isLoading, setIsLoading] = useState(false);
  const [pageTitle, setPageTitle] = useState('');

  // Fecha a sidebar automaticamente em telas pequenas
  useEffect(() => {
    if (isSmallScreen) {
      setSidebarOpen(false);
    }
  }, [isSmallScreen]);

  // Atualiza o título da página baseado na rota
  useEffect(() => {
    const currentRoute = routeMap[location.pathname];
    if (currentRoute) {
      setPageTitle(currentRoute[currentRoute.length - 1].label);
    }
    // Simula loading ao mudar de página
    setIsLoading(true);
    const timer = setTimeout(() => setIsLoading(false), 500);
    return () => clearTimeout(timer);
  }, [location]);

  const handleDrawerToggle = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const currentBreadcrumbs = routeMap[location.pathname] || [];

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      {/* Sidebar */}
      <Sidebar 
        open={sidebarOpen} 
        onToggle={handleDrawerToggle}
        currentPath={location.pathname}
      />
      
      {/* Main content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          ml: { md: sidebarOpen ? `${DRAWER_WIDTH}px` : 0 },
          width: { md: `calc(100% - ${sidebarOpen ? DRAWER_WIDTH : 0}px)` },
          transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
          }),
        }}
      >
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
          <LinearProgress 
            sx={{ 
              position: 'fixed', 
              top: 64, 
              left: 0, 
              right: 0, 
              zIndex: theme.zIndex.drawer + 1 
            }} 
          />
        )}

        {/* Breadcrumbs */}
        <Box 
          sx={{ 
            px: 3, 
            py: 2,
            bgcolor: 'background.paper',
            borderBottom: 1,
            borderColor: 'divider'
          }}
        >
          <Breadcrumbs aria-label="breadcrumb">
            {currentBreadcrumbs.map((item, index) => {
              const isLast = index === currentBreadcrumbs.length - 1;
              return isLast ? (
                <Typography 
                  key={item.path} 
                  color="text.primary"
                  sx={{ display: 'flex', alignItems: 'center' }}
                >
                  {item.label}
                </Typography>
              ) : (
                <Link
                  key={item.path}
                  component={RouterLink}
                  to={item.path}
                  color="inherit"
                  sx={{ 
                    display: 'flex', 
                    alignItems: 'center',
                    '&:hover': {
                      textDecoration: 'none',
                      color: 'primary.main'
                    }
                  }}
                >
                  {item.label}
                </Link>
              );
            })}
          </Breadcrumbs>
        </Box>

        {/* Page content */}
        <Box 
          sx={{ 
            p: 3,
            minHeight: 'calc(100vh - 128px)', // 64px header + 64px breadcrumbs
            bgcolor: 'background.default'
          }}
        >
          {children}
        </Box>
      </Box>

      {/* Overlay for small screens when sidebar is open */}
      {isSmallScreen && sidebarOpen && (
        <Box
          sx={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            bgcolor: 'rgba(0,0,0,0.5)',
            zIndex: theme.zIndex.drawer - 1,
          }}
          onClick={handleDrawerToggle}
        />
      )}
    </Box>
  );
};

export default MainLayout;