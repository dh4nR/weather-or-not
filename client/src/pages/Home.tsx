import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { WeatherForecastData, GeocodingResult } from "@shared/types";

import Header from "@/components/Header";
import SearchForm from "@/components/SearchForm";
import SearchHistory from "@/components/SearchHistory";
import CurrentLocation from "@/components/CurrentLocation";
import ActivityLegend from "@/components/ActivityLegend";
import ActivitySummaryChart from "@/components/ActivitySummaryChart";
import WeatherForecast from "@/components/WeatherForecast";
import ErrorState from "@/components/ErrorState";
import Footer from "@/components/Footer";
import { useSearchHistory } from "@/hooks/useSearchHistory";
import { useCurrentLocation } from "@/hooks/useCurrentLocation";
import { searchLocations } from "@/lib/api";
import { useThemeMode } from "@/hooks/useThemeMode";
import { useWeatherTheme } from "@/hooks/useWeatherTheme";

export default function Home() {
  const [searchParams, setSearchParams] = useState<{
    latitude: string;
    longitude: string;
    name: string;
  } | null>(null);

  const [locationSuggestion, setLocationSuggestion] = useState<GeocodingResult | null>(null);
  const [loadingUserLocation, setLoadingUserLocation] = useState(true);
  const themeMode = useThemeMode();
  const userLocation = useCurrentLocation();
  const { searchHistory, addToHistory } = useSearchHistory();
  const { updateWeatherTheme, colorTheme } = useWeatherTheme();

  useEffect(() => {
    if (userLocation && !userLocation.loading && !searchParams) {
      setLoadingUserLocation(false);
    }
  }, [userLocation, searchParams]);

  const { data: weatherData, isLoading, error } = useQuery<WeatherForecastData>({
    queryKey: ['weather', searchParams?.latitude, searchParams?.longitude],
    enabled: !!searchParams,
  });
  
  // Update weather theme when weather data changes
  useEffect(() => {
    if (weatherData) {
      updateWeatherTheme(weatherData);
    }
  }, [weatherData]);

  if (error) {
    return <ErrorState />;
  }

  // Generate dynamic gradient based on weather theme
  const titleGradient = searchParams && weatherData
    ? `bg-gradient-to-r from-[${colorTheme.gradientFrom}] via-[${colorTheme.secondary}] to-[${colorTheme.gradientTo}]`
    : "bg-gradient-to-r from-blue-500 via-cyan-400 to-blue-600";

  return (
    <div 
      className="min-h-screen flex flex-col"
      style={{
        transition: "all 0.5s ease-in-out"
      }}
    >
      <Header onLocationSelect={setSearchParams} />
      <main 
        className="container mx-auto px-4 py-8 flex-grow"
        style={{
          background: searchParams && weatherData ? colorTheme.background : undefined,
          transition: "background 0.5s ease-in-out"
        }}
      >
        {searchParams && (
          <CurrentLocation 
            location={searchParams.name} 
            style={{ 
              color: searchParams && weatherData ? colorTheme.textColor : undefined
            }}
          />
        )}

        {!searchParams && !isLoading && (
          <div className="flex flex-col items-center justify-center min-h-[60vh] text-center py-8 sm:py-12">
            <div className="mb-6 sm:mb-8">
              <h1 className={`px-6 py-3 sm:py-4 text-4xl sm:text-5xl md:text-6xl font-extrabold ${titleGradient} bg-clip-text text-transparent drop-shadow-sm animate-pulse-slow`}>
                Weather or Not
              </h1>
            </div>
            
            <h2 className="text-xl sm:text-2xl font-bold mb-4 px-4 text-primary">Activity Weather Forecast</h2>
            
            <div className="text-muted-foreground w-full max-w-[90%] sm:max-w-md mx-auto mb-8 px-4">
              <p className="leading-relaxed text-sm sm:text-base">
                This is a tool designed to provide tailored activity recommendations based on weather forecasts for any city. Get intelligent suggestions for skiing, surfing, and sightseeing. Search for a city or town to explore the forecast and discover the most suitable activities.
              </p>
            </div>

            {/* More prominent search bar with animation and shadow */}
            <div className="w-full max-w-md transform transition-all duration-300 hover:scale-105 mb-4 sm:mb-6">
              <div className="p-4 card-dark rounded-lg border-2 border-primary shadow-lg shadow-primary/20">
                <SearchForm onLocationSelect={setSearchParams} className="w-full" />
              </div>
            </div>

            {/* More detailed search history with all entries */}
            {searchHistory.length > 0 && (
              <SearchHistory
                history={searchHistory}
                onLocationSelect={setSearchParams}
                className="w-full max-w-md"
              />
            )}
          </div>
        )}

        {searchParams && weatherData && (
          <>
            <ActivityLegend />
            <ActivitySummaryChart data={weatherData} />
            <WeatherForecast data={weatherData} />
          </>
        )}
      </main>
      <Footer />
    </div>
  );
}