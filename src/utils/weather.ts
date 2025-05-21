import { WeatherCondition } from '../types/weather';

export const determineWeatherCondition = (
  conditionCode: number,
  isDay: number
): WeatherCondition => {
  // Night condition overrides others if it's not daytime
  if (isDay === 0) {
    return 'night';
  }
  
  // Sunny/Clear condition (codes 1000 for sunny, clear)
  if (conditionCode === 1000) {
    return 'sunny';
  }
  
  // Cloudy conditions (codes 1003, 1006, 1009, 1030)
  if ([1003, 1006, 1009, 1030].includes(conditionCode)) {
    return 'cloudy';
  }
  
  // Rainy conditions (codes 1063, 1180-1201, 1240-1246)
  if (
    conditionCode === 1063 ||
    (conditionCode >= 1180 && conditionCode <= 1201) ||
    (conditionCode >= 1240 && conditionCode <= 1246)
  ) {
    return 'rainy';
  }
  
  // Snowy conditions (codes 1066, 1114-1117, 1210-1225, 1255-1258)
  if (
    conditionCode === 1066 ||
    (conditionCode >= 1114 && conditionCode <= 1117) ||
    (conditionCode >= 1210 && conditionCode <= 1225) ||
    (conditionCode >= 1255 && conditionCode <= 1258)
  ) {
    return 'snowy';
  }
  
  // Stormy conditions (codes 1087, 1273-1282)
  if (
    conditionCode === 1087 ||
    (conditionCode >= 1273 && conditionCode <= 1282)
  ) {
    return 'stormy';
  }
  
  // Foggy conditions (codes 1135, 1147)
  if ([1135, 1147].includes(conditionCode)) {
    return 'foggy';
  }
  
  // Default to clear if no specific condition matched
  return 'clear';
};

export const getWeatherEmoji = (condition: WeatherCondition): string => {
  switch (condition) {
    case 'sunny':
      return '☀️';
    case 'cloudy':
      return '☁️';
    case 'rainy':
      return '🌧️';
    case 'snowy':
      return '❄️';
    case 'stormy':
      return '⛈️';
    case 'foggy':
      return '🌫️';
    case 'night':
      return '🌙';
    case 'clear':
      return '🌤️';
    default:
      return '🌈';
  }
};

export const formatTemperature = (
  temp: number, 
  unit: 'celsius' | 'fahrenheit'
): string => {
  return `${Math.round(temp)}°${unit === 'celsius' ? 'C' : 'F'}`;
};

export const getWeatherTheme = (condition: WeatherCondition) => {
  switch (condition) {
    case 'sunny':
      return {
        backgroundColor: 'bg-gradient-to-br from-blue-400 to-blue-600',
        textColor: 'text-white',
        cardBg: 'bg-white/20',
        iconColor: 'text-yellow-300',
      };
    case 'cloudy':
      return {
        backgroundColor: 'bg-gradient-to-br from-gray-300 to-gray-500',
        textColor: 'text-white',
        cardBg: 'bg-white/20',
        iconColor: 'text-gray-100',
      };
    case 'rainy':
      return {
        backgroundColor: 'bg-gradient-to-br from-blue-700 to-blue-900',
        textColor: 'text-white',
        cardBg: 'bg-white/20',
        iconColor: 'text-blue-300',
      };
    case 'snowy':
      return {
        backgroundColor: 'bg-gradient-to-br from-blue-100 to-blue-300',
        textColor: 'text-gray-800',
        cardBg: 'bg-white/40',
        iconColor: 'text-white',
      };
    case 'stormy':
      return {
        backgroundColor: 'bg-gradient-to-br from-gray-700 to-gray-900',
        textColor: 'text-white',
        cardBg: 'bg-white/10',
        iconColor: 'text-purple-300',
      };
    case 'foggy':
      return {
        backgroundColor: 'bg-gradient-to-br from-gray-400 to-gray-600',
        textColor: 'text-white',
        cardBg: 'bg-white/20',
        iconColor: 'text-gray-200',
      };
    case 'night':
      return {
        backgroundColor: 'bg-gradient-to-br from-indigo-900 to-purple-900',
        textColor: 'text-white',
        cardBg: 'bg-white/10',
        iconColor: 'text-yellow-200',
      };
    case 'clear':
    default:
      return {
        backgroundColor: 'bg-gradient-to-br from-blue-300 to-blue-500',
        textColor: 'text-white',
        cardBg: 'bg-white/20',
        iconColor: 'text-yellow-300',
      };
  }
};