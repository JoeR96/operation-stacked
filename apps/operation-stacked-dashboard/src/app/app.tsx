import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import LoginPage from '../pages/LoginPage';
import DashboardPage from '../pages/DashboardPage';
import HeaderWrapper from '../components/header/HeaderWrapper';

export function App() {
  return (
      <React.Fragment>
        <HeaderWrapper />
        <Routes>
          <Route
            path="/"
            element={<LoginPage />}
          /><Route
            path="/login"
            element={<LoginPage />}
          />
          <Route
            path="/dashboard"
            element={<DashboardPage />
            }
          />
        </Routes>
      </React.Fragment>
  );
}

export default App;
