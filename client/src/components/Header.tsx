
import { Dispatch, SetStateAction } from 'react';
import SearchForm from './SearchForm';

interface HeaderProps {
  onLocationSelect: Dispatch<SetStateAction<{
    latitude: string;
    longitude: string;
    name: string;
  } | null>>;
  showSearch?: boolean;
}

export default function Header({ onLocationSelect, showSearch = false }: HeaderProps) {
  return (
    <header className="bg-card shadow-md border-b border-border">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-500 to-cyan-500 bg-clip-text text-transparent">Weather or Not</h1>
        </div>
        {showSearch && (
          <div className="w-full md:w-1/2 lg:w-1/3">
            <SearchForm onLocationSelect={onLocationSelect} className="w-full" />
          </div>
        )}
      </div>
    </header>
  );
}
