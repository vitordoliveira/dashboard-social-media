import { Theme, alpha } from '@mui/material';
import { getGradient } from '../../utils/theme';

export const HEADER_HEIGHT = 70;

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