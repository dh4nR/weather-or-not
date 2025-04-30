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
    <Card className="p-4 card-dark rounded-lg shadow-md mb-6">
      <div className="flex justify-between items-center mb-3">
        <h2 className="text-lg font-medium flex items-center">
          <Clock size={18} className="mr-2 text-muted-foreground" /> 
          Recent Searches
        </h2>
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={clearHistory}
          className="h-8 px-2 text-xs"
        >
          <X size={14} className="mr-1" /> Clear History
        </Button>
      </div>
      
      <div className="space-y-2">
        {searchHistory.map((location, index) => (
          <Button
            key={index}
            variant="outline"
            className="w-full justify-start text-left"
            onClick={() => onSelectLocation(location.latitude, location.longitude, location.name)}
          >
            {location.name}
          </Button>
        ))}
      </div>
    </Card>
  );
}