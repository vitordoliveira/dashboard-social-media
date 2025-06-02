import React from 'react';
import { AppBar, Toolbar, Typography, IconButton, Box } from '@mui/material';
import { Notifications, AccountCircle } from '@mui/icons-material';

interface HeaderProps {
  sidebarOpen: boolean;
}

const Header: React.FC<HeaderProps> = ({ sidebarOpen }) => {
  return (
    <AppBar 
      position="sticky" 
      sx={{ 
        backgroundColor: 'background.paper',
        boxShadow: 1,
        ml: sidebarOpen ? '240px' : 0,
        width: sidebarOpen ? 'calc(100% - 240px)' : '100%',
        transition: theme => theme.transitions.create(['margin', 'width'], {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
      }}
    >
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Dashboard
        </Typography>
        <Box>
          <IconButton color="inherit">
            <Notifications />
          </IconButton>
          <IconButton color="inherit">
            <AccountCircle />
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;