
import type { FC } from 'react';

interface HeaderProps {
  onSearch: (latitude: string, longitude: string, name: string) => void;
}

export default function Header({ onSearch }: HeaderProps) {
  return (
    <header className="bg-card shadow-md border-b border-border">
      <div className="container mx-auto px-4 py-4 flex flex-col md:flex-row items-center justify-between">
        <div className="flex items-center mb-4 md:mb-0">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-500 to-cyan-500 bg-clip-text text-transparent">Whether or Not</h1>
        </div>
      </div>
    </header>
  );
}
