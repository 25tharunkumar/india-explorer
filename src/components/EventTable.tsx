import { useState, useMemo } from 'react';
import { format, parseISO, differenceInDays, differenceInHours } from 'date-fns';
import { ArrowUpDown, Clock, MapPin, Calendar } from 'lucide-react';
import { Event, eventTypes } from '@/data/statesData';
import EventBadge from '@/components/EventBadge';
import AddToMyEventsButton from '@/components/AddToMyEventsButton';
import ConflictBadge from '@/components/ConflictBadge';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { cn } from '@/lib/utils';
import { useMyEvents } from '@/hooks/useMyEvents';

interface EventTableProps {
  events: Event[];
  showFilters?: boolean;
  showAddButton?: boolean;
}

type SortField = 'title' | 'startDate' | 'type' | 'location';
type SortOrder = 'asc' | 'desc';

const EventTable = ({ events, showFilters = true, showAddButton = true }: EventTableProps) => {
  const [sortField, setSortField] = useState<SortField>('startDate');
  const [sortOrder, setSortOrder] = useState<SortOrder>('asc');
  const [typeFilter, setTypeFilter] = useState<string>('all');
  
  const { isSelected, conflicts } = useMyEvents();

  // Get conflict info for an event
  const getEventConflict = (eventId: string) => {
    return conflicts.find(c => c.eventId === eventId);
  };

  const filteredAndSortedEvents = useMemo(() => {
    let filtered = events;

    if (typeFilter !== 'all') {
      filtered = events.filter((e) => e.type === typeFilter);
    }

    return [...filtered].sort((a, b) => {
      let comparison = 0;
      switch (sortField) {
        case 'title':
          comparison = a.title.localeCompare(b.title);
          break;
        case 'startDate':
          comparison = new Date(a.startDate).getTime() - new Date(b.startDate).getTime();
          break;
        case 'type':
          comparison = a.type.localeCompare(b.type);
          break;
        case 'location':
          comparison = a.location.localeCompare(b.location);
          break;
      }
      return sortOrder === 'asc' ? comparison : -comparison;
    });
  }, [events, sortField, sortOrder, typeFilter]);

  const toggleSort = (field: SortField) => {
    if (sortField === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortOrder('asc');
    }
  };

  const getCountdown = (startDate: string) => {
    const now = new Date();
    const eventDate = parseISO(startDate);
    const days = differenceInDays(eventDate, now);
    const hours = differenceInHours(eventDate, now) % 24;

    if (days < 0) return 'Ended';
    if (days === 0) return `${hours}h left`;
    if (days === 1) return '1 day left';
    return `${days} days left`;
  };

  const SortButton = ({ field, children }: { field: SortField; children: React.ReactNode }) => (
    <Button
      variant="ghost"
      size="sm"
      className="h-8 gap-1 -ml-3 font-medium"
      onClick={() => toggleSort(field)}
    >
      {children}
      <ArrowUpDown className="h-3 w-3" />
    </Button>
  );

  if (events.length === 0) {
    return (
      <div className="text-center py-12 bg-muted/30 rounded-xl">
        <Calendar className="w-12 h-12 mx-auto text-muted-foreground mb-3" />
        <p className="text-muted-foreground">No events found</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {showFilters && (
        <div className="flex flex-wrap gap-3">
          <Select value={typeFilter} onValueChange={setTypeFilter}>
            <SelectTrigger className="w-[160px]">
              <SelectValue placeholder="Filter by type" />
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
        </div>
      )}

      <div className="rounded-xl border bg-card overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/50">
              <TableHead className="w-[280px]">
                <SortButton field="title">Event</SortButton>
              </TableHead>
              <TableHead>
                <SortButton field="location">Location</SortButton>
              </TableHead>
              <TableHead>
                <SortButton field="startDate">Date</SortButton>
              </TableHead>
              <TableHead>
                <SortButton field="type">Type</SortButton>
              </TableHead>
              <TableHead className="text-right">Countdown</TableHead>
              {showAddButton && <TableHead className="w-[120px]"></TableHead>}
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredAndSortedEvents.map((event) => {
              const countdown = getCountdown(event.startDate);
              const isEnded = countdown === 'Ended';
              const selected = isSelected(event.id);
              const conflict = getEventConflict(event.id);
              
              return (
                <TableRow 
                  key={event.id} 
                  className={cn(
                    isEnded && "opacity-60",
                    selected && "bg-primary/5",
                    conflict && "bg-destructive/5 border-l-2 border-l-destructive"
                  )}
                >
                  <TableCell>
                    <div className="flex items-start gap-2">
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <p className="font-medium">{event.title}</p>
                          {conflict && (
                            <ConflictBadge 
                              conflictCount={conflict.conflictsWith.length}
                              conflictingEvents={conflict.conflictsWith}
                            />
                          )}
                        </div>
                        <p className="text-xs text-muted-foreground mt-0.5">{event.description}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1.5 text-sm">
                      <MapPin className="w-3.5 h-3.5 text-muted-foreground" />
                      {event.location}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm">
                      <p>{format(parseISO(event.startDate), 'MMM d, yyyy')}</p>
                      <p className="text-xs text-muted-foreground flex items-center gap-1 mt-0.5">
                        <Clock className="w-3 h-3" />
                        {event.time}
                      </p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <EventBadge type={event.type} />
                  </TableCell>
                  <TableCell className="text-right">
                    <span className={cn(
                      "text-sm font-medium",
                      isEnded ? "text-muted-foreground" : "text-primary"
                    )}>
                      {countdown}
                    </span>
                  </TableCell>
                  {showAddButton && (
                    <TableCell>
                      <AddToMyEventsButton event={event} variant="compact" />
                    </TableCell>
                  )}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default EventTable;
