import { useState } from "react";
import { DayForecast as DayForecastType } from "@shared/types";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { 
  CloudSun, Sun, Cloud, CloudRain, CloudSnow, CloudFog, 
  CloudLightning, ThermometerSun, ThermometerSnowflake,
  Wind, Droplets, Snowflake, ChevronDown, ChevronUp
} from "lucide-react";
import ActivityScore from "./ActivityScore";
import { 
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

interface DayForecastProps {
  day: DayForecastType;
  isToday: boolean;
}

export default function DayForecast({ day, isToday }: DayForecastProps) {
  const [isOpen, setIsOpen] = useState(isToday);
  
  // Get appropriate weather icon based on weather code
  const WeatherIcon = getWeatherIcon(day.weatherCode);
  
  // Find the best activity for this day
  const bestActivity = getBestActivity(day);
  
  // Get the color based on temperature
  const getTempColor = (temp: number) => {
    if (temp < 32) return "text-blue-600";
    if (temp < 50) return "text-blue-400";
    if (temp < 68) return "text-green-500";
    if (temp < 80) return "text-amber-500";
    return "text-red-500";
  };

  return (
    <Collapsible
      open={isOpen}
      onOpenChange={setIsOpen}
      className="bg-white rounded-lg shadow-md overflow-hidden transition-all hover:shadow-lg"
    >
      <div className={`p-3 ${isToday ? 'bg-gradient-to-r from-primary to-primary/90' : 'bg-primary'} text-white`}>
        <div className="flex items-center justify-between">
          <div className="text-center">
            <h3 className="font-semibold">{day.date}</h3>
            <p className="text-sm opacity-80">{day.fullDate}</p>
          </div>
          
          <CollapsibleTrigger asChild>
            <button className="p-1 rounded-full hover:bg-white/10 transition-colors">
              {isOpen ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
            </button>
          </CollapsibleTrigger>
        </div>
      </div>
      
      {/* Summary information always visible */}
      <div className="p-3 border-b flex items-center justify-between">
        <div className="flex items-center gap-3">
          <WeatherIcon className="text-amber-500 h-10 w-10" />
          <div>
            <span className={`text-xl font-bold ${getTempColor(day.temperature)}`}>{day.temperature}°F</span>
            <div className="text-neutral-500 text-sm flex items-center gap-1">
              {bestActivity && (
                <Badge variant="outline" className="text-xs py-0">
                  Best for: {getBestActivityName(bestActivity)}
                </Badge>
              )}
            </div>
          </div>
        </div>
        
        <div className="text-sm text-neutral-700">
          <div className="flex items-center gap-1">
            <ThermometerSun className="h-3 w-3 text-amber-500" />
            <span>{day.temperatureHigh}°</span>
            <ThermometerSnowflake className="h-3 w-3 text-blue-500 ml-1" />
            <span>{day.temperatureLow}°</span>
          </div>
        </div>
      </div>
      
      {/* Detailed content shown when expanded */}
      <CollapsibleContent>
        <div className="p-4">
          {day.snowfall > 0 && (
            <Badge variant="outline" className="mb-3 text-blue-600 border-blue-200 bg-blue-50 flex items-center gap-1">
              <Snowflake className="h-3 w-3" /> Snowfall: {day.snowfall} cm
            </Badge>
          )}
          
          <div className="grid grid-cols-2 gap-2 text-sm mb-4">
            <div className="text-neutral-600 flex items-center">
              <ThermometerSun className="w-4 h-4 mr-1 text-amber-500" /> 
              <span>High: <span className="font-medium">{day.temperatureHigh}°F</span></span>
            </div>
            <div className="text-neutral-600 flex items-center">
              <ThermometerSnowflake className="w-4 h-4 mr-1 text-blue-500" /> 
              <span>Low: <span className="font-medium">{day.temperatureLow}°F</span></span>
            </div>
            <div className="text-neutral-600 flex items-center">
              <Wind className="w-4 h-4 mr-1 text-gray-500" /> 
              <span>Wind: <span className="font-medium">{day.windSpeed} mph</span></span>
            </div>
            <div className="text-neutral-600 flex items-center">
              <Droplets className="w-4 h-4 mr-1 text-cyan-500" /> 
              <span>Rain: <span className="font-medium">{day.precipitationProbability}%</span></span>
            </div>
          </div>
          
          <div className="text-neutral-700 mb-3">
            <p>{day.condition}</p>
          </div>
          
          {bestActivity && (
            <div className="mb-3 bg-primary/10 rounded-md p-2 text-sm">
              <span className="font-medium">Best for:</span> {getBestActivityName(bestActivity)}
            </div>
          )}
          
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
      </CollapsibleContent>
    </Collapsible>
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

function getBestActivity(day: DayForecastType) {
  const scores = [
    { name: 'skiing', score: day.activityScores.skiing },
    { name: 'surfing', score: day.activityScores.surfing },
    { name: 'outdoorSightseeing', score: day.activityScores.outdoorSightseeing },
    { name: 'indoorSightseeing', score: day.activityScores.indoorSightseeing }
  ];
  
  const sortedScores = [...scores].sort((a, b) => b.score - a.score);
  return sortedScores[0].score >= 3 ? sortedScores[0].name : null;
}

function getBestActivityName(activity: string) {
  switch(activity) {
    case 'skiing': return 'Skiing';
    case 'surfing': return 'Surfing';
    case 'outdoorSightseeing': return 'Outdoor Activities';
    case 'indoorSightseeing': return 'Indoor Activities';
    default: return '';
  }
}
