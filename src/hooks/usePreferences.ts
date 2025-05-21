import { useState, useCallback, useEffect } from 'react';
import { UserPreferences } from '../types/weather';
import { savePreferences, getPreferences } from '../utils/storage';

interface UsePreferencesReturn {
  preferences: UserPreferences;
  toggleTemperatureUnit: () => void;
}

export const usePreferences = (): UsePreferencesReturn => {
  const [preferences, setPreferences] = useState<UserPreferences>(
    getPreferences()
  );

  const toggleTemperatureUnit = useCallback(() => {
    setPreferences((prev) => {
      const newPreferences = {
        ...prev,
        unit: prev.unit === 'celsius' ? 'fahrenheit' : 'celsius',
      };
      
      savePreferences(newPreferences);
      return newPreferences;
    });
  }, []);

  useEffect(() => {
    // Initialize preferences from local storage
    setPreferences(getPreferences());
  }, []);

  return {
    preferences,
    toggleTemperatureUnit,
  };
};