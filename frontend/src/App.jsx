import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RoomsPage from './pages/RoomsPage';
import GuestsPage from './pages/GuestsPage';
import { AuthProvider } from './components/auth/AuthProvider';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/rooms" element={<RoomsPage />} />
          <Route path="/guests" element={<GuestsPage />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
// Compare this snippet from frontend/src/components/auth/AuthProvider.jsx:
// import React, { createContext, useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { getUser, login, logout } from './authService';
//
// const AuthContext = createContext();
//
// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);     