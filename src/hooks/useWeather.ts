import { useState, useEffect, useCallback } from 'react';
import { WeatherData, WeatherError } from '../types/weather';
import { fetchWeatherData } from '../utils/api';
import { getCurrentPosition } from '../utils/geolocation';
import { saveLastLocation, getLastLocation } from '../utils/storage';

interface UseWeatherReturn {
  weatherData: WeatherData | null;
  loading: boolean;
  error: WeatherError | null;
  fetchWeather: (location: string) => Promise<void>;
  fetchWeatherByGeolocation: () => Promise<void>;
}

export const useWeather = (): UseWeatherReturn => {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<WeatherError | null>(null);

  const fetchWeather = useCallback(async (location: string) => {
    if (!location) return;

    setLoading(true);
    setError(null);

    try {
      const data = await fetchWeatherData(location);
      setWeatherData(data);
      saveLastLocation(location);
    } catch (err) {
      const weatherError = err as WeatherError;
      setError(weatherError);
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchWeatherByGeolocation = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const { latitude, longitude } = await getCurrentPosition();
      await fetchWeather(`${latitude},${longitude}`);
    } catch (err) {
      setError({
        message: err instanceof Error ? err.message : 'Failed to get location',
      });
      setLoading(false);
    }
  }, [fetchWeather]);

  useEffect(() => {
    const initWeather = async () => {
      const lastLocation = getLastLocation();
      
      if (lastLocation) {
        await fetchWeather(lastLocation);
      } else {
        await fetchWeatherByGeolocation();
      }
    };

    initWeather();
  }, [fetchWeather, fetchWeatherByGeolocation]);

  return {
    weatherData,
    loading,
    error,
    fetchWeather,
    fetchWeatherByGeolocation,
  };
};