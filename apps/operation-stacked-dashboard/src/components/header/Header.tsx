import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useUserStore } from '../../state/userState';
import { theme } from '@operation-stacked/shared-styles';

function Header() {
    const navigate = useNavigate();
    const { userId, setUserId, username, setUsername } = useUserStore(); // Destructure from useUserStore

    const handleNavigate = (path: string) => {
        navigate(path);
    };

    const handleLogoutClick = async () => {
        try {
            const response = await fetch('https://app.operationstacked.com/auth/logout', {
                method: 'POST',
                credentials: 'include', // Include credentials in the request
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.ok) {
                // Reset user store values upon successful logout
                setUserId(undefined);
                setUsername(undefined);
                navigate('/login');
            } else {
                console.error('Logout failed:', response.statusText);
            }
        } catch (error) {
            console.error('Error during logout:', error);
        }
    };

    return (
      <AppBar position="fixed" style={{ backgroundColor: theme.colors.primary }}>
          <Toolbar>
              <Typography variant="h6" style={{ flexGrow: 1, color: theme.colors.text }}>
                  OperationStacked
              </Typography>
              {/* Navigation buttons */}
              <Button color="inherit" onClick={() => handleNavigate('/dashboard')}>Dashboard</Button>
              <Button color="inherit" onClick={() => handleNavigate('/exercises')}>Exercises</Button>
              <Button color="inherit" onClick={() => handleNavigate('/workout')}>Workout</Button>
              <Button color="inherit" onClick={() => handleNavigate('/equipment-stacks')}>Equipment Stacks</Button>
              <Button color="inherit" onClick={() => handleNavigate('/history')}>History</Button>
              {/* Logout button */}
              {userId && <Button color="inherit" onClick={handleLogoutClick}>Logout</Button>}
          </Toolbar>
      </AppBar>
    );
}

export default Header;
