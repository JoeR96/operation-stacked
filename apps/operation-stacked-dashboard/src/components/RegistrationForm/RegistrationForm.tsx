import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Grid, Paper, Typography, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { ERROR, PENDING, useApi } from '@operation-stacked/api-hooks';
import { Button, TextField } from '@operation-stacked/ui-components';
import Spinner from '../spinner/Spinner';
import { GoogleLogin } from '@react-oauth/google';
import { UserApi } from '@operation-stacked/shared-services'; // Ensure this is the correct import path

const validationSchema = Yup.object({
  email: Yup.string().email('Invalid email format').required('Required'),
  password: Yup.string()
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{12,}$/,
      "Password must contain at least one letter, one number, one special character, and be at least 12 characters long"
    )
    .required('Required'),
});

export type RegistrationFormProps = {
  onToggleForm: () => void;
};

const RegistrationForm: React.FC<RegistrationFormProps> = ({ onToggleForm }) => {
  const navigate = useNavigate();
  const [registrationMessage, setRegistrationMessage] = useState('');
  const userApi = new UserApi(); // Initialize your User API here

  const handleGoogleSuccess = async (response) => {
    const { credential } = response;

    try {
      await Auth.federatedSignIn('google', { token: credential, expires_at: 3600 });

      const currentUser = await Auth.currentAuthenticatedUser();
      const cognitoUserId = currentUser.attributes.sub; // Cognito User ID

      await userApi.userCreateUserPost({
        CognitoUserId : cognitoUserId
      });

      navigate('/dashboard'); // Navigate to dashboard upon successful registration
    } catch (error) {
      console.error('Google registration failed:', error);
      setRegistrationMessage('Google registration failed. Please try again.');
    }
  };

  const { apiStatus, exec, error } = useApi(async (email: string, password: string) => {
    const response = await userApi.apiAuthLoginPost({ email, password });
    console.log(response.data);
    navigate('/dashboard'); // Ensure this is the correct path
    return response.data;
  });

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema,
    onSubmit: (values, { setSubmitting }) => {
      exec(values.email, values.password);
      setSubmitting(false);
    },
  });

  if (apiStatus === PENDING) return <Spinner />;
  if (apiStatus === ERROR) return <div>Error during registration: {error?.message}</div>;

  return (
    <React.Fragment>
      <Grid container justifyContent="center" alignItems="center">
        <Paper elevation={3} style={{ padding: '2rem', backgroundColor: '#242424', width: '100%', maxWidth: '500px' }}>
          <Typography variant="h5" gutterBottom style={{ color: 'white', textAlign: 'center' }}>
            Register
          </Typography>
          {registrationMessage && (
            <Typography style={{ color: 'white', textAlign: 'center' }}>
              {registrationMessage}
            </Typography>
          )}
          <form onSubmit={formik.handleSubmit}>
            <Grid container direction="column" spacing={2}>
              <Grid item>
                <TextField
                  fullWidth
                  label="Email"
                  variant="outlined"
                  id="email"
                  name="email"
                  type="email"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.email}
                  error={formik.touched.email && Boolean(formik.errors.email)}
                  helperText={formik.touched.email && formik.errors.email}
                />
              </Grid>
              <Grid item>
                <TextField
                  fullWidth
                  label="Password"
                  variant="outlined"
                  id="password"
                  name="password"
                  type="password"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.password}
                  error={formik.touched.password && Boolean(formik.errors.password)}
                  helperText={formik.touched.password && formik.errors.password}
                />
              </Grid>
              <Grid item>
                <Box textAlign="center">
                  <Button type="submit">Register</Button>
                  <Button onClick={onToggleForm}>Login</Button>
                </Box>
              </Grid>
              <Grid item>
                <Box textAlign="center">
                  <GoogleLogin onSuccess={handleGoogleSuccess} onError={() => setRegistrationMessage('Google Login failed. Please try again.')} useOneTap />
                </Box>
              </Grid>
            </Grid>
          </form>
        </Paper>
      </Grid>
    </React.Fragment>
  );
};

export default RegistrationForm;
