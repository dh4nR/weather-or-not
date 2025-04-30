import { useState, useEffect } from 'react';

// Theme mode types
export type ThemeMode = 'light' | 'dark';

/**
 * Custom hook to determine theme based on time of day
 * Uses sunset/sunrise logic to switch between light and dark modes
 */
export function useThemeMode() {
  const [themeMode, setThemeMode] = useState<ThemeMode>('dark');

  useEffect(() => {
    // Function to determine if it's daytime based on current hour
    const isDaytime = () => {
      const currentHour = new Date().getHours();
      
      // Consider daytime between 6 AM and 6 PM (18:00)
      // These hours can be adjusted based on actual sunrise/sunset times
      return currentHour >= 6 && currentHour < 18;
    };

    // Set initial theme based on time of day
    setThemeMode(isDaytime() ? 'light' : 'dark');

    // Set up interval to check time and update theme
    const intervalId = setInterval(() => {
      setThemeMode(isDaytime() ? 'light' : 'dark');
    }, 60000); // Check every minute

    return () => clearInterval(intervalId);
  }, []);

  return themeMode;
}