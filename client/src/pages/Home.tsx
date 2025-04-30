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

  useEffect(() => {
    if (userLocation && !userLocation.loading && !searchParams) {
      setLoadingUserLocation(false);
    }
  }, [userLocation, searchParams]);

  const { data: weatherData, isLoading, error } = useQuery<WeatherForecastData>({
    queryKey: ['weather', searchParams?.latitude, searchParams?.longitude],
    enabled: !!searchParams,
  });

  if (error) {
    return <ErrorState />;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header onLocationSelect={setSearchParams} />
      <main className="container mx-auto px-4 py-8 flex-grow">
        {searchParams && (
          <CurrentLocation location={searchParams.name} />
        )}

        {!searchParams && !isLoading && (
          <div className="flex flex-col items-center justify-center min-h-[60vh] text-center py-8 sm:py-12">
            <div className="relative mb-6 sm:mb-8">
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-lg blur opacity-30"></div>
              <h1 className="relative px-6 py-3 sm:py-4 text-4xl sm:text-5xl md:text-6xl font-extrabold bg-gradient-to-r from-blue-500 via-cyan-400 to-blue-600 bg-clip-text text-transparent drop-shadow-sm animate-pulse-slow">
                Whether or Not
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
                
                {/* Recent searches suggestion below search bar */}
                {searchHistory.length > 0 && (
                  <div className="mt-4 pt-3 border-t border-border">
                    <h3 className="text-sm font-medium mb-2 flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      Recent Searches
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {searchHistory.slice(0, 3).map((location, index) => (
                        <button
                          key={index}
                          onClick={() => setSearchParams(location)}
                          className="text-xs text-primary bg-primary/10 hover:bg-primary/20 px-2 py-1 rounded-full transition-colors duration-200"
                        >
                          {location.name.split(',')[0]}
                        </button>
                      ))}
                      {searchHistory.length > 3 && (
                        <span className="text-xs text-muted-foreground px-1">+{searchHistory.length - 3} more</span>
                      )}
                    </div>
                  </div>
                )}
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