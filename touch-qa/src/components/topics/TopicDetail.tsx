import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useData } from '../../contexts/DataContext';
import { useAuth } from '../../contexts/AuthContext';
import { CommentCard } from '../comments/CommentCard';
import { CommentForm } from '../comments/CommentForm';
import { 
  ArrowLeftIcon,
  HandThumbUpIcon, 
  HandThumbDownIcon, 
  HeartIcon, 
  ChatBubbleLeftIcon 
} from '@heroicons/react/24/outline';
import { 
  HandThumbUpIcon as HandThumbUpSolidIcon, 
  HandThumbDownIcon as HandThumbDownSolidIcon, 
  HeartIcon as HeartSolidIcon 
} from '@heroicons/react/24/solid';

interface TopicDetailProps {
  topicId: string;
  onBack: () => void;
}

export const TopicDetail: React.FC<TopicDetailProps> = ({ topicId, onBack }) => {
  const { topics, getTopicComments, toggleTopicLike, toggleTopicDislike, toggleTopicFavorite } = useData();
  const { user } = useAuth();
  const [showCommentForm, setShowCommentForm] = useState(false);

  const topic = topics.find(t => t.id === topicId);
  const comments = getTopicComments(topicId);

  if (!topic) {
    return (
      <div className="text-center py-12">
        <div className="text-gray-500 text-lg">Topic not found</div>
        <button onClick={onBack} className="mt-4 btn-primary">
          Go Back
        </button>
      </div>
    );
  }

  const hasLiked = user ? topic.likedBy.includes(user.id) : false;
  const hasDisliked = user ? topic.dislikedBy.includes(user.id) : false;
  const hasFavorited = user ? topic.favoritedBy.includes(user.id) : false;

  const handleLike = () => {
    if (user) {
      toggleTopicLike(topic.id, user.id);
    }
  };

  const handleDislike = () => {
    if (user) {
      toggleTopicDislike(topic.id, user.id);
    }
  };

  const handleFavorite = () => {
    if (user) {
      toggleTopicFavorite(topic.id, user.id);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-4xl mx-auto"
    >
      {/* Header */}
      <div className="mb-6">
        <button
          onClick={onBack}
          className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 mb-4"
        >
          <ArrowLeftIcon className="h-5 w-5" />
          <span>Back to topics</span>
        </button>
      </div>

      {/* Topic */}
      <div className="card mb-6">
        <div className="flex items-start justify-between mb-4">
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-100 text-primary-800">
            {topic.category}
          </span>
          <span className="text-sm text-gray-500">
            {new Date(topic.createdAt).toLocaleDateString()}
          </span>
        </div>

        <h1 className="text-2xl font-bold text-gray-900 mb-4">
          {topic.title}
        </h1>

        <div className="prose prose-gray max-w-none mb-6">
          <p className="text-gray-700 whitespace-pre-wrap">
            {topic.content}
          </p>
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-gray-200">
          <div className="flex items-center space-x-6">
            <button
              onClick={handleLike}
              className={`flex items-center space-x-2 transition-colors ${
                hasLiked ? 'text-green-600' : 'text-gray-500 hover:text-green-600'
              }`}
            >
              {hasLiked ? (
                <HandThumbUpSolidIcon className="h-5 w-5" />
              ) : (
                <HandThumbUpIcon className="h-5 w-5" />
              )}
              <span className="font-medium">{topic.likes}</span>
            </button>

            <button
              onClick={handleDislike}
              className={`flex items-center space-x-2 transition-colors ${
                hasDisliked ? 'text-red-600' : 'text-gray-500 hover:text-red-600'
              }`}
            >
              {hasDisliked ? (
                <HandThumbDownSolidIcon className="h-5 w-5" />
              ) : (
                <HandThumbDownIcon className="h-5 w-5" />
              )}
              <span className="font-medium">{topic.dislikes}</span>
            </button>

            <div className="flex items-center space-x-2 text-gray-500">
              <ChatBubbleLeftIcon className="h-5 w-5" />
              <span className="font-medium">{topic.commentCount}</span>
            </div>
          </div>

          <button
            onClick={handleFavorite}
            className={`flex items-center space-x-2 transition-colors ${
              hasFavorited ? 'text-red-500' : 'text-gray-500 hover:text-red-500'
            }`}
          >
            {hasFavorited ? (
              <HeartSolidIcon className="h-5 w-5" />
            ) : (
              <HeartIcon className="h-5 w-5" />
            )}
            <span className="font-medium">{topic.favorites}</span>
          </button>
        </div>
      </div>

      {/* Comments Section */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-gray-900">
            Comments ({comments.length})
          </h2>
          <button
            onClick={() => setShowCommentForm(!showCommentForm)}
            className="btn-primary"
          >
            Add Comment
          </button>
        </div>

        {showCommentForm && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
          >
            <CommentForm
              topicId={topicId}
              onCancel={() => setShowCommentForm(false)}
              onSubmit={() => setShowCommentForm(false)}
            />
          </motion.div>
        )}

        <div className="space-y-4">
          {comments.map((comment, index) => (
            <motion.div
              key={comment.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <CommentCard comment={comment} />
            </motion.div>
          ))}
        </div>

        {comments.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            No comments yet. Be the first to share your thoughts!
          </div>
        )}
      </div>
    </motion.div>
  );
};