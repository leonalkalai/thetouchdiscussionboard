import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useData } from '../../contexts/DataContext';
import { TopicCard } from './TopicCard';
import { TopicDetail } from './TopicDetail';
import { FunnelIcon, FireIcon, ClockIcon } from '@heroicons/react/24/outline';

const categories = [
  'all',
  'Technology',
  'Science',
  'Sports',
  'Entertainment',
  'Politics',
  'Health',
  'Education',
  'Business',
  'Other'
];

export const TopicList: React.FC = () => {
  const { getFilteredTopics } = useData();
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);
  const [filter, setFilter] = useState<'all' | 'recent' | 'hot'>('all');
  const [category, setCategory] = useState('all');

  const topics = getFilteredTopics(filter, category);

  if (selectedTopic) {
    return (
      <TopicDetail
        topicId={selectedTopic}
        onBack={() => setSelectedTopic(null)}
      />
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Filters */}
      <div className="mb-6 space-y-4">
        <div className="flex items-center space-x-4">
          <FunnelIcon className="h-5 w-5 text-gray-500" />
          <span className="text-sm font-medium text-gray-700">Filter by:</span>
          
          <div className="flex space-x-2">
            <button
              onClick={() => setFilter('all')}
              className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                filter === 'all'
                  ? 'bg-primary-600 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              All
            </button>
            
            <button
              onClick={() => setFilter('recent')}
              className={`px-3 py-1 rounded-full text-sm font-medium transition-colors flex items-center space-x-1 ${
                filter === 'recent'
                  ? 'bg-primary-600 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              <ClockIcon className="h-3 w-3" />
              <span>Recent</span>
            </button>
            
            <button
              onClick={() => setFilter('hot')}
              className={`px-3 py-1 rounded-full text-sm font-medium transition-colors flex items-center space-x-1 ${
                filter === 'hot'
                  ? 'bg-primary-600 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              <FireIcon className="h-3 w-3" />
              <span>Hot</span>
            </button>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <span className="text-sm font-medium text-gray-700">Category:</span>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="px-3 py-1 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat === 'all' ? 'All Categories' : cat}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Topics */}
      <div className="space-y-4">
        {topics.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <div className="text-gray-500 text-lg mb-2">No topics found</div>
            <div className="text-gray-400 text-sm">
              Be the first to start a discussion in this category!
            </div>
          </motion.div>
        ) : (
          topics.map((topic, index) => (
            <motion.div
              key={topic.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <TopicCard
                topic={topic}
                onClick={() => setSelectedTopic(topic.id)}
              />
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
};