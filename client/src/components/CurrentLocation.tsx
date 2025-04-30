import { format } from "date-fns";

interface CurrentLocationProps {
  location: string;
}

export default function CurrentLocation({ location }: CurrentLocationProps) {
  const today = new Date();
  const formattedDate = format(today, "EEEE, MMMM d, yyyy");

  return (
    <div className="mb-8 text-center">
      <h2 className="text-3xl font-bold text-neutral-800 mb-1">{location}</h2>
      <p className="text-neutral-500">{formattedDate}</p>
    </div>
  );
}
