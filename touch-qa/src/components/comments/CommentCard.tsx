import React from 'react';
import { motion } from 'framer-motion';
import { Comment } from '../../contexts/DataContext';
import { useAuth } from '../../contexts/AuthContext';
import { useData } from '../../contexts/DataContext';
import { 
  HandThumbUpIcon, 
  HandThumbDownIcon 
} from '@heroicons/react/24/outline';
import { 
  HandThumbUpIcon as HandThumbUpSolidIcon, 
  HandThumbDownIcon as HandThumbDownSolidIcon 
} from '@heroicons/react/24/solid';

interface CommentCardProps {
  comment: Comment;
}

export const CommentCard: React.FC<CommentCardProps> = ({ comment }) => {
  const { user } = useAuth();
  const { toggleCommentLike, toggleCommentDislike } = useData();

  const hasLiked = user ? comment.likedBy.includes(user.id) : false;
  const hasDisliked = user ? comment.dislikedBy.includes(user.id) : false;

  const handleLike = () => {
    if (user) {
      toggleCommentLike(comment.id, user.id);
    }
  };

  const handleDislike = () => {
    if (user) {
      toggleCommentDislike(comment.id, user.id);
    }
  };

  return (
    <motion.div
      whileHover={{ x: 4 }}
      className="bg-gray-50 rounded-lg p-4 border border-gray-200"
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-gradient-to-br from-primary-400 to-secondary-400 rounded-full flex items-center justify-center">
            <span className="text-white text-sm font-medium">A</span>
          </div>
          <span className="text-sm font-medium text-gray-700">Anonymous</span>
        </div>
        <span className="text-xs text-gray-500">
          {new Date(comment.createdAt).toLocaleDateString()}
        </span>
      </div>

      <p className="text-gray-700 mb-3 whitespace-pre-wrap">
        {comment.content}
      </p>

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
          <span>{comment.likes}</span>
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
          <span>{comment.dislikes}</span>
        </button>
      </div>
    </motion.div>
  );
};