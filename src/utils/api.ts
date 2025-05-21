import axios from 'axios';
import { WeatherData, WeatherError } from '../types/weather';

// This would typically come from environment variables
const API_KEY = 'b18e1189ece24b8d841172628252105'; // Users will need to replace this with their own key
const BASE_URL = 'https://api.weatherapi.com/v1';

export const fetchWeatherData = async (
  location: string
): Promise<WeatherData> => {
  try {
    const response = await axios.get(`${BASE_URL}/forecast.json`, {
      params: {
        key: API_KEY,
        q: location,
        days: 5,
        aqi: 'no',
        alerts: 'yes',
      },
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const errorMessage = 
        error.response?.data?.error?.message || 
        'Failed to fetch weather data';
      
      const weatherError: WeatherError = {
        message: errorMessage,
        code: error.response?.status,
      };
      
      throw weatherError;
    }
    throw new Error('An unexpected error occurred');
  }
};

export const searchLocations = async (
  query: string
): Promise<{ id: string; name: string; country: string }[]> => {
  try {
    const response = await axios.get(`${BASE_URL}/search.json`, {
      params: {
        key: API_KEY,
        q: query,
      },
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(
        error.response?.data?.error?.message || 
        'Failed to search locations'
      );
    }
    throw new Error('An unexpected error occurred');
  }
};