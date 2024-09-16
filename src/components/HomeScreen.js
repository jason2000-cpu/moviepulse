import React from 'react';

const HomeScreen = () => {
  const trendingMovies = [
    { id: 1, title: 'Tokyo Train', year: 2022, genre: 'Action movie', image: '/placeholder-image.jpg' },
    { id: 2, title: 'Moonfall', year: 2022, genre: 'Sci-fi', image: '/placeholder-image.jpg' },
    { id: 3, title: 'Life in Paris', year: 2023, genre: 'Documentary', image: '/placeholder-image.jpg' },
    { id: 4, title: 'House of Fashion', year: 2023, genre: 'Drama', image: '/placeholder-image.jpg' },
  ];

  return (
    <div className="space-y-8 pt-4">
      {/* Featured Content */}
      <div className="relative h-96 bg-purple-900 rounded-lg overflow-hidden">
        <img src="/placeholder-featured-image.jpg" alt="Insider" className="w-full h-full object-cover opacity-50" />
        <div className="absolute bottom-0 left-0 p-8 text-white">
          <h2 className="text-4xl font-bold mb-2">Insider</h2>
          <p className="text-lg mb-4">2022 | Comedy horror | 2 seasons</p>
          <button className="bg-purple-600 text-white px-6 py-2 rounded-full hover:bg-purple-700 transition duration-300">
            Watch now
          </button>
        </div>
      </div>

      {/* Trending Section */}
      <div>
        <h3 className="text-2xl font-bold mb-4">Trending</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {trendingMovies.map((movie) => (
            <div key={movie.id} className="bg-gray-800 rounded-lg shadow overflow-hidden">
              <img src={movie.image} alt={movie.title} className="w-full h-48 object-cover" />
              <div className="p-4">
                <h4 className="font-bold text-lg mb-1 text-white">{movie.title}</h4>
                <p className="text-sm text-gray-400">{movie.year} | {movie.genre}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomeScreen;