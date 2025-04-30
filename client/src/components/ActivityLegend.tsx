import { CableCar, Waves, Mountain, Landmark, InfoIcon } from "lucide-react";
import { TooltipText } from "@/components/ui/tooltip";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { StarRating } from "@/components/ui/stars";

export default function ActivityLegend() {
  return (
    <Card className="mb-4 sm:mb-8 card-dark border-primary/20">
      <CardHeader className="pb-1 sm:pb-2 px-3 py-2 sm:p-4">
        <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
          Activity Suitability Guide
          <InfoIcon className="h-4 w-4 text-muted-foreground" />
        </CardTitle>
      </CardHeader>
      <CardContent className="px-3 py-2 sm:p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
          <div className="space-y-2">
            <h4 className="text-xs sm:text-sm font-medium text-muted-foreground mb-1">Activities</h4>
            <div className="space-y-2 sm:space-y-3">
              <div className="flex items-center gap-2 p-2 rounded-md bg-blue-500/10 border border-blue-500/20">
                <CableCar className="text-blue-500 h-4 w-4 sm:h-5 sm:w-5" />
                <div>
                  <span className="font-medium text-xs sm:text-sm">Skiing</span>
                  <div className="text-[10px] sm:text-xs text-muted-foreground mt-0.5">Based on temperature, snowfall, and precipitation</div>
                </div>
              </div>
              
              <div className="flex items-center gap-2 p-2 rounded-md bg-cyan-500/10 border border-cyan-500/20">
                <Waves className="text-cyan-500 h-4 w-4 sm:h-5 sm:w-5" />
                <div>
                  <span className="font-medium text-xs sm:text-sm">Surfing</span>
                  <div className="text-[10px] sm:text-xs text-muted-foreground mt-0.5">Based on wind speed, precipitation, and temperature</div>
                </div>
              </div>

              <div className="flex items-center gap-2 p-2 rounded-md bg-green-500/10 border border-green-500/20">
                <Mountain className="text-green-500 h-4 w-4 sm:h-5 sm:w-5" />
                <div>
                  <span className="font-medium text-xs sm:text-sm">Outdoor Sightseeing</span>
                  <div className="text-[10px] sm:text-xs text-muted-foreground mt-0.5">Based on temperature, precipitation, and cloud cover</div>
                </div>
              </div>

              <div className="flex items-center gap-2 p-2 rounded-md bg-orange-500/10 border border-orange-500/20">
                <Landmark className="text-orange-500 h-4 w-4 sm:h-5 sm:w-5" />
                <div>
                  <span className="font-medium text-xs sm:text-sm">Indoor Sightseeing</span>
                  <div className="text-[10px] sm:text-xs text-muted-foreground mt-0.5">Based on precipitation and cloud cover (inverse)</div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="space-y-2">
            <h4 className="text-xs sm:text-sm font-medium text-muted-foreground mb-1">Star Rating Scale</h4>
            <div className="space-y-2 sm:space-y-3">
              <div className="flex items-center justify-between p-2 rounded-md bg-primary/5 border border-primary/20">
                <span className="font-medium text-xs sm:text-sm">Excellent</span>
                <StarRating score={5} showText={false} showTooltip={false} size={14} />
              </div>
              
              <div className="flex items-center justify-between p-2 rounded-md bg-primary/5 border border-primary/20">
                <span className="font-medium text-xs sm:text-sm">Very Good</span>
                <StarRating score={4} showText={false} showTooltip={false} size={14} />
              </div>
              
              <div className="flex items-center justify-between p-2 rounded-md bg-primary/5 border border-primary/20">
                <span className="font-medium text-xs sm:text-sm">Good</span>
                <StarRating score={3} showText={false} showTooltip={false} size={14} />
              </div>
              
              <div className="flex items-center justify-between p-2 rounded-md bg-primary/5 border border-primary/20">
                <span className="font-medium text-xs sm:text-sm">Fair</span>
                <StarRating score={2} showText={false} showTooltip={false} size={14} />
              </div>
              
              <div className="flex items-center justify-between p-2 rounded-md bg-primary/5 border border-primary/20">
                <span className="font-medium text-xs sm:text-sm">Poor</span>
                <StarRating score={1} showText={false} showTooltip={false} size={14} />
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
