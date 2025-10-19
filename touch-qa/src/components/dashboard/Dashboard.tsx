import React from 'react';
import { motion } from 'framer-motion';
import { StatsCards } from './StatsCards';
import { TopicsChart } from './TopicsChart';
import { CategoryChart } from './CategoryChart';
import { ActivityChart } from './ActivityChart';

export const Dashboard: React.FC = () => {

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-7xl mx-auto space-y-6"
    >
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Admin Dashboard</h1>
        <p className="text-gray-600">
          Overview of platform activity and engagement metrics
        </p>
      </div>

      <StatsCards />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <TopicsChart />
        <CategoryChart />
      </div>

      <ActivityChart />
    </motion.div>
  );
};