import React from 'react';
import { motion } from 'framer-motion';
import ForecastCard from './ForecastCard';
import { WeatherData } from '../types/weather';

interface ForecastProps {
  weatherData: WeatherData;
  unit: 'celsius' | 'fahrenheit';
  theme: {
    backgroundColor: string;
    textColor: string;
    cardBg: string;
    iconColor: string;
  };
}

const Forecast: React.FC<ForecastProps> = ({ weatherData, unit, theme }) => {
  return (
    <motion.div
      className="mt-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.3 }}
    >
      <h2 className={`text-xl font-semibold mb-4 ${theme.textColor}`}>
        5-Day Forecast
      </h2>
      
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
        {weatherData.forecast.forecastday.map((day, index) => (
          <ForecastCard
            key={day.date}
            forecast={day}
            unit={unit}
            index={index}
            theme={theme}
          />
        ))}
      </div>
    </motion.div>
  );
};

export default Forecast;