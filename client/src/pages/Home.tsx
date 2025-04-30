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
    return <ErrorState message="Failed to load weather data. Please try again." onRetry={() => window.location.reload()} />;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header onLocationSelect={setSearchParams} />
      <main className="container mx-auto px-4 py-8 flex-grow">
        {searchParams && (
          <CurrentLocation location={searchParams.name} />
        )}

        {!searchParams && !isLoading && (
          <div className="flex flex-col items-center justify-center min-h-[70vh] text-center py-8 sm:py-12 relative overflow-hidden">
            {/* Background illustrations (subtle) */}
            <div className="absolute inset-0 pointer-events-none opacity-5 z-0">
              <div className="absolute top-10 left-1/4 text-7xl rotate-12">⛷️</div>
              <div className="absolute bottom-20 left-1/6 text-7xl -rotate-12">🏄</div>
              <div className="absolute top-1/3 right-1/4 text-7xl rotate-6">🏙️</div>
              <div className="absolute bottom-1/3 right-1/6 text-7xl -rotate-6">🌦️</div>
            </div>
            
            {/* Main content */}
            <div className="z-10 w-full max-w-2xl px-4">
              {/* Title without background */}
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-primary mb-3">
                Whether or Not
              </h1>
              
              {/* Main headline */}
              <h2 className="text-2xl sm:text-3xl font-bold mb-3 text-foreground">
                Weather-Powered Activity Picks
              </h2>
              
              {/* Subheadline */}
              <p className="text-muted-foreground max-w-lg mx-auto mb-8 text-base sm:text-lg">
                Get smart suggestions for skiing, surfing, and sightseeing based on the 7-day forecast—just enter a city or town to begin.
              </p>
              
              {/* Updated tagline */}
              <div className="mb-8 font-medium">
                <p className="text-lg sm:text-xl text-primary mb-2">Plan Better. Travel Smarter.</p>
                <p className="text-sm sm:text-base text-muted-foreground max-w-md mx-auto">
                  "Whether or Not" recommends the best activities for any city based on the latest weather forecast.
                  Just search a place to discover if it's ideal for skiing, surfing, or sightseeing this week.
                </p>
              </div>

              {/* Enhanced search bar */}
              <div className="w-full max-w-md mx-auto transform transition-all duration-300 hover:scale-102 mb-4">
                <div className="p-4 card-dark rounded-lg border border-primary/40 shadow-lg">
                  <div className="relative">
                    <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M12 22s8-4 8-10V6l-8-4-8 4v6c0 6 8 10 8 10z"/>
                      </svg>
                    </div>
                    <SearchForm 
                      onLocationSelect={setSearchParams} 
                      className="pl-10"
                      placeholder="e.g. Berlin, Tokyo, Cape Town…"
                    />
                  </div>
                  
                  {/* Recent searches in pill style */}
                  {searchHistory.length > 0 && (
                    <div className="mt-3 flex items-center justify-between">
                      <div className="text-xs text-muted-foreground">
                        Recent:
                        <div className="inline-flex flex-wrap gap-1 ml-2">
                          {searchHistory.slice(0, 3).map((location, index) => (
                            <button
                              key={index}
                              onClick={() => setSearchParams(location)}
                              className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-primary/10 hover:bg-primary/20 text-primary transition-colors"
                            >
                              {location.name.split(',')[0]}
                            </button>
                          ))}
                        </div>
                      </div>
                      {searchHistory.length > 0 && (
                        <button 
                          onClick={() => {
                            const { clearHistory } = useSearchHistory();
                            clearHistory();
                          }}
                          className="text-xs text-muted-foreground hover:text-primary transition-colors"
                        >
                          Clear
                        </button>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
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