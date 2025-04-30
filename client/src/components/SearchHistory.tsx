import { Clock, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useSearchHistory } from "@/hooks/useSearchHistory";

interface SearchHistoryProps {
  onSelectLocation: (latitude: string, longitude: string, name: string) => void;
}

export default function SearchHistory({ onSelectLocation }: SearchHistoryProps) {
  const { searchHistory, clearHistory } = useSearchHistory();

  if (searchHistory.length === 0) {
    return null;
  }

  return (
    <Card className="p-3 sm:p-4 card-dark rounded-lg shadow-md mb-4 sm:mb-6">
      <div className="flex flex-col xs:flex-row justify-between xs:items-center mb-3 gap-2">
        <h2 className="text-base sm:text-lg font-medium flex items-center">
          <Clock size={16} className="mr-2 text-muted-foreground" /> 
          Recent Searches
        </h2>
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={clearHistory}
          className="h-7 sm:h-8 px-2 text-xs w-fit"
        >
          <X size={14} className="mr-1" /> Clear
        </Button>
      </div>
      
      <div className="space-y-2">
        {searchHistory.map((location, index) => (
          <Button
            key={index}
            variant="outline"
            className="w-full justify-start text-left text-xs sm:text-sm py-1.5 sm:py-2 h-auto"
            onClick={() => onSelectLocation(location.latitude, location.longitude, location.name)}
          >
            <span className="line-clamp-1">{location.name}</span>
          </Button>
        ))}
      </div>
    </Card>
  );
}