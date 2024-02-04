import { sharkImage } from '@operation-stacked/shared-images';
import LoginForm from '../components/LoginForm/LoginForm';
import RegistrationForm from '../components/RegistrationForm/RegistrationForm';
import { AuthApi } from '@operation-stacked/shared-services';
import React, { useState } from 'react';
import { AuthApiProvider } from '../context/authContext'; // If you need to import AuthApi for instantiation

const LoginPage = () => {
  const [showLoginForm, setShowLoginForm] = useState(true);
  const authApi = new AuthApi(); // Instantiate AuthApi

  const toggleForm = () => {
    setShowLoginForm(!showLoginForm);
  };

  return (
    <AuthApiProvider authApi={authApi}> {/* Provide AuthApi context */}
      <div style={{ display: 'flex', height: '100vh', alignItems: 'center' }}>
        <div style={{ flex: '0 0 75%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <img src={sharkImage} alt="Shark" style={{ maxWidth: '50%', height: 'auto' }} />
        </div>
        <div style={{ flex: '0 0 25%', display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', width: '100%' }}>
          {showLoginForm ? (
            <div style={{ height: '100%', width: '100%' }}>
              <LoginForm onToggleForm={toggleForm} authApi={authApi} />
            </div>
          ) : (
            <div style={{ height: '100%', width: '100%' }}>
              <RegistrationForm onToggleForm={toggleForm} />
            </div>
          )}
        </div>
      </div>
    </AuthApiProvider>
  );
};

export default LoginPage;
