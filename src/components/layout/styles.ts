import { Theme, alpha } from '@mui/material';
import { getGradient } from '../../utils/theme';

// Constantes compartilhadas
export const DRAWER_WIDTH = 280;
export const HEADER_HEIGHT = 70;
export const BREADCRUMBS_HEIGHT = 56;
export const TRANSITION_DURATION = {
  fast: 150,
  normal: 225,
  slow: 300,
};

// Estilos do Header
export const getHeaderStyles = (theme: Theme) => ({
  appBar: {
    backgroundColor: theme.palette.mode === 'dark' 
      ? alpha(theme.palette.background.paper, 0.95) 
      : alpha(theme.palette.background.paper, 0.97),
    backdropFilter: 'blur(10px)',
    boxShadow: 'none',
    borderBottom: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
    zIndex: theme.zIndex.drawer + 1,
    '& .MuiToolbar-root': {
      height: HEADER_HEIGHT,
      minHeight: HEADER_HEIGHT,
      padding: theme.spacing(0, 3),
    },
  },
  headerTitle: {
    fontWeight: 700,
    fontSize: '1.25rem',
    background: getGradient(theme.palette.primary.main, { start: 1, end: 0.6 }),
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    letterSpacing: '-0.5px',
    marginBottom: '2px',
  },
  menuButton: {
    marginRight: theme.spacing(2),
    color: theme.palette.text.primary,
    transition: `all 200ms cubic-bezier(0.4, 0, 0.2, 1)`,
    '&:hover': {
      backgroundColor: alpha(theme.palette.primary.main, 0.1),
      transform: 'scale(1.05)',
    },
  },
  userAvatar: {
    width: 36,
    height: 36,
    marginRight: theme.spacing(1),
    background: getGradient(theme.palette.primary.main),
    boxShadow: `0 2px 8px ${alpha(theme.palette.primary.main, 0.25)}`,
    fontSize: '0.95rem',
    fontWeight: 600,
  },
  userName: {
    marginRight: theme.spacing(0.5),
    fontWeight: 500,
    fontSize: '0.9rem',
  },
  actionButton: {
    color: theme.palette.text.primary,
    backgroundColor: alpha(theme.palette.background.paper, 0.7),
    border: `1px solid ${alpha(theme.palette.divider, 0.08)}`,
    borderRadius: '8px',
    transition: `all 200ms cubic-bezier(0.4, 0, 0.2, 1)`,
    '&:hover': {
      backgroundColor: alpha(theme.palette.primary.main, 0.1),
      transform: 'translateY(-2px)',
    },
  },
  notificationsBadge: {
    '& .MuiBadge-badge': {
      background: getGradient(theme.palette.error.main),
      color: '#fff',
      fontWeight: 600,
      minWidth: 18,
      height: 18,
      padding: '0 5px',
      fontSize: '0.7rem',
    },
  },
  menuPaper: {
    width: 320,
    maxHeight: 400,
    marginTop: theme.spacing(1),
    background: theme.palette.background.paper,
    backdropFilter: 'blur(10px)',
    border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
    boxShadow: `0 10px 30px ${alpha(theme.palette.common.black, 0.15)}`,
    borderRadius: '12px',
    overflow: 'hidden',
  },
  userMenuPaper: {
    width: 220,
    marginTop: theme.spacing(1),
    background: theme.palette.background.paper,
    backdropFilter: 'blur(10px)',
    border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
    boxShadow: `0 10px 30px ${alpha(theme.palette.common.black, 0.15)}`,
    borderRadius: '12px',
    overflow: 'hidden',
  },
  menuItem: {
    padding: theme.spacing(1.5, 2),
    borderRadius: '8px',
    margin: theme.spacing(0.5),
    transition: `all 200ms cubic-bezier(0.4, 0, 0.2, 1)`,
    '&:hover': {
      backgroundColor: alpha(theme.palette.primary.main, 0.08),
      transform: 'translateX(2px)',
    },
  },
  menuItemDanger: {
    color: theme.palette.error.main,
    '&:hover': {
      backgroundColor: alpha(theme.palette.error.main, 0.08),
    },
  },
  notificationHeader: {
    padding: theme.spacing(2),
    borderBottom: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
  },
  notificationContent: {
    padding: theme.spacing(2),
  },
  divider: {
    margin: theme.spacing(1, 0),
    borderColor: alpha(theme.palette.divider, 0.1),
  },
});

// Estilos do MainLayout
export const getMainLayoutStyles = (theme: Theme, sidebarOpen: boolean) => ({
  loadingBar: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: theme.zIndex.drawer + 2,
    height: 3,
    '& .MuiLinearProgress-bar': {
      background: getGradient(theme.palette.primary.main),
    },
  },
  breadcrumbsContainer: {
    padding: theme.spacing(0, 3),
    height: BREADCRUMBS_HEIGHT,
    display: 'flex',
    alignItems: 'center',
    backgroundColor: theme.palette.mode === 'dark' 
      ? alpha(theme.palette.background.default, 0.6)
      : alpha(theme.palette.background.default, 0.8),
    borderBottom: `1px solid ${alpha(theme.palette.divider, 0.06)}`,
  },
  breadcrumbLink: {
    color: alpha(theme.palette.text.secondary, 0.8),
    fontSize: '0.875rem',
    fontWeight: 500,
    transition: 'all 200ms ease',
    '&:hover': {
      color: theme.palette.primary.main,
    },
  },
});

// Estilos do Sidebar
export const getSidebarStyles = (theme: Theme) => ({
  nav: (open: boolean) => ({
    flexShrink: 0,
  }),
  drawer: {
    width: DRAWER_WIDTH,
    flexShrink: 0,
    '& .MuiDrawer-paper': {
      width: DRAWER_WIDTH,
      boxSizing: 'border-box',
      backgroundColor: theme.palette.background.paper,
      borderRight: `1px solid ${alpha(theme.palette.divider, 0.08)}`,
      boxShadow: `1px 0 5px ${alpha(theme.palette.common.black, 0.03)}`,
    },
  },
  toggleButton: {
    position: 'fixed',
    left: '20px',
    top: '20px',
    zIndex: theme.zIndex.drawer + 2,
    backgroundColor: theme.palette.background.paper,
    color: theme.palette.primary.main,
    boxShadow: `0 2px 10px ${alpha(theme.palette.common.black, 0.1)}`,
    border: `1px solid ${alpha(theme.palette.divider, 0.08)}`,
    transition: 'all 200ms ease',
    '&:hover': {
      backgroundColor: alpha(theme.palette.primary.main, 0.08),
      transform: 'scale(1.05)',
    },
  },
  header: {
    height: HEADER_HEIGHT,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: theme.spacing(0, 3),
    borderBottom: `1px solid ${alpha(theme.palette.divider, 0.08)}`,
  },
  logo: {
    fontWeight: 800,
    fontSize: '1.5rem',
    background: getGradient(theme.palette.primary.main, { start: 1, end: 0.6 }),
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    letterSpacing: '-0.5px',
  },
  closeButton: {
    color: theme.palette.text.secondary,
    borderRadius: '8px',
    transition: 'all 200ms ease',
    '&:hover': {
      backgroundColor: alpha(theme.palette.primary.main, 0.1),
      color: theme.palette.primary.main,
      transform: 'rotate(90deg)',
    },
  },
  menuList: {
    marginTop: theme.spacing(2),
    padding: theme.spacing(0, 2),
  },
  menuItem: (isSelected: boolean) => ({
    marginBottom: theme.spacing(0.5),
    padding: theme.spacing(1, 2),
    borderRadius: '10px',
    color: isSelected ? theme.palette.primary.main : theme.palette.text.secondary,
    transition: 'all 200ms ease',
    position: 'relative',
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
        background: getGradient(theme.palette.primary.main),
      },
      '&:hover': {
        backgroundColor: alpha(theme.palette.primary.main, 0.12),
      },
    },
    '&:hover': {
      backgroundColor: alpha(theme.palette.primary.main, 0.05),
      color: theme.palette.primary.main,
      transform: 'translateX(4px)',
    },
  }),
  menuIcon: (isSelected: boolean) => ({
    color: 'inherit',
    minWidth: 40,
    '& svg': {
      fontSize: 22,
      transition: 'transform 200ms ease',
      transform: isSelected ? 'scale(1.1)' : 'scale(1)',
    },
  }),
  menuText: {
    '& .MuiTypography-root': {
      fontSize: '0.95rem',
      fontWeight: 500,
    },
  },
  menuSection: {
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(1),
    padding: theme.spacing(0, 3),
    '& .MuiTypography-root': {
      fontSize: '0.75rem',
      fontWeight: 700,
      textTransform: 'uppercase',
      letterSpacing: '0.5px',
      color: alpha(theme.palette.text.secondary, 0.7),
    },
  },
});