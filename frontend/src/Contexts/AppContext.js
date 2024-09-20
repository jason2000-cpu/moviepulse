import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const AppContext = createContext();
const BASE_URL = 'https://moviepulse.onrender.com/api';

export const AppProvider = ({ children }) => {
	const [user, setUser] = useState(null); // Use null for non-authenticated state
	const [isDarkMode, setIsDarkMode] = useState(false);
	const [searchQuery, setSearchQuery] = useState('Trending');

	// Check for existing token on load
	useEffect(() => {
		const token = localStorage.getItem('accessToken');
		if (token) {
			// Optionally, validate token by making a request to your API
			setUser({ token }); // Set the user with token on initial load
		}
	}, []);

	const login = (userData) => {
		axios
			.post(`${BASE_URL}/login/`, userData)
			.then((response) => {
				const { access, refresh } = response.data;
				localStorage.setItem('accessToken', access);
				localStorage.setItem('refreshToken', refresh);

				setUser(response.data);
				toast.success('Login successful!', { autoClose: 3000 });
			})
			.catch((error) => {
				console.error('An error occurred while logging in', error);
				toast.error('Login failed! Please check your credentials.', {
					autoClose: 3000,
				});
			});
	};

	const register = (userData) => {
		axios
			.post(`${BASE_URL}/register/`, userData)
			.then((response) => {
				console.log('Registration Success', response.data);
				toast.success('Registration successful!', { autoClose: 3000 });
			})
			.catch((error) => {
				console.error('An error occurred while creating user', error);
				toast.error('Registration failed! Please try again.', {
					autoClose: 3000,
				});
			});
	};

	const logout = () => {
		localStorage.removeItem('accessToken');
		localStorage.removeItem('refreshToken');
		setUser(null);
		toast.info('You have been logged out.', { autoClose: 3000 });
	};

	const toggleTheme = () => {
		setIsDarkMode(!isDarkMode);
	};

	const contextValue = {
		searchQuery,
		setSearchQuery,
		user,
		login,
		logout,
		register,
		isDarkMode,
		toggleTheme,
	};

	return (
		<AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
	);
};

export const useApp = () => useContext(AppContext);
