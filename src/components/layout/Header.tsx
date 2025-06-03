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
  useTheme,
  Tooltip
} from '@mui/material';
import { 
  Notifications, 
  Settings,
  Logout,
  Person,
  Menu as MenuIcon,
  KeyboardArrowDown,
} from '@mui/icons-material';
import { getHeaderStyles } from './styles';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

interface HeaderProps {
  sidebarOpen: boolean;
  userName?: string;
  pageTitle?: string;
  notificationsCount?: number;
  onSidebarToggle: () => void;
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
  onLogout = () => {},
  onProfileClick = () => {},
  onSettingsClick = () => {},
}) => {
  const theme = useTheme();
  const styles = getHeaderStyles(theme);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [notificationAnchor, setNotificationAnchor] = useState<null | HTMLElement>(null);

  const currentDate = format(new Date(), "EEEE, d 'de' MMMM", { locale: ptBR });

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

  // Handlers combinados com fechamento de menu
  const handleProfileClick = () => {
    onProfileClick();
    handleMenuClose();
  };

  const handleSettingsClick = () => {
    onSettingsClick();
    handleMenuClose();
  };

  const handleLogout = () => {
    onLogout();
    handleMenuClose();
  };

  return (
    <AppBar position="sticky" elevation={0} sx={styles.appBar}>
      <Toolbar>
        {/* Left side - Menu button and Title */}
        <Box sx={{ display: 'flex', alignItems: 'center', flex: 1 }}>
          <IconButton
            onClick={onSidebarToggle}
            edge="start"
            sx={styles.menuButton}
            aria-label="toggle sidebar"
          >
            <MenuIcon />
          </IconButton>
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <Typography variant="h6" sx={styles.headerTitle}>
              {pageTitle}
            </Typography>
            <Typography 
              variant="caption" 
              color="text.secondary"
              sx={{ fontWeight: 500 }}
            >
              {currentDate}
            </Typography>
          </Box>
        </Box>

        {/* Right side - Actions and user */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Tooltip title="Notificações">
            <IconButton 
              sx={styles.actionButton}
              onClick={handleNotificationOpen}
              aria-label="notifications"
            >
              <Badge 
                badgeContent={notificationsCount} 
                sx={styles.notificationsBadge}
              >
                <Notifications />
              </Badge>
            </IconButton>
          </Tooltip>

          <Box 
            sx={{ 
              display: 'flex', 
              alignItems: 'center', 
              cursor: 'pointer',
              padding: '4px 8px',
              borderRadius: '24px',
              transition: 'all 0.2s ease',
              '&:hover': {
                bgcolor: 'rgba(255, 255, 255, 0.1)'
              }
            }} 
            onClick={handleMenuOpen}
          >
            <Avatar sx={styles.userAvatar}>
              {userName.charAt(0).toUpperCase()}
            </Avatar>
            <Typography variant="body2" sx={styles.userName}>
              {userName}
            </Typography>
            <KeyboardArrowDown 
              sx={{ 
                transform: Boolean(anchorEl) ? 'rotate(180deg)' : 'none',
                transition: 'transform 0.2s',
                color: 'text.secondary',
                fontSize: 20
              }} 
            />
          </Box>
        </Box>

        {/* Notification Menu */}
        <Menu
          anchorEl={notificationAnchor}
          open={Boolean(notificationAnchor)}
          onClose={handleNotificationClose}
          PaperProps={{ sx: styles.menuPaper }}
          transformOrigin={{ vertical: 'top', horizontal: 'right' }}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        >
          <Box sx={styles.notificationHeader}>
            <Typography variant="subtitle1" fontWeight="600">
              Notificações
            </Typography>
          </Box>
          <Box sx={styles.notificationContent}>
            {notificationsCount === 0 ? (
              <Typography variant="body2" color="text.secondary" align="center">
                Não há novas notificações
              </Typography>
            ) : (
              <Typography variant="body2" align="center">
                Implementar lista de notificações
              </Typography>
            )}
          </Box>
        </Menu>

        {/* User Menu */}
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
          PaperProps={{ sx: styles.userMenuPaper }}
          transformOrigin={{ vertical: 'top', horizontal: 'right' }}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        >
          <MenuItem onClick={handleProfileClick} sx={styles.menuItem}>
            <ListItemIcon>
              <Person fontSize="small" />
            </ListItemIcon>
            <Typography variant="body2">Perfil</Typography>
          </MenuItem>
          <MenuItem onClick={handleSettingsClick} sx={styles.menuItem}>
            <ListItemIcon>
              <Settings fontSize="small" />
            </ListItemIcon>
            <Typography variant="body2">Configurações</Typography>
          </MenuItem>
          <Divider sx={styles.divider} />
          <MenuItem 
            onClick={handleLogout} 
            sx={{ ...styles.menuItem, ...styles.menuItemDanger }}
          >
            <ListItemIcon>
              <Logout fontSize="small" color="error" />
            </ListItemIcon>
            <Typography variant="body2">Sair</Typography>
          </MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
};

export default Header;