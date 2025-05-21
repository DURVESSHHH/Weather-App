import React, { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { WeatherCondition } from '../types/weather';
import { getWeatherTheme } from '../utils/weather';

interface MainLayoutProps {
  children: ReactNode;
  condition: WeatherCondition;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children, condition }) => {
  const theme = getWeatherTheme(condition);

  return (
    <motion.div
      className={`min-h-screen ${theme.backgroundColor} transition-colors duration-1000 ease-in-out`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <div className="container mx-auto px-4 py-8 sm:py-12 max-w-5xl">
        {children}
      </div>
      
      {/* Weather animations based on condition */}
      {condition === 'rainy' && <RainAnimation />}
      {condition === 'snowy' && <SnowAnimation />}
      {condition === 'sunny' && <SunnyAnimation />}
      {condition === 'cloudy' && <CloudyAnimation />}
    </motion.div>
  );
};

const RainAnimation: React.FC = () => {
  // Create an array of raindrops with random positions
  const raindrops = Array.from({ length: 50 }, (_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    delay: Math.random() * 5,
    duration: 0.8 + Math.random() * 1.2,
  }));

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {raindrops.map((drop) => (
        <motion.div
          key={drop.id}
          className="absolute top-0 w-0.5 h-4 bg-blue-200/40 rounded-full"
          style={{ left: drop.left }}
          initial={{ y: -20 }}
          animate={{ y: '100vh' }}
          transition={{
            duration: drop.duration,
            repeat: Infinity,
            delay: drop.delay,
            ease: 'linear',
          }}
        />
      ))}
    </div>
  );
};

const SnowAnimation: React.FC = () => {
  // Create an array of snowflakes with random positions
  const snowflakes = Array.from({ length: 50 }, (_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    delay: Math.random() * 5,
    duration: 5 + Math.random() * 5,
    size: 3 + Math.random() * 5,
  }));

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {snowflakes.map((flake) => (
        <motion.div
          key={flake.id}
          className="absolute top-0 bg-white rounded-full opacity-80"
          style={{ 
            left: flake.left, 
            width: flake.size, 
            height: flake.size 
          }}
          initial={{ y: -20 }}
          animate={{ 
            y: '100vh',
            x: ['-5px', '5px', '-5px'],
          }}
          transition={{
            y: {
              duration: flake.duration,
              repeat: Infinity,
              delay: flake.delay,
              ease: 'linear',
            },
            x: {
              duration: flake.duration / 3,
              repeat: Infinity,
              repeatType: 'mirror',
              ease: 'easeInOut',
            }
          }}
        />
      ))}
    </div>
  );
};

const SunnyAnimation: React.FC = () => {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      <motion.div
        className="absolute top-10 right-10 w-32 h-32 rounded-full bg-yellow-300 opacity-30 blur-xl"
        animate={{
          scale: [1, 1.05, 1],
          opacity: [0.3, 0.35, 0.3],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
      
      {/* Sun rays */}
      <motion.div
        className="absolute top-5 right-5 w-40 h-40 opacity-20"
        style={{
          background: 'radial-gradient(circle, rgba(255,236,160,1) 0%, rgba(255,255,255,0) 70%)',
        }}
        animate={{
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
    </div>
  );
};

const CloudyAnimation: React.FC = () => {
  const clouds = [
    { id: 1, top: '10%', left: '10%', size: 1, speed: 40 },
    { id: 2, top: '15%', left: '30%', size: 1.5, speed: 50 },
    { id: 3, top: '20%', left: '60%', size: 0.8, speed: 35 },
    { id: 4, top: '25%', left: '80%', size: 1.2, speed: 45 },
  ];

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {clouds.map((cloud) => (
        <motion.div
          key={cloud.id}
          className="absolute bg-white opacity-30 rounded-full blur-xl"
          style={{ 
            top: cloud.top, 
            left: `-20%`,
            width: `${100 * cloud.size}px`,
            height: `${60 * cloud.size}px`,
          }}
          animate={{ 
            x: ['0vw', '120vw'],
          }}
          transition={{
            x: {
              duration: cloud.speed,
              repeat: Infinity,
              ease: 'linear',
            },
          }}
        />
      ))}
    </div>
  );
};

export default MainLayout;