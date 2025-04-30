import { Search } from "lucide-react";
import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { GeocodingResult } from "@shared/types";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { searchLocations } from "@/lib/api";

interface SearchFormProps {
  onSearch: (latitude: string, longitude: string, name: string) => void;
}

export default function SearchForm({ onSearch }: SearchFormProps) {
  const [query, setQuery] = useState("");
  const [showResults, setShowResults] = useState(false);
  const [debouncedQuery, setDebouncedQuery] = useState("");

  // Debounce the search query to avoid too many requests
  useEffect(() => {
    const timer = setTimeout(() => {
      if (query.trim().length > 1) {
        setDebouncedQuery(query);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [query]);

  const { 
    data: locations, 
    isLoading,
    refetch,
    error
  } = useQuery({ 
    queryKey: ['/api/locations', debouncedQuery],
    queryFn: () => searchLocations(debouncedQuery),
    enabled: debouncedQuery.length > 1 && showResults,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim().length > 1) {
      setShowResults(true);
      refetch();
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
          className="w-full pl-4 pr-10 py-2 bg-card border-border rounded-lg focus:ring-2 focus:ring-primary"
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
          "absolute z-10 w-full bg-card border border-border rounded-lg shadow-lg mt-1",
          ((!locations?.results?.length && !isLoading) || !showResults) && "hidden"
        )}
      >
        {isLoading && (
          <div className="p-3 text-muted-foreground text-sm">Loading...</div>
        )}
        
        {error && (
          <div className="p-3 text-destructive text-sm">Error loading locations. Please try again.</div>
        )}
        
        {locations?.results?.map((location) => (
          <div 
            key={location.id}
            className="p-2 hover:bg-muted cursor-pointer border-b border-border last:border-b-0"
            onClick={() => handleSelectLocation(location)}
          >
            {location.admin1 
              ? `${location.name}, ${location.admin1}, ${location.country}`
              : `${location.name}, ${location.country}`}
          </div>
        ))}
        
        {locations?.results?.length === 0 && !isLoading && !error && (
          <div className="p-3 text-muted-foreground text-sm">No locations found</div>
        )}
      </div>
    </div>
  );
}
