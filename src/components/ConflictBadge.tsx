import { AlertTriangle } from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

interface ConflictBadgeProps {
  conflictCount: number;
  conflictingEvents?: string[];
  className?: string;
}

const ConflictBadge = ({ conflictCount, conflictingEvents, className }: ConflictBadgeProps) => {
  if (conflictCount === 0) return null;

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div
            className={cn(
              "inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium",
              "bg-destructive/15 text-destructive border border-destructive/30",
              "animate-pulse",
              className
            )}
          >
            <AlertTriangle className="h-3 w-3" />
            <span>Conflict</span>
          </div>
        </TooltipTrigger>
        <TooltipContent className="max-w-[250px]">
          <p className="font-medium">⚠️ Time Overlap Detected</p>
          <p className="text-xs text-muted-foreground mt-1">
            This event overlaps with {conflictCount} other event{conflictCount > 1 ? 's' : ''}.
            {conflictingEvents && conflictingEvents.length > 0 && (
              <span className="block mt-1">
                Conflicts: {conflictingEvents.slice(0, 2).join(', ')}
                {conflictingEvents.length > 2 && ` +${conflictingEvents.length - 2} more`}
              </span>
            )}
          </p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default ConflictBadge;
