import { Search } from "lucide-react";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { GeocodingResult } from "@shared/types";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface SearchFormProps {
  onSearch: (latitude: string, longitude: string, name: string) => void;
}

export default function SearchForm({ onSearch }: SearchFormProps) {
  const [query, setQuery] = useState("");
  const [showResults, setShowResults] = useState(false);

  const { data: locations, isLoading } = useQuery({ 
    queryKey: ['/api/locations', query],
    enabled: query.length > 1 && showResults,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim().length > 1) {
      setShowResults(true);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    if (value.length > 1) {
      setShowResults(true);
    } else {
      setShowResults(false);
    }
  };

  const handleSelectLocation = (location: GeocodingResult) => {
    const fullName = location.admin1 
      ? `${location.name}, ${location.admin1}, ${location.country}`
      : `${location.name}, ${location.country}`;
      
    onSearch(
      location.latitude.toString(),
      location.longitude.toString(),
      fullName
    );
    setQuery(fullName);
    setShowResults(false);
  };

  return (
    <div className="relative">
      <form onSubmit={handleSubmit} className="relative">
        <Input
          type="text"
          value={query}
          onChange={handleInputChange}
          placeholder="Search for a city or town..."
          className="w-full pl-4 pr-10 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          onFocus={() => query.length > 1 && setShowResults(true)}
          autoComplete="off"
        />
        <Button
          type="submit"
          variant="ghost"
          size="icon"
          className="absolute right-1 top-1/2 transform -translate-y-1/2 text-primary h-8 w-8"
        >
          <Search size={18} />
        </Button>
      </form>

      <div 
        className={cn(
          "absolute z-10 w-full bg-white border border-neutral-200 rounded-lg shadow-lg mt-1",
          ((!locations?.results?.length && !isLoading) || !showResults) && "hidden"
        )}
      >
        {isLoading && (
          <div className="p-3 text-neutral-500 text-sm">Loading...</div>
        )}
        
        {locations?.results?.map((location) => (
          <div 
            key={location.id}
            className="p-2 hover:bg-neutral-100 cursor-pointer border-b border-neutral-200 last:border-b-0"
            onClick={() => handleSelectLocation(location)}
          >
            {location.admin1 
              ? `${location.name}, ${location.admin1}, ${location.country}`
              : `${location.name}, ${location.country}`}
          </div>
        ))}
        
        {locations?.results?.length === 0 && !isLoading && (
          <div className="p-3 text-neutral-500 text-sm">No locations found</div>
        )}
      </div>
    </div>
  );
}
