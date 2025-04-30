import { format } from "date-fns";

interface CurrentLocationProps {
  location: string;
}

export default function CurrentLocation({ location }: CurrentLocationProps) {
  const today = new Date();
  const formattedDate = format(today, "EEEE, MMMM d, yyyy");

  return (
    <div key={location} className="mb-4 sm:mb-8 text-center animate-fade-in">
      <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-1 line-clamp-2">{location}</h2>
      <p className="text-muted-foreground text-xs sm:text-sm">{formattedDate}</p>
    </div>
  );
}
