import { GeocodingResponse, WeatherForecastData } from "@shared/types";

/**
 * Get location suggestions from a search query
 */
export async function searchLocations(query: string): Promise<GeocodingResponse> {
  if (!query || query.trim().length < 2) {
    return { results: [] };
  }
  
  try {
    const params = new URLSearchParams({ query: query.trim() });
    const response = await fetch(`/api/locations?${params}`);
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error('Location search error:', errorText);
      throw new Error(`Failed to fetch location data: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error in searchLocations:', error);
    throw error;
  }
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
