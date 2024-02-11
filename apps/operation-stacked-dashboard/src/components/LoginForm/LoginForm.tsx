import React, { useState } from "react";
import { Grid, Paper, Typography, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Button, TextField } from '@operation-stacked/ui-components';
import { useUserStore } from '../../state/userState';
import { ERROR, PENDING, useApi } from '@operation-stacked/api-hooks';
import Spinner from '../spinner/Spinner';
import { AuthApi } from '@operation-stacked/shared-services';
import { theme } from '@operation-stacked/shared-styles';
import { GoogleLogin } from 'react-google-login'; // Import the Google Login component

// Replace YOUR_CLIENT_ID with your actual Google client ID
const clientId = "YOUR_CLIENT_ID";

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
    navigate('/dashboard'); // Ensure this is the correct path
    return response.data;
  });

  const handleLogin = async (googleData) => {
    // Here, you would send googleData.tokenId to your backend
    // to validate and create/use the user in your database
    const result = await fetch('/api/auth/google-login', {
      method: 'POST',
      body: JSON.stringify({
        token: googleData.tokenId,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data = await result.json();
    if (data.userId) {
      setUserId(data.userId);
      navigate('/dashboard'); // Ensure this is the correct path
    } else {
      // Handle error
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
                    clientId={clientId}
                    buttonText="Login with Google"
                    onSuccess={handleLogin}
                    onFailure={(response) => console.error(response)}
                    cookiePolicy={'single_host_origin'}
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
