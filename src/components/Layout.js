import React, { useState } from 'react';
import { Outlet, Link, useNavigate } from 'react-router-dom';
import ProfileDropdown from './ProfileDropdown';

const Layout = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <div className="flex h-screen bg-gray-900 text-white">
      {/* Sidebar - keeping it as is */}
      <div className="w-64 bg-gray-900 shadow-md">
        {/* The existing sidebar content */}
      </div>
      {/* Main content area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top navigation bar */}
        <nav className="bg-gray-900 shadow-sm p-4 flex justify-between items-center fixed top-0 left-64 right-0 z-50">
          <div className="flex space-x-6">
            <Link to="/movies" className="text-gray-300 hover:text-white transition duration-150 ease-in-out">Movies</Link>
            <Link to="/series" className="text-gray-300 hover:text-white transition duration-150 ease-in-out">Series</Link>
            <Link to="/documentaries" className="text-gray-300 hover:text-white transition duration-150 ease-in-out">Documentaries</Link>
          </div>
          <div className="flex items-center space-x-4">
            <form onSubmit={handleSearch} className="relative">
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-gray-800 text-white rounded-full px-4 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-purple-600"
              />
              <button type="submit" className="absolute right-3 top-1/2 transform -translate-y-1/2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                </svg>
              </button>
            </form>
            <button className="text-gray-300 hover:text-white" title="Notifications">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z" />
              </svg>
            </button>
            <ProfileDropdown username="Tatiana" />
          </div>
        </nav>
        {/* Main content */}
        <main className="flex-1 overflow-y-auto p-4 bg-gray-900 mt-16">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;