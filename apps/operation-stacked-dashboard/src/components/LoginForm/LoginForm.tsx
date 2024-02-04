import React, { useState } from "react";
import { Grid, Paper, Typography, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Button, TextField } from '@operation-stacked/ui-components';
import { useUserStore } from '../../state/userState';
import { ERROR, PENDING, useApi } from '@operation-stacked/api-hooks';
import Spinner from '../spinner/Spinner';
import { AuthApi } from '@operation-stacked/shared-services';
import {theme} from '@operation-stacked/shared-styles';

type LoginFormProps = {
  onToggleForm: () => void;
  authApi: AuthApi;
};

const LoginForm: React.FC<LoginFormProps> = ({ onToggleForm, authApi }) => {
  const { setUserId } = useUserStore();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { apiStatus, exec, error } = useApi(async (email: string, password: string) => {
    const response = await authApi.loginPost({ email, password });
    console.log(response.data.userId)
    setUserId(response.data.userId);
    navigate('dashboard')
    return response.data;
  });

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await exec(email, password);
  };

  if (apiStatus === PENDING) return <Spinner />;
  if (apiStatus === ERROR) return <div>Error during login: {error?.message}</div>;

  return (
      <React.Fragment>
        <Grid container justifyContent="center" alignItems="center">
          <Paper elevation={3} style={{ padding: '2rem', backgroundColor: theme.colors.background, width: '100%', height: '100%' }}>
            <Typography variant="h5" gutterBottom style={{ color: 'white', textAlign: 'center' }}>
              Login
            </Typography>
            <form onSubmit={handleSubmit}>
              <Grid container direction="column" spacing={2}>
                <Grid item>
                  <TextField
                      required
                      fullWidth
                      label="Email"
                      variant="outlined"
                      value={email}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                  />
                </Grid>
                <Grid item>
                  <TextField
                      required
                      fullWidth
                      label="Password"
                      type="password"
                      variant="outlined"
                      value={password}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
                  />
                </Grid>
                <Grid item>
                  <Box textAlign="center">
                    <Button type="submit">
                      Submit
                    </Button>
                    <Button onClick={onToggleForm}>
                      Register
                    </Button>
                  </Box>
                </Grid>
              </Grid>
            </form>
          </Paper>
        </Grid>
      </React.Fragment>
  );
};

export default LoginForm;
