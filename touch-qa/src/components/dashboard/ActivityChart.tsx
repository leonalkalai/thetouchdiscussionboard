import React from 'react';
import { motion } from 'framer-motion';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { useData } from '../../contexts/DataContext';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const ActivityChart: React.FC = () => {
  const { topics } = useData();

  // Get top 10 most active topics
  const topTopics = topics
    .sort((a, b) => (b.likes + b.commentCount + b.favorites) - (a.likes + a.commentCount + a.favorites))
    .slice(0, 10);

  const data = {
    labels: topTopics.map(topic => 
      topic.title.length > 30 ? topic.title.substring(0, 30) + '...' : topic.title
    ),
    datasets: [
      {
        label: 'Likes',
        data: topTopics.map(topic => topic.likes),
        backgroundColor: 'rgba(34, 197, 94, 0.8)',
      },
      {
        label: 'Comments',
        data: topTopics.map(topic => topic.commentCount),
        backgroundColor: 'rgba(59, 130, 246, 0.8)',
      },
      {
        label: 'Favorites',
        data: topTopics.map(topic => topic.favorites),
        backgroundColor: 'rgba(239, 68, 68, 0.8)',
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Most Active Topics',
      },
    },
    scales: {
      x: {
        stacked: true,
      },
      y: {
        stacked: true,
        beginAtZero: true,
      },
    },
  };

  if (topics.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="card flex items-center justify-center h-64"
      >
        <div className="text-center text-gray-500">
          <p>No activity data yet</p>
          <p className="text-sm">Create topics and engage with them to see activity metrics</p>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
      className="card"
    >
      <Bar data={data} options={options} />
    </motion.div>
  );
};