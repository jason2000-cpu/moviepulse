import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Bell } from 'lucide-react';
import ProfileDropdown from './ProfileDropdown';

const Header = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    console.log('Searching for:', searchQuery);
    // Implement search functionality here
  };

  return (
    <header className="bg-gray-900 text-white p-4 flex justify-between items-center">
      <div className="flex items-center space-x-6">
        <Link to="/" className="text-2xl font-bold">WATCH</Link>
        <nav>
          <ul className="flex space-x-6">
            <li><Link to="/movies" className="hover:text-purple-400">Movies</Link></li>
            <li><Link to="/series" className="hover:text-purple-400">Series</Link></li>
            <li><Link to="/documentaries" className="hover:text-purple-400">Documentaries</Link></li>
          </ul>
        </nav>
      </div>
      <div className="flex items-center space-x-4">
        <form onSubmit={handleSearch} className="relative">
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="bg-gray-800 text-white px-4 py-2 pr-10 rounded-full focus:outline-none focus:ring-2 focus:ring-purple-600"
          />
          <button type="submit" className="absolute right-3 top-1/2 transform -translate-y-1/2">
            <Search className="w-5 h-5 text-gray-400" />
          </button>
        </form>
        <Bell className="w-5 h-5 text-gray-400 cursor-pointer hover:text-white" />
        <ProfileDropdown username="Tatiana" />
      </div>
    </header>
  );
};

export default Header;