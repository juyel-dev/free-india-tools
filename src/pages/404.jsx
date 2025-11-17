import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../components/ui/button';
import { Home } from 'lucide-react';

const NotFound = () => {
  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-8 border border-gray-200 dark:border-gray-700">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-2">
          404
        </h1>
        <h2 className="text-2xl font-medium text-gray-700 dark:text-gray-300 mb-6">
          Page Not Found
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mb-8">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Button variant="primary" as={Link} to="/">
          <Home className="h-4 w-4 mr-2" />
          Go to Homepage
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
