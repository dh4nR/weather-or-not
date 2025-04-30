import { DayForecast as DayForecastType } from "@shared/types";
import { Separator } from "@/components/ui/separator";
import { 
  CloudSun, Sun, Cloud, CloudRain, CloudSnow, CloudFog, 
  CloudLightning, Thermometer, ThermometerSun, ThermometerSnowflake,
  Wind, Droplets
} from "lucide-react";
import ActivityScore from "./ActivityScore";

interface DayForecastProps {
  day: DayForecastType;
  isToday: boolean;
}

export default function DayForecast({ day, isToday }: DayForecastProps) {
  // Get appropriate weather icon based on weather code
  const WeatherIcon = getWeatherIcon(day.weatherCode);

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="bg-primary text-white p-3 text-center">
        <h3 className="font-semibold">{day.date}</h3>
        <p className="text-sm">{day.fullDate}</p>
      </div>
      <div className="p-4">
        <div className="flex justify-center mb-4">
          <WeatherIcon className="text-amber-500 h-12 w-12" />
        </div>
        <div className="text-center mb-4">
          <span className="text-2xl font-bold text-neutral-800">{day.temperature}°F</span>
          <div className="text-neutral-500 text-sm">
            <span>{day.condition}</span>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-2 text-sm mb-4">
          <div className="text-neutral-600">
            <ThermometerSun className="inline w-4 h-4 mr-1" /> High: <span className="font-medium">{day.temperatureHigh}°F</span>
          </div>
          <div className="text-neutral-600">
            <ThermometerSnowflake className="inline w-4 h-4 mr-1" /> Low: <span className="font-medium">{day.temperatureLow}°F</span>
          </div>
          <div className="text-neutral-600">
            <Wind className="inline w-4 h-4 mr-1" /> Wind: <span className="font-medium">{day.windSpeed} mph</span>
          </div>
          <div className="text-neutral-600">
            <Droplets className="inline w-4 h-4 mr-1" /> Rain: <span className="font-medium">{day.precipitationProbability}%</span>
          </div>
        </div>
        <Separator className="my-3" />
        <div className="space-y-3">
          <h4 className="text-neutral-800 font-medium mb-2">Activity Scores:</h4>
          
          <ActivityScore 
            activity="Skiing" 
            icon="skiing" 
            score={day.activityScores.skiing} 
          />
          
          <ActivityScore 
            activity="Surfing" 
            icon="surfing" 
            score={day.activityScores.surfing} 
          />
          
          <ActivityScore 
            activity="Outdoor" 
            icon="outdoor" 
            score={day.activityScores.outdoorSightseeing} 
          />
          
          <ActivityScore 
            activity="Indoor" 
            icon="indoor" 
            score={day.activityScores.indoorSightseeing} 
          />
        </div>
      </div>
    </div>
  );
}

function getWeatherIcon(code: number) {
  if (code === 0) return Sun; // Clear sky
  if (code === 1) return Sun; // Mainly clear
  if (code === 2) return CloudSun; // Partly cloudy
  if (code === 3) return Cloud; // Overcast
  if ([45, 48].includes(code)) return CloudFog; // Fog
  if ([51, 53, 55, 56, 57, 61, 63, 65, 66, 67, 80, 81, 82].includes(code)) return CloudRain; // Rain
  if ([71, 73, 75, 77, 85, 86].includes(code)) return CloudSnow; // Snow
  if ([95, 96, 99].includes(code)) return CloudLightning; // Thunderstorm
  return Cloud; // Default
}
