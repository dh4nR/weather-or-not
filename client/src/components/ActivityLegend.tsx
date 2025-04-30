import { CableCar, Waves, Mountain, Landmark } from "lucide-react";
import { TooltipText } from "@/components/ui/tooltip";
import { Card, CardContent } from "@/components/ui/card";

export default function ActivityLegend() {
  return (
    <Card className="mb-8">
      <CardContent className="pt-6">
        <h3 className="text-lg font-semibold text-neutral-800 mb-3">Activity Suitability Scale</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="flex items-center">
            <CableCar className="text-primary w-8 h-5" />
            <span className="font-medium mr-2">Skiing:</span>
            <TooltipText text="Based on temperature, snowfall, and precipitation" />
          </div>

          <div className="flex items-center">
            <Waves className="text-primary w-8 h-5" />
            <span className="font-medium mr-2">Surfing:</span>
            <TooltipText text="Based on wind speed, precipitation, and temperature" />
          </div>

          <div className="flex items-center">
            <Mountain className="text-primary w-8 h-5" />
            <span className="font-medium mr-2">Outdoor Sightseeing:</span>
            <TooltipText text="Based on temperature, precipitation, and cloud cover" />
          </div>

          <div className="flex items-center">
            <Landmark className="text-primary w-8 h-5" />
            <span className="font-medium mr-2">Indoor Sightseeing:</span>
            <TooltipText text="Based on precipitation and cloud cover (inverse)" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
