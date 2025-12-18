import { useState, useMemo } from 'react';
import { Search, MapPin, Calendar, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { statesData, State, Event } from '@/data/statesData';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

interface SearchBarProps {
  className?: string;
  placeholder?: string;
}

type SearchResult = {
  type: 'state' | 'event';
  item: State | Event;
  stateId?: string;
};

const SearchBar = ({ className, placeholder = "Search states, events, places..." }: SearchBarProps) => {
  const [query, setQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const navigate = useNavigate();

  const results = useMemo(() => {
    if (!query.trim()) return [];

    const searchResults: SearchResult[] = [];
    const lowerQuery = query.toLowerCase();

    statesData.forEach((state) => {
      if (
        state.name.toLowerCase().includes(lowerQuery) ||
        state.capital.toLowerCase().includes(lowerQuery)
      ) {
        searchResults.push({ type: 'state', item: state });
      }

      state.events.forEach((event) => {
        if (
          event.title.toLowerCase().includes(lowerQuery) ||
          event.location.toLowerCase().includes(lowerQuery)
        ) {
          searchResults.push({ type: 'event', item: event, stateId: state.id });
        }
      });
    });

    return searchResults.slice(0, 6);
  }, [query]);

  const handleSelect = (result: SearchResult) => {
    if (result.type === 'state') {
      navigate(`/state/${(result.item as State).id}`);
    } else {
      navigate(`/state/${result.stateId}`);
    }
    setQuery('');
  };

  return (
    <div className={cn("relative", className)}>
      <div className={cn(
        "relative flex items-center rounded-xl border bg-background/95 backdrop-blur transition-all duration-200",
        isFocused ? "ring-2 ring-primary/20 border-primary" : "border-border"
      )}>
        <Search className="absolute left-4 w-5 h-5 text-muted-foreground" />
        <Input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setTimeout(() => setIsFocused(false), 200)}
          placeholder={placeholder}
          className="pl-12 pr-10 h-12 border-0 bg-transparent focus-visible:ring-0 text-base"
        />
        {query && (
          <button
            onClick={() => setQuery('')}
            className="absolute right-4 p-1 rounded-full hover:bg-muted transition-colors"
          >
            <X className="w-4 h-4 text-muted-foreground" />
          </button>
        )}
      </div>

      {/* Suggestions Dropdown */}
      {isFocused && results.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-card rounded-xl border border-border shadow-lg overflow-hidden z-50 animate-scale-in">
          {results.map((result, index) => (
            <button
              key={index}
              onClick={() => handleSelect(result)}
              className="w-full px-4 py-3 flex items-center gap-3 hover:bg-muted transition-colors text-left"
            >
              {result.type === 'state' ? (
                <MapPin className="w-4 h-4 text-primary" />
              ) : (
                <Calendar className="w-4 h-4 text-accent" />
              )}
              <div>
                <p className="font-medium text-sm">
                  {result.type === 'state'
                    ? (result.item as State).name
                    : (result.item as Event).title}
                </p>
                <p className="text-xs text-muted-foreground">
                  {result.type === 'state'
                    ? `Capital: ${(result.item as State).capital}`
                    : (result.item as Event).location}
                </p>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
