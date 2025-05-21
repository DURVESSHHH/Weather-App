import React, { useEffect, useState } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { WeatherCondition } from './types/weather';
import { useWeather } from './hooks/useWeather';
import { usePreferences } from './hooks/usePreferences';
import { determineWeatherCondition } from './utils/weather';

import MainLayout from './components/MainLayout';
import SearchBar from './components/SearchBar';
import WeatherDashboard from './components/WeatherDashboard';
import LoadingScreen from './components/LoadingScreen';
import ErrorDisplay from './components/ErrorDisplay';

function App() {
  const { 
    weatherData, 
    loading, 
    error, 
    fetchWeather, 
    fetchWeatherByGeolocation 
  } = useWeather();
  
  const { preferences, toggleTemperatureUnit } = usePreferences();
  
  const [weatherCondition, setWeatherCondition] = 
    useState<WeatherCondition>('clear');
  
  useEffect(() => {
    if (weatherData) {
      const condition = determineWeatherCondition(
        weatherData.current.condition.code,
        weatherData.current.is_day
      );
      setWeatherCondition(condition);
      
      // Update page title with weather info
      document.title = `${Math.round(
        preferences.unit === 'celsius' 
          ? weatherData.current.temp_c 
          : weatherData.current.temp_f
      )}° | ${weatherData.location.name} | Weather App`;
    }
  }, [weatherData, preferences.unit]);

  // Error fallback component
  const ErrorFallback = ({ error, resetErrorBoundary }) => (
    <ErrorDisplay 
      error={{ message: error.message }} 
      onRetry={resetErrorBoundary} 
    />
  );

  if (loading || !weatherData) {
    return <LoadingScreen />;
  }

  if (error) {
    return (
      <ErrorDisplay 
        error={error} 
        onRetry={fetchWeatherByGeolocation} 
      />
    );
  }

  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <MainLayout condition={weatherCondition}>
        <SearchBar
          onLocationSelect={fetchWeather}
          onGeolocationRequest={fetchWeatherByGeolocation}
        />
        
        <WeatherDashboard
          weatherData={weatherData}
          condition={weatherCondition}
          unit={preferences.unit}
          onUnitToggle={toggleTemperatureUnit}
          onRefresh={() => {
            const lastLocation = weatherData.location.name;
            fetchWeather(lastLocation);
          }}
        />
      </MainLayout>
    </ErrorBoundary>
  );
}

export default App;