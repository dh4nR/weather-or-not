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
  const formRef = useRef<HTMLDivElement>(null);

  // Handle click outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (formRef.current && !formRef.current.contains(event.target as Node)) {
        setShowResults(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

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
    <div className="relative" ref={formRef}>
      <form onSubmit={handleSubmit} className="relative">
        <Input
          type="text"
          value={query}
          onChange={handleInputChange}
          placeholder="Search for a city or town..."
          className="w-full pl-3 pr-10 py-2 sm:pl-4 bg-card border-border rounded-lg focus:ring-2 focus:ring-primary text-sm sm:text-base"
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
          "absolute z-10 w-full bg-card border border-border rounded-lg shadow-lg mt-1 max-h-[60vh] overflow-y-auto",
          ((!locations?.results?.length && !isLoading) || !showResults) && "hidden"
        )}
      >
        {isLoading && (
          <div className="p-2 sm:p-3 text-muted-foreground text-xs sm:text-sm">Loading...</div>
        )}
        
        {error && (
          <div className="p-2 sm:p-3 text-destructive text-xs sm:text-sm">Error loading locations. Please try again.</div>
        )}
        
        {locations?.results?.map((location) => (
          <div 
            key={location.id}
            className="p-2 hover:bg-muted cursor-pointer border-b border-border last:border-b-0 text-xs sm:text-sm"
            onClick={() => handleSelectLocation(location)}
          >
            <div className="font-medium">{location.name}</div>
            <div className="text-muted-foreground text-xs">
              {location.admin1 
                ? `${location.admin1}, ${location.country}`
                : location.country}
            </div>
          </div>
        ))}
        
        {locations?.results?.length === 0 && !isLoading && !error && (
          <div className="p-2 sm:p-3 text-muted-foreground text-xs sm:text-sm">No locations found</div>
        )}
      </div>
    </div>
  );
}
