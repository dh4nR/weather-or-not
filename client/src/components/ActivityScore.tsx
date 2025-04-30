import { CableCar, Waves, Mountain, Landmark } from "lucide-react";
import { StarRating } from "@/components/ui/stars";

interface ActivityScoreProps {
  activity: string;
  icon: "skiing" | "surfing" | "outdoor" | "indoor";
  score: number;
}

export default function ActivityScore({ activity, icon, score }: ActivityScoreProps) {
  const Icon = getActivityIcon(icon);

  return (
    <div className="flex justify-between items-center">
      <div className="flex items-center">
        <Icon className="text-primary mr-2 h-4 w-4" />
        <span className="text-sm">{activity}</span>
      </div>
      <StarRating score={score} />
    </div>
  );
}

function getActivityIcon(icon: string) {
  switch (icon) {
    case "skiing":
      return CableCar;
    case "surfing":
      return Waves;
    case "outdoor":
      return Mountain;
    case "indoor":
      return Landmark;
    default:
      return Mountain;
  }
}
