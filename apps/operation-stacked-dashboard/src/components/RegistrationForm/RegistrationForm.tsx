import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Grid, Paper, Typography, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { ERROR, PENDING, useApi } from '@operation-stacked/api-hooks';
import { Button, TextField } from '@operation-stacked/ui-components';
import Spinner from '../spinner/Spinner';

// Yup schema for validation
const validationSchema = Yup.object({
  email: Yup.string().email('Invalid email format').required('Required'),
  password: Yup.string()
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{12,}$/,
      "Password must contain at least one letter, one number, one special character, and be at least 12 characters long"
    )
    .required('Required'),
});

type RegistrationFormProps = {
  onToggleForm: () => void;
};

const RegistrationForm: React.FC<RegistrationFormProps> = ({ onToggleForm }) => {
  const navigate = useNavigate();
  const [registrationMessage, setRegistrationMessage] = useState('');
  const { apiStatus, exec, error } = useApi(async (email: string, password: string) => await registerUser(email, password));

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: validationSchema,
    onSubmit: (values, { setSubmitting }) => {
      exec(values.email, values.password).then((result) => {
        setSubmitting(false);
        if (result.data.message === 'Registration successful') {
          setRegistrationMessage('Registration successful');
          navigate('/login');
        } else if (result.data.message === 'User already exists.') {
          setRegistrationMessage('User already registered');
        }
      }).catch(() => {
        setSubmitting(false);
      });
    },
  });

  if (apiStatus === PENDING) return <Spinner />;
  if (apiStatus === ERROR) return <div>Error during registration: {error?.message}</div>;

  return (
    <React.Fragment>
      <Grid container justifyContent="center" alignItems="center">
        <Paper elevation={3} style={{ padding: '2rem', backgroundColor: '#242424', width: '100%', height: '100%' }}>
          <Typography variant="h5" gutterBottom style={{ color: 'white', textAlign: 'center' }}>
            Register
          </Typography>

          {registrationMessage ? (
            <div>
              <Typography style={{ color: 'white', textAlign: 'center' }}>
                {registrationMessage}
              </Typography>
              {registrationMessage === 'Registration successful' && (
                <Button onClick={() => navigate('/login')}>
                  Return to Login
                </Button>
              )}
            </div>
          ) : (
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
                    <Button >
                      Register
                    </Button>
                    <Button onClick={onToggleForm}>
                      Login
                    </Button>
                  </Box>
                </Grid>
              </Grid>
            </form>
          )}
        </Paper>
      </Grid>
    </React.Fragment>
  );
};

async function registerUser(email: string, password: string) {
  // Replace with your registration logic
  try {
    const response = await fetch('https://app.operationstacked.com/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password }),
      credentials: 'include',
    });
    return await response.json();
  } catch (error) {
    console.error('Error during registration:', error);
    throw error;
  }
}

export default RegistrationForm;
