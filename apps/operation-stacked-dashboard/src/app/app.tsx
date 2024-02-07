import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import LoginPage from '../pages/login/LoginPage';
import DashboardPage from '../pages/dashboard/DashboardPage';
import HeaderWrapper from '../components/header/HeaderWrapper';
import ExercisePage from '../pages/exercise/ExercisePage';

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
          /><Route
            path="/exercises"
            element={<ExercisePage />
            }
          />
        </Routes>
      </React.Fragment>
  );
}

export default App;
