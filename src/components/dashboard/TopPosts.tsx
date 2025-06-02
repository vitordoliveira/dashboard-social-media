import React from 'react';
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
  Divider
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
  MoreVert
} from '@mui/icons-material';
import { formatNumber } from '../../utils/formatters';

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
}

const networkConfigs = {
  facebook: {
    icon: Facebook,
    color: '#1877F2',
    label: 'Facebook'
  },
  twitter: {
    icon: Twitter,
    color: '#1DA1F2',
    label: 'Twitter'
  },
  instagram: {
    icon: Instagram,
    color: '#E4405F',
    label: 'Instagram'
  },
  linkedin: {
    icon: LinkedIn,
    color: '#0A66C2',
    label: 'LinkedIn'
  }
};

const TopPosts: React.FC<TopPostsProps> = ({ posts }) => {
  const theme = useTheme();

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

  return (
    <Paper 
      sx={{ 
        height: '100%',
        background: `linear-gradient(135deg, 
          ${alpha(theme.palette.background.paper, 0.8)} 0%, 
          ${alpha(theme.palette.background.paper, 0.95)} 100%)`,
        backdropFilter: 'blur(10px)',
        border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
        position: 'relative',
        overflow: 'hidden',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '4px',
          background: `linear-gradient(90deg, 
            ${alpha(theme.palette.primary.main, 0.1)} 0%, 
            ${alpha(theme.palette.primary.main, 0.3)} 100%)`
        }
      }}
    >
      <Box sx={{ p: 3 }}>
        <Box 
          sx={{ 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'space-between',
            mb: 2
          }}
        >
          <Typography 
            variant="h6" 
            sx={{ 
              fontWeight: 600,
              display: 'flex',
              alignItems: 'center',
              gap: 1
            }}
          >
            <Timeline sx={{ color: theme.palette.primary.main }} />
            Top Posts
          </Typography>
          <Tooltip title="Ver todos os posts" arrow>
            <IconButton size="small">
              <OpenInNew fontSize="small" />
            </IconButton>
          </Tooltip>
        </Box>

        <List sx={{ p: 0 }}>
          {posts.map((post, index) => {
            const NetworkIcon = networkConfigs[post.network].icon;
            const networkColor = networkConfigs[post.network].color;

            return (
              <React.Fragment key={post.id}>
                <ListItem 
                  sx={{
                    p: 2,
                    borderRadius: 2,
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      backgroundColor: alpha(theme.palette.action.hover, 0.1),
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
                        gap: 1
                      }}
                    >
                      <ListItemAvatar sx={{ minWidth: 'auto' }}>
                        <Avatar 
                          sx={{ 
                            bgcolor: alpha(networkColor, 0.1),
                            color: networkColor
                          }}
                        >
                          <NetworkIcon />
                        </Avatar>
                      </ListItemAvatar>
                      <Typography 
                        variant="subtitle2" 
                        sx={{ 
                          color: networkColor,
                          fontWeight: 600
                        }}
                      >
                        {networkConfigs[post.network].label}
                      </Typography>
                      <Box 
                        sx={{ 
                          ml: 'auto',
                          display: 'flex',
                          alignItems: 'center',
                          gap: 1
                        }}
                      >
                        <Chip 
                          label={`#${index + 1}`}
                          size="small"
                          sx={{ 
                            bgcolor: alpha(theme.palette.primary.main, 0.1),
                            color: theme.palette.primary.main,
                            fontWeight: 600
                          }}
                        />
                        <Typography 
                          variant="caption" 
                          sx={{ 
                            color: alpha(theme.palette.text.secondary, 0.7)
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
                        color: alpha(theme.palette.text.primary, 0.9),
                        lineHeight: 1.6
                      }}
                    >
                      {post.content}
                    </Typography>

                    {/* Footer do Post */}
                    <Box 
                      sx={{ 
                        display: 'flex',
                        alignItems: 'center',
                        gap: 2
                      }}
                    >
                      <Tooltip title="Curtidas" arrow>
                        <Box 
                          sx={{ 
                            display: 'flex',
                            alignItems: 'center',
                            gap: 0.5,
                            color: theme.palette.text.secondary
                          }}
                        >
                          <Favorite fontSize="small" />
                          <Typography variant="caption">
                            {formatNumber(post.likes || 0)}
                          </Typography>
                        </Box>
                      </Tooltip>

                      <Tooltip title="Comentários" arrow>
                        <Box 
                          sx={{ 
                            display: 'flex',
                            alignItems: 'center',
                            gap: 0.5,
                            color: theme.palette.text.secondary
                          }}
                        >
                          <Comment fontSize="small" />
                          <Typography variant="caption">
                            {formatNumber(post.comments || 0)}
                          </Typography>
                        </Box>
                      </Tooltip>

                      <Tooltip title="Compartilhamentos" arrow>
                        <Box 
                          sx={{ 
                            display: 'flex',
                            alignItems: 'center',
                            gap: 0.5,
                            color: theme.palette.text.secondary
                          }}
                        >
                          <Share fontSize="small" />
                          <Typography variant="caption">
                            {formatNumber(post.shares || 0)}
                          </Typography>
                        </Box>
                      </Tooltip>

                      <Chip 
                        label={`${formatNumber(post.engagement)} engajamentos`}
                        size="small"
                        sx={{ 
                          ml: 'auto',
                          bgcolor: alpha(networkColor, 0.1),
                          color: networkColor,
                          '& .MuiChip-label': {
                            fontWeight: 500
                          }
                        }}
                      />

                      <Tooltip title="Mais ações" arrow>
                        <IconButton size="small">
                          <MoreVert fontSize="small" />
                        </IconButton>
                      </Tooltip>
                    </Box>
                  </Box>
                </ListItem>
                {index < posts.length - 1 && (
                  <Divider 
                    sx={{ 
                      my: 1,
                      borderColor: alpha(theme.palette.divider, 0.1)
                    }} 
                  />
                )}
              </React.Fragment>
            );
          })}
        </List>
      </Box>
    </Paper>
  );
};

export default TopPosts;