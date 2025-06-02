import React, { useState } from 'react';
import { 
  AppBar, 
  Toolbar, 
  Typography, 
  IconButton, 
  Box, 
  Badge,
  Menu,
  MenuItem,
  Divider,
  Avatar,
  ListItemIcon,
  useTheme
} from '@mui/material';
import { 
  Notifications, 
  Settings,
  Logout,
  Person,
  Menu as MenuIcon,
} from '@mui/icons-material';

interface HeaderProps {
  sidebarOpen: boolean;
  userName?: string;
  pageTitle?: string;
  notificationsCount?: number;
  onSidebarToggle: () => void; // Nova prop adicionada
  onLogout?: () => void;
  onProfileClick?: () => void;
  onSettingsClick?: () => void;
}

const Header: React.FC<HeaderProps> = ({ 
  sidebarOpen,
  userName = 'Usuário',
  pageTitle = 'Dashboard',
  notificationsCount = 0,
  onSidebarToggle,
  onLogout,
  onProfileClick,
  onSettingsClick,
}) => {
  const theme = useTheme();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [notificationAnchor, setNotificationAnchor] = useState<null | HTMLElement>(null);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleNotificationOpen = (event: React.MouseEvent<HTMLElement>) => {
    setNotificationAnchor(event.currentTarget);
  };

  const handleNotificationClose = () => {
    setNotificationAnchor(null);
  };

  return (
    <AppBar 
      position="sticky" 
      sx={{ 
        backgroundColor: 'background.paper',
        boxShadow: 1,
        zIndex: theme.zIndex.drawer + 1,
      }}
    >
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <IconButton
            color="inherit"
            aria-label="toggle sidebar"
            onClick={onSidebarToggle}
            edge="start"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div">
            {pageTitle}
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          {/* Notificações */}
          <IconButton 
            color="inherit"
            onClick={handleNotificationOpen}
          >
            <Badge badgeContent={notificationsCount} color="error">
              <Notifications />
            </Badge>
          </IconButton>

          {/* Menu do Usuário */}
          <Box sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }} onClick={handleMenuOpen}>
            <Avatar 
              sx={{ 
                width: 32, 
                height: 32,
                bgcolor: 'primary.main',
                fontSize: '1rem',
                mr: 1
              }}
            >
              {userName.charAt(0).toUpperCase()}
            </Avatar>
            <Typography variant="body2" sx={{ mr: 1 }}>
              {userName}
            </Typography>
          </Box>
        </Box>

        {/* Menu de Notificações */}
        <Menu
          anchorEl={notificationAnchor}
          open={Boolean(notificationAnchor)}
          onClose={handleNotificationClose}
          PaperProps={{
            sx: {
              width: 320,
              maxHeight: 400,
            }
          }}
        >
          <Box sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Notificações
            </Typography>
            {notificationsCount === 0 ? (
              <Typography variant="body2" color="text.secondary">
                Não há novas notificações
              </Typography>
            ) : (
              <Typography variant="body2">
                Implementar lista de notificações
              </Typography>
            )}
          </Box>
        </Menu>

        {/* Menu do Usuário */}
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
          PaperProps={{
            sx: { 
              width: 220,
              mt: 1
            }
          }}
        >
          <MenuItem onClick={onProfileClick}>
            <ListItemIcon>
              <Person fontSize="small" />
            </ListItemIcon>
            Perfil
          </MenuItem>
          <MenuItem onClick={onSettingsClick}>
            <ListItemIcon>
              <Settings fontSize="small" />
            </ListItemIcon>
            Configurações
          </MenuItem>
          <Divider />
          <MenuItem onClick={onLogout} sx={{ color: 'error.main' }}>
            <ListItemIcon>
              <Logout fontSize="small" sx={{ color: 'error.main' }} />
            </ListItemIcon>
            Sair
          </MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
};

export default Header;