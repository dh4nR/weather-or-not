import { cn } from "@/lib/utils";
import { Star } from "lucide-react";

interface StarRatingProps {
  score: number;
  maxScore?: number;
  className?: string;
  showText?: boolean;
  size?: number;
}

export function StarRating({
  score,
  maxScore = 5,
  className,
  showText = true,
  size = 16,
}: StarRatingProps) {
  const roundedScore = Math.round(score);
  
  return (
    <div className={cn("flex items-center", className)}>
      <div className="flex">
        {Array.from({ length: maxScore }).map((_, i) => (
          <Star
            key={i}
            size={size}
            className={cn(
              "transition-colors",
              i < roundedScore 
                ? "fill-amber-500 text-amber-500" 
                : "fill-none text-neutral-300"
            )}
          />
        ))}
      </div>
      {showText && (
        <span className="ml-2 text-sm font-medium">{roundedScore}/{maxScore}</span>
      )}
    </div>
  );
}
