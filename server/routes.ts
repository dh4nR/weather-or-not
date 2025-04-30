import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { z } from "zod";
import { getWeatherForecast } from "./weather";
import { scoreActivities } from "./activity-scorer";
import { getLocationFromQuery, reverseGeocode } from "./weather";

export async function registerRoutes(app: Express): Promise<Server> {
  // Get location suggestions from query
  app.get("/api/locations", async (req, res) => {
    try {
      const query = req.query.query as string;
      
      if (!query || query.trim().length < 2) {
        return res.status(400).json({ 
          error: "Query must be at least 2 characters" 
        });
      }
      
      console.log(`Searching for locations with query: "${query}"`);
      const locations = await getLocationFromQuery(query.trim());
      console.log(`Found ${locations.results?.length || 0} locations`);
      res.json(locations);
    } catch (error) {
      console.error("Error fetching locations:", error);
      res.status(500).json({ 
        error: "Failed to fetch location suggestions" 
      });
    }
  });

  // Get weather forecast with activity scores
  app.get("/api/forecast", async (req, res) => {
    try {
      const latitude = req.query.latitude as string;
      const longitude = req.query.longitude as string;
      const name = req.query.name as string;
      
      if (!latitude || !longitude || !name) {
        return res.status(400).json({ 
          error: "Latitude, longitude, and name parameters are required" 
        });
      }
      
      // Save search to storage
      await storage.saveSearch({
        query: name,
        latitude,
        longitude,
        name
      });
      
      // Get weather forecast data
      const weatherData = await getWeatherForecast(latitude, longitude);
      
      // Calculate activity scores for each day
      const forecastWithScores = weatherData.days.map(day => ({
        ...day,
        activityScores: scoreActivities(day)
      }));
      
      // Return weather forecast with activity scores
      res.json({
        location: name,
        latitude: parseFloat(latitude),
        longitude: parseFloat(longitude),
        days: forecastWithScores
      });
    } catch (error) {
      console.error("Error fetching forecast:", error);
      res.status(500).json({ 
        error: "Failed to fetch weather forecast" 
      });
    }
  });

  // Get recent searches
  app.get("/api/recent-searches", async (req, res) => {
    try {
      const searches = await storage.getRecentSearches(5);
      res.json(searches);
    } catch (error) {
      console.error("Error fetching recent searches:", error);
      res.status(500).json({ 
        error: "Failed to fetch recent searches" 
      });
    }
  });
  
  // Reverse geocode coordinates to get location name
  app.get("/api/reverse-geocode", async (req, res) => {
    try {
      const latitude = req.query.latitude as string;
      const longitude = req.query.longitude as string;
      
      if (!latitude || !longitude) {
        return res.status(400).json({ 
          error: "Latitude and longitude parameters are required" 
        });
      }
      
      console.log(`Reverse geocoding coordinates: ${latitude}, ${longitude}`);
      const locationData = await reverseGeocode(latitude, longitude);
      console.log(`Found ${locationData.results?.length || 0} locations for coordinates`);
      res.json(locationData);
    } catch (error) {
      console.error("Error in reverse geocoding:", error);
      res.status(500).json({ 
        error: "Failed to reverse geocode coordinates" 
      });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
