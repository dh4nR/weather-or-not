import { WeatherForecastData } from "@shared/types";
import DayForecast from "./DayForecast";
import { Skeleton } from "@/components/ui/skeleton";

interface WeatherForecastProps {
  forecastData?: WeatherForecastData;
  isLoading: boolean;
}

export default function WeatherForecast({ forecastData, isLoading }: WeatherForecastProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
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
    <div className="bg-white rounded-lg shadow-md overflow-hidden animate-pulse">
      <div className="bg-neutral-300 p-3 text-center">
        <Skeleton className="h-6 w-1/2 mx-auto" />
        <Skeleton className="h-4 w-1/3 mx-auto mt-1" />
      </div>
      <div className="p-4">
        <div className="flex justify-center mb-4">
          <Skeleton className="h-12 w-12 rounded-full" />
        </div>
        <div className="text-center mb-4">
          <Skeleton className="h-8 w-1/4 mx-auto" />
          <Skeleton className="h-4 w-1/3 mx-auto mt-2" />
        </div>
        <div className="grid grid-cols-2 gap-2 mb-4">
          <Skeleton className="h-5" />
          <Skeleton className="h-5" />
          <Skeleton className="h-5" />
          <Skeleton className="h-5" />
        </div>
        <div className="my-3 border-t border-neutral-200" />
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
