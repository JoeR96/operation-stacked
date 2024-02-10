import React from 'react';
import { Box, Typography, Paper } from '@mui/material';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import Spinner from '../spinner/Spinner';
import { useUserStore } from '../../state/userState';
import { UserApi } from '@operation-stacked/shared-services';
import { Button, TextField } from '@operation-stacked/ui-components';

// Assuming UserApi has been correctly set up to interact with your backend
const userApi = new UserApi();

export const Username: React.FC = () => {
  const queryClient = useQueryClient();
  const { userId, setUsername: setGlobalUsername, username: globalUsername } = useUserStore();

  const { data: username, isLoading, isError, error } = useQuery('username', () => userApi.userNameUserIdGet(userId as string), {
    enabled: !!userId, // This query will not run until userId is available
    onSuccess: (data) => {
      setGlobalUsername(data.data); // Set the global username directly as a string
    },
  });

  const setUsernameMutation = useMutation((newUsername: string) => userApi.userSetUsernamePost({ UserId: userId, Username: newUsername }), {
    onSuccess: () => {
      queryClient.invalidateQueries('username');
    },
  });

  const handleSetUsername = (newUsername: string) => {
    setUsernameMutation.mutate(newUsername);
  };

  if (isLoading) return <Spinner />;

  if (isError) return <Box>Error: {error instanceof Error ? error.message : 'An unknown error occurred'}</Box>;

  return (
    <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" p={2}>
      <Paper elevation={3} style={{ padding: '2rem', backgroundColor: '#242424', width: '100%' }}>
        <Typography variant="h6" gutterBottom style={{ color: 'white', textAlign: 'center' }}>
          {globalUsername ? `Username: ${globalUsername}` : 'No username set'}
        </Typography>
        {!globalUsername && (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              const formData = new FormData(e.currentTarget);
              const newUsername = formData.get('username') as string;
              handleSetUsername(newUsername);
            }}
          >
            <TextField
              name="username"
              fullWidth
              label="New Username"
              variant="outlined"
              style={{ marginBottom: '1rem' }}
            />
            <Button >
              Set Username
            </Button>
          </form>
        )}
      </Paper>
    </Box>
  );
};

export default Username;
