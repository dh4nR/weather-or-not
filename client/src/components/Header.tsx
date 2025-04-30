import { CloudSun } from "lucide-react";
import SearchForm from "./SearchForm";

interface HeaderProps {
  onSearch: (latitude: string, longitude: string, name: string) => void;
}

export default function Header({ onSearch }: HeaderProps) {
  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-4 flex flex-col md:flex-row items-center justify-between">
        <div className="flex items-center mb-4 md:mb-0">
          <CloudSun className="text-primary h-8 w-8 mr-3" />
          <h1 className="text-2xl font-bold text-neutral-800">WeatherWanderer</h1>
        </div>
        
        <div className="w-full md:w-96">
          <SearchForm onSearch={onSearch} />
        </div>
      </div>
    </header>
  );
}
