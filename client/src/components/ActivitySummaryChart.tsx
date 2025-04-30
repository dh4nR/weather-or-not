import { useRef, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { DayForecast } from "@shared/types";
import { Area, Bar, CartesianGrid, ComposedChart, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { CableCar, Waves, Mountain, Landmark, ArrowRight, TrendingUp, Calendar, ThermometerSun } from "lucide-react";
import { StarRating } from "@/components/ui/stars";

interface ActivitySummaryChartProps {
  days: DayForecast[];
}

const activityColors = {
  skiing: "#3b82f6", // blue
  surfing: "#06b6d4", // cyan
  outdoorSightseeing: "#22c55e", // green
  indoorSightseeing: "#f97316", // orange
};

interface ActivityLegendItemProps {
  color: string;
  name: string;
  icon: React.ReactNode;
  score?: number;
}

const ActivityLegendItem = ({ color, name, icon, score }: ActivityLegendItemProps) => (
  <div className="flex items-center gap-2">
    <div className="flex items-center justify-center w-6 h-6 rounded-md" style={{ backgroundColor: color }}>
      {icon}
    </div>
    <span className="text-sm font-medium">{name}</span>
    {score !== undefined && (
      <div className="ml-1">
        <StarRating score={score} size={14} showText={false} />
      </div>
    )}
  </div>
);

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="card-dark p-3 border rounded-md shadow-lg text-card-foreground">
        <p className="font-medium">{label}</p>
        <div className="mt-2 space-y-1">
          {payload.map((entry: any, index: number) => (
            <div key={`item-${index}`} className="flex items-center gap-2">
              <div 
                className="w-3 h-3" 
                style={{ backgroundColor: entry.fill || entry.stroke }}
              />
              <span className="text-xs">
                {entry.name}: {entry.name === "Temp °F" ? `${entry.value}°F` : entry.value}
              </span>
            </div>
          ))}
        </div>
      </div>
    );
  }
  return null;
};

export default function ActivitySummaryChart({ days }: ActivitySummaryChartProps) {
  // Format data for chart
  const chartData = days.map(day => ({
    name: day.day,
    skiing: day.activityScores.skiing,
    surfing: day.activityScores.surfing,
    outdoorSightseeing: day.activityScores.outdoorSightseeing,
    indoorSightseeing: day.activityScores.indoorSightseeing,
    temperature: day.temperature,
  }));

  // Calculate average scores
  const averageScores = {
    skiing: Number((days.reduce((acc, day) => acc + day.activityScores.skiing, 0) / days.length).toFixed(1)),
    surfing: Number((days.reduce((acc, day) => acc + day.activityScores.surfing, 0) / days.length).toFixed(1)),
    outdoorSightseeing: Number((days.reduce((acc, day) => acc + day.activityScores.outdoorSightseeing, 0) / days.length).toFixed(1)),
    indoorSightseeing: Number((days.reduce((acc, day) => acc + day.activityScores.indoorSightseeing, 0) / days.length).toFixed(1)),
  };

  // Find best activity
  const bestActivity = Object.entries(averageScores).reduce(
    (best, [activity, score]) => (score > best.score ? { activity, score } : best),
    { activity: "", score: 0 }
  );

  // Get days with highest score for each activity
  const bestDays = {
    skiing: [...days].sort((a, b) => b.activityScores.skiing - a.activityScores.skiing)[0],
    surfing: [...days].sort((a, b) => b.activityScores.surfing - a.activityScores.surfing)[0],
    outdoorSightseeing: [...days].sort((a, b) => b.activityScores.outdoorSightseeing - a.activityScores.outdoorSightseeing)[0],
    indoorSightseeing: [...days].sort((a, b) => b.activityScores.indoorSightseeing - a.activityScores.indoorSightseeing)[0],
  };

  // Get activity icon
  const getActivityIcon = (activity: string) => {
    switch(activity) {
      case "skiing": return <CableCar className="h-4 w-4 text-white" />;
      case "surfing": return <Waves className="h-4 w-4 text-white" />;
      case "outdoorSightseeing": return <Mountain className="h-4 w-4 text-white" />;
      case "indoorSightseeing": return <Landmark className="h-4 w-4 text-white" />;
      default: return null;
    }
  };

  // Format activity names for display
  const formatActivityName = (activity: string) => {
    switch(activity) {
      case "skiing": return "Skiing";
      case "surfing": return "Surfing";
      case "outdoorSightseeing": return "Outdoor Sightseeing";
      case "indoorSightseeing": return "Indoor Sightseeing";
      default: return activity;
    }
  };

  // Get activity color
  const getActivityColor = (activity: string) => {
    switch(activity) {
      case "skiing": return "bg-blue-600";
      case "surfing": return "bg-cyan-600";
      case "outdoorSightseeing": return "bg-green-600";
      case "indoorSightseeing": return "bg-orange-600";
      default: return "bg-primary";
    }
  };

  return (
    <Card className="mb-8 overflow-hidden border-primary/20">
      <div className="bg-gradient-to-r from-primary/20 to-primary/5 px-4 sm:px-6 py-4">
        <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
          <TrendingUp className="h-5 w-5 text-primary" />
          Activity Overview and Recommendations
        </CardTitle>
      </div>
      
      <CardContent className="p-3 sm:p-6">
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            <div className="bg-gradient-to-br from-primary/10 to-primary/5 rounded-lg border border-primary/20 p-3 sm:p-4">
              <h3 className="text-base sm:text-lg font-semibold mb-2 sm:mb-3 flex items-center gap-2">
                <Badge className={getActivityColor(bestActivity.activity)}>
                  {getActivityIcon(bestActivity.activity)}
                </Badge>
                Best Activity
              </h3>
              
              <div className="mb-2 sm:mb-3">
                <div className="flex items-center gap-2">
                  <span className="text-lg sm:text-xl font-bold">{formatActivityName(bestActivity.activity)}</span>
                  <StarRating score={bestActivity.score} size={16} />
                </div>
                <p className="text-xs sm:text-sm text-muted-foreground mt-1">
                  This location is especially good for {formatActivityName(bestActivity.activity).toLowerCase()} during your stay
                </p>
              </div>
              
              <div className="grid grid-cols-1 xs:grid-cols-2 gap-2 sm:gap-3 mt-3 sm:mt-4">
                <div className="flex items-center gap-2 text-xs sm:text-sm">
                  <ThermometerSun className="h-4 w-4 text-amber-500" />
                  <span>Average Temp: {Math.round(days.reduce((acc, day) => acc + day.temperature, 0) / days.length)}°F</span>
                </div>
                <div className="flex items-center gap-2 text-xs sm:text-sm">
                  <Calendar className="h-4 w-4 text-primary" />
                  <span>Forecast: {days.length} days</span>
                </div>
              </div>
            </div>
            
            <div className="p-3 sm:p-4 rounded-lg border card-dark">
              <h3 className="text-base sm:text-lg font-semibold mb-2 sm:mb-3">Best Days by Activity</h3>
              <div className="grid gap-2 sm:gap-3">
                {Object.entries(bestDays).map(([activity, day]) => day && (
                  <div key={activity} className="flex flex-col xs:flex-row xs:items-center xs:justify-between p-2 sm:px-3 sm:py-2 rounded-md bg-primary/5">
                    <div className="flex items-center gap-2 mb-1 xs:mb-0">
                      <div className={`w-5 h-5 sm:w-6 sm:h-6 rounded-md flex items-center justify-center ${getActivityColor(activity)} text-white`}>
                        {getActivityIcon(activity)}
                      </div>
                      <span className="font-medium text-sm">{formatActivityName(activity)}</span>
                    </div>
                    <div className="flex items-center gap-1 sm:gap-2 ml-7 xs:ml-0">
                      <StarRating score={day.activityScores[activity as keyof typeof day.activityScores]} showText={false} size={14} />
                      <ArrowRight className="h-3 w-3 text-muted-foreground" />
                      <span className="text-xs sm:text-sm">{day.day}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-4 sm:mt-5">
            <div className="mb-3 p-2 rounded-md border card-dark">
              <h4 className="text-xs sm:text-sm font-medium mb-2">Chart Legend</h4>
              <div className="flex flex-wrap gap-x-3 sm:gap-x-6 gap-y-2">
                <ActivityLegendItem 
                  color={activityColors.skiing} 
                  name="Skiing" 
                  icon={<CableCar className="h-3 w-3 text-white" />} 
                  score={averageScores.skiing}
                />
                <ActivityLegendItem 
                  color={activityColors.surfing} 
                  name="Surfing" 
                  icon={<Waves className="h-3 w-3 text-white" />} 
                  score={averageScores.surfing}
                />
                <ActivityLegendItem 
                  color={activityColors.outdoorSightseeing} 
                  name="Outdoor" 
                  icon={<Mountain className="h-3 w-3 text-white" />} 
                  score={averageScores.outdoorSightseeing}
                />
                <ActivityLegendItem 
                  color={activityColors.indoorSightseeing} 
                  name="Indoor" 
                  icon={<Landmark className="h-3 w-3 text-white" />} 
                  score={averageScores.indoorSightseeing}
                />
              </div>
            </div>

            <div className="h-60 sm:h-80 mt-3 sm:mt-4">
              <ResponsiveContainer width="100%" height="100%">
                <ComposedChart data={chartData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                  <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                  <YAxis 
                    yAxisId="left" 
                    domain={[0, 5]} 
                    label={{ value: 'Activity Score', angle: -90, position: 'insideLeft', style: { fontSize: '12px' } }} 
                    tick={{ fontSize: 12 }}
                  />
                  <YAxis 
                    yAxisId="right" 
                    orientation="right" 
                    domain={['dataMin - 5', 'dataMax + 5']} 
                    label={{ value: 'Temperature (°F)', angle: 90, position: 'insideRight', style: { fontSize: '12px' } }} 
                    tick={{ fontSize: 12 }}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar yAxisId="left" dataKey="skiing" fill={activityColors.skiing} name="Skiing" />
                  <Bar yAxisId="left" dataKey="surfing" fill={activityColors.surfing} name="Surfing" />
                  <Bar yAxisId="left" dataKey="outdoorSightseeing" fill={activityColors.outdoorSightseeing} name="Outdoor" />
                  <Bar yAxisId="left" dataKey="indoorSightseeing" fill={activityColors.indoorSightseeing} name="Indoor" />
                  <Area 
                    yAxisId="right" 
                    type="monotone" 
                    dataKey="temperature" 
                    stroke="#ef4444" 
                    fill="#ef4444" 
                    fillOpacity={0.2} 
                    name="Temp °F"
                  />
                </ComposedChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}