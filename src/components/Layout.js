// src/components/Layout.js

import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import ProfileDropdown from './ProfileDropdown';

const Layout = () => {
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-md">
        <div className="p-4">
          <h1 className="text-2xl font-bold mb-8">WATCH</h1>
          <nav>
            <ul className="space-y-2">
              <li><Link to="/home" className="block py-2 px-4 hover:bg-gray-100 rounded">Home</Link></li>
              <li><Link to="/favorites" className="block py-2 px-4 hover:bg-gray-100 rounded">Favorites</Link></li>
              <li><Link to="/trending" className="block py-2 px-4 hover:bg-gray-100 rounded">Trending</Link></li>
              <li><Link to="/coming-soon" className="block py-2 px-4 hover:bg-gray-100 rounded">Coming Soon</Link></li>
            </ul>
          </nav>
        </div>
      </div>

      {/* Main content area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white shadow-sm p-4 flex justify-between items-center">
          <div className="flex space-x-4">
            <Link to="/movies" className="text-gray-700 hover:text-gray-900">Movies</Link>
            <Link to="/series" className="text-gray-700 hover:text-gray-900">Series</Link>
            <Link to="/documentaries" className="text-gray-700 hover:text-gray-900">Documentaries</Link>
          </div>
          <div className="flex items-center space-x-4">
            <input type="search" placeholder="Search..." className="border rounded-full px-4 py-1" />
            <ProfileDropdown username="Tatiana" />
          </div>
        </header>
        <main className="flex-1 overflow-y-auto p-4">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;