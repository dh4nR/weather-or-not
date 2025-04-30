export default function Footer() {
  return (
    <footer className="bg-muted text-foreground py-4 px-3 sm:p-6 border-t border-border mt-8">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center text-center md:text-left">
          <div className="mb-4 md:mb-0">
            <div className="flex items-center justify-center md:justify-start">
              <span className="text-base sm:text-xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">Whether or Not</span>
            </div>
            <p className="text-muted-foreground text-xs sm:text-sm mt-1">Your personal weather-based activity advisor</p>
          </div>
          <div>
            <p className="text-muted-foreground text-xs sm:text-sm">
              Powered by <a href="https://open-meteo.com/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Open-Meteo API</a>
            </p>
            <p className="text-muted-foreground text-xs sm:text-sm mt-1">© {new Date().getFullYear()} Whether or Not by C4. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
