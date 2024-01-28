import React, { useState } from 'react';
import { Box, Button, Paper, TextField, Typography } from '@mui/material';
import { useApi, PENDING, ERROR } from '@operation-stacked/api-hooks';
import Spinner from '../spinner/Spinner';
import { useUserStore } from '../../state/userState';
import { UserApi, SetUsernameRequest } from '@operation-stacked/shared-services';

enum Scenario {
  NameTaken = 'nameTaken',
  NameFree = 'nameFree',
  NameSet = 'nameSet'
}

const mockUseApi = (scenario: Scenario) => {
  const exec = async (...args: [string]) => {
    const username = args[0];
    switch (scenario) {
      case Scenario.NameFree:
        return { data: false, error: null };
      case Scenario.NameTaken:
        return { data: true, error: null };
      case Scenario.NameSet:
        return { data: false, error: null };
      default:
        return { data: null, error: null };
    }
  };

  return () => ({
    exec,
    data: null,
    setData: () => {},
    setApiStatus: () => {},
    apiStatus: 'idle',
    normalisedStatuses: {},
    error: null
  });
};

const mockUseUserStore = (scenario: Scenario) => {
  return () => ({
    state: {
      username: scenario === Scenario.NameSet ? 'ExistingUser' : '',
      userId: 'mockUserId',
    },
    actions: {
      setUsername: () => {},
      setUserId: () => {},
    }
  });
};

type UsernameProps = {
  useApiHook?: typeof useApi;
  useUserStoreHook?: typeof useUserStore;
};

const Username: React.FC<UsernameProps> = ({ useApiHook = useApi, useUserStoreHook = useUserStore }) => {
  const { username, setUsername, userId } = useUserStoreHook();
  const [newUsername, setNewUsername] = useState('');

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
    const result = await setUsernameApi.exec(newUsername);
    if (result) {
      setUsername(newUsername);
    }
  };

  if (checkUsernameApi.apiStatus === PENDING || setUsernameApi.apiStatus === PENDING) {
    return <Spinner />;
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
        {(checkUsernameApi.apiStatus === ERROR || setUsernameApi.apiStatus === ERROR) && (
          <div style={{ color: 'red' }}>Error: {checkUsernameApi.error?.message || setUsernameApi.error?.message}</div>
        )}
      </Paper>
    </Box>
  );
};

export default {
  title: 'Components/Username',
  component: Username,
  // other properties like 'argTypes', 'decorators', etc. can be added here
};