import { useMemo } from 'react';
import { format, parseISO, isSameDay } from 'date-fns';
import { Clock, MapPin, Calendar, Download, AlertTriangle, Sparkles, X } from 'lucide-react';
import { Event } from '@/data/statesData';
import EventBadge from '@/components/EventBadge';
import ConflictBadge from '@/components/ConflictBadge';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useMyEvents } from '@/hooks/useMyEvents';

interface EventConflict {
  eventId: string;
  conflictsWith: string[];
  reason: string;
}

interface TimelinePlannerProps {
  events: Event[];
  conflicts?: EventConflict[];
  viewMode?: 'all' | 'optimal';
  stateName?: string; // Optional for backward compatibility
}

interface TimelineDay {
  date: Date;
  events: Event[];
}

const TimelinePlanner = ({ events, conflicts = [], viewMode = 'all' }: TimelinePlannerProps) => {
  const { removeEvent, skippedEvents } = useMyEvents();

  // Get conflict info for an event
  const getEventConflict = (eventId: string) => {
    return conflicts.find(c => c.eventId === eventId);
  };

  const isSkipped = (eventId: string) => {
    return skippedEvents.some(e => e.id === eventId);
  };

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
          .map((e) => {
            const conflict = getEventConflict(e.id);
            const conflictNote = conflict ? ' [⚠️ CONFLICT]' : '';
            return `  - ${e.time}: ${e.title} @ ${e.location}${conflictNote}`;
          })
          .join('\n');
        return `${dayStr}\n${eventsStr}`;
      })
      .join('\n\n');

    const modeNote = viewMode === 'optimal' ? '(Optimal Plan - No Conflicts)\n\n' : '';
    const blob = new Blob([`My India Itinerary\n${'='.repeat(40)}\n${modeNote}\n${content}`], {
      type: 'text/plain',
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `my-india-itinerary.txt`;
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
          <div className="flex items-center gap-2">
            <h3 className="font-display text-xl font-semibold">
              {viewMode === 'optimal' ? 'Optimal Itinerary' : 'Your Itinerary'}
            </h3>
            {viewMode === 'optimal' && (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-emerald-500/15 text-emerald-600">
                <Sparkles className="h-3 w-3" />
                No Conflicts
              </span>
            )}
          </div>
          <p className="text-sm text-muted-foreground mt-1">
            {events.length} event{events.length !== 1 ? 's' : ''} scheduled
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
          {timeline.map((day, dayIndex) => {
            const dayHasConflicts = day.events.some(e => getEventConflict(e.id));
            
            return (
              <div key={dayIndex} className="relative">
                {/* Date Header */}
                <div className="flex items-center gap-4 mb-4">
                  <div className={cn(
                    "relative z-10 w-12 h-12 rounded-xl flex flex-col items-center justify-center",
                    dayHasConflicts && viewMode === 'all'
                      ? "bg-destructive"
                      : "bg-primary",
                    "text-primary-foreground"
                  )}>
                    <span className="text-lg font-bold leading-none">
                      {format(day.date, 'd')}
                    </span>
                    <span className="text-[10px] uppercase">
                      {format(day.date, 'MMM')}
                    </span>
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="font-semibold">{format(day.date, 'EEEE')}</h4>
                      {dayHasConflicts && viewMode === 'all' && (
                        <span className="inline-flex items-center gap-1 text-xs text-destructive">
                          <AlertTriangle className="h-3 w-3" />
                          Has conflicts
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {day.events.length} {day.events.length === 1 ? 'event' : 'events'}
                    </p>
                  </div>
                </div>

                {/* Day Events */}
                <div className="ml-6 pl-10 space-y-3">
                  {day.events.map((event) => {
                    const conflict = getEventConflict(event.id);
                    const skipped = isSkipped(event.id);
                    
                    return (
                      <div
                        key={event.id}
                        className={cn(
                          "relative p-4 rounded-xl bg-card border transition-all hover:shadow-md group",
                          "before:absolute before:left-[-26px] before:top-1/2 before:-translate-y-1/2",
                          "before:w-3 before:h-3 before:rounded-full before:border-2",
                          conflict && viewMode === 'all'
                            ? "border-destructive/50 bg-destructive/5 before:bg-destructive before:border-destructive"
                            : viewMode === 'optimal'
                            ? "border-emerald-500/30 bg-emerald-500/5 before:bg-emerald-500 before:border-emerald-500"
                            : "before:bg-secondary before:border-primary",
                          skipped && "opacity-50"
                        )}
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2 flex-wrap">
                              <EventBadge type={event.type} />
                              <span className="text-xs text-muted-foreground flex items-center gap-1">
                                <Clock className="w-3 h-3" />
                                {event.time}
                              </span>
                              {conflict && viewMode === 'all' && (
                                <ConflictBadge 
                                  conflictCount={conflict.conflictsWith.length}
                                  conflictingEvents={conflict.conflictsWith}
                                />
                              )}
                              {viewMode === 'optimal' && (
                                <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-medium bg-emerald-500/15 text-emerald-600">
                                  <Sparkles className="h-2.5 w-2.5" />
                                  Optimal
                                </span>
                              )}
                            </div>
                            <h5 className="font-medium">{event.title}</h5>
                            <p className="text-sm text-muted-foreground flex items-center gap-1 mt-1">
                              <MapPin className="w-3 h-3" />
                              {event.location}
                            </p>
                          </div>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity text-muted-foreground hover:text-destructive"
                            onClick={() => removeEvent(event.id)}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default TimelinePlanner;