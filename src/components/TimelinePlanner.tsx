import { useMemo } from 'react';
import { format, parseISO, isSameDay } from 'date-fns';
import { Clock, MapPin, Calendar, Download } from 'lucide-react';
import { Event } from '@/data/statesData';
import EventBadge from '@/components/EventBadge';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface TimelinePlannerProps {
  events: Event[];
  stateName: string;
}

interface TimelineDay {
  date: Date;
  events: Event[];
}

const TimelinePlanner = ({ events, stateName }: TimelinePlannerProps) => {
  // Group events by date
  const timeline = useMemo(() => {
    const sortedEvents = [...events].sort(
      (a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime()
    );

    const grouped: TimelineDay[] = [];
    
    sortedEvents.forEach((event) => {
      const eventDate = parseISO(event.startDate);
      const existingDay = grouped.find((day) => isSameDay(day.date, eventDate));
      
      if (existingDay) {
        existingDay.events.push(event);
      } else {
        grouped.push({ date: eventDate, events: [event] });
      }
    });

    return grouped;
  }, [events]);

  const handleExport = () => {
    const content = timeline
      .map((day) => {
        const dayStr = format(day.date, 'EEEE, MMMM d, yyyy');
        const eventsStr = day.events
          .map((e) => `  - ${e.time}: ${e.title} @ ${e.location}`)
          .join('\n');
        return `${dayStr}\n${eventsStr}`;
      })
      .join('\n\n');

    const blob = new Blob([`${stateName} Itinerary\n${'='.repeat(40)}\n\n${content}`], {
      type: 'text/plain',
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${stateName.toLowerCase().replace(/\s+/g, '-')}-itinerary.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  if (events.length === 0) {
    return (
      <div className="text-center py-12 bg-muted/30 rounded-xl">
        <Calendar className="w-12 h-12 mx-auto text-muted-foreground mb-3" />
        <p className="text-muted-foreground">No events to plan</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-display text-xl font-semibold">Suggested Itinerary</h3>
          <p className="text-sm text-muted-foreground mt-1">
            Recommended schedule for all events
          </p>
        </div>
        <Button variant="subtle" onClick={handleExport} className="gap-2">
          <Download className="w-4 h-4" />
          Export
        </Button>
      </div>

      <div className="relative">
        {/* Timeline Line */}
        <div className="absolute left-[23px] top-0 bottom-0 w-0.5 bg-border" />

        {/* Timeline Items */}
        <div className="space-y-8">
          {timeline.map((day, dayIndex) => (
            <div key={dayIndex} className="relative">
              {/* Date Header */}
              <div className="flex items-center gap-4 mb-4">
                <div className="relative z-10 w-12 h-12 rounded-xl bg-primary flex flex-col items-center justify-center text-primary-foreground">
                  <span className="text-lg font-bold leading-none">
                    {format(day.date, 'd')}
                  </span>
                  <span className="text-[10px] uppercase">
                    {format(day.date, 'MMM')}
                  </span>
                </div>
                <div>
                  <h4 className="font-semibold">{format(day.date, 'EEEE')}</h4>
                  <p className="text-sm text-muted-foreground">
                    {day.events.length} {day.events.length === 1 ? 'event' : 'events'}
                  </p>
                </div>
              </div>

              {/* Day Events */}
              <div className="ml-6 pl-10 space-y-3">
                {day.events.map((event, eventIndex) => (
                  <div
                    key={event.id}
                    className={cn(
                      "relative p-4 rounded-xl bg-card border transition-all hover:shadow-md",
                      "before:absolute before:left-[-26px] before:top-1/2 before:-translate-y-1/2",
                      "before:w-3 before:h-3 before:rounded-full before:bg-secondary before:border-2 before:border-primary"
                    )}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <EventBadge type={event.type} />
                          <span className="text-xs text-muted-foreground flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {event.time}
                          </span>
                        </div>
                        <h5 className="font-medium">{event.title}</h5>
                        <p className="text-sm text-muted-foreground flex items-center gap-1 mt-1">
                          <MapPin className="w-3 h-3" />
                          {event.location}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TimelinePlanner;
