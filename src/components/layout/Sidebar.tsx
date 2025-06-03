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
  alpha, // Adicionar importação do alpha aqui
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
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { getSidebarStyles, DRAWER_WIDTH } from './styles';

interface MenuItem {
  id: string;
  text: string;
  icon: React.ReactElement;
  path: string;
  section?: string;
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
    section: 'Principal'
  },
  { 
    id: 'monitoring', 
    text: 'Monitoramento', 
    icon: <Notifications />, 
    path: '/monitoring',
    section: 'Principal'
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
        sx={styles.drawer}
      >
        {/* Header da Sidebar */}
        <div style={{
          height: '70px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 24px',
          borderBottom: `1px solid ${theme.palette.divider}`
        }}>
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
              transition: 'all 0.2s'
            }}
          >
            <CloseIcon />
          </IconButton>
        </div>

        {/* Lista de Menu */}
        <div style={{ overflow: 'auto', paddingBottom: '16px' }}>
          {Object.entries(menuSections).map(([section, items]) => (
            <React.Fragment key={section}>
              <div style={{
                marginTop: '24px',
                marginBottom: '8px',
                padding: '0 24px'
              }}>
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
              </div>
              <List sx={{ padding: '0 16px' }}>
                {items.map((item) => {
                  const isSelected = currentPath === item.path;
                  return (
                    <ListItem key={item.id} disablePadding sx={{ mb: 0.5 }}>
                      <ListItemButton
                        selected={isSelected}
                        onClick={() => handleMenuItemClick(item.path)}
                        sx={{
                          borderRadius: '10px',
                          padding: '10px 16px',
                          color: isSelected ? theme.palette.primary.main : theme.palette.text.secondary,
                          position: 'relative',
                          '&.Mui-selected': {
                            backgroundColor: `${theme.palette.primary.main}14`,
                            '&::before': {
                              content: '""',
                              position: 'absolute',
                              left: 0,
                              top: '20%',
                              height: '60%',
                              width: '4px',
                              borderRadius: '0 4px 4px 0',
                              background: `linear-gradient(45deg, ${theme.palette.primary.main} 30%, ${theme.palette.primary.light} 90%)`,
                            },
                          },
                          '&:hover': {
                            backgroundColor: `${theme.palette.primary.main}0A`,
                            color: theme.palette.primary.main,
                            transform: 'translateX(4px)',
                          },
                          transition: 'all 0.2s',
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
                          {item.icon}
                        </ListItemIcon>
                        <ListItemText 
                          primary={item.text}
                          primaryTypographyProps={{
                            fontSize: '0.95rem',
                            fontWeight: isSelected ? 600 : 500,
                          }}
                        />
                      </ListItemButton>
                    </ListItem>
                  );
                })}
              </List>
            </React.Fragment>
          ))}
        </div>
      </Drawer>
    </>
  );
};

export default Sidebar;