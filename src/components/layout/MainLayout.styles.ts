import { Theme } from '@mui/material';
import { getGradient } from '../../utils/theme';

export const DRAWER_WIDTH = 280;
export const HEADER_HEIGHT = 70;
export const BREADCRUMBS_HEIGHT = 56;

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