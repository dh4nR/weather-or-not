
import { Dispatch, SetStateAction } from 'react';

interface HeaderProps {
  onLocationSelect: Dispatch<SetStateAction<{
    latitude: string;
    longitude: string;
    name: string;
  } | null>>;
}

export default function Header({ onLocationSelect }: HeaderProps) {
  return (
    <header className="bg-card shadow-md border-b border-border">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-500 to-cyan-500 bg-clip-text text-transparent">Weather or Not</h1>
        </div>
      </div>
    </header>
  );
}
