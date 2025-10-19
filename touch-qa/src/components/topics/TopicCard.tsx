import React from 'react';
import { motion } from 'framer-motion';
import { Topic } from '../../contexts/DataContext';
import { useAuth } from '../../contexts/AuthContext';
import { useData } from '../../contexts/DataContext';
import { 
  HandThumbUpIcon, 
  HandThumbDownIcon, 
  HeartIcon, 
  ChatBubbleLeftIcon,
  FireIcon 
} from '@heroicons/react/24/outline';
import { 
  HandThumbUpIcon as HandThumbUpSolidIcon, 
  HandThumbDownIcon as HandThumbDownSolidIcon, 
  HeartIcon as HeartSolidIcon 
} from '@heroicons/react/24/solid';

interface TopicCardProps {
  topic: Topic;
  onClick: () => void;
}

export const TopicCard: React.FC<TopicCardProps> = ({ topic, onClick }) => {
  const { user } = useAuth();
  const { toggleTopicLike, toggleTopicDislike, toggleTopicFavorite } = useData();

  const hasLiked = user ? topic.likedBy.includes(user.id) : false;
  const hasDisliked = user ? topic.dislikedBy.includes(user.id) : false;
  const hasFavorited = user ? topic.favoritedBy.includes(user.id) : false;

  const handleLike = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (user) {
      toggleTopicLike(topic.id, user.id);
    }
  };

  const handleDislike = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (user) {
      toggleTopicDislike(topic.id, user.id);
    }
  };

  const handleFavorite = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (user) {
      toggleTopicFavorite(topic.id, user.id);
    }
  };

  const isHot = topic.likes + topic.commentCount + topic.favorites > 5;

  return (
    <motion.div
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.98 }}
      className="card cursor-pointer hover:shadow-md transition-shadow"
      onClick={onClick}
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center space-x-2">
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-100 text-primary-800">
            {topic.category}
          </span>
          {isHot && (
            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
              className="flex items-center space-x-1 text-orange-500"
            >
              <FireIcon className="h-4 w-4" />
              <span className="text-xs font-medium">Hot</span>
            </motion.div>
          )}
        </div>
        <span className="text-xs text-gray-500">
          {new Date(topic.createdAt).toLocaleDateString()}
        </span>
      </div>

      <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
        {topic.title}
      </h3>
      
      <p className="text-gray-600 text-sm mb-4 line-clamp-3">
        {topic.content}
      </p>

      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button
            onClick={handleLike}
            className={`flex items-center space-x-1 text-sm transition-colors ${
              hasLiked ? 'text-green-600' : 'text-gray-500 hover:text-green-600'
            }`}
          >
            {hasLiked ? (
              <HandThumbUpSolidIcon className="h-4 w-4" />
            ) : (
              <HandThumbUpIcon className="h-4 w-4" />
            )}
            <span>{topic.likes}</span>
          </button>

          <button
            onClick={handleDislike}
            className={`flex items-center space-x-1 text-sm transition-colors ${
              hasDisliked ? 'text-red-600' : 'text-gray-500 hover:text-red-600'
            }`}
          >
            {hasDisliked ? (
              <HandThumbDownSolidIcon className="h-4 w-4" />
            ) : (
              <HandThumbDownIcon className="h-4 w-4" />
            )}
            <span>{topic.dislikes}</span>
          </button>

          <div className="flex items-center space-x-1 text-sm text-gray-500">
            <ChatBubbleLeftIcon className="h-4 w-4" />
            <span>{topic.commentCount}</span>
          </div>
        </div>

        <button
          onClick={handleFavorite}
          className={`flex items-center space-x-1 text-sm transition-colors ${
            hasFavorited ? 'text-red-500' : 'text-gray-500 hover:text-red-500'
          }`}
        >
          {hasFavorited ? (
            <HeartSolidIcon className="h-4 w-4" />
          ) : (
            <HeartIcon className="h-4 w-4" />
          )}
          <span>{topic.favorites}</span>
        </button>
      </div>
    </motion.div>
  );
};