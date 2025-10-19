import React from 'react';
import { motion } from 'framer-motion';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { useData } from '../../contexts/DataContext';

ChartJS.register(ArcElement, Tooltip, Legend);

export const CategoryChart: React.FC = () => {
  const { topics } = useData();

  // Count topics by category
  const categoryCount = topics.reduce((acc, topic) => {
    acc[topic.category] = (acc[topic.category] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const categories = Object.keys(categoryCount);
  const counts = Object.values(categoryCount);

  const colors = [
    '#3B82F6', // Blue
    '#10B981', // Green
    '#F59E0B', // Yellow
    '#EF4444', // Red
    '#8B5CF6', // Purple
    '#F97316', // Orange
    '#06B6D4', // Cyan
    '#84CC16', // Lime
    '#EC4899', // Pink
  ];

  const data = {
    labels: categories,
    datasets: [
      {
        data: counts,
        backgroundColor: colors.slice(0, categories.length),
        borderColor: colors.slice(0, categories.length).map(color => color + '80'),
        borderWidth: 2,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom' as const,
      },
      title: {
        display: true,
        text: 'Topics by Category',
      },
    },
  };

  if (topics.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="card flex items-center justify-center h-64"
      >
        <div className="text-center text-gray-500">
          <p>No topics yet</p>
          <p className="text-sm">Create some topics to see category distribution</p>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="card"
    >
      <Doughnut data={data} options={options} />
    </motion.div>
  );
};