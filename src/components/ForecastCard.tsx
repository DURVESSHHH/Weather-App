import React from 'react';
import { motion } from 'framer-motion';
import { Cloud, Droplets } from 'lucide-react';
import { ForecastDay } from '../types/weather';
import { formatTemperature } from '../utils/weather';

interface ForecastCardProps {
  forecast: ForecastDay;
  unit: 'celsius' | 'fahrenheit';
  index: number;
  theme: {
    backgroundColor: string;
    textColor: string;
    cardBg: string;
    iconColor: string;
  };
}

const ForecastCard: React.FC<ForecastCardProps> = ({
  forecast,
  unit,
  index,
  theme,
}) => {
  const maxTemp = unit === 'celsius' ? forecast.day.maxtemp_c : forecast.day.maxtemp_f;
  const minTemp = unit === 'celsius' ? forecast.day.mintemp_c : forecast.day.mintemp_f;
  
  const date = new Date(forecast.date);
  const dayName = date.toLocaleDateString('en-US', { weekday: 'short' });
  const formattedDate = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  
  return (
    <motion.div
      className={`p-4 ${theme.cardBg} backdrop-blur-md rounded-xl border border-white/30 flex flex-col items-center`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
      whileHover={{ scale: 1.05, boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)' }}
    >
      <h3 className={`text-lg font-medium ${theme.textColor}`}>{dayName}</h3>
      <p className={`text-sm ${theme.textColor}/70 mb-2`}>{formattedDate}</p>
      
      <img
        src={`https:${forecast.day.condition.icon}`}
        alt={forecast.day.condition.text}
        className="w-16 h-16 my-2"
      />
      
      <p className={`text-sm font-medium ${theme.textColor}`}>
        {forecast.day.condition.text}
      </p>
      
      <div className="flex justify-between w-full mt-3">
        <div className="flex items-center">
          <span className={`text-lg font-bold ${theme.textColor}`}>
            {formatTemperature(maxTemp, unit)}
          </span>
        </div>
        <div className="flex items-center">
          <span className={`text-lg ${theme.textColor}/70`}>
            {formatTemperature(minTemp, unit)}
          </span>
        </div>
      </div>
      
      <div className="flex justify-between w-full mt-3">
        <div className="flex items-center">
          <Droplets className={`mr-1 ${theme.iconColor}`} size={16} />
          <span className={`text-sm ${theme.textColor}/90`}>
            {forecast.day.daily_chance_of_rain}%
          </span>
        </div>
        <div className="flex items-center">
          <Cloud className={`mr-1 ${theme.iconColor}`} size={16} />
          <span className={`text-sm ${theme.textColor}/90`}>
            {/* This would typically be cloud coverage percentage, but using rainfall chance as placeholder */}
            {100 - forecast.day.daily_chance_of_rain}%
          </span>
        </div>
      </div>
    </motion.div>
  );
};

export default ForecastCard;