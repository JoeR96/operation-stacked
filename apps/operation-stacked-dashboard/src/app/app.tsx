import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import LoginPage from '../pages/LoginPage';

export function App() {
  return (
      <React.Fragment>
        <div role="navigation">
          <ul>
            <li>
              <Link to="/">Login</Link> {/* Updated link text to 'Login' */}
            </li>
          </ul>
        </div>
        <Routes>
          <Route
            path="/"
            element={<LoginPage />} // Set LoginPage as the default route
          />
          <Route
            path="/page-2"
            element={
              <div>
                <Link to="/">Go back to Login</Link> {/* Updated link text */}
              </div>
            }
          />
        </Routes>
      </React.Fragment>
  );
}

export default App;
