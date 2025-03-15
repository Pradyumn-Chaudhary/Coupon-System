import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-200 to-blue-300 flex items-center justify-center p-4">
      <div className="text-center bg-white p-8 rounded-xl shadow-lg max-w-md w-full">
        <h1 className="text-8xl font-bold !text-gray-900 mb-4">404</h1>
        <h2 className="text-3xl font-semibold !text-gray-800 mb-6">Page Not Found</h2>
        <p className="!text-gray-700 mb-8 leading-relaxed">
          Oops! It seems you've wandered off the path. 
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Link 
          to="/" 
          className="inline-block bg-blue-600 !text-white px-6 py-3 rounded-full font-semibold hover:bg-blue-700 transition-colors duration-300"
        >
          Return Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;