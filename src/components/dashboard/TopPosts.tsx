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
  Chip
} from '@mui/material';
import { Facebook, Twitter, Instagram, LinkedIn } from '@mui/icons-material';

interface Post {
  id: string;
  network: 'facebook' | 'twitter' | 'instagram' | 'linkedin';
  content: string;
  engagement: number;
  timestamp: string;
}

interface TopPostsProps {
  posts: Post[];
}

const networkIcons = {
  facebook: <Facebook sx={{ color: '#1877F2' }} />,
  twitter: <Twitter sx={{ color: '#1DA1F2' }} />,
  instagram: <Instagram sx={{ color: '#E4405F' }} />,
  linkedin: <LinkedIn sx={{ color: '#0A66C2' }} />
};

const TopPosts: React.FC<TopPostsProps> = ({ posts }) => {
  return (
    <Paper sx={{ p: 2 }}>
      <Typography variant="h6" gutterBottom>
        Top Posts
      </Typography>
      <List>
        {posts.map((post) => (
          <ListItem 
            key={post.id}
            sx={{
              mb: 1,
              '&:hover': {
                backgroundColor: 'rgba(255,255,255,0.05)',
              },
            }}
          >
            <ListItemAvatar>
              <Avatar sx={{ bgcolor: 'background.paper' }}>
                {networkIcons[post.network]}
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              primary={post.content}
              secondary={
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 0.5 }}>
                  <Chip 
                    label={`${post.engagement} engajamentos`}
                    size="small"
                    sx={{ backgroundColor: 'rgba(255,255,255,0.1)' }}
                  />
                  <Typography variant="caption" color="text.secondary">
                    {post.timestamp}
                  </Typography>
                </Box>
              }
            />
          </ListItem>
        ))}
      </List>
    </Paper>
  );
};

export default TopPosts;