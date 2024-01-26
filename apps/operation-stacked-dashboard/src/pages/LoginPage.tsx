import React, { useState } from 'react';
import { sharkImage } from '@operation-stacked/shared-images';
import LoginForm from '../components/LoginForm/LoginForm';
import RegistrationForm from '../components/RegistrationForm/RegistrationForm';

const LoginPage = () => {
  const [showLoginForm, setShowLoginForm] = useState(true);

  const toggleForm = () => {
    setShowLoginForm(!showLoginForm);
  };

  return (
    <div style={{ display: 'flex', height: '100vh', alignItems: 'center' }}>
      <div style={{ flex: '0 0 75%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <img src={sharkImage} alt="Shark" style={{ maxWidth: '50%', height: 'auto' }} />
      </div>
      <div style={{ flex: '0 0 25%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        {showLoginForm ? <LoginForm onToggleForm={toggleForm} /> : <RegistrationForm onToggleForm={toggleForm} />}
      </div>
    </div>
  );
};

export default LoginPage;
