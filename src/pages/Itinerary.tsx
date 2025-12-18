import { useState, useMemo } from 'react';
import { Compass, Download, Share2 } from 'lucide-react';
import { format, parseISO } from 'date-fns';
import Header from '@/components/Header';
import TimelinePlanner from '@/components/TimelinePlanner';
import EventBadge from '@/components/EventBadge';
import { statesData, Event } from '@/data/statesData';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { toast } from '@/hooks/use-toast';

const Itinerary = () => {
  const [selectedState, setSelectedState] = useState<string>(statesData[0].id);
  const [selectedEvents, setSelectedEvents] = useState<Set<string>>(new Set());

  const state = statesData.find((s) => s.id === selectedState);
  const events = state?.events || [];

  // Events for the timeline (either selected or all if none selected)
  const timelineEvents = useMemo(() => {
    if (selectedEvents.size === 0) return events;
    return events.filter((e) => selectedEvents.has(e.id));
  }, [events, selectedEvents]);

  const toggleEvent = (eventId: string) => {
    const newSelected = new Set(selectedEvents);
    if (newSelected.has(eventId)) {
      newSelected.delete(eventId);
    } else {
      newSelected.add(eventId);
    }
    setSelectedEvents(newSelected);
  };

  const selectAll = () => {
    setSelectedEvents(new Set(events.map((e) => e.id)));
  };

  const clearSelection = () => {
    setSelectedEvents(new Set());
  };

  const handleShare = () => {
    const text = `Check out my ${state?.name} travel itinerary on BharatDarshan!`;
    if (navigator.share) {
      navigator.share({ title: 'My India Itinerary', text });
    } else {
      navigator.clipboard.writeText(text);
      toast({
        title: 'Link copied!',
        description: 'Share link copied to clipboard',
      });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="container py-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-gradient-hero flex items-center justify-center">
              <Compass className="w-6 h-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="font-display text-3xl font-bold text-foreground">
                Itinerary Planner
              </h1>
              <p className="text-muted-foreground">
                Create your personalized travel schedule
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Select value={selectedState} onValueChange={(v) => {
              setSelectedState(v);
              setSelectedEvents(new Set());
            }}>
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Select state" />
              </SelectTrigger>
              <SelectContent>
                {statesData.map((state) => (
                  <SelectItem key={state.id} value={state.id}>
                    {state.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Button variant="subtle" onClick={handleShare} className="gap-2">
              <Share2 className="w-4 h-4" />
              Share
            </Button>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-10">
          {/* Event Selection */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="font-semibold">Select Events</h2>
                <div className="flex gap-2">
                  <Button variant="ghost" size="sm" onClick={selectAll}>
                    All
                  </Button>
                  <Button variant="ghost" size="sm" onClick={clearSelection}>
                    Clear
                  </Button>
                </div>
              </div>

              <div className="space-y-2 max-h-[600px] overflow-y-auto pr-2">
                {events.map((event) => (
                  <div
                    key={event.id}
                    className="flex items-start gap-3 p-3 rounded-lg bg-card border hover:border-primary/30 transition-colors cursor-pointer"
                    onClick={() => toggleEvent(event.id)}
                  >
                    <Checkbox
                      checked={selectedEvents.has(event.id)}
                      onCheckedChange={() => toggleEvent(event.id)}
                      className="mt-0.5"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <p className="font-medium text-sm">{event.title}</p>
                        <EventBadge type={event.type} />
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">
                        {format(parseISO(event.startDate), 'MMM d')} • {event.time}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {event.location}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <p className="text-sm text-muted-foreground text-center">
                {selectedEvents.size === 0
                  ? 'Showing all events'
                  : `${selectedEvents.size} events selected`}
              </p>
            </div>
          </div>

          {/* Timeline View */}
          <div className="lg:col-span-2">
            <TimelinePlanner
              events={timelineEvents}
              stateName={state?.name || ''}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Itinerary;
