import React from 'react';
import {
  Box,
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
import { getSidebarStyles } from './Sidebar.styles';

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
  };

  return (
    <>
      {/* Botão de toggle quando sidebar está fechada */}
      {!open && (
        <Tooltip title="Abrir menu" placement="right">
          <IconButton
            onClick={onToggle}
            sx={styles.toggleButton}
          >
            <MenuIcon />
          </IconButton>
        </Tooltip>
      )}

      <Box component="nav" sx={styles.nav(open)}>
        <Drawer
          variant="persistent"
          anchor="left"
          open={open}
          sx={styles.drawer}
        >
          {/* Header da Sidebar */}
          <Box sx={styles.header}>
            <Typography variant="h6" sx={styles.logo}>
              Social Media
            </Typography>
            <IconButton onClick={onToggle} sx={styles.closeButton}>
              <CloseIcon />
            </IconButton>
          </Box>

          {/* Lista de Menu */}
          <Box sx={{ overflow: 'auto' }}>
            {Object.entries(menuSections).map(([section, items]) => (
              <React.Fragment key={section}>
                <Box sx={styles.menuSection}>
                  <Typography>{section}</Typography>
                </Box>
                <List sx={styles.menuList}>
                  {items.map((item) => {
                    const isSelected = currentPath === item.path;
                    return (
                      <ListItem key={item.id} disablePadding>
                        <ListItemButton
                          selected={isSelected}
                          onClick={() => handleMenuItemClick(item.path)}
                          sx={styles.menuItem(isSelected)}
                        >
                          <ListItemIcon sx={styles.menuIcon(isSelected)}>
                            {item.icon}
                          </ListItemIcon>
                          <ListItemText 
                            primary={item.text}
                            sx={styles.menuText}
                          />
                        </ListItemButton>
                      </ListItem>
                    );
                  })}
                </List>
              </React.Fragment>
            ))}
          </Box>
        </Drawer>
      </Box>
    </>
  );
};

export default Sidebar;