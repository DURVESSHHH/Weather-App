import { UserPreferences } from '../types/weather';

const STORAGE_KEY = 'weather-app-preferences';

export const savePreferences = (preferences: UserPreferences): void => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(preferences));
  } catch (error) {
    console.error('Failed to save preferences:', error);
  }
};

export const getPreferences = (): UserPreferences => {
  try {
    const savedPreferences = localStorage.getItem(STORAGE_KEY);
    if (savedPreferences) {
      return JSON.parse(savedPreferences);
    }
  } catch (error) {
    console.error('Failed to get preferences:', error);
  }
  
  // Default preferences
  return {
    unit: 'celsius',
  };
};

export const saveLastLocation = (location: string): void => {
  const preferences = getPreferences();
  savePreferences({
    ...preferences,
    lastLocation: location,
  });
};

export const getLastLocation = (): string | undefined => {
  return getPreferences().lastLocation;
};