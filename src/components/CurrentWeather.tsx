import React from 'react';
import { motion } from 'framer-motion';
import { Wind, Droplets, ThermometerSun } from 'lucide-react';
import { formatTemperature, getWeatherEmoji } from '../utils/weather';
import { WeatherData, WeatherCondition } from '../types/weather';

interface CurrentWeatherProps {
  weatherData: WeatherData;
  condition: WeatherCondition;
  unit: 'celsius' | 'fahrenheit';
  theme: {
    backgroundColor: string;
    textColor: string;
    cardBg: string;
    iconColor: string;
  };
}

const CurrentWeather: React.FC<CurrentWeatherProps> = ({
  weatherData,
  condition,
  unit,
  theme,
}) => {
  const current = weatherData.current;
  const location = weatherData.location;
  const temperature = unit === 'celsius' ? current.temp_c : current.temp_f;
  const feelsLike = unit === 'celsius' ? current.feelslike_c : current.feelslike_f;

  return (
    <motion.div
      className={`p-6 ${theme.cardBg} backdrop-blur-md rounded-2xl border border-white/30`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex flex-col sm:flex-row items-center justify-between">
        <div className="text-center sm:text-left mb-4 sm:mb-0">
          <h2 className={`text-xl font-medium ${theme.textColor}`}>
            {location.name}, {location.country}
          </h2>
          <p className={`text-lg ${theme.textColor}/80`}>
            {new Date().toLocaleDateString('en-US', {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </p>
        </div>
        
        <motion.div
          className="flex items-center"
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <span className="text-5xl mr-2">{getWeatherEmoji(condition)}</span>
          <div className="text-right">
            <p className={`text-4xl font-bold ${theme.textColor}`}>
              {formatTemperature(temperature, unit)}
            </p>
            <p className={`text-lg ${theme.textColor}/80`}>
              {current.condition.text}
            </p>
          </div>
        </motion.div>
      </div>

      <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
        <motion.div
          className={`flex items-center justify-center sm:justify-start p-3 ${theme.cardBg} rounded-lg`}
          whileHover={{ scale: 1.03 }}
          transition={{ duration: 0.2 }}
        >
          <ThermometerSun className={`mr-2 ${theme.iconColor}`} size={22} />
          <div>
            <p className={`text-sm ${theme.textColor}/80`}>Feels like</p>
            <p className={`text-lg font-medium ${theme.textColor}`}>
              {formatTemperature(feelsLike, unit)}
            </p>
          </div>
        </motion.div>

        <motion.div
          className={`flex items-center justify-center sm:justify-start p-3 ${theme.cardBg} rounded-lg`}
          whileHover={{ scale: 1.03 }}
          transition={{ duration: 0.2 }}
        >
          <Droplets className={`mr-2 ${theme.iconColor}`} size={22} />
          <div>
            <p className={`text-sm ${theme.textColor}/80`}>Humidity</p>
            <p className={`text-lg font-medium ${theme.textColor}`}>
              {current.humidity}%
            </p>
          </div>
        </motion.div>

        <motion.div
          className={`flex items-center justify-center sm:justify-start p-3 ${theme.cardBg} rounded-lg`}
          whileHover={{ scale: 1.03 }}
          transition={{ duration: 0.2 }}
        >
          <Wind className={`mr-2 ${theme.iconColor}`} size={22} />
          <div>
            <p className={`text-sm ${theme.textColor}/80`}>Wind</p>
            <p className={`text-lg font-medium ${theme.textColor}`}>
              {unit === 'celsius' ? current.wind_kph + ' km/h' : current.wind_mph + ' mph'} {current.wind_dir}
            </p>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default CurrentWeather;