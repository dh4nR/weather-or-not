import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

/**
 * Combines classnames with tailwind-merge 
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Converts temperature from Celsius to Fahrenheit
 */
export function celsiusToFahrenheit(celsius: number): number {
  return Math.round((celsius * 9/5) + 32);
}

/**
 * Formats a date or date string to a localized date
 */
export function formatDate(date: Date | string): string {
  if (typeof date === 'string') {
    date = new Date(date);
  }
  return date.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'short',
    day: 'numeric'
  });
}

/**
 * Delay execution for specified milliseconds
 */
export function delay(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Weather condition types
 */
export type WeatherType = 
  | 'sunny'
  | 'cloudy'
  | 'rainy' 
  | 'snowy'
  | 'stormy'
  | 'foggy'
  | 'default';

/**
 * Map WMO weather codes to simplified weather types
 * Based on: https://www.nodc.noaa.gov/archive/arc0021/0002199/1.1/data/0-data/HTML/WMO-CODE/WMO4677.HTM
 */
export function getWeatherType(weatherCode: number): WeatherType {
  // Clear / Sunny
  if ([0, 1].includes(weatherCode)) {
    return 'sunny';
  }
  // Partly cloudy / Cloudy
  else if ([2, 3].includes(weatherCode)) {
    return 'cloudy';
  }
  // Fog / Mist
  else if ([45, 48].includes(weatherCode)) {
    return 'foggy';
  }
  // Drizzle / Rain
  else if (
    [51, 53, 55, 56, 57, 61, 63, 65, 66, 67, 80, 81, 82].includes(weatherCode)
  ) {
    return 'rainy';
  }
  // Snow
  else if (
    [71, 73, 75, 77, 85, 86].includes(weatherCode)
  ) {
    return 'snowy';
  }
  // Thunderstorm
  else if ([95, 96, 99].includes(weatherCode)) {
    return 'stormy';
  }
  // Default
  return 'default';
}

/**
 * Color theme for weather conditions
 */
export interface WeatherColorTheme {
  primary: string;
  secondary: string;
  accent: string;
  background: string;
  textColor: string;
  gradientFrom: string;
  gradientTo: string;
}

/**
 * Get color theme based on weather type
 */
export function getWeatherColorTheme(weatherType: WeatherType): WeatherColorTheme {
  switch (weatherType) {
    case 'sunny':
      return {
        primary: '#f59e0b',  // amber-500
        secondary: '#fbbf24', // amber-400
        accent: '#fcd34d',    // amber-300
        background: 'rgba(254, 252, 232, 0.05)', // yellow-50 with low opacity
        textColor: '#f59e0b', // amber-500
        gradientFrom: '#f59e0b', // amber-500
        gradientTo: '#d97706', // amber-600
      };
    case 'cloudy':
      return {
        primary: '#60a5fa',   // blue-400
        secondary: '#93c5fd', // blue-300
        accent: '#bfdbfe',    // blue-200
        background: 'rgba(239, 246, 255, 0.05)', // blue-50 with low opacity
        textColor: '#60a5fa', // blue-400
        gradientFrom: '#60a5fa', // blue-400
        gradientTo: '#3b82f6', // blue-500
      };
    case 'rainy':
      return {
        primary: '#0ea5e9',   // sky-500
        secondary: '#38bdf8', // sky-400
        accent: '#7dd3fc',    // sky-300
        background: 'rgba(240, 249, 255, 0.05)', // sky-50 with low opacity
        textColor: '#0ea5e9', // sky-500
        gradientFrom: '#0ea5e9', // sky-500
        gradientTo: '#0284c7', // sky-600
      };
    case 'snowy':
      return {
        primary: '#6366f1',   // indigo-500
        secondary: '#818cf8', // indigo-400
        accent: '#a5b4fc',    // indigo-300
        background: 'rgba(238, 242, 255, 0.05)', // indigo-50 with low opacity
        textColor: '#6366f1', // indigo-500
        gradientFrom: '#6366f1', // indigo-500
        gradientTo: '#4f46e5', // indigo-600
      };
    case 'stormy':
      return {
        primary: '#8b5cf6',   // violet-500
        secondary: '#a78bfa', // violet-400
        accent: '#c4b5fd',    // violet-300
        background: 'rgba(245, 243, 255, 0.05)', // violet-50 with low opacity
        textColor: '#8b5cf6', // violet-500
        gradientFrom: '#8b5cf6', // violet-500
        gradientTo: '#7c3aed', // violet-600
      };
    case 'foggy':
      return {
        primary: '#94a3b8',   // slate-400
        secondary: '#cbd5e1', // slate-300
        accent: '#e2e8f0',    // slate-200
        background: 'rgba(248, 250, 252, 0.05)', // slate-50 with low opacity
        textColor: '#94a3b8', // slate-400
        gradientFrom: '#94a3b8', // slate-400
        gradientTo: '#64748b', // slate-500
      };
    default:
      return {
        primary: '#3b82f6',   // blue-500
        secondary: '#60a5fa', // blue-400
        accent: '#93c5fd',    // blue-300
        background: 'rgba(239, 246, 255, 0.05)', // blue-50 with low opacity
        textColor: '#3b82f6', // blue-500
        gradientFrom: '#3b82f6', // blue-500
        gradientTo: '#2563eb', // blue-600
      };
  }
}
