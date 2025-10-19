import React from 'react';
import { motion } from 'framer-motion';
import { useData } from '../../contexts/DataContext';
import { 
  ChatBubbleLeftRightIcon,
  UserGroupIcon,
  HeartIcon,
  FireIcon
} from '@heroicons/react/24/outline';

export const StatsCards: React.FC = () => {
  const { topics, comments } = useData();

  const totalUsers = JSON.parse(localStorage.getItem('touch_users') || '[]').length;
  const totalLikes = topics.reduce((sum, topic) => sum + topic.likes, 0);
  const totalFavorites = topics.reduce((sum, topic) => sum + topic.favorites, 0);
  const hotTopics = topics.filter(topic => 
    topic.likes + topic.commentCount + topic.favorites > 5
  ).length;

  const stats = [
    {
      name: 'Total Topics',
      value: topics.length,
      icon: ChatBubbleLeftRightIcon,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100',
    },
    {
      name: 'Total Users',
      value: totalUsers,
      icon: UserGroupIcon,
      color: 'text-green-600',
      bgColor: 'bg-green-100',
    },
    {
      name: 'Total Comments',
      value: comments.length,
      icon: ChatBubbleLeftRightIcon,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100',
    },
    {
      name: 'Hot Topics',
      value: hotTopics,
      icon: FireIcon,
      color: 'text-orange-600',
      bgColor: 'bg-orange-100',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => (
        <motion.div
          key={stat.name}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="card"
        >
          <div className="flex items-center">
            <div className={`p-3 rounded-lg ${stat.bgColor}`}>
              <stat.icon className={`h-6 w-6 ${stat.color}`} />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">{stat.name}</p>
              <p className="text-2xl font-semibold text-gray-900">{stat.value}</p>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};