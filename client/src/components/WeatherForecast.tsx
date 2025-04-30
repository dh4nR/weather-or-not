import { WeatherForecastData } from "@shared/types";
import DayForecast from "./DayForecast";
import { Skeleton } from "@/components/ui/skeleton";

interface WeatherForecastProps {
  forecastData?: WeatherForecastData;
  isLoading: boolean;
}

export default function WeatherForecast({ forecastData, isLoading }: WeatherForecastProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4 sm:gap-6">
      {isLoading && (
        // Loading placeholders
        <>
          {Array.from({ length: 4 }).map((_, index) => (
            <ForecastSkeleton key={index} />
          ))}
        </>
      )}

      {!isLoading && forecastData?.days?.map((day, index) => (
        <DayForecast key={index} day={day} isToday={index === 0} />
      ))}
    </div>
  );
}

function ForecastSkeleton() {
  return (
    <div className="card-dark rounded-lg shadow-md overflow-hidden animate-pulse">
      <div className="bg-primary/70 p-3 text-center">
        <Skeleton className="h-6 w-1/2 mx-auto bg-white/20" />
        <Skeleton className="h-4 w-1/3 mx-auto mt-1 bg-white/20" />
      </div>
      <div className="p-3 sm:p-4">
        <div className="flex items-start mb-3">
          <Skeleton className="h-8 w-8 sm:h-10 sm:w-10 rounded-full mr-3" />
          <div className="flex-1">
            <Skeleton className="h-6 w-20 mb-2" />
            <Skeleton className="h-4 w-24" />
          </div>
        </div>
        <div className="grid grid-cols-1 xs:grid-cols-2 gap-2 mb-4">
          <Skeleton className="h-5" />
          <Skeleton className="h-5" />
          <Skeleton className="h-5" />
          <Skeleton className="h-5" />
        </div>
        <div className="my-3 border-t border-border opacity-50" />
        <div className="space-y-3">
          <Skeleton className="h-5 w-1/3" />
          <Skeleton className="h-5" />
          <Skeleton className="h-5" />
          <Skeleton className="h-5" />
          <Skeleton className="h-5" />
        </div>
      </div>
    </div>
  );
}
