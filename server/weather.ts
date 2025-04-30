import axios from "axios";
import { DayForecast, GeocodingResponse, WeatherResponse } from "@shared/types";
import { format, parseISO } from "date-fns";

// Weather API base URL
const OPEN_METEO_API_URL = "https://api.open-meteo.com/v1/forecast";
const GEOCODING_API_URL = "https://geocoding-api.open-meteo.com/v1/search";

// Weather condition codes based on WMO guidelines
const WEATHER_CONDITIONS: Record<number, string> = {
  0: "Clear sky",
  1: "Mainly clear",
  2: "Partly cloudy",
  3: "Overcast",
  45: "Fog",
  48: "Depositing rime fog",
  51: "Light drizzle",
  53: "Moderate drizzle",
  55: "Dense drizzle",
  56: "Light freezing drizzle",
  57: "Dense freezing drizzle",
  61: "Slight rain",
  63: "Moderate rain",
  65: "Heavy rain",
  66: "Light freezing rain",
  67: "Heavy freezing rain",
  71: "Slight snow fall",
  73: "Moderate snow fall",
  75: "Heavy snow fall",
  77: "Snow grains",
  80: "Slight rain showers",
  81: "Moderate rain showers",
  82: "Violent rain showers",
  85: "Slight snow showers",
  86: "Heavy snow showers",
  95: "Thunderstorm",
  96: "Thunderstorm with slight hail",
  99: "Thunderstorm with heavy hail",
};

/**
 * Get weather icon based on weather code
 */
export function getWeatherIcon(code: number): string {
  if (code === 0) return "sun"; // Clear sky
  if (code === 1) return "sun"; // Mainly clear
  if (code === 2) return "cloud-sun"; // Partly cloudy
  if (code === 3) return "cloud"; // Overcast
  if ([45, 48].includes(code)) return "cloud-fog"; // Fog
  if ([51, 53, 55, 56, 57, 61, 63, 65, 66, 67, 80, 81, 82].includes(code)) return "cloud-rain"; // Rain
  if ([71, 73, 75, 77, 85, 86].includes(code)) return "cloud-snow"; // Snow
  if ([95, 96, 99].includes(code)) return "cloud-lightning"; // Thunderstorm
  return "cloud"; // Default
}

/**
 * Get location suggestions from geocoding API
 */
export async function getLocationFromQuery(query: string): Promise<GeocodingResponse> {
  try {
    console.log(`Making geocoding API request for: "${query}"`);
    
    const response = await axios.get<GeocodingResponse>(GEOCODING_API_URL, {
      params: {
        name: query,
        count: 10,
        language: "en",
        format: "json"
      }
    });
    
    // Log the response for debugging
    console.log(`Geocoding API response status: ${response.status}`);
    console.log(`Results found: ${response.data.results?.length || 0}`);
    
    if (!response.data.results) {
      response.data.results = [];
    }
    
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Axios error fetching location data:", {
        status: error.response?.status,
        statusText: error.response?.statusText,
        data: error.response?.data,
        message: error.message
      });
    } else {
      console.error("Error fetching location data:", error);
    }
    throw new Error("Failed to fetch location data");
  }
}

/**
 * Get location name from coordinates (reverse geocoding)
 */
export async function reverseGeocode(latitude: string, longitude: string): Promise<GeocodingResponse> {
  try {
    console.log(`Making reverse geocoding request for coordinates: ${latitude}, ${longitude}`);
    
    const response = await axios.get<GeocodingResponse>(GEOCODING_API_URL, {
      params: {
        latitude,
        longitude,
        count: 1,
        language: "en",
        format: "json"
      }
    });
    
    // Log the response for debugging
    console.log(`Reverse geocoding API response status: ${response.status}`);
    console.log(`Results found: ${response.data.results?.length || 0}`);
    
    if (!response.data.results) {
      response.data.results = [];
    }
    
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Axios error in reverse geocoding:", {
        status: error.response?.status,
        statusText: error.response?.statusText,
        data: error.response?.data,
        message: error.message
      });
    } else {
      console.error("Error in reverse geocoding:", error);
    }
    throw new Error("Failed to reverse geocode coordinates");
  }
}

/**
 * Get 7-day weather forecast for a location
 */
export async function getWeatherForecast(latitude: string, longitude: string) {
  try {
    const response = await axios.get<WeatherResponse>(OPEN_METEO_API_URL, {
      params: {
        latitude,
        longitude,
        daily: [
          "temperature_2m_max",
          "temperature_2m_min",
          "precipitation_sum",
          "precipitation_probability_max",
          "snowfall_sum",
          "windspeed_10m_max",
          "winddirection_10m_dominant",
          "weathercode"
        ],
        timezone: "auto",
        forecast_days: 7
      }
    });

    const data = response.data;
    const days: DayForecast[] = data.daily.time.map((time, index) => {
      const date = parseISO(time);
      const dayName = index === 0 ? "Today" : 
                      index === 1 ? "Tomorrow" : 
                      format(date, "EEEE");
      
      return {
        date: dayName,
        fullDate: format(date, "MMM d"),
        day: format(date, "EEEE"),
        temperatureHigh: Math.round(data.daily.temperature_2m_max[index]),
        temperatureLow: Math.round(data.daily.temperature_2m_min[index]),
        temperature: Math.round((data.daily.temperature_2m_max[index] + data.daily.temperature_2m_min[index]) / 2),
        precipitation: data.daily.precipitation_sum[index],
        precipitationProbability: data.daily.precipitation_probability_max[index],
        windSpeed: Math.round(data.daily.windspeed_10m_max[index]),
        snowfall: data.daily.snowfall_sum[index],
        weatherCode: data.daily.weathercode[index],
        condition: WEATHER_CONDITIONS[data.daily.weathercode[index]] || "Unknown",
        activityScores: { skiing: 0, surfing: 0, outdoorSightseeing: 0, indoorSightseeing: 0 }
      };
    });

    return {
      latitude: data.latitude,
      longitude: data.longitude,
      timezone: data.timezone,
      days
    };
  } catch (error) {
    console.error("Error fetching weather data:", error);
    throw new Error("Failed to fetch weather data");
  }
}
