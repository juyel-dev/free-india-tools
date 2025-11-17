import React, { useState } from 'react';
import { Star, Heart, ExternalLink, Copy, Flag } from 'lucide-react';
import Card from '../ui/card';
import Button from '../ui/button';
import { useAuth } from '../../contexts/auth-context';
import { useNotification } from '../../contexts/notification-context';

const ToolCard = ({ tool, onFavorite, onReport }) => {
  const { user } = useAuth();
  const { addNotification } = useNotification();
  const [isCopied, setIsCopied] = useState(false);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(tool.link);
    setIsCopied(true);
    addNotification('Link copied to clipboard!', 'success');
    setTimeout(() => setIsCopied(false), 2000);
  };

  const handleVisit = () => {
    // Track click
    console.log('Visiting tool:', tool.name);
    window.open(tool.link, '_blank');
  };

  return (
    <Card className="hover:shadow-md transition-shadow">
      <div className="relative">
        <img
          src={tool.imageUrl || '/placeholder-tool.jpg'}
          alt={tool.name}
          className="w-full h-40 object-cover rounded-t-lg"
        />
        {tool.featured && (
          <span className="absolute top-2 right-2 bg-saffron text-white text-xs px-2 py-1 rounded-full">
            Featured
          </span>
        )}
      </div>

      <div className="mt-4">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
              {tool.name}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              {tool.description}
            </p>
          </div>
          <div className="flex items-center">
            <Star className="h-4 w-4 text-yellow-400 fill-yellow-400 mr-1" />
            <span className="text-sm font-medium">
              {tool.rating?.toFixed(1) || '0.0'}
            </span>
          </div>
        </div>

        <div className="mt-3 flex flex-wrap gap-2">
          <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-xs rounded-full">
            {tool.category}
          </span>
          {tool.madeInIndia && (
            <span className="px-2 py-1 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 text-xs rounded-full">
              Made in India
            </span>
          )}
          {tool.noLogin && (
            <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-xs rounded-full">
              No Login
            </span>
          )}
        </div>

        <div className="mt-4 flex justify-between items-center">
          <div className="flex space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handleVisit}
              icon={ExternalLink}
            >
              Visit
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={handleCopyLink}
              icon={Copy}
            >
              {isCopied ? 'Copied!' : 'Copy'}
            </Button>
          </div>

          <div className="flex space-x-2">
            {user && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => onFavorite(tool)}
                icon={Heart}
                className={tool.isFavorited ? 'text-red-500' : ''}
              />
            )}
            <Button
              variant="outline"
              size="sm"
              onClick={() => onReport(tool)}
              icon={Flag}
            />
          </div>
        </div>

        <div className="mt-3 pt-3 border-t border-gray-200 dark:border-gray-700 text-xs text-gray-500 dark:text-gray-400">
          Submitted by {tool.submittedByName}
        </div>
      </div>
    </Card>
  );
};

export default ToolCard;
