// Weather API types
export interface WeatherResponse {
  latitude: number;
  longitude: number;
  timezone: string;
  timezone_abbreviation: string;
  elevation: number;
  daily_units: DailyUnits;
  daily: DailyData;
}

export interface DailyUnits {
  time: string;
  temperature_2m_max: string;
  temperature_2m_min: string;
  precipitation_sum: string;
  precipitation_probability_max: string;
  snowfall_sum: string;
  windspeed_10m_max: string;
  winddirection_10m_dominant: string;
  weathercode: string;
}

export interface DailyData {
  time: string[];
  temperature_2m_max: number[];
  temperature_2m_min: number[];
  precipitation_sum: number[];
  precipitation_probability_max: number[];
  snowfall_sum: number[];
  windspeed_10m_max: number[];
  winddirection_10m_dominant: number[];
  weathercode: number[];
}

// Geocoding API types
export interface GeocodingResponse {
  results?: GeocodingResult[];
  error?: boolean;
  reason?: string;
}

export interface GeocodingResult {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
  elevation: number;
  feature_code: string;
  country_code: string;
  admin1_id: number;
  admin2_id: number;
  timezone: string;
  population: number;
  country_id: number;
  country: string;
  admin1: string;
  admin2?: string;
}

// Activity score types
export interface ActivityScores {
  skiing: number;
  surfing: number;
  outdoorSightseeing: number;
  indoorSightseeing: number;
}

// Weather forecast data with activity scores
export interface DayForecast {
  date: string;
  fullDate: string;
  day: string;
  temperature: number;
  temperatureHigh: number;
  temperatureLow: number;
  windSpeed: number;
  precipitation: number;
  precipitationProbability: number;
  snowfall: number;
  weatherCode: number;
  condition: string;
  activityScores: ActivityScores;
}

export interface WeatherForecastData {
  location: string;
  latitude: number;
  longitude: number;
  days: DayForecast[];
}

// API Request Types
export interface SearchLocationParams {
  query: string;
}

export interface GetForecastParams {
  latitude: string;
  longitude: string;
  name: string;
}
