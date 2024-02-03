import React, { useEffect, useState } from 'react';
import { Box, Button, Paper, TextField, Typography } from '@mui/material';
import { useApi, PENDING, ERROR } from '@operation-stacked/api-hooks';
import Spinner from '../spinner/Spinner';
import { useUserStore } from '../../state/userState';
import { UserApi, SetUsernameRequest } from '@operation-stacked/shared-services';

type UsernameProps = {
  useApiHook?: typeof useApi;
  useUserStoreHook?: typeof useUserStore;
};

const Username: React.FC<UsernameProps> = ({ useApiHook = useApi, useUserStoreHook = useUserStore }) => {
  const { username, setUsername, userId } = useUserStoreHook();
  const [newUsername, setNewUsername] = useState('');

  const getUserApi = useApiHook(async (userId: string) => {
    console.log('given',userId)
    const userApi = new UserApi();
    const lol =  await userApi.userNameUserIdGet(userId);
    console.log('lol',lol)
    return lol.data
  });

  useEffect(() => {
    const fetchUser = async () => {
      console.log(userId)
      const response = await getUserApi.exec(userId as string);
      console.log('response is', response.data)
      if (response.data && response.data !== '') {
        setUsername(response.data);
      }
    };
    if (!username) {
      fetchUser();
    }
  }, []);

  const checkUsernameApi = useApiHook(async (username: string) => {
    const userApi = new UserApi();
    return await userApi.userUsernameUsernameGet(username);
  });

  const setUsernameApi = useApiHook(async (username: string) => {
    const userApi = new UserApi();
    const setUsernameRequest: SetUsernameRequest = { Username: username, UserId: userId };
    return await userApi.userSetUsernamePost(setUsernameRequest);
  });

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const isUsernameTaken = await checkUsernameApi.exec(newUsername);

    if (isUsernameTaken) {
      alert('Username is already taken. Please choose a different username.');
      return;
    }
    const setResult = await setUsernameApi.exec(newUsername);
    if (setResult) {
      setUsername(newUsername);
    }
  };

  if (getUserApi.apiStatus === PENDING || checkUsernameApi.apiStatus === PENDING || setUsernameApi.apiStatus === PENDING) {
    return <Spinner />;
  }

  if (getUserApi.apiStatus === ERROR || checkUsernameApi.apiStatus === ERROR || setUsernameApi.apiStatus === ERROR) {
    return (
      <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" p={2}>
        <div style={{ color: 'red' }}>
          Error: {getUserApi.error?.message || checkUsernameApi.error?.message || setUsernameApi.error?.message}
        </div>
      </Box>
    );
  }

  return (
    <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" p={2}>
      <Paper elevation={3} style={{ padding: '2rem', backgroundColor: '#242424', width: '100%' }}>
        <Typography variant="h6" gutterBottom style={{ color: 'white', textAlign: 'center' }}>
          {username ? `Username: ${username}` : 'No username set'}
        </Typography>
        {!username && (
          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="New Username"
              variant="outlined"
              value={newUsername}
              onChange={(e) => setNewUsername(e.target.value)}
              style={{ marginBottom: '1rem' }}
            />
            <Button type="submit" variant="contained" color="primary">
              Set Username
            </Button>
          </form>
        )}
      </Paper>
    </Box>
  );
};

export default Username;
