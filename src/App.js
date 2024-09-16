import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AppProvider } from './contexts/AppContext';
import Layout from './components/Layout';
import WelcomeScreen from './components/WelcomeScreen';
import HomeScreen from './components/HomeScreen';
import AccountDetails from './components/AccountDetails';
import SearchResults from './components/SearchResults'; // New import

function App() {
  return (
    <AppProvider>
      <Router>
        <Routes>
          <Route path="/" element={<WelcomeScreen />} />
          <Route element={<Layout />}>
            <Route path="/home" element={<HomeScreen />} />
            <Route path="/account" element={<AccountDetails />} />
            <Route path="/search" element={<SearchResults />} /> {/* New route */}
          </Route>
        </Routes>
      </Router>
    </AppProvider>
  );
}

export default App;