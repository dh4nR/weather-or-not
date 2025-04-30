import * as React from "react"
import * as TooltipPrimitive from "@radix-ui/react-tooltip"

import { cn } from "@/lib/utils"

const TooltipProvider = TooltipPrimitive.Provider

const Tooltip = TooltipPrimitive.Root

const TooltipTrigger = TooltipPrimitive.Trigger

const TooltipContent = React.forwardRef<
  React.ElementRef<typeof TooltipPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Content>
>(({ className, sideOffset = 4, ...props }, ref) => (
  <TooltipPrimitive.Content
    ref={ref}
    sideOffset={sideOffset}
    className={cn(
      "z-50 overflow-hidden rounded-md border bg-popover px-3 py-1.5 text-sm text-popover-foreground shadow-md animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
      className
    )}
    {...props}
  />
))
TooltipContent.displayName = TooltipPrimitive.Content.displayName

// Added custom export for more convenient use
const TooltipText = ({ text, className, label = "Score factors" }: { text: string, className?: string, label?: string }) => (
  <div className={cn("relative group", className)}>
    <span className="text-sm text-neutral-600 underline cursor-help border-b border-dotted border-neutral-400">{label}</span>
    <div className="invisible group-hover:visible absolute bottom-full left-1/2 transform -translate-x-1/2 w-[200px] md:w-[260px] bg-neutral-800 text-white text-center py-2 px-3 rounded-md text-xs z-50 transition-opacity opacity-0 group-hover:opacity-100 shadow-lg mb-2">
      {text}
      <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-[6px] border-r-[6px] border-t-[6px] border-transparent border-t-neutral-800"></div>
    </div>
  </div>
)

export {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider,
  TooltipText
}
