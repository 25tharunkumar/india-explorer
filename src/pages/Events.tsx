import { useState, useMemo } from 'react';
import { Calendar, Filter } from 'lucide-react';
import Header from '@/components/Header';
import EventTable from '@/components/EventTable';
import { statesData, Event, eventTypes } from '@/data/statesData';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const Events = () => {
  const [stateFilter, setStateFilter] = useState<string>('all');
  const [typeFilter, setTypeFilter] = useState<string>('all');

  // Collect all events from all states
  const allEvents = useMemo(() => {
    const events: (Event & { stateName: string })[] = [];
    statesData.forEach((state) => {
      state.events.forEach((event) => {
        events.push({ ...event, stateName: state.name });
      });
    });
    return events;
  }, []);

  // Filter events
  const filteredEvents = useMemo(() => {
    let filtered = allEvents;

    if (stateFilter !== 'all') {
      filtered = filtered.filter((e) => e.stateName === stateFilter);
    }

    if (typeFilter !== 'all') {
      filtered = filtered.filter((e) => e.type === typeFilter);
    }

    return filtered;
  }, [allEvents, stateFilter, typeFilter]);

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="container py-10">
        {/* Header */}
        <div className="mb-10">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-12 h-12 rounded-xl bg-gradient-hero flex items-center justify-center">
              <Calendar className="w-6 h-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="font-display text-3xl font-bold text-foreground">
                All Events
              </h1>
              <p className="text-muted-foreground">
                Discover festivals, conferences, and cultural events across India
              </p>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-4 mb-8 p-4 rounded-xl bg-muted/30 border">
          <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
            <Filter className="w-4 h-4" />
            Filters:
          </div>
          
          <Select value={stateFilter} onValueChange={setStateFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select state" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All States</SelectItem>
              {statesData.map((state) => (
                <SelectItem key={state.id} value={state.name}>
                  {state.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={typeFilter} onValueChange={setTypeFilter}>
            <SelectTrigger className="w-[160px]">
              <SelectValue placeholder="Event type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              {eventTypes.map((type) => (
                <SelectItem key={type} value={type}>
                  {type}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <div className="ml-auto text-sm text-muted-foreground">
            {filteredEvents.length} events found
          </div>
        </div>

        {/* Events Table */}
        <EventTable events={filteredEvents} showFilters={false} />
      </div>
    </div>
  );
};

export default Events;
