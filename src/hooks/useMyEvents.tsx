import { createContext, useContext, useState, useEffect, useMemo, ReactNode, useCallback } from 'react';
import { Event, statesData } from '@/data/statesData';
import { parseISO, addHours, areIntervalsOverlapping } from 'date-fns';

interface EventConflict {
  eventId: string;
  conflictsWith: string[];
  reason: string;
}

interface MyEventsContextType {
  selectedEvents: Event[];
  selectedEventIds: Set<string>;
  addEvent: (event: Event) => void;
  removeEvent: (eventId: string) => void;
  toggleEvent: (event: Event) => void;
  clearAll: () => void;
  isSelected: (eventId: string) => boolean;
  conflicts: EventConflict[];
  hasConflicts: boolean;
  optimalEvents: Event[];
  skippedEvents: Event[];
  totalEventsCount: number;
  conflictCount: number;
  resolveConflictsAutomatically: () => void;
  viewMode: 'all' | 'optimal';
  setViewMode: (mode: 'all' | 'optimal') => void;
}

const MyEventsContext = createContext<MyEventsContextType | undefined>(undefined);

// Helper to parse event time and create a Date object
const parseEventDateTime = (event: Event): { start: Date; end: Date } => {
  const startDate = parseISO(event.startDate);
  const endDate = parseISO(event.endDate);
  
  // Parse time (e.g., "09:00 AM")
  const timeMatch = event.time.match(/(\d{1,2}):(\d{2})\s*(AM|PM)/i);
  if (timeMatch) {
    let hours = parseInt(timeMatch[1], 10);
    const minutes = parseInt(timeMatch[2], 10);
    const period = timeMatch[3].toUpperCase();
    
    if (period === 'PM' && hours !== 12) hours += 12;
    if (period === 'AM' && hours === 12) hours = 0;
    
    startDate.setHours(hours, minutes, 0, 0);
    endDate.setHours(hours + 2, minutes, 0, 0); // Assume 2-hour event duration
  }
  
  return { start: startDate, end: endDate };
};

// Detect conflicts between events
const detectConflicts = (events: Event[]): EventConflict[] => {
  const conflicts: EventConflict[] = [];
  
  for (let i = 0; i < events.length; i++) {
    const eventA = events[i];
    const timeA = parseEventDateTime(eventA);
    const conflictsWith: string[] = [];
    
    for (let j = i + 1; j < events.length; j++) {
      const eventB = events[j];
      const timeB = parseEventDateTime(eventB);
      
      try {
        if (areIntervalsOverlapping(
          { start: timeA.start, end: timeA.end },
          { start: timeB.start, end: timeB.end }
        )) {
          conflictsWith.push(eventB.id);
          
          // Also add reverse conflict
          const existingConflict = conflicts.find(c => c.eventId === eventB.id);
          if (existingConflict) {
            existingConflict.conflictsWith.push(eventA.id);
          }
        }
      } catch {
        // Skip invalid intervals
      }
    }
    
    if (conflictsWith.length > 0) {
      const existingConflict = conflicts.find(c => c.eventId === eventA.id);
      if (existingConflict) {
        existingConflict.conflictsWith.push(...conflictsWith);
      } else {
        conflicts.push({
          eventId: eventA.id,
          conflictsWith,
          reason: `Overlaps with ${conflictsWith.length} event(s)`,
        });
      }
    }
  }
  
  return conflicts;
};

// Generate optimal schedule by removing conflicting events
const generateOptimalSchedule = (events: Event[], conflicts: EventConflict[]): { optimal: Event[]; skipped: Event[] } => {
  if (conflicts.length === 0) {
    return { optimal: events, skipped: [] };
  }
  
  // Sort events by start date
  const sortedEvents = [...events].sort(
    (a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime()
  );
  
  const optimal: Event[] = [];
  const skipped: Event[] = [];
  const usedTimeSlots: { start: Date; end: Date }[] = [];
  
  for (const event of sortedEvents) {
    const eventTime = parseEventDateTime(event);
    
    // Check if this event conflicts with any already selected optimal event
    const hasConflict = usedTimeSlots.some(slot => {
      try {
        return areIntervalsOverlapping(
          { start: eventTime.start, end: eventTime.end },
          { start: slot.start, end: slot.end }
        );
      } catch {
        return false;
      }
    });
    
    if (!hasConflict) {
      optimal.push(event);
      usedTimeSlots.push(eventTime);
    } else {
      skipped.push(event);
    }
  }
  
  return { optimal, skipped };
};

export const MyEventsProvider = ({ children }: { children: ReactNode }) => {
  const [selectedEventIds, setSelectedEventIds] = useState<Set<string>>(() => {
    const stored = localStorage.getItem('myEvents');
    return stored ? new Set(JSON.parse(stored)) : new Set();
  });
  const [viewMode, setViewMode] = useState<'all' | 'optimal'>('all');

  // Get all events from all states for lookup
  const allEvents = useMemo(() => {
    return statesData.flatMap(state => state.events);
  }, []);

  // Get selected events
  const selectedEvents = useMemo(() => {
    return allEvents.filter(event => selectedEventIds.has(event.id));
  }, [allEvents, selectedEventIds]);

  // Persist to localStorage
  useEffect(() => {
    localStorage.setItem('myEvents', JSON.stringify([...selectedEventIds]));
  }, [selectedEventIds]);

  // Detect conflicts
  const conflicts = useMemo(() => detectConflicts(selectedEvents), [selectedEvents]);
  const hasConflicts = conflicts.length > 0;

  // Generate optimal schedule
  const { optimal: optimalEvents, skipped: skippedEvents } = useMemo(
    () => generateOptimalSchedule(selectedEvents, conflicts),
    [selectedEvents, conflicts]
  );

  const addEvent = useCallback((event: Event) => {
    setSelectedEventIds(prev => new Set([...prev, event.id]));
  }, []);

  const removeEvent = useCallback((eventId: string) => {
    setSelectedEventIds(prev => {
      const newSet = new Set(prev);
      newSet.delete(eventId);
      return newSet;
    });
  }, []);

  const toggleEvent = useCallback((event: Event) => {
    setSelectedEventIds(prev => {
      const newSet = new Set(prev);
      if (newSet.has(event.id)) {
        newSet.delete(event.id);
      } else {
        newSet.add(event.id);
      }
      return newSet;
    });
  }, []);

  const clearAll = useCallback(() => {
    setSelectedEventIds(new Set());
  }, []);

  const isSelected = useCallback((eventId: string) => {
    return selectedEventIds.has(eventId);
  }, [selectedEventIds]);

  const resolveConflictsAutomatically = useCallback(() => {
    const optimalIds = new Set(optimalEvents.map(e => e.id));
    setSelectedEventIds(optimalIds);
  }, [optimalEvents]);

  return (
    <MyEventsContext.Provider
      value={{
        selectedEvents,
        selectedEventIds,
        addEvent,
        removeEvent,
        toggleEvent,
        clearAll,
        isSelected,
        conflicts,
        hasConflicts,
        optimalEvents,
        skippedEvents,
        totalEventsCount: selectedEvents.length,
        conflictCount: conflicts.length,
        resolveConflictsAutomatically,
        viewMode,
        setViewMode,
      }}
    >
      {children}
    </MyEventsContext.Provider>
  );
};

export const useMyEvents = () => {
  const context = useContext(MyEventsContext);
  if (context === undefined) {
    throw new Error('useMyEvents must be used within a MyEventsProvider');
  }
  return context;
};
