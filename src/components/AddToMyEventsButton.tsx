import { Heart, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useMyEvents } from '@/hooks/useMyEvents';
import { Event } from '@/data/statesData';
import { cn } from '@/lib/utils';

interface AddToMyEventsButtonProps {
  event: Event;
  variant?: 'default' | 'icon' | 'compact';
  className?: string;
}

const AddToMyEventsButton = ({ event, variant = 'default', className }: AddToMyEventsButtonProps) => {
  const { toggleEvent, isSelected } = useMyEvents();
  const selected = isSelected(event.id);

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleEvent(event);
  };

  if (variant === 'icon') {
    return (
      <Button
        variant="ghost"
        size="icon"
        onClick={handleClick}
        className={cn(
          "h-8 w-8 transition-all",
          selected && "text-destructive hover:text-destructive/80",
          className
        )}
        title={selected ? 'Remove from My Events' : 'Add to My Events'}
      >
        <Heart className={cn("h-4 w-4", selected && "fill-current")} />
      </Button>
    );
  }

  if (variant === 'compact') {
    return (
      <Button
        variant={selected ? "secondary" : "outline"}
        size="sm"
        onClick={handleClick}
        className={cn("h-7 text-xs gap-1", className)}
      >
        {selected ? (
          <>
            <Check className="h-3 w-3" />
            Added
          </>
        ) : (
          <>
            <Heart className="h-3 w-3" />
            Add
          </>
        )}
      </Button>
    );
  }

  return (
    <Button
      variant={selected ? "secondary" : "subtle"}
      size="sm"
      onClick={handleClick}
      className={cn("gap-2", className)}
    >
      {selected ? (
        <>
          <Check className="h-4 w-4" />
          In My Events
        </>
      ) : (
        <>
          <Heart className="h-4 w-4" />
          Add to My Events
        </>
      )}
    </Button>
  );
};

export default AddToMyEventsButton;
