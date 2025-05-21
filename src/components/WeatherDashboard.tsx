import React from 'react';
import { motion } from 'framer-motion';
import { Thermometer, ThermometerSnowflake, RefreshCw } from 'lucide-react';
import { WeatherData, WeatherCondition } from '../types/weather';
import CurrentWeather from './CurrentWeather';
import Forecast from './Forecast';
import { getWeatherTheme } from '../utils/weather';

interface WeatherDashboardProps {
  weatherData: WeatherData;
  condition: WeatherCondition;
  unit: 'celsius' | 'fahrenheit';
  onUnitToggle: () => void;
  onRefresh: () => void;
}

const WeatherDashboard: React.FC<WeatherDashboardProps> = ({
  weatherData,
  condition,
  unit,
  onUnitToggle,
  onRefresh,
}) => {
  const theme = getWeatherTheme(condition);

  return (
    <div className={`p-4 sm:p-6 rounded-xl ${theme.textColor}`}>
      <div className="flex justify-between items-center mb-6">
        <motion.h1 
          className="text-2xl sm:text-3xl font-bold"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          Weather Dashboard
        </motion.h1>
        
        <div className="flex space-x-2">
          <motion.button
            className={`p-2 ${theme.cardBg} rounded-full hover:bg-white/30 transition-colors`}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={onUnitToggle}
            aria-label={`Switch to ${unit === 'celsius' ? 'Fahrenheit' : 'Celsius'}`}
          >
            {unit === 'celsius' ? (
              <Thermometer size={20} className={theme.iconColor} />
            ) : (
              <ThermometerSnowflake size={20} className={theme.iconColor} />
            )}
          </motion.button>
          
          <motion.button
            className={`p-2 ${theme.cardBg} rounded-full hover:bg-white/30 transition-colors`}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={onRefresh}
            aria-label="Refresh weather data"
          >
            <RefreshCw size={20} className={theme.iconColor} />
          </motion.button>
        </div>
      </div>
      
      <CurrentWeather
        weatherData={weatherData}
        condition={condition}
        unit={unit}
        theme={theme}
      />
      
      <Forecast 
        weatherData={weatherData}
        unit={unit}
        theme={theme}
      />
    </div>
  );
};

export default WeatherDashboard;