import React, { createContext, useContext, useState, useEffect } from 'react';
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
  updateWeatherTheme: (weatherData: WeatherForecastData | undefined) => void;
}

const defaultWeatherTheme: WeatherThemeContextProps = {
  weatherType: 'default',
  colorTheme: getWeatherColorTheme('default'),
  updateWeatherTheme: () => {}
};

const WeatherThemeContext = createContext<WeatherThemeContextProps>(defaultWeatherTheme);

export function WeatherThemeProvider({ children }: { children: React.ReactNode }) {
  const [weatherType, setWeatherType] = useState<WeatherType>('default');
  const [colorTheme, setColorTheme] = useState<WeatherColorTheme>(getWeatherColorTheme('default'));

  const updateWeatherTheme = (weatherData: WeatherForecastData | undefined) => {
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
  };

  return (
    <WeatherThemeContext.Provider 
      value={{ 
        weatherType, 
        colorTheme, 
        updateWeatherTheme 
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