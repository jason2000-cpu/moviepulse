import React, { createContext, useState, useContext } from 'react';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const login = (userData) => {
    setUser(userData);
    // Here you might also want to store the user data in localStorage
  };

  const logout = () => {
    setUser(null);
    // Here you might also want to remove the user data from localStorage
  };

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <AppContext.Provider value={{ user, login, logout, isDarkMode, toggleTheme }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);