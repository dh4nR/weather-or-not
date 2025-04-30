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
import C4Logo from "@/components/C4Logo";
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

  const { 
    data, 
    isLoading, 
    isError, 
    error, 
    refetch 
  } = useQuery<WeatherForecastData>({
    queryKey: ['/api/forecast', searchParams?.latitude, searchParams?.longitude, searchParams?.name],
    enabled: !!(searchParams?.latitude && searchParams?.longitude && searchParams?.name),
  });

  // Save search to history when successful
  useEffect(() => {
    if (data && searchParams) {
      addToHistory(searchParams);
    }
  }, [data, searchParams, addToHistory]);

  // Instead of using reverse geocoding, let's use a simpler approach
  // We'll search for "London" as an initial suggestion
  useEffect(() => {
    const fetchDefaultLocation = async () => {
      try {
        // Search for London as a default location suggestion
        const response = await searchLocations("London");

        if (response.results && response.results.length > 0) {
          setLocationSuggestion(response.results[0]);
        }
      } catch (error) {
        console.error("Error fetching default location suggestion:", error);
      } finally {
        setLoadingUserLocation(false);
      }
    };

    fetchDefaultLocation();
  }, []);

  const handleSearch = (latitude: string, longitude: string, name: string) => {
    setSearchParams({ latitude, longitude, name });
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header onSearch={() => {}} /> {/* Keep header but don't use its search */}

      <main className="container mx-auto px-4 py-8 flex-grow">
        {searchParams && (
          <CurrentLocation location={searchParams.name} />
        )}

        {!searchParams && !isLoading && (
          <div className="flex flex-col items-center justify-center min-h-[60vh] text-center py-12">
            <div className="flex items-center mb-6">
              <C4Logo className="h-14 w-14 mr-3" />
              <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-500 to-cyan-500 bg-clip-text text-transparent">
                Whether or Not
              </h1>
            </div>
            <h2 className="text-2xl font-bold mb-4">Activity Weather Forecast</h2>
            <div className="text-muted-foreground max-w-md mb-8 space-y-4">
              <p className="leading-relaxed">
                <span className="font-semibold text-foreground">"Weather or Not"</span> is a tool designed to provide tailored activity recommendations based on weather forecasts for any city.
              </p>
              <p className="leading-relaxed">
                Get intelligent suggestions for:
                <span className="block mt-2 ml-4 font-medium text-foreground">
                  • Skiing
                  • Surfing
                  • Sightseeing
                </span>
              </p>
              <p className="leading-relaxed">
                Using real-time data from Open-Meteo, simply search for a city or town to explore the forecast and discover the most suitable activities.
              </p>
            </div>

            {/* More prominent search form with a shadow and border */}
            <div className="w-full max-w-md mb-6 transform transition-all duration-300 hover:scale-105">
              <div className="p-4 card-dark rounded-lg border-2 border-primary shadow-lg shadow-primary/20">
                <SearchForm onSearch={handleSearch} />

                {/* Location suggestion */}
                {locationSuggestion && !loadingUserLocation && (
                  <div className="mt-3 text-center">
                    <p className="text-sm text-muted-foreground mb-1">Try this popular location:</p>
                    <button
                      className="text-primary hover:underline hover:text-primary-light transition-colors font-medium"
                      onClick={() => {
                        const loc = locationSuggestion;
                        const fullName = loc.admin1 
                          ? `${loc.name}, ${loc.admin1}, ${loc.country}`
                          : `${loc.name}, ${loc.country}`;
                        handleSearch(
                          loc.latitude.toString(),
                          loc.longitude.toString(),
                          fullName
                        );
                      }}
                    >
                      {locationSuggestion.admin1 
                        ? `${locationSuggestion.name}, ${locationSuggestion.admin1}, ${locationSuggestion.country}`
                        : `${locationSuggestion.name}, ${locationSuggestion.country}`}
                    </button>
                  </div>
                )}

                {/* Show loading state for user location */}
                {loadingUserLocation && (
                  <div className="mt-3 text-center">
                    <p className="text-sm text-muted-foreground">Finding your location...</p>
                  </div>
                )}
              </div>
            </div>

            {/* Search history */}
            {searchHistory.length > 0 && (
              <div className="w-full max-w-md mt-6">
                <SearchHistory onSelectLocation={handleSearch} />
              </div>
            )}
          </div>
        )}

        {searchParams && (
          <>
            <div className="w-full max-w-md mx-auto my-8">
              <SearchForm onSearch={handleSearch} />
            </div>

            <ActivityLegend />

            {isError && (
              <ErrorState 
                message={error?.message || "Failed to load weather data. Please try again."} 
                onRetry={() => refetch()} 
              />
            )}

            {!isLoading && data?.days && (
              <>
                <div className="mb-6 p-4 card-dark rounded-lg shadow-md">
                  <h2 className="text-xl font-bold mb-2">Weather Summary for {data.location}</h2>
                  <p className="text-muted-foreground">
                    We've analyzed the weather forecast for the next 7 days and rated it for various activities.
                    Below you'll find our activity scores and recommendations to help you decide whether or not
                    it's a good time for your favorite outdoor and indoor activities.
                  </p>
                </div>
                <ActivitySummaryChart days={data.days} />
              </>
            )}

            <WeatherForecast 
              forecastData={data} 
              isLoading={isLoading} 
            />
          </>
        )}
      </main>

      <Footer />
    </div>
  );
}