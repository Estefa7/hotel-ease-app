// src/components/auth/AuthProvider.jsx

import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // ✅ Load user from localStorage on initial mount
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      
      // ✅ Normalize _id to always be present
      const normalizedUser = {
        ...parsedUser,
        _id: parsedUser._id || parsedUser.id
      };

      setUser(normalizedUser);
    }
  }, []);

  // ✅ Logout helper
  const logout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    localStorage.removeItem('adminId');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, setUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// ✅ Custom hook
export const useAuth = () => useContext(AuthContext);
