import React, { useEffect, useState } from "react";
import { Grid, Paper, Typography, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Button, TextField } from '@operation-stacked/ui-components';
import { useUserStore } from '../../state/userState';

type LoginFormProps = {
  onToggleForm: () => void;
};

const LoginForm: React.FC<LoginFormProps> = ({ onToggleForm }) => {
  const { setUserId } = useUserStore();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const verifySession = async () => {
      try {
        const response = await fetch('https://app.operationstacked.com/auth/verify', {
          method: 'GET',
          credentials: 'include',
          headers: {
            'Accept': 'application/json',
          }
        });

        if (response.ok) {
          const data = await response.json();

          if(!data.userId){
            return;
          }
          setUserId(data.userId);
          navigate('/dashboard');
        }
      } catch (error) {
        console.error('Error during session verification:', error);
      }
    };
    verifySession();
  }, [navigate]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const response = await fetch('https://app.operationstacked.com/auth/login', {
        // const response = await fetch('https://localhost:7099/login', {

        method: 'POST',
        credentials: 'include', // Important for including session cookies in the request
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password }),
      });
      console.log(response.json)
      const data = await response.json();

      console.log(data)
      if (data.userId) {
        setUserId(data.userId); // Or use setUserId(data.userId)

        navigate('/dashboard');
      }

    } catch (error) {
      console.error('Error during authentication:', error);
    }
  };
  return (
    <React.Fragment>
      <Grid container justifyContent="center" alignItems="center">
        <Paper elevation={3} style={{ padding: '2rem', backgroundColor: '#242424', width: '100%', height: '100%' }}>
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
                  onChange={(e : React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
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
