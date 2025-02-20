import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Import BrowserRouter as Router
import { LoginForm } from './components/login-form.jsx'; // Import LoginForm
import { SignUpForm } from './components/signup-form.jsx'; // Import SignUpForm (Make sure the file exists)
import UserPreference from './components/UserPreference.jsx';
import DashBoard from './components/Dashboard.jsx';
import Header from './components/Header';
import Profile from './components/UserProfile.jsx';

// import { SearchProvider } from './SearchContext'; // Import SearchProvider
import { SearchProvider }  from './components/SearchContext.jsx';
function App() {
  return (
    <SearchProvider>
      <Router>
        {/* <Header /> */}
        <Routes>
          {/* Route for Login */}
          <Route path="/" element={<LoginForm />} />
          
          {/* Route for Sign Up */}
          <Route path="user/signup" element={<SignUpForm />} />
          <Route path="user/preference" element={<UserPreference />} />
          {/* <Route path="user/pref" element={<Userpref />} /> */}
          <Route path="user/dashboard" element={<DashBoard />} />
          <Route path="user/profile" element={<Profile />} />

        </Routes>
      </Router>
    </SearchProvider>
  );
}

export default App;