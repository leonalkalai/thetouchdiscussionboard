import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { LoginForm } from './LoginForm';
import { RegisterForm } from './RegisterForm';
import { TouchLogo } from '../common/TouchLogo';
import { seedDemoData } from '../../utils/seedData';

export const AuthPage: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);

  const handleSeedData = () => {
    seedDemoData();
    window.location.reload();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-secondary-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8"
        >
          <TouchLogo size="large" />
        </motion.div>

        {isLogin ? (
          <LoginForm onSwitchToRegister={() => setIsLogin(false)} />
        ) : (
          <RegisterForm onSwitchToLogin={() => setIsLogin(true)} />
        )}

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-8 text-center"
        >
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h3 className="text-sm font-medium text-blue-800 mb-2">Demo Mode</h3>
            <p className="text-xs text-blue-600 mb-3">
              Try the platform with sample data and users
            </p>
            <button
              onClick={handleSeedData}
              className="text-xs bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded transition-colors"
            >
              Load Demo Data
            </button>
            <p className="text-xs text-blue-500 mt-2">
              Demo login: admin@touch.com / admin123
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};