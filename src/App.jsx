

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Import BrowserRouter as Router
import { LoginForm } from './components/login-form.jsx'; // Import LoginForm
import { SignUpForm } from './components/signup-form.jsx'; // Import SignUpForm (Make sure the file exists)
import UserPreference  from './components/UserPreference.jsx';
import Userpref from './components/UserPreference_copy.jsx';
import DashBoard from './components/Dashboard.jsx';

function App() {
  return (
    <Router>
      <Routes>
        {/* Route for Login */}
        <Route path="user/login" element={<LoginForm />} />
        
        {/* Route for Sign Up */}
        <Route path="user/signup" element={<SignUpForm />} />
        <Route path="user/preference" element={<UserPreference />} />
        <Route path="user/pref" element={<Userpref />} />
        <Route path="user/dashboard" element={<DashBoard />} />
      </Routes>
    </Router>
  );
}

export default App;
