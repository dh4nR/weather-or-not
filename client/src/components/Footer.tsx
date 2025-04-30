import { CloudSun } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-neutral-800 text-white p-6">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <div className="flex items-center">
              <CloudSun className="text-primary h-6 w-6 mr-2" />
              <span className="text-xl font-bold">WeatherWanderer</span>
            </div>
            <p className="text-neutral-400 text-sm mt-1">Plan your activities based on weather conditions</p>
          </div>
          <div>
            <p className="text-neutral-400 text-sm">
              Powered by <a href="https://open-meteo.com/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Open-Meteo API</a>
            </p>
            <p className="text-neutral-400 text-sm mt-1">© {new Date().getFullYear()} WeatherWanderer. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
