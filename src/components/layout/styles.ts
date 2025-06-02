import { Theme, alpha } from '@mui/material';
import { getGradient } from '../../utils/theme';

// Constantes compartilhadas
export const DRAWER_WIDTH = 280;
export const HEADER_HEIGHT = 70;
export const BREADCRUMBS_HEIGHT = 56;

// Estilos do Header
export const getHeaderStyles = (theme: Theme) => ({
  appBar: {
    backgroundColor: alpha(theme.palette.background.paper, 0.98),
    backdropFilter: 'blur(8px)',
    boxShadow: 'none',
    borderBottom: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
    zIndex: theme.zIndex.drawer + 1,
    height: HEADER_HEIGHT,
    '& .MuiToolbar-root': {
      height: HEADER_HEIGHT,
      minHeight: HEADER_HEIGHT,
    },
  },
  headerTitle: {
    fontWeight: 600,
    fontSize: '1.25rem',
    background: getGradient(theme.palette.primary.main, { start: 1, end: 0.6 }),
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
  },
  menuButton: {
    marginRight: theme.spacing(2),
    color: theme.palette.text.primary,
  },
  userAvatar: {
    width: 38,
    height: 38,
    marginRight: theme.spacing(1),
    background: getGradient(theme.palette.primary.main),
    fontSize: '1rem',
    fontWeight: 600,
    cursor: 'pointer',
    transition: 'transform 0.2s',
    '&:hover': {
      transform: 'scale(1.05)',
    },
  },
  userName: {
    marginRight: theme.spacing(1),
    fontWeight: 500,
  },
  actionButton: {
    color: theme.palette.text.primary,
    '&:hover': {
      background: alpha(theme.palette.primary.main, 0.1),
    },
  },
  notificationsBadge: {
    '& .MuiBadge-badge': {
      background: getGradient(theme.palette.error.main),
      color: theme.palette.error.contrastText,
    },
  },
  menuPaper: {
    width: 320,
    maxHeight: 400,
    marginTop: theme.spacing(1.5),
    background: alpha(theme.palette.background.paper, 0.98),
    backdropFilter: 'blur(8px)',
    border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
    boxShadow: `0 4px 20px ${alpha(theme.palette.common.black, 0.1)}`,
  },
  userMenuPaper: {
    width: 220,
    marginTop: theme.spacing(1.5),
    background: alpha(theme.palette.background.paper, 0.98),
    backdropFilter: 'blur(8px)',
    border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
    boxShadow: `0 4px 20px ${alpha(theme.palette.common.black, 0.1)}`,
  },
  menuItem: {
    padding: theme.spacing(1.5, 2),
    gap: theme.spacing(1.5),
    borderRadius: theme.shape.borderRadius,
    margin: theme.spacing(0.5),
    width: 'calc(100% - 16px)',
    '&:hover': {
      background: alpha(theme.palette.primary.main, 0.1),
    },
  },
  menuItemDanger: {
    color: theme.palette.error.main,
    '&:hover': {
      background: alpha(theme.palette.error.main, 0.1),
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
  root: {
    display: 'flex',
    minHeight: '100vh',
    background: theme.palette.background.default,
  },
  main: {
    flexGrow: 1,
    ml: { md: sidebarOpen ? `${DRAWER_WIDTH}px` : 0 },
    width: { md: `calc(100% - ${sidebarOpen ? DRAWER_WIDTH : 0}px)` },
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  loadingBar: {
    position: 'fixed',
    top: HEADER_HEIGHT,
    left: 0,
    right: 0,
    zIndex: theme.zIndex.drawer + 1,
    '& .MuiLinearProgress-bar': {
      background: getGradient(theme.palette.primary.main),
    },
  },
  breadcrumbsContainer: {
    px: 3,
    py: 2,
    height: BREADCRUMBS_HEIGHT,
    bgcolor: theme.palette.background.paper,
    borderBottom: 1,
    borderColor: 'divider',
    display: 'flex',
    alignItems: 'center',
    backdropFilter: 'blur(10px)',
    background: `linear-gradient(to right, 
      ${theme.palette.background.paper} 0%,
      ${theme.palette.background.paper}CC 100%
    )`,
  },
  breadcrumbLink: {
    display: 'flex',
    alignItems: 'center',
    color: theme.palette.text.secondary,
    textDecoration: 'none',
    '&:hover': {
      color: theme.palette.primary.main,
      textDecoration: 'none',
    },
  },
  content: {
    p: 3,
    minHeight: `calc(100vh - ${HEADER_HEIGHT + BREADCRUMBS_HEIGHT}px)`,
    bgcolor: 'background.default',
  },
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    bgcolor: 'rgba(0,0,0,0.5)',
    zIndex: theme.zIndex.drawer - 1,
    backdropFilter: 'blur(4px)',
  },
});

// Estilos do Sidebar
export const getSidebarStyles = (theme: Theme) => ({
  nav: (open: boolean) => ({
    width: open ? DRAWER_WIDTH : 0,
    flexShrink: 0,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
  drawer: {
    width: DRAWER_WIDTH,
    '& .MuiDrawer-paper': {
      width: DRAWER_WIDTH,
      boxSizing: 'border-box',
      backgroundColor: alpha(theme.palette.background.paper, 0.98),
      backdropFilter: 'blur(8px)',
      borderRight: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
    },
  },
  toggleButton: {
    position: 'fixed',
    left: '20px',
    top: '20px',
    zIndex: theme.zIndex.drawer + 2,
    bgcolor: alpha(theme.palette.background.paper, 0.98),
    backdropFilter: 'blur(8px)',
    border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
    '&:hover': {
      bgcolor: alpha(theme.palette.primary.main, 0.1),
    },
  },
  header: {
    height: 70,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    px: 3,
    borderBottom: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
  },
  logo: {
    fontWeight: 700,
    fontSize: '1.5rem',
    background: getGradient(theme.palette.primary.main, { start: 1, end: 0.6 }),
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    letterSpacing: '-0.5px',
  },
  closeButton: {
    color: theme.palette.text.secondary,
    '&:hover': {
      bgcolor: alpha(theme.palette.primary.main, 0.1),
      color: theme.palette.primary.main,
    },
  },
  menuList: {
    mt: 2,
    px: 2,
  },
  menuItem: (isSelected: boolean) => ({
    mb: 0.5,
    borderRadius: `${theme.shape.borderRadius}px`,
    color: isSelected ? theme.palette.primary.main : theme.palette.text.secondary,
    '&.Mui-selected': {
      bgcolor: alpha(theme.palette.primary.main, 0.1),
      '&:hover': {
        bgcolor: alpha(theme.palette.primary.main, 0.15),
      },
    },
    '&:hover': {
      bgcolor: alpha(theme.palette.primary.main, 0.08),
      color: theme.palette.primary.main,
    },
  }),
  menuIcon: (isSelected: boolean) => ({
    color: 'inherit',
    minWidth: 40,
    '& svg': {
      fontSize: 22,
      transition: 'transform 0.2s',
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
    mt: 4,
    px: 3,
    mb: 1,
    '& .MuiTypography-root': {
      fontSize: '0.75rem',
      fontWeight: 700,
      textTransform: 'uppercase',
      letterSpacing: '0.5px',
      color: theme.palette.text.secondary,
    },
  },
});