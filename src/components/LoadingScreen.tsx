import React from 'react';
import { motion } from 'framer-motion';
import { Cloud, CloudRain, CloudSun, Sun } from 'lucide-react';

const LoadingScreen: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-400 to-blue-600">
      <div className="text-center">
        <motion.div
          className="flex justify-center mb-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div 
            animate={{ 
              y: [0, -10, 0],
              rotate: [0, 5, 0],
            }}
            transition={{ 
              duration: 2, 
              repeat: Infinity,
              repeatType: 'reverse',
              ease: 'easeInOut',
              times: [0, 0.5, 1]
            }}
            className="text-yellow-300"
          >
            <Sun size={40} />
          </motion.div>
          
          <motion.div 
            animate={{ 
              y: [0, -8, 0],
              x: [0, 5, 0]
            }}
            transition={{ 
              duration: 3, 
              repeat: Infinity,
              repeatType: 'reverse',
              ease: 'easeInOut',
              times: [0, 0.5, 1],
              delay: 0.5
            }}
            className="text-white"
          >
            <Cloud size={40} />
          </motion.div>
          
          <motion.div 
            animate={{ 
              y: [0, -12, 0],
              x: [0, -5, 0]
            }}
            transition={{ 
              duration: 2.5, 
              repeat: Infinity,
              repeatType: 'reverse',
              ease: 'easeInOut',
              times: [0, 0.5, 1],
              delay: 0.2
            }}
            className="text-white"
          >
            <CloudSun size={40} />
          </motion.div>
          
          <motion.div 
            animate={{ 
              y: [0, -5, 0],
            }}
            transition={{ 
              duration: 1.5, 
              repeat: Infinity,
              repeatType: 'reverse',
              ease: 'easeInOut',
              times: [0, 0.5, 1],
              delay: 0.8
            }}
            className="text-blue-300"
          >
            <CloudRain size={40} />
          </motion.div>
        </motion.div>
        
        <motion.h1
          className="text-3xl text-white font-bold mb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          Weather App
        </motion.h1>
        
        <motion.div
          className="bg-white/20 backdrop-blur-md px-8 py-4 rounded-full inline-block"
          initial={{ width: 0, opacity: 0 }}
          animate={{ 
            width: 200, 
            opacity: 1,
            transition: { duration: 1, delay: 0.7 }
          }}
        >
          <motion.div
            className="h-1.5 bg-white rounded-full"
            initial={{ width: '0%' }}
            animate={{ width: '100%' }}
            transition={{ 
              duration: 2,
              repeat: Infinity,
              repeatType: 'loop',
              ease: 'easeInOut'
            }}
          />
        </motion.div>
        
        <motion.p
          className="text-white/80 mt-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 1 }}
        >
          Loading weather data...
        </motion.p>
      </div>
    </div>
  );
};

export default LoadingScreen;