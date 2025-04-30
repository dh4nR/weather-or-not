import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { WeatherForecastData } from "@shared/types";

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

export default function Home() {
  const [searchParams, setSearchParams] = useState<{
    latitude: string;
    longitude: string;
    name: string;
  } | null>(null);
  
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

  const handleSearch = (latitude: string, longitude: string, name: string) => {
    setSearchParams({ latitude, longitude, name });
  };

  return (
    <div className="flex flex-col min-h-screen" style={{ backgroundColor: "rgb(24, 24, 24)" }}>
      <Header onSearch={() => {}} /> {/* Keep header but don't use its search */}
      
      <main className="container mx-auto px-4 py-8 flex-grow">
        {searchParams && (
          <CurrentLocation location={searchParams.name} />
        )}
        
        {!searchParams && !isLoading && (
          <div className="flex flex-col items-center justify-center h-[60vh] text-center">
            <div className="flex items-center mb-6">
              <C4Logo className="h-12 w-12 mr-3" />
              <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-500 to-cyan-500 bg-clip-text text-transparent">
                Whether or Not
              </h1>
            </div>
            <h2 className="text-2xl font-bold mb-4">Activity Weather Forecast</h2>
            <p className="text-muted-foreground max-w-md mb-8">
              Search for a city or town to get weather forecasts and activity recommendations for skiing, surfing, and sightseeing.
            </p>
            <div className="w-full max-w-md">
              <SearchForm onSearch={handleSearch} />
            </div>
            
            {searchHistory.length > 0 && (
              <div className="w-full max-w-md mt-8">
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
