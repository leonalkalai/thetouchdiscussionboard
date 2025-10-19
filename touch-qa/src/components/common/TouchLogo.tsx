import React from 'react';
import { motion } from 'framer-motion';

interface TouchLogoProps {
  size?: 'small' | 'medium' | 'large';
  className?: string;
}

export const TouchLogo: React.FC<TouchLogoProps> = ({ size = 'medium', className = '' }) => {
  const sizeClasses = {
    small: 'h-8 w-8',
    medium: 'h-12 w-12',
    large: 'h-16 w-16',
  };

  const textSizeClasses = {
    small: 'text-xl',
    medium: 'text-2xl',
    large: 'text-4xl',
  };

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className={`flex items-center space-x-3 ${className}`}
    >
      <div className={`${sizeClasses[size]} bg-gradient-to-br from-primary-500 to-secondary-500 rounded-xl flex items-center justify-center shadow-lg`}>
        <motion.div
          animate={{
            rotate: [0, 10, -10, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            repeatType: "reverse",
          }}
          className="text-white font-bold text-lg"
        >
          T
        </motion.div>
      </div>
      <span className={`font-bold bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent ${textSizeClasses[size]}`}>
        Touch
      </span>
    </motion.div>
  );
};