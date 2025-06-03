import React, { useState } from 'react';
import { 
  Paper, 
  Typography, 
  List, 
  ListItem, 
  ListItemText, 
  ListItemAvatar, 
  Avatar,
  Box,
  Chip,
  IconButton,
  Tooltip,
  useTheme,
  alpha,
  Divider,
  Menu,
  MenuItem,
  Button,
  useMediaQuery
} from '@mui/material';
import { 
  Facebook, 
  Twitter, 
  Instagram, 
  LinkedIn,
  OpenInNew,
  Timeline,
  Share,
  Favorite,
  Comment,
  MoreVert,
  ShowChart,
  ContentCopy,
  Link as LinkIcon,
  FilterList
} from '@mui/icons-material';
import { formatNumber } from '../../utils/formatters';
import { socialColors } from '../../theme/constants/colors';

interface Post {
  id: string;
  network: 'facebook' | 'twitter' | 'instagram' | 'linkedin';
  content: string;
  engagement: number;
  timestamp: string;
  likes?: number;
  comments?: number;
  shares?: number;
  url?: string;
}

interface TopPostsProps {
  posts: Post[];
  title?: string;
  maxPosts?: number;
  onViewAll?: () => void;
  isLoading?: boolean;
}

const networkConfigs = {
  facebook: {
    icon: Facebook,
    color: socialColors.facebook,
    label: 'Facebook'
  },
  twitter: {
    icon: Twitter,
    color: socialColors.twitter,
    label: 'Twitter'
  },
  instagram: {
    icon: Instagram,
    color: socialColors.instagram,
    label: 'Instagram'
  },
  linkedin: {
    icon: LinkedIn,
    color: socialColors.linkedin,
    label: 'LinkedIn'
  }
};

const TopPosts: React.FC<TopPostsProps> = ({ 
  posts, 
  title = "Melhores Posts", 
  maxPosts = 5,
  onViewAll,
  isLoading = false
}) => {
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === 'dark';
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [currentPostId, setCurrentPostId] = useState<string | null>(null);
  
  const handleOpenMenu = (event: React.MouseEvent<HTMLElement>, postId: string) => {
    setAnchorEl(event.currentTarget);
    setCurrentPostId(postId);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
    setCurrentPostId(null);
  };

  const getTimeAgo = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);
    
    const intervals = {
      ano: 31536000,
      mês: 2592000,
      semana: 604800,
      dia: 86400,
      hora: 3600,
      minuto: 60
    };

    for (const [unit, secondsInUnit] of Object.entries(intervals)) {
      const interval = Math.floor(seconds / secondsInUnit);
      if (interval > 1) {
        return `${interval} ${unit}s atrás`;
      }
      if (interval === 1) {
        return `${interval} ${unit} atrás`;
      }
    }
    
    return 'agora';
  };

  const visiblePosts = posts.slice(0, maxPosts);

  // Função simulada para lidar com ações no menu
  const handleMenuAction = (action: string) => {
    console.log(`Action "${action}" on post ID: ${currentPostId}`);
    handleCloseMenu();
  };

  if (isLoading) {
    return (
      <Paper 
        elevation={isDarkMode ? 0 : 1}
        sx={{ 
          height: 825, // Altura fixa para corresponder aos dois gráficos
          bgcolor: theme.palette.background.paper,
          borderRadius: 2,
          border: isDarkMode ? `1px solid ${alpha(theme.palette.divider, 0.1)}` : 'none',
          overflow: 'hidden',
          p: 3
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
          <Box sx={{ width: '50%', height: 30, bgcolor: alpha(theme.palette.divider, 0.1), borderRadius: 1 }} />
          <Box sx={{ width: 35, height: 35, borderRadius: '50%', bgcolor: alpha(theme.palette.divider, 0.1) }} />
        </Box>
        
        {[...Array(3)].map((_, index) => (
          <React.Fragment key={index}>
            <Box sx={{ p: 2, mb: 1 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Box sx={{ width: 40, height: 40, borderRadius: '50%', bgcolor: alpha(theme.palette.divider, 0.1), mr: 2 }} />
                <Box sx={{ width: '30%', height: 20, bgcolor: alpha(theme.palette.divider, 0.1) }} />
                <Box sx={{ ml: 'auto', width: '20%', height: 20, bgcolor: alpha(theme.palette.divider, 0.1) }} />
              </Box>
              <Box sx={{ width: '100%', height: 60, bgcolor: alpha(theme.palette.divider, 0.1), borderRadius: 1, mb: 2 }} />
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Box sx={{ width: '60%', height: 20, display: 'flex', gap: 2 }}>
                  {[...Array(3)].map((_, i) => (
                    <Box key={i} sx={{ width: '30%', height: 20, bgcolor: alpha(theme.palette.divider, 0.1), borderRadius: 1 }} />
                  ))}
                </Box>
                <Box sx={{ width: '20%', height: 20, bgcolor: alpha(theme.palette.divider, 0.1), borderRadius: 1 }} />
              </Box>
            </Box>
            <Divider sx={{ opacity: 0.1, my: 1 }} />
          </React.Fragment>
        ))}
      </Paper>
    );
  }

  return (
    <Paper 
      elevation={isDarkMode ? 0 : 1}
      sx={{ 
        height: 825, // Altura fixa para corresponder aos dois gráficos
        display: 'flex',
        flexDirection: 'column',
        bgcolor: theme.palette.background.paper,
        borderRadius: 2,
        border: isDarkMode ? `1px solid ${alpha(theme.palette.divider, 0.1)}` : 'none',
        position: 'relative',
        overflow: 'hidden', // Impede overflow
        transition: 'all 0.3s ease',
        '&:hover': {
          boxShadow: isDarkMode ? `0 4px 20px ${alpha('#000', 0.1)}` : theme.shadows[3],
        },
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '4px',
          background: `linear-gradient(90deg, 
            ${theme.palette.primary.main} 0%, 
            ${theme.palette.primary.light} 100%)`,
          opacity: 0.8
        }
      }}
    >
      {/* Cabeçalho - altura fixa */}
      <Box 
        sx={{ 
          p: 3,
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'space-between',
          mb: 1
        }}
      >
        <Typography 
          variant="h6" 
          sx={{ 
            fontWeight: 600,
            display: 'flex',
            alignItems: 'center',
            gap: 1,
            color: theme.palette.text.primary
          }}
        >
          <ShowChart sx={{ 
            color: theme.palette.primary.main,
            fontSize: '1.25rem'
          }} />
          {title}
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Tooltip title="Filtrar posts" arrow placement="top">
            <IconButton 
              size="small"
              sx={{ 
                color: theme.palette.text.secondary,
                '&:hover': {
                  color: theme.palette.primary.main,
                  bgcolor: alpha(theme.palette.primary.main, 0.08)
                }
              }}
            >
              <FilterList fontSize="small" />
            </IconButton>
          </Tooltip>
          
          <Tooltip title="Ver todos os posts" arrow placement="top">
            <IconButton 
              size="small" 
              onClick={onViewAll}
              sx={{ 
                color: theme.palette.text.secondary,
                '&:hover': {
                  color: theme.palette.primary.main,
                  bgcolor: alpha(theme.palette.primary.main, 0.08)
                }
              }}
            >
              <OpenInNew fontSize="small" />
            </IconButton>
          </Tooltip>
        </Box>
      </Box>

      {/* Conteúdo principal que pode precisar de scrolling */}
      <Box 
        sx={{ 
          px: 3, 
          pb: 3,
          flexGrow: 1, 
          overflow: 'auto',
          maxHeight: 'calc(825px - 80px)', // Altura total menos o cabeçalho e margens
          '&::-webkit-scrollbar': {
            width: '8px',
            backgroundColor: 'transparent',
          },
          '&::-webkit-scrollbar-track': {
            backgroundColor: 'transparent',
          },
          '&::-webkit-scrollbar-thumb': {
            backgroundColor: alpha(theme.palette.primary.main, 0.2),
            borderRadius: '4px',
          },
          '&:hover::-webkit-scrollbar-thumb': {
            backgroundColor: alpha(theme.palette.primary.main, 0.3),
          },
          scrollbarWidth: 'thin',
          scrollbarColor: `${alpha(theme.palette.primary.main, 0.2)} transparent`
        }} 
      >
        {visiblePosts.map((post, index) => {
          const NetworkIcon = networkConfigs[post.network].icon;
          const networkColor = networkConfigs[post.network].color;

          return (
            <React.Fragment key={post.id}>
              <ListItem 
                disableGutters
                sx={{
                  p: 2,
                  borderRadius: 2,
                  transition: 'all 0.25s ease',
                  '&:hover': {
                    backgroundColor: isDarkMode 
                      ? alpha(theme.palette.action.hover, 0.1) 
                      : alpha(theme.palette.action.hover, 0.05),
                    transform: 'translateX(4px)'
                  },
                }}
              >
                <Box sx={{ width: '100%' }}>
                  {/* Header do Post */}
                  <Box 
                    sx={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      mb: 1.5,
                      gap: 1,
                      flexWrap: isMobile ? 'wrap' : 'nowrap'
                    }}
                  >
                    <ListItemAvatar sx={{ minWidth: 'auto', mr: 1 }}>
                      <Avatar 
                        sx={{ 
                          bgcolor: alpha(networkColor, isDarkMode ? 0.15 : 0.1),
                          color: networkColor,
                          width: 40,
                          height: 40,
                          boxShadow: `0 4px 8px ${alpha(networkColor, 0.2)}`
                        }}
                      >
                        <NetworkIcon />
                      </Avatar>
                    </ListItemAvatar>
                    <Typography 
                      variant="subtitle2" 
                      sx={{ 
                        color: networkColor,
                        fontWeight: 600,
                        fontSize: '0.9rem'
                      }}
                    >
                      {networkConfigs[post.network].label}
                    </Typography>
                    <Box 
                      sx={{ 
                        ml: 'auto',
                        display: 'flex',
                        alignItems: 'center',
                        gap: 1,
                        flexBasis: isMobile ? '100%' : 'auto',
                        mt: isMobile ? 1 : 0,
                        justifyContent: isMobile ? 'flex-end' : 'flex-start',
                        order: isMobile ? 3 : 0
                      }}
                    >
                      <Chip 
                        label={`#${index + 1}`}
                        size="small"
                        sx={{ 
                          bgcolor: alpha(theme.palette.primary.main, isDarkMode ? 0.15 : 0.08),
                          color: theme.palette.primary.main,
                          fontWeight: 600,
                          fontSize: '0.75rem',
                          height: 24,
                          borderRadius: '12px'
                        }}
                      />
                      <Typography 
                        variant="caption" 
                        sx={{ 
                          color: alpha(theme.palette.text.secondary, 0.7),
                          fontSize: '0.75rem',
                          fontWeight: 500
                        }}
                      >
                        {getTimeAgo(post.timestamp)}
                      </Typography>
                    </Box>
                  </Box>

                  {/* Conteúdo do Post */}
                  <Typography 
                    variant="body2" 
                    sx={{ 
                      mb: 2,
                      color: theme.palette.text.primary,
                      lineHeight: 1.6,
                      fontSize: '0.875rem',
                      overflow: 'hidden',
                      display: '-webkit-box',
                      WebkitLineClamp: 3,
                      WebkitBoxOrient: 'vertical',
                      textOverflow: 'ellipsis'
                    }}
                  >
                    {post.content}
                  </Typography>

                  {/* Footer do Post */}
                  <Box 
                    sx={{ 
                      display: 'flex',
                      alignItems: 'center',
                      gap: { xs: 1, md: 2 },
                      flexWrap: isMobile ? 'wrap' : 'nowrap'
                    }}
                  >
                    <Tooltip title="Curtidas" arrow placement="top">
                      <Box 
                        sx={{ 
                          display: 'flex',
                          alignItems: 'center',
                          gap: 0.5,
                          color: theme.palette.text.secondary,
                          '&:hover': {
                            color: theme.palette.error.main,
                          },
                          transition: 'color 0.2s ease',
                          cursor: 'pointer'
                        }}
                      >
                        <Favorite 
                          sx={{ 
                            fontSize: '0.9rem', 
                            color: alpha(theme.palette.error.main, 0.7)
                          }} 
                        />
                        <Typography variant="caption" sx={{ fontWeight: 500 }}>
                          {formatNumber(post.likes || 0)}
                        </Typography>
                      </Box>
                    </Tooltip>

                    <Tooltip title="Comentários" arrow placement="top">
                      <Box 
                        sx={{ 
                          display: 'flex',
                          alignItems: 'center',
                          gap: 0.5,
                          color: theme.palette.text.secondary,
                          '&:hover': {
                            color: theme.palette.info.main,
                          },
                          transition: 'color 0.2s ease',
                          cursor: 'pointer'
                        }}
                      >
                        <Comment sx={{ fontSize: '0.9rem' }} />
                        <Typography variant="caption" sx={{ fontWeight: 500 }}>
                          {formatNumber(post.comments || 0)}
                        </Typography>
                      </Box>
                    </Tooltip>

                    <Tooltip title="Compartilhamentos" arrow placement="top">
                      <Box 
                        sx={{ 
                          display: 'flex',
                          alignItems: 'center',
                          gap: 0.5,
                          color: theme.palette.text.secondary,
                          '&:hover': {
                            color: theme.palette.success.main,
                          },
                          transition: 'color 0.2s ease',
                          cursor: 'pointer'
                        }}
                      >
                        <Share sx={{ fontSize: '0.9rem' }} />
                        <Typography variant="caption" sx={{ fontWeight: 500 }}>
                          {formatNumber(post.shares || 0)}
                        </Typography>
                      </Box>
                    </Tooltip>

                    <Chip 
                      label={`${formatNumber(post.engagement)} engajamentos`}
                      size="small"
                      sx={{ 
                        ml: 'auto',
                        bgcolor: alpha(networkColor, isDarkMode ? 0.15 : 0.1),
                        color: networkColor,
                        height: 24,
                        '& .MuiChip-label': {
                          fontWeight: 600,
                          fontSize: '0.7rem',
                          px: 1
                        },
                        borderRadius: '12px'
                      }}
                    />

                    <Tooltip title="Mais ações" arrow placement="top">
                      <IconButton 
                        size="small"
                        onClick={(e) => handleOpenMenu(e, post.id)}
                        sx={{ 
                          color: theme.palette.text.secondary,
                          '&:hover': {
                            color: theme.palette.primary.main,
                            bgcolor: alpha(theme.palette.primary.main, 0.08)
                          }
                        }}
                      >
                        <MoreVert sx={{ fontSize: '1rem' }} />
                      </IconButton>
                    </Tooltip>
                  </Box>
                </Box>
              </ListItem>
              {index < visiblePosts.length - 1 && (
                <Divider 
                  sx={{ 
                    my: 1,
                    borderColor: alpha(theme.palette.divider, isDarkMode ? 0.1 : 0.08)
                  }} 
                />
              )}
            </React.Fragment>
          );
        })}

        {posts.length > maxPosts && (
          <Box sx={{ mt: 2, display: 'flex', justifyContent: 'center' }}>
            <Button 
              variant="outlined" 
              size="small" 
              onClick={onViewAll}
              endIcon={<OpenInNew />}
              sx={{
                borderRadius: '10px',
                textTransform: 'none',
                fontWeight: 500
              }}
            >
              Ver todos os {posts.length} posts
            </Button>
          </Box>
        )}
      </Box>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleCloseMenu}
        PaperProps={{
          elevation: isDarkMode ? 3 : 6,
          sx: {
            width: 200,
            borderRadius: 2,
            border: isDarkMode ? `1px solid ${alpha(theme.palette.divider, 0.1)}` : 'none',
            mt: 1,
            '& .MuiMenuItem-root': {
              fontSize: '0.875rem',
              py: 1
            }
          }
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem onClick={() => handleMenuAction('view')}>
          <OpenInNew sx={{ mr: 1.5, fontSize: 18 }} /> Ver no original
        </MenuItem>
        <MenuItem onClick={() => handleMenuAction('copy-link')}>
          <LinkIcon sx={{ mr: 1.5, fontSize: 18 }} /> Copiar link
        </MenuItem>
        <MenuItem onClick={() => handleMenuAction('copy-content')}>
          <ContentCopy sx={{ mr: 1.5, fontSize: 18 }} /> Copiar texto
        </MenuItem>
      </Menu>
    </Paper>
  );
};

export default TopPosts;