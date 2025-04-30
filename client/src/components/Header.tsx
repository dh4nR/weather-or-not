import SearchForm from "./SearchForm";
import C4Logo from "./C4Logo";

interface HeaderProps {
  onSearch: (latitude: string, longitude: string, name: string) => void;
}

export default function Header({ onSearch }: HeaderProps) {
  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-4 flex flex-col md:flex-row items-center justify-between">
        <div className="flex items-center mb-4 md:mb-0">
          <C4Logo className="text-primary h-10 w-10 mr-3" />
          <h1 className="text-2xl font-bold text-neutral-800 bg-gradient-to-r from-blue-500 to-cyan-500 bg-clip-text text-transparent">Whether or Not</h1>
        </div>
        
        <div className="w-full md:w-96">
          <SearchForm onSearch={onSearch} />
        </div>
      </div>
    </header>
  );
}
