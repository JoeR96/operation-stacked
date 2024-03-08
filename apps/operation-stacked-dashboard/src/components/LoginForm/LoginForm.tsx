import React, { useState } from "react";
import { Grid, Paper, Typography, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Button, TextField } from '@operation-stacked/ui-components';
import { useUserStore } from '../../state/userState';
import { ERROR, PENDING, useApi } from '@operation-stacked/api-hooks';
import Spinner from '../spinner/Spinner';
import { AuthApi, GoogleAuthApi,  UserIdApi } from '@operation-stacked/shared-services';
import { theme } from '@operation-stacked/shared-styles';
import { GoogleLogin } from '@react-oauth/google';


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
    const response = await authApi.apiAuthLoginPost({ email, password }, {withCredentials:true});
    const lol = response.data.data.userId
    console.log(lol)
    setUserId(response.data.data.userId);
    navigate('/dashboard'); // Ensure this is the correct path
    return response.data;
  });
  const handleGoogleSuccess = async (response) => {
    console.log(response.credential)
    const idToken = response.credential; // The ID token from Google

    try {
      const api = new GoogleAuthApi();
      const authResponse = await
         api.googleAuthGoogleSignInPost({idToken : idToken});
      console.log(authResponse)

      const authUserApi = new UserIdApi();
      if (authResponse.data.success) {
        console.log('settingStuf')
        const userId = await authUserApi.apiUserIdGetUserIdGet({withCredentials:true});

        console.log(userId.data.userId)
        setUserId(userId.data.userId);
        // Navigate to dashboard or other page as needed
        navigate('/dashboard');
      } else {
        console.error('Authentication failed');
      }
    } catch (error) {
      console.error('Error processing login', error);
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await exec(email, password);
  };

  if (apiStatus === PENDING) return <Spinner />;
  if (apiStatus === ERROR) return <div>Error during login: {error?.message}</div>;

  return (
    <React.Fragment>
      <Grid container justifyContent="center" alignItems="center" height={'100vh'} sx={{ backgroundColor: '#111111' }}>
        <Paper elevation={3} style={{ padding: '2rem', backgroundColor: theme.colors.cardBackground, width: '100%', height: '100%' }}>
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
              <Grid item>
                <Box textAlign="center">
                  <GoogleLogin
                    onSuccess={handleGoogleSuccess}
                    useOneTap
                  />
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
