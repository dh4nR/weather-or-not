import { GeocodingResponse, WeatherForecastData } from "@shared/types";

/**
 * Get location suggestions from a search query
 */
export async function searchLocations(query: string): Promise<GeocodingResponse> {
  const params = new URLSearchParams({ query });
  const response = await fetch(`/api/locations?${params}`);
  
  if (!response.ok) {
    throw new Error('Failed to fetch location data');
  }
  
  return await response.json();
}

/**
 * Get weather forecast with activity scores for a location
 */
export async function getWeatherForecast(
  latitude: string, 
  longitude: string, 
  name: string
): Promise<WeatherForecastData> {
  const params = new URLSearchParams({ 
    latitude, 
    longitude, 
    name 
  });
  
  const response = await fetch(`/api/forecast?${params}`);
  
  if (!response.ok) {
    throw new Error('Failed to fetch weather forecast');
  }
  
  return await response.json();
}
