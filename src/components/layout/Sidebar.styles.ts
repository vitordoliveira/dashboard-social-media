import { Theme, alpha } from '@mui/material';
import { getGradient } from '../../utils/theme';

export const DRAWER_WIDTH = 280;

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