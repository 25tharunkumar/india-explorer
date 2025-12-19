import { useMemo } from 'react';
import { Compass, Share2, Heart } from 'lucide-react';
import Header from '@/components/Header';
import TimelinePlanner from '@/components/TimelinePlanner';
import MyEventsSummary from '@/components/MyEventsSummary';
import { useMyEvents } from '@/hooks/useMyEvents';
import { Button } from '@/components/ui/button';
import { toast } from '@/hooks/use-toast';

const Itinerary = () => {
  const {
    selectedEvents,
    optimalEvents,
    skippedEvents,
    viewMode,
    hasConflicts,
    conflicts,
  } = useMyEvents();

  // Events for the timeline based on view mode
  const timelineEvents = useMemo(() => {
    return viewMode === 'optimal' ? optimalEvents : selectedEvents;
  }, [viewMode, optimalEvents, selectedEvents]);

  const handleShare = () => {
    const text = `Check out my India travel itinerary with ${selectedEvents.length} events on BharatDarshan!`;
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
                My Events
              </h1>
              <p className="text-muted-foreground">
                Your personalized travel schedule with conflict detection
              </p>
            </div>
          </div>

          <Button variant="subtle" onClick={handleShare} className="gap-2">
            <Share2 className="w-4 h-4" />
            Share
          </Button>
        </div>

        {selectedEvents.length === 0 ? (
          <div className="text-center py-20">
            <div className="w-20 h-20 rounded-full bg-muted/50 flex items-center justify-center mx-auto mb-6">
              <Heart className="w-10 h-10 text-muted-foreground" />
            </div>
            <h2 className="font-display text-2xl font-semibold mb-2">No Events Selected</h2>
            <p className="text-muted-foreground max-w-md mx-auto mb-6">
              Start adding events to your list by clicking the "Add" button on any event across the site. 
              Your selections will appear here for planning.
            </p>
            <Button asChild variant="default">
              <a href="/events">Browse Events</a>
            </Button>
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-10">
            {/* Summary Panel */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 space-y-6">
                <MyEventsSummary />

                {/* Skipped Events (when in optimal view) */}
                {viewMode === 'optimal' && skippedEvents.length > 0 && (
                  <div className="rounded-xl border bg-card p-4">
                    <h3 className="font-medium text-sm mb-3 text-muted-foreground">
                      Skipped Events ({skippedEvents.length})
                    </h3>
                    <div className="space-y-2">
                      {skippedEvents.map((event) => (
                        <div
                          key={event.id}
                          className="p-2 rounded-lg bg-muted/50 opacity-60"
                        >
                          <p className="text-sm font-medium line-through">
                            {event.title}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {event.location}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Tips */}
                <div className="rounded-xl border bg-gradient-to-br from-primary/5 to-accent/5 p-4">
                  <h3 className="font-medium text-sm mb-2">💡 Planning Tips</h3>
                  <ul className="text-xs text-muted-foreground space-y-1.5">
                    <li>• Events are grouped by date for easy planning</li>
                    <li>• Red indicators show time conflicts</li>
                    <li>• Use "Optimal Plan" to auto-resolve conflicts</li>
                    <li>• Export your itinerary to share or print</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Timeline View */}
            <div className="lg:col-span-2">
              <TimelinePlanner
                events={timelineEvents}
                conflicts={conflicts}
                viewMode={viewMode}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Itinerary;