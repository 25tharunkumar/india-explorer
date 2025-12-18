import { cn } from '@/lib/utils';
import { eventTypeColors } from '@/data/statesData';

interface EventBadgeProps {
  type: string;
  className?: string;
}

const EventBadge = ({ type, className }: EventBadgeProps) => {
  return (
    <span
      className={cn(
        "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border",
        eventTypeColors[type] || 'bg-muted text-muted-foreground',
        className
      )}
    >
      {type}
    </span>
  );
};

export default EventBadge;
