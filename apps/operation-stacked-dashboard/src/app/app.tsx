import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import LoginPage from '../pages/login/LoginPage';
import DashboardPage from '../pages/dashboard/DashboardPage';
import HeaderWrapper from '../components/header/HeaderWrapper';
import ExercisePage from '../pages/exercise/ExercisePage';
import ExerciseHistoryPage from '../pages/exercise-history/ExerciseHistoryPage';
import { GoogleOAuthProvider } from '@react-oauth/google';

export function App() {
  return (
      <React.Fragment>
        <GoogleOAuthProvider clientId={"876582448990-0ac35vm82d195s99isjnevbtljirsmuf.apps.googleusercontent.com"}>
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
          /><Route
          /><Route
            path="/history"
            element={<ExerciseHistoryPage />
            }
          />
        </Routes>
        </GoogleOAuthProvider>

      </React.Fragment>
  );
}

export default App;
