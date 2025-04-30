import { CableCar, Waves, Mountain, Landmark, InfoIcon } from "lucide-react";
import { TooltipText } from "@/components/ui/tooltip";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { StarRating } from "@/components/ui/stars";

export default function ActivityLegend() {
  return (
    <Card className="mb-8">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-2">
          Activity Suitability Guide
          <InfoIcon className="h-4 w-4 text-neutral-400" />
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <h4 className="text-sm font-medium text-neutral-600 mb-1">Activities</h4>
            <div className="space-y-3">
              <div className="flex items-center gap-2 p-2 rounded-md bg-blue-50 border border-blue-100">
                <CableCar className="text-blue-600 h-5 w-5" />
                <div>
                  <span className="font-medium">Skiing</span>
                  <div className="text-xs text-neutral-600 mt-0.5">Based on temperature, snowfall, and precipitation</div>
                </div>
              </div>
              
              <div className="flex items-center gap-2 p-2 rounded-md bg-cyan-50 border border-cyan-100">
                <Waves className="text-cyan-600 h-5 w-5" />
                <div>
                  <span className="font-medium">Surfing</span>
                  <div className="text-xs text-neutral-600 mt-0.5">Based on wind speed, precipitation, and temperature</div>
                </div>
              </div>

              <div className="flex items-center gap-2 p-2 rounded-md bg-green-50 border border-green-100">
                <Mountain className="text-green-600 h-5 w-5" />
                <div>
                  <span className="font-medium">Outdoor Sightseeing</span>
                  <div className="text-xs text-neutral-600 mt-0.5">Based on temperature, precipitation, and cloud cover</div>
                </div>
              </div>

              <div className="flex items-center gap-2 p-2 rounded-md bg-orange-50 border border-orange-100">
                <Landmark className="text-orange-600 h-5 w-5" />
                <div>
                  <span className="font-medium">Indoor Sightseeing</span>
                  <div className="text-xs text-neutral-600 mt-0.5">Based on precipitation and cloud cover (inverse)</div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="space-y-2">
            <h4 className="text-sm font-medium text-neutral-600 mb-1">Star Rating Scale</h4>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-2 rounded-md bg-neutral-50 border border-neutral-100">
                <span className="font-medium">Excellent</span>
                <StarRating score={5} showText={false} showTooltip={false} />
              </div>
              
              <div className="flex items-center justify-between p-2 rounded-md bg-neutral-50 border border-neutral-100">
                <span className="font-medium">Very Good</span>
                <StarRating score={4} showText={false} showTooltip={false} />
              </div>
              
              <div className="flex items-center justify-between p-2 rounded-md bg-neutral-50 border border-neutral-100">
                <span className="font-medium">Good</span>
                <StarRating score={3} showText={false} showTooltip={false} />
              </div>
              
              <div className="flex items-center justify-between p-2 rounded-md bg-neutral-50 border border-neutral-100">
                <span className="font-medium">Fair</span>
                <StarRating score={2} showText={false} showTooltip={false} />
              </div>
              
              <div className="flex items-center justify-between p-2 rounded-md bg-neutral-50 border border-neutral-100">
                <span className="font-medium">Poor</span>
                <StarRating score={1} showText={false} showTooltip={false} />
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
