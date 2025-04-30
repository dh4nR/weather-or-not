import { ActivityScores, DayForecast } from "@shared/types";

/**
 * Score each activity based on the day's weather conditions
 * Returns scores on a scale of 1-5
 */
export function scoreActivities(day: DayForecast): ActivityScores {
  return {
    skiing: calculateSkiingScore(day),
    surfing: calculateSurfingScore(day),
    outdoorSightseeing: calculateOutdoorSightseeingScore(day),
    indoorSightseeing: calculateIndoorSightseeingScore(day),
  };
}

/**
 * Calculate skiing score based on temperature, snowfall, and precipitation
 * Ideal conditions: Cold temperatures, high snowfall, low precipitation
 */
function calculateSkiingScore(day: DayForecast): number {
  let score = 1; // Default minimum score
  
  // Temperature factor - skiing is better with colder temperatures
  if (day.temperatureHigh < 0) {
    score += 2; // Perfect skiing temperature
  } else if (day.temperatureHigh < 5) {
    score += 1.5; // Good skiing temperature
  } else if (day.temperatureHigh < 10) {
    score += 1; // Acceptable skiing temperature
  } else if (day.temperatureHigh > 15) {
    score = 1; // Too warm for skiing
  }
  
  // Snowfall factor - more snowfall is better for skiing
  if (day.snowfall > 10) {
    score += 2; // Heavy snowfall - excellent for fresh powder
  } else if (day.snowfall > 5) {
    score += 1.5; // Moderate snowfall - good conditions
  } else if (day.snowfall > 0) {
    score += 1; // Light snowfall - acceptable conditions
  }
  
  // Precipitation factor - rain is bad for skiing
  if (day.precipitationProbability > 70 && day.temperatureHigh > 0) {
    score -= 1; // High chance of rain is bad for skiing
  }
  
  // Ensure score is within 1-5 range
  return Math.max(1, Math.min(5, Math.round(score)));
}

/**
 * Calculate surfing score based on wind speed, precipitation, and temperature
 * Ideal conditions: Moderate winds, low precipitation, mild temperature
 */
function calculateSurfingScore(day: DayForecast): number {
  let score = 1; // Default minimum score
  
  // Wind speed factor - moderate wind is good for surfing
  if (day.windSpeed > 10 && day.windSpeed < 30) {
    score += 2; // Ideal wind speed for surfing
  } else if (day.windSpeed >= 5 && day.windSpeed <= 10) {
    score += 1; // Acceptable wind speed
  } else if (day.windSpeed > 30) {
    score += 0.5; // Too windy
  }
  
  // Temperature factor - surfing is better in milder temperatures
  if (day.temperature > 15 && day.temperature < 30) {
    score += 1.5; // Comfortable temperature for surfing
  } else if (day.temperature >= 10 && day.temperature <= 15) {
    score += 0.5; // Acceptable but chilly
  }
  
  // Precipitation factor - light rain is okay, heavy rain is not
  if (day.precipitation < 1) {
    score += 1; // Little to no rain
  } else if (day.precipitation > 5) {
    score -= 0.5; // Heavy rain
  }
  
  // Ensure score is within 1-5 range
  return Math.max(1, Math.min(5, Math.round(score)));
}

/**
 * Calculate outdoor sightseeing score based on temperature, precipitation, and cloud cover
 * Ideal conditions: Warm temperature, low precipitation, clear skies
 */
function calculateOutdoorSightseeingScore(day: DayForecast): number {
  let score = 1; // Default minimum score
  
  // Temperature factor - comfortable temperatures are best for outdoor activities
  if (day.temperature > 15 && day.temperature < 30) {
    score += 2; // Ideal temperature range
  } else if (day.temperature >= 10 && day.temperature <= 15) {
    score += 1; // Cool but acceptable
  } else if (day.temperature >= 30 && day.temperature < 35) {
    score += 0.5; // Hot but still okay
  }
  
  // Precipitation factor - rain ruins outdoor activities
  if (day.precipitationProbability < 10) {
    score += 1.5; // Very low chance of rain
  } else if (day.precipitationProbability < 30) {
    score += 1; // Low chance of rain
  } else if (day.precipitationProbability > 60) {
    score -= 1; // High chance of rain
  }
  
  // Weather condition factor - clear or partly cloudy is best
  if (day.weatherCode <= 2) {
    score += 1; // Clear or mainly clear
  } else if (day.weatherCode >= 95) {
    score -= 1; // Thunderstorm
  }
  
  // Ensure score is within 1-5 range
  return Math.max(1, Math.min(5, Math.round(score)));
}

/**
 * Calculate indoor sightseeing score based on precipitation and cloud cover (inverse relationship)
 * Ideal conditions: High precipitation, overcast (bad weather makes indoor activities more appealing)
 */
function calculateIndoorSightseeingScore(day: DayForecast): number {
  let score = 3; // Default middle score - indoor activities are generally fine regardless of weather
  
  // Precipitation factor - more rain makes indoor activities more appealing
  if (day.precipitationProbability > 70) {
    score += 2; // Heavy rain makes indoor activities ideal
  } else if (day.precipitationProbability > 40) {
    score += 1; // Moderate chance of rain
  } else if (day.precipitationProbability < 10) {
    score -= 0.5; // Very little chance of rain, outdoor activities might be preferred
  }
  
  // Weather condition factor - bad weather makes indoor activities more appealing
  if (day.weatherCode >= 61) { // Various forms of precipitation
    score += 1; 
  } else if (day.weatherCode <= 1) { // Clear skies
    score -= 0.5;
  }
  
  // Ensure score is within 1-5 range
  return Math.max(1, Math.min(5, Math.round(score)));
}
