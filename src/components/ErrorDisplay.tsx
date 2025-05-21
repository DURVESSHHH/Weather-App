import React from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle, RefreshCcw } from 'lucide-react';
import { WeatherError } from '../types/weather';

interface ErrorDisplayProps {
  error: WeatherError;
  onRetry: () => void;
}

const ErrorDisplay: React.FC<ErrorDisplayProps> = ({ error, onRetry }) => {
  return (
    <motion.div
      className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-red-700 to-red-900"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="bg-white/20 backdrop-blur-md rounded-2xl p-8 max-w-md w-full border border-white/30 text-center">
        <motion.div
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5, type: 'spring' }}
        >
          <AlertTriangle size={60} className="mx-auto text-red-300 mb-4" />
        </motion.div>
        
        <h2 className="text-2xl font-bold text-white mb-2">Weather Data Error</h2>
        
        <p className="text-white/90 mb-6">
          {error.message || 'Unable to fetch weather data. Please try again.'}
        </p>
        
        {error.code && (
          <p className="text-white/70 text-sm mb-6">
            Error code: {error.code}
          </p>
        )}
        
        <motion.button
          className="bg-white/20 hover:bg-white/30 text-white py-3 px-6 rounded-full 
                   flex items-center justify-center mx-auto border border-white/50 transition-colors"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onRetry}
        >
          <RefreshCcw size={18} className="mr-2" />
          Try Again
        </motion.button>
      </div>
    </motion.div>
  );
};

export default ErrorDisplay;