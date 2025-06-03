import React from 'react';
import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  IconButton,
  useTheme,
  Typography,
  Tooltip,
  useMediaQuery,
  alpha,
  Box,
  Divider,
  Badge
} from '@mui/material';
import {
  Dashboard,
  Schedule,
  Notifications,
  Analytics,
  People,
  Assessment,
  Settings,
  Menu as MenuIcon,
  Close as CloseIcon,
  ChevronRight,
} from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';
import { getSidebarStyles, DRAWER_WIDTH } from './styles';
import { routes } from '../../config/routes';

interface MenuItem {
  id: string;
  text: string;
  icon: React.ReactElement;
  path: string;
  section?: string;
  badge?: number;
  isDivider?: boolean;
}

interface SidebarProps {
  open: boolean;
  onToggle: () => void;
  currentPath?: string;
}

const menuItems: MenuItem[] = [
  { 
    id: 'dashboard', 
    text: 'Dashboard', 
    icon: <Dashboard />, 
    path: '/',
    section: 'Principal'
  },
  { 
    id: 'schedule', 
    text: 'Agendar Posts', 
    icon: <Schedule />, 
    path: '/schedule',
    section: 'Principal',
    badge: 2
  },
  { 
    id: 'monitoring', 
    text: 'Monitoramento', 
    icon: <Notifications />, 
    path: '/monitoring',
    section: 'Principal',
    badge: 3
  },
  { 
    id: 'analytics', 
    text: 'Analytics', 
    icon: <Analytics />, 
    path: '/analytics',
    section: 'Análise'
  },
  { 
    id: 'audience', 
    text: 'Audiência', 
    icon: <People />, 
    path: '/audience',
    section: 'Análise'
  },
  { 
    id: 'reports', 
    text: 'Relatórios', 
    icon: <Assessment />, 
    path: '/reports',
    section: 'Análise'
  },
  { 
    id: 'settings', 
    text: 'Configurações', 
    icon: <Settings />, 
    path: '/settings',
    section: 'Sistema'
  },
];

const Sidebar: React.FC<SidebarProps> = ({ open, onToggle, currentPath = '/' }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const styles = getSidebarStyles(theme);
  const navigate = useNavigate();
  const location = useLocation();

  // Verificar se a rota é válida
  const isValidRoute = (path: string) => {
    return routes.some(route => route.path === path);
  };

  // Agrupa os itens do menu por seção
  const menuSections = menuItems.reduce((acc, item) => {
    const section = item.section || 'Outros';
    if (!acc[section]) {
      acc[section] = [];
    }
    acc[section].push(item);
    return acc;
  }, {} as Record<string, MenuItem[]>);

  const handleMenuItemClick = (path: string) => {
    navigate(path);
    if (isMobile) {
      onToggle();
    }
  };

  const drawerVariant = isMobile ? "temporary" : "permanent";

  return (
    <>
      {!open && !isMobile && (
        <Tooltip title="Abrir menu" placement="right">
          <IconButton
            onClick={onToggle}
            sx={styles.toggleButton}
          >
            <MenuIcon />
          </IconButton>
        </Tooltip>
      )}

      <Drawer
        variant={drawerVariant}
        open={open}
        onClose={isMobile ? onToggle : undefined}
        sx={{
          ...styles.drawer,
          '& .MuiDrawer-paper': {
            ...styles.drawer['& .MuiDrawer-paper'],
            boxShadow: theme.palette.mode === 'dark' 
              ? 'none' 
              : '0 0 20px rgba(0, 0, 0, 0.05)',
          }
        }}
      >
        {/* Header da Sidebar */}
        <Box
          sx={{
            height: '70px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0 24px',
            borderBottom: `1px solid ${theme.palette.divider}`,
          }}
        >
          <Typography 
            variant="h6" 
            sx={{
              fontWeight: 800,
              fontSize: '1.5rem',
              background: `linear-gradient(45deg, ${theme.palette.primary.main} 30%, ${theme.palette.primary.light} 90%)`,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              letterSpacing: '-0.5px'
            }}
          >
            Social Media
          </Typography>
          <IconButton 
            onClick={onToggle} 
            sx={{
              color: theme.palette.text.secondary,
              '&:hover': {
                color: theme.palette.primary.main,
                transform: 'rotate(90deg)',
              },
              transition: 'all 0.3s'
            }}
          >
            <CloseIcon />
          </IconButton>
        </Box>

        {/* Lista de Menu */}
        <Box sx={{ overflow: 'auto', paddingBottom: '16px', flexGrow: 1 }}>
          {Object.entries(menuSections).map(([section, items]) => (
            <React.Fragment key={section}>
              <Box 
                sx={{
                  marginTop: '24px',
                  marginBottom: '8px',
                  padding: '0 24px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}
              >
                <Typography 
                  variant="overline"
                  sx={{
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px',
                    color: theme.palette.text.secondary,
                    opacity: 0.7
                  }}
                >
                  {section}
                </Typography>
                <Divider 
                  sx={{ 
                    flexGrow: 1, 
                    ml: 1, 
                    borderColor: alpha(theme.palette.divider, 0.5)
                  }} 
                />
              </Box>
              <List sx={{ padding: '0 16px' }}>
                {items.map((item) => {
                  const isSelected = currentPath === item.path;
                  const isRouteImplemented = isValidRoute(item.path);
                  
                  if (item.isDivider) {
                    return <Divider key={item.id} sx={{ my: 1.5 }} />;
                  }
                  
                  return (
                    <ListItem key={item.id} disablePadding sx={{ mb: 0.5 }}>
                      <ListItemButton
                        selected={isSelected}
                        onClick={() => handleMenuItemClick(item.path)}
                        sx={{
                          borderRadius: '10px',
                          padding: '10px 16px',
                          color: isSelected 
                            ? theme.palette.primary.main 
                            : theme.palette.text.secondary,
                          position: 'relative',
                          overflow: 'hidden', // Para o efeito de ripple ficar contido
                          '&.Mui-selected': {
                            backgroundColor: alpha(theme.palette.primary.main, 0.08),
                            '&::before': {
                              content: '""',
                              position: 'absolute',
                              left: 0,
                              top: '20%',
                              height: '60%',
                              width: '4px',
                              borderRadius: '0 4px 4px 0',
                              background: `linear-gradient(45deg, ${theme.palette.primary.main} 30%, ${theme.palette.primary.light} 90%)`,
                              boxShadow: theme.palette.mode === 'dark' 
                                ? `0 0 8px ${alpha(theme.palette.primary.main, 0.6)}` 
                                : 'none',
                            },
                          },
                          '&:hover': {
                            backgroundColor: alpha(theme.palette.primary.main, 0.04),
                            color: theme.palette.primary.main,
                            transform: 'translateX(4px)',
                          },
                          transition: 'all 0.2s',
                          // Estilo para rotas não implementadas
                          ...(isRouteImplemented ? {} : {
                            opacity: theme.palette.mode === 'dark' ? 0.7 : 0.8,
                          }),
                        }}
                      >
                        <ListItemIcon sx={{
                          color: 'inherit',
                          minWidth: 40,
                          '& svg': {
                            fontSize: 22,
                            transition: 'transform 0.2s',
                            transform: isSelected ? 'scale(1.1)' : 'scale(1)',
                          },
                        }}>
                          {item.badge ? (
                            <Badge 
                              badgeContent={item.badge} 
                              color="error"
                              sx={{
                                '& .MuiBadge-badge': {
                                  fontSize: '0.65rem',
                                  minWidth: '18px',
                                  height: '18px',
                                }
                              }}
                            >
                              {item.icon}
                            </Badge>
                          ) : item.icon}
                        </ListItemIcon>
                        <ListItemText 
                          primary={item.text}
                          primaryTypographyProps={{
                            fontSize: '0.95rem',
                            fontWeight: isSelected ? 600 : 500,
                          }}
                        />
                        
                        {/* Indicador para páginas em desenvolvimento */}
                        {!isRouteImplemented && (
                          <Box 
                            sx={{
                              bgcolor: alpha(theme.palette.warning.main, 0.1),
                              color: theme.palette.warning.main,
                              fontSize: '0.65rem',
                              py: 0.3,
                              px: 0.8,
                              borderRadius: '4px',
                              fontWeight: 600,
                              letterSpacing: '0.5px',
                              border: `1px solid ${alpha(theme.palette.warning.main, 0.2)}`,
                              display: 'flex',
                              alignItems: 'center'
                            }}
                          >
                            Em breve
                          </Box>
                        )}
                      </ListItemButton>
                    </ListItem>
                  );
                })}
              </List>
            </React.Fragment>
          ))}
        </Box>
        
        {/* Footer com versão */}
        <Box
          sx={{
            padding: '16px 24px',
            borderTop: `1px solid ${alpha(theme.palette.divider, 0.5)}`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Typography
            variant="caption"
            sx={{
              color: alpha(theme.palette.text.secondary, 0.6),
              fontSize: '0.7rem',
              fontWeight: 500,
            }}
          >
            v1.2.0 © 2025 Social Media
          </Typography>
        </Box>
      </Drawer>
    </>
  );
};

export default Sidebar;