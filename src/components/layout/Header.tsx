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
  ChevronRight,
} from '@mui/icons-material';
import { getHeaderStyles } from './Header.styles';
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
  onLogout,
  onProfileClick,
  onSettingsClick,
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

  return (
    <AppBar position="sticky" sx={styles.appBar}>
      <Toolbar>
        <Box sx={{ display: 'flex', alignItems: 'center', flex: 1 }}>
          <IconButton
            onClick={onSidebarToggle}
            edge="start"
            sx={styles.menuButton}
          >
            <MenuIcon />
          </IconButton>
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <Typography variant="h6" sx={styles.headerTitle}>
              {pageTitle}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              {currentDate}
            </Typography>
          </Box>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <IconButton 
            sx={styles.actionButton}
            onClick={handleNotificationOpen}
          >
            <Badge 
              badgeContent={notificationsCount} 
              sx={styles.notificationsBadge}
            >
              <Notifications />
            </Badge>
          </IconButton>

          <Box 
            sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }} 
            onClick={handleMenuOpen}
          >
            <Avatar sx={styles.userAvatar}>
              {userName.charAt(0).toUpperCase()}
            </Avatar>
            <Typography variant="body2" sx={styles.userName}>
              {userName}
            </Typography>
            <ChevronRight 
              sx={{ 
                transform: Boolean(anchorEl) ? 'rotate(90deg)' : 'none',
                transition: 'transform 0.2s',
                color: 'text.secondary',
              }} 
            />
          </Box>
        </Box>

        {/* Menu de Notificações */}
        <Menu
          anchorEl={notificationAnchor}
          open={Boolean(notificationAnchor)}
          onClose={handleNotificationClose}
          PaperProps={{ sx: styles.menuPaper }}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
          transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        >
          <Box sx={styles.notificationHeader}>
            <Typography variant="subtitle1" fontWeight="medium">
              Notificações
            </Typography>
          </Box>
          <Box sx={styles.notificationContent}>
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
          PaperProps={{ sx: styles.userMenuPaper }}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
          transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        >
          <MenuItem onClick={onProfileClick} sx={styles.menuItem}>
            <ListItemIcon>
              <Person fontSize="small" />
            </ListItemIcon>
            <Typography variant="body2">Perfil</Typography>
          </MenuItem>
          <MenuItem onClick={onSettingsClick} sx={styles.menuItem}>
            <ListItemIcon>
              <Settings fontSize="small" />
            </ListItemIcon>
            <Typography variant="body2">Configurações</Typography>
          </MenuItem>
          <Divider sx={styles.divider} />
          <MenuItem 
            onClick={onLogout} 
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