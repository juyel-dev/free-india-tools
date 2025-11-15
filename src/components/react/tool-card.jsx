import { useState } from 'react';
import { Star, ExternalLink, Copy, Heart, Flag } from 'lucide-react';
import { clsx } from 'clsx';
import Button from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { copyToClipboard, formatNumber, getCategoryColor } from '@/utils/helpers';
import { trackToolClick, trackToolView } from '@/services/analytics';
import { useTools } from '@/hooks/use-tools';

const ToolCard = ({ tool }) => {
  const [isFavorited, setIsFavorited] = useState(false);
  const { incrementClicks } = useTools();

  const handleVisit = () => {
    incrementClicks(tool.id);
    trackToolClick(tool.id, tool.name, tool.url);
    window.open(tool.url, '_blank', 'noopener,noreferrer');
  };

  const handleCopyLink = () => {
    copyToClipboard(tool.url, 'Link copied!');
  };

  const handleFavorite = () => {
    setIsFavorited(!isFavorited);
    // TODO: Save to user favorites in Firestore
  };

  const handleReport = () => {
    // TODO: Open report modal
    console.log('Report tool:', tool.id);
  };

  const categoryColor = getCategoryColor(tool.category);

  return (
    <Card padding="none" className="tool-card group">
      {/* Image */}
      <div className="relative overflow-hidden">
        <img
          src={tool.imageUrl || 'https://via.placeholder.com/800x450/3b82f6/ffffff?text=No+Image'}
          alt={tool.name}
          className="tool-card-image transition-transform duration-300 group-hover:scale-105"
          loading="lazy"
        />
        {tool.featured && (
          <div className="tool-card-badge">
            <Star size={12} fill="currentColor" />
            Featured
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4">
        {/* Title */}
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 line-clamp-1">
          {tool.name}
        </h3>

        {/* Description */}
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-3 line-clamp-2">
          {tool.description}
        </p>

        {/* Meta Info */}
        <div className="flex items-center gap-3 mb-3 text-xs text-gray-500 dark:text-gray-400">
          {/* Rating */}
          <div className="flex items-center gap-1">
            <Star size={14} className="text-yellow-400" fill="currentColor" />
            <span className="font-medium">{tool.rating?.toFixed(1) || '0.0'}</span>
          </div>

          {/* Clicks */}
          <div className="flex items-center gap-1">
            <ExternalLink size={14} />
            <span>{formatNumber(tool.clicks || 0)}</span>
          </div>

          {/* Category Badge */}
          <span className={clsx('category-badge', categoryColor)}>
            {tool.category}
          </span>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2">
          <Button
            variant="primary"
            size="sm"
            className="flex-1"
            icon={<ExternalLink size={16} />}
            onClick={handleVisit}
          >
            Visit
          </Button>

          <Button
            variant="outline"
            size="sm"
            onClick={handleCopyLink}
            icon={<Copy size={16} />}
            title="Copy link"
          />

          <Button
            variant="outline"
            size="sm"
            onClick={handleFavorite}
            icon={<Heart size={16} fill={isFavorited ? 'currentColor' : 'none'} />}
            title="Favorite"
            className={clsx(isFavorited && 'text-red-500 border-red-500')}
          />

          <Button
            variant="ghost"
            size="sm"
            onClick={handleReport}
            icon={<Flag size={16} />}
            title="Report"
          />
        </div>
      </div>
    </Card>
  );
};

export default ToolCard;
