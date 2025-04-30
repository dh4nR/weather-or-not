
import { format } from "date-fns";

interface CurrentLocationProps {
  location: string;
}

export default function CurrentLocation({ location }: CurrentLocationProps) {
  const today = new Date();
  const formattedDate = format(today, "EEEE, MMMM d, yyyy");

  return (
    <div key={location} className="mb-4 sm:mb-8 text-center">
      <div className="animate-slide-down">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2 text-primary transition-colors duration-300 hover:text-primary/80">{location}</h2>
      </div>
      <div className="animate-fade-up">
        <p className="text-muted-foreground text-base sm:text-lg md:text-xl font-medium">{formattedDate}</p>
      </div>
    </div>
  );
}
