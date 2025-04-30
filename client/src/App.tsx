import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Home from "@/pages/Home";
import { useThemeMode } from "@/hooks/useThemeMode";
import { WeatherThemeProvider } from "@/hooks/useWeatherTheme";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  const themeMode = useThemeMode();

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WeatherThemeProvider>
          <div 
            className={themeMode}
            style={{ 
              backgroundColor: themeMode === 'dark' ? "rgb(24, 24, 24)" : "rgb(248, 250, 252)",
              minHeight: '100vh',
              transition: 'background-color 0.5s ease-in-out'
            }}
          >
            <Toaster />
            <Router />
          </div>
        </WeatherThemeProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
