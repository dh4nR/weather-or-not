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
    if (userLocation && loadingUserLocation) {
      setLoadingUserLocation(false);
      setSearchParams(userLocation);
    }
  }, [userLocation, loadingUserLocation]);

  const handleSearch = (latitude: string, longitude: string, name: string) => {
    setSearchParams({ latitude, longitude, name });
    addToHistory({ latitude, longitude, name });
  };

  const { data: weatherData, isLoading } = useQuery<WeatherForecastData>({
    queryKey: ["weather", searchParams?.latitude, searchParams?.longitude],
    queryEnabled: !!searchParams,
    retry: 2,
  });

  return (
    <div className="min-h-screen flex flex-col">
      <Header onSearch={handleSearch} />

      <main className="container mx-auto px-4 py-8 flex-grow">
        {searchParams && (
          <CurrentLocation location={searchParams.name} />
        )}

        {!searchParams && !isLoading && (
          <div className="flex flex-col items-center justify-center min-h-[60vh] text-center py-12">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-500 to-cyan-500 bg-clip-text text-transparent px-4 mb-6">
              Whether or Not
            </h1>
            <h2 className="text-xl sm:text-2xl font-bold mb-4 px-4">Activity Weather Forecast</h2>
            <div className="text-muted-foreground w-full max-w-[90%] sm:max-w-md mx-auto mb-8 px-4">
              <p className="leading-relaxed text-sm sm:text-base">
                This is a tool designed to provide tailored activity recommendations based on weather forecasts for any city. Get intelligent suggestions for skiing, surfing, and sightseeing. Search for a city or town to explore the forecast and discover the most suitable activities.
              </p>
            </div>

            <div className="w-full max-w-[90%] sm:max-w-md mx-auto mb-6 transform transition-all duration-300 hover:scale-105 px-4">
              <div className="p-4 card-dark rounded-lg border-2 border-primary shadow-lg shadow-primary/20">
                <SearchForm onSearch={handleSearch} />
              </div>
            </div>

            {searchHistory.length > 0 && (
              <SearchHistory
                history={searchHistory}
                onSelect={handleSearch}
              />
            )}
          </div>
        )}

        {isLoading && (
          <div className="flex justify-center items-center min-h-[60vh]">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        )}

        {weatherData && !isLoading && (
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