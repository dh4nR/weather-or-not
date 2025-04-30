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
    const API_BASE = process.env.NODE_ENV === 'production' ? 'https://' + window.location.host + '/api' : '/api';
    const response = await fetch(`${API_BASE}/locations?${params}`);

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
 * Get location name from coordinates (reverse geocoding)
 */
export async function reverseGeocode(
  latitude: string, 
  longitude: string
): Promise<GeocodingResponse> {
  try {
    const params = new URLSearchParams({ 
      latitude, 
      longitude 
    });
    const API_BASE = process.env.NODE_ENV === 'production' ? 'https://' + window.location.host + '/api' : '/api';
    const response = await fetch(`${API_BASE}/reverse-geocode?${params}`);

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Reverse geocoding error:', errorText);
      throw new Error(`Failed to reverse geocode: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error in reverseGeocode:', error);
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
  const API_BASE = process.env.NODE_ENV === 'production' ? 'https://' + window.location.host + '/api' : '/api';
  const response = await fetch(`${API_BASE}/forecast?${params}`);

  if (!response.ok) {
    throw new Error('Failed to fetch weather forecast');
  }

  return await response.json();
}