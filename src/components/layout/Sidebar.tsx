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

interface MenuItem {
  id: string;
  text: string;
  icon: React.ReactElement;
  path: string;
}

interface SidebarProps {
  open: boolean;
  onToggle: () => void;
  currentPath?: string;
}

const DRAWER_WIDTH = 240;

const menuItems: MenuItem[] = [
  { id: 'dashboard', text: 'Dashboard', icon: <Dashboard />, path: '/' },
  { id: 'schedule', text: 'Agendar Posts', icon: <Schedule />, path: '/schedule' },
  { id: 'monitoring', text: 'Monitoramento', icon: <Notifications />, path: '/monitoring' },
  { id: 'analytics', text: 'Analytics', icon: <Analytics />, path: '/analytics' },
  { id: 'audience', text: 'Audiência', icon: <People />, path: '/audience' },
  { id: 'reports', text: 'Relatórios', icon: <Assessment />, path: '/reports' },
  { id: 'settings', text: 'Configurações', icon: <Settings />, path: '/settings' },
];

const Sidebar: React.FC<SidebarProps> = ({ open, onToggle, currentPath = '/' }) => {
  const theme = useTheme();

  return (
    <>
      {/* Botão de toggle quando sidebar está fechada */}
      {!open && (
        <IconButton
          onClick={onToggle}
          sx={{
            position: 'fixed',
            left: '20px',
            top: '20px',
            zIndex: theme.zIndex.drawer + 2,
            bgcolor: 'background.paper',
            '&:hover': {
              bgcolor: 'action.hover',
            },
          }}
        >
          <MenuIcon />
        </IconButton>
      )}

      <Box 
        component="nav" 
        sx={{ 
          width: open ? DRAWER_WIDTH : 0, 
          flexShrink: 0,
          transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
          }),
        }}
      >
        <Drawer
          variant="persistent"
          anchor="left"
          open={open}
          sx={{
            width: DRAWER_WIDTH,
            '& .MuiDrawer-paper': {
              width: DRAWER_WIDTH,
              boxSizing: 'border-box',
              backgroundColor: 'background.paper',
              borderRight: `1px solid ${theme.palette.divider}`,
            },
          }}
        >
          {/* Header da Sidebar */}
          <Box sx={{ 
            height: 64, 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'space-between',
            px: 2,
            borderBottom: `1px solid ${theme.palette.divider}`
          }}>
            <Typography variant="h6" component="div">
              Social Media
            </Typography>
            <IconButton onClick={onToggle}>
              <CloseIcon />
            </IconButton>
          </Box>

          {/* Lista de Menu */}
          <List sx={{ mt: 1 }}>
            {menuItems.map((item) => (
              <ListItem key={item.id} disablePadding>
                <ListItemButton
                  selected={currentPath === item.path}
                  sx={{
                    '&.Mui-selected': {
                      bgcolor: 'action.selected',
                      '&:hover': {
                        bgcolor: 'action.selected',
                      },
                    },
                    '&:hover': {
                      bgcolor: 'action.hover',
                    },
                  }}
                >
                  <ListItemIcon sx={{ 
                    color: currentPath === item.path ? 'primary.main' : 'inherit',
                    minWidth: 40,
                  }}>
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText 
                    primary={item.text}
                    primaryTypographyProps={{
                      sx: { 
                        color: currentPath === item.path ? 'primary.main' : 'inherit',
                      }
                    }}
                  />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Drawer>
      </Box>
    </>
  );
};

export default Sidebar;