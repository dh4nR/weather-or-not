import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { 
  getWeatherType, 
  getWeatherColorTheme, 
  WeatherType, 
  WeatherColorTheme 
} from '@/lib/utils';
import { WeatherForecastData } from '@shared/types';

interface WeatherThemeContextProps {
  weatherType: WeatherType;
  colorTheme: WeatherColorTheme;
  setWeatherData: (weatherData: WeatherForecastData | undefined) => void;
}

const defaultWeatherTheme: WeatherThemeContextProps = {
  weatherType: 'default',
  colorTheme: getWeatherColorTheme('default'),
  setWeatherData: () => {}
};

const WeatherThemeContext = createContext<WeatherThemeContextProps>(defaultWeatherTheme);

export function WeatherThemeProvider({ children }: { children: React.ReactNode }) {
  const [weatherType, setWeatherType] = useState<WeatherType>('default');
  const [colorTheme, setColorTheme] = useState<WeatherColorTheme>(getWeatherColorTheme('default'));
  const [weatherData, setWeatherDataState] = useState<WeatherForecastData | undefined>(undefined);

  // Memoize the setter function to avoid it changing on every render
  const setWeatherData = useCallback((data: WeatherForecastData | undefined) => {
    setWeatherDataState(data);
  }, []);

  // Update the theme when weather data changes
  useEffect(() => {
    if (!weatherData || !weatherData.days || weatherData.days.length === 0) {
      setWeatherType('default');
      setColorTheme(getWeatherColorTheme('default'));
      return;
    }

    // Get current weather code from first day in forecast
    const currentWeatherCode = weatherData.days[0].weatherCode;
    const newWeatherType = getWeatherType(currentWeatherCode);
    
    setWeatherType(newWeatherType);
    setColorTheme(getWeatherColorTheme(newWeatherType));
  }, [weatherData]);

  return (
    <WeatherThemeContext.Provider 
      value={{ 
        weatherType, 
        colorTheme, 
        setWeatherData
      }}
    >
      {children}
    </WeatherThemeContext.Provider>
  );
}

export function useWeatherTheme() {
  const context = useContext(WeatherThemeContext);
  if (context === undefined) {
    throw new Error('useWeatherTheme must be used within a WeatherThemeProvider');
  }
  return context;
}