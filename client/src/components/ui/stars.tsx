import { cn } from "@/lib/utils";
import { Star } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface StarRatingProps {
  score: number;
  maxScore?: number;
  className?: string;
  showText?: boolean;
  size?: number;
  showTooltip?: boolean;
}

// Map score to descriptive text
function getScoreDescription(score: number): string {
  if (score <= 1) return "Poor";
  if (score <= 2) return "Fair";
  if (score <= 3) return "Good";
  if (score <= 4) return "Very Good";
  return "Excellent";
}

// Get color based on score
function getScoreColor(score: number): string {
  if (score <= 1) return "text-red-500 fill-red-500";
  if (score <= 2) return "text-orange-500 fill-orange-500";
  if (score <= 3) return "text-amber-500 fill-amber-500";
  if (score <= 4) return "text-lime-500 fill-lime-500";
  return "text-green-500 fill-green-500";
}

export function StarRating({
  score,
  maxScore = 5,
  className,
  showText = true,
  size = 16,
  showTooltip = true,
}: StarRatingProps) {
  const roundedScore = Math.round(score);
  const description = getScoreDescription(roundedScore);
  
  const ratingComponent = (
    <div className={cn("flex items-center", className)}>
      <div className="flex">
        {Array.from({ length: maxScore }).map((_, i) => (
          <Star
            key={i}
            size={size}
            className={cn(
              "transition-colors",
              i < roundedScore 
                ? getScoreColor(roundedScore)
                : "fill-none text-neutral-300"
            )}
          />
        ))}
      </div>
      {showText && (
        <span className={cn("ml-2 text-sm font-medium", getScoreColor(roundedScore).split(' ')[0])}>
          {roundedScore}/{maxScore}
        </span>
      )}
    </div>
  );

  // If tooltip is enabled, wrap the component in a tooltip
  if (showTooltip) {
    return (
      <TooltipProvider>
        <Tooltip delayDuration={300}>
          <TooltipTrigger asChild>
            {ratingComponent}
          </TooltipTrigger>
          <TooltipContent>
            <p className="text-xs">{description} ({roundedScore}/5)</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  }

  return ratingComponent;
}
