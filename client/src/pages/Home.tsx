import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { WeatherForecastData } from "@shared/types";

import Header from "@/components/Header";
import CurrentLocation from "@/components/CurrentLocation";
import ActivityLegend from "@/components/ActivityLegend";
import ActivitySummaryChart from "@/components/ActivitySummaryChart";
import WeatherForecast from "@/components/WeatherForecast";
import ErrorState from "@/components/ErrorState";
import Footer from "@/components/Footer";

export default function Home() {
  const [searchParams, setSearchParams] = useState<{
    latitude: string;
    longitude: string;
    name: string;
  } | null>(null);

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

  const handleSearch = (latitude: string, longitude: string, name: string) => {
    setSearchParams({ latitude, longitude, name });
  };

  return (
    <div className="flex flex-col min-h-screen bg-neutral-100">
      <Header onSearch={handleSearch} />
      
      <main className="container mx-auto px-4 py-8 flex-grow">
        {searchParams && (
          <CurrentLocation location={searchParams.name} />
        )}
        
        {!searchParams && !isLoading && (
          <div className="flex flex-col items-center justify-center h-[60vh] text-center">
            <h2 className="text-2xl font-bold text-neutral-800 mb-4">Welcome to Whether or Not</h2>
            <p className="text-neutral-600 max-w-md mb-6">
              Search for a city or town to get weather forecasts and activity recommendations for skiing, surfing, and sightseeing.
            </p>
          </div>
        )}
        
        {searchParams && (
          <>
            <ActivityLegend />
            
            {isError && (
              <ErrorState 
                message={error?.message || "Failed to load weather data. Please try again."} 
                onRetry={() => refetch()} 
              />
            )}

            {!isLoading && data?.days && (
              <ActivitySummaryChart days={data.days} />
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
