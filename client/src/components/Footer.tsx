import C4Logo from "./C4Logo";

export default function Footer() {
  return (
    <footer className="bg-neutral-800 text-white p-6">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <div className="flex items-center">
              <C4Logo className="h-8 w-8 mr-2" />
              <span className="text-xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">Whether or Not</span>
            </div>
            <p className="text-neutral-400 text-sm mt-1">Your personal weather-based activity advisor</p>
          </div>
          <div>
            <p className="text-neutral-400 text-sm">
              Powered by <a href="https://open-meteo.com/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Open-Meteo API</a>
            </p>
            <p className="text-neutral-400 text-sm mt-1">© {new Date().getFullYear()} Whether or Not by C4. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
