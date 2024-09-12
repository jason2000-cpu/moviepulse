// src/components/WelcomeScreen.js

import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import welcomeBackground from "../images/welcome-background.jpg";

const WelcomeScreen = () => {
    const navigate = useNavigate();
  
    const handleLogin = () => {
      navigate('/home');
    };
  
    return (
        <div 
        className="flex items-center justify-center min-h-screen bg-cover bg-center bg-opacity-90"
        style={{ 
          backgroundColor: '#2b1337', // This is the hex equivalent of rgb(43, 19, 55)
          backgroundImage: `linear-gradient(rgba(43, 19, 55, 0.9), rgba(43, 19, 55, 0.9)), url(${welcomeBackground})` 
        }}
      >
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-2">WATCH</h1>
          <p className="text-sm text-gray-300 mb-8">Enjoy the latest movies</p>
          <button 
            onClick={handleLogin}
            className="bg-purple-600 text-white px-12 py-2 rounded-full text-sm font-medium hover:bg-purple-700 transition duration-300 mb-4 w-full"
          >
            Log in
          </button>
          <p className="text-gray-400 text-xs">
            No account? <Link to="/signup" className="text-white font-medium">Sign up</Link>
          </p>
        </div>
      </div>
    );
  };
  
  export default WelcomeScreen;