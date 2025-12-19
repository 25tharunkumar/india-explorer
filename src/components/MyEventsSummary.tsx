import { Calendar, AlertTriangle, Clock, Sparkles, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useMyEvents } from '@/hooks/useMyEvents';
import { cn } from '@/lib/utils';

interface MyEventsSummaryProps {
  className?: string;
}

const MyEventsSummary = ({ className }: MyEventsSummaryProps) => {
  const {
    totalEventsCount,
    conflictCount,
    hasConflicts,
    resolveConflictsAutomatically,
    clearAll,
    viewMode,
    setViewMode,
    optimalEvents,
    skippedEvents,
  } = useMyEvents();

  if (totalEventsCount === 0) {
    return null;
  }

  return (
    <div className={cn("rounded-xl border bg-card p-4 space-y-4", className)}>
      {/* Stats Grid */}
      <div className="grid grid-cols-3 gap-4">
        <div className="text-center">
          <div className="flex items-center justify-center gap-1.5 text-primary mb-1">
            <Calendar className="h-4 w-4" />
            <span className="text-xl font-bold">{totalEventsCount}</span>
          </div>
          <p className="text-xs text-muted-foreground">Events Selected</p>
        </div>

        <div className="text-center">
          <div className={cn(
            "flex items-center justify-center gap-1.5 mb-1",
            hasConflicts ? "text-destructive" : "text-emerald-600"
          )}>
            <AlertTriangle className="h-4 w-4" />
            <span className="text-xl font-bold">{conflictCount}</span>
          </div>
          <p className="text-xs text-muted-foreground">Conflicts</p>
        </div>

        <div className="text-center">
          <div className="flex items-center justify-center gap-1.5 text-emerald-600 mb-1">
            <Sparkles className="h-4 w-4" />
            <span className="text-xl font-bold">{optimalEvents.length}</span>
          </div>
          <p className="text-xs text-muted-foreground">Optimal</p>
        </div>
      </div>

      {/* Conflict Warning */}
      {hasConflicts && (
        <div className="flex items-start gap-2 p-3 rounded-lg bg-destructive/10 border border-destructive/20">
          <AlertTriangle className="h-4 w-4 text-destructive mt-0.5 shrink-0" />
          <div className="flex-1">
            <p className="text-sm font-medium text-destructive">
              {conflictCount} event conflict{conflictCount > 1 ? 's' : ''} detected
            </p>
            <p className="text-xs text-muted-foreground mt-0.5">
              {skippedEvents.length} event{skippedEvents.length !== 1 ? 's' : ''} would be skipped in optimal plan
            </p>
          </div>
        </div>
      )}

      {/* View Toggle */}
      <div className="flex gap-2">
        <Button
          variant={viewMode === 'all' ? 'default' : 'outline'}
          size="sm"
          className="flex-1 text-xs"
          onClick={() => setViewMode('all')}
        >
          All Selected
        </Button>
        <Button
          variant={viewMode === 'optimal' ? 'default' : 'outline'}
          size="sm"
          className="flex-1 text-xs gap-1"
          onClick={() => setViewMode('optimal')}
        >
          <Sparkles className="h-3 w-3" />
          Optimal Plan
        </Button>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-2">
        {hasConflicts && (
          <Button
            variant="secondary"
            size="sm"
            className="flex-1 text-xs gap-1"
            onClick={resolveConflictsAutomatically}
          >
            <Sparkles className="h-3 w-3" />
            Fix Conflicts Auto
          </Button>
        )}
        <Button
          variant="ghost"
          size="sm"
          className="text-xs gap-1 text-muted-foreground hover:text-destructive"
          onClick={clearAll}
        >
          <Trash2 className="h-3 w-3" />
          Clear All
        </Button>
      </div>
    </div>
  );
};

export default MyEventsSummary;
