import { Link } from 'react-router-dom';
import { MapPin, Calendar, ArrowRight } from 'lucide-react';
import { State } from '@/data/statesData';
import { cn } from '@/lib/utils';

interface StateCardProps {
  state: State;
  index: number;
}

const StateCard = ({ state, index }: StateCardProps) => {
  return (
    <Link
      to={`/state/${state.id}`}
      className="group block"
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      <div className="relative overflow-hidden rounded-2xl bg-card shadow-elegant hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
        {/* Image */}
        <div className="relative h-48 overflow-hidden">
          <img
            src={state.image}
            alt={state.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/20 to-transparent" />
          
          {/* Floating Badge */}
          <div className="absolute top-3 right-3 bg-background/90 backdrop-blur-sm rounded-full px-3 py-1 text-xs font-medium text-foreground flex items-center gap-1">
            <Calendar className="w-3 h-3" />
            {state.events.length} Events
          </div>

          {/* Title Overlay */}
          <div className="absolute bottom-0 left-0 right-0 p-4">
            <h3 className="font-display text-2xl font-semibold text-primary-foreground mb-1">
              {state.name}
            </h3>
            <div className="flex items-center gap-1.5 text-primary-foreground/80 text-sm">
              <MapPin className="w-3.5 h-3.5" />
              {state.capital}
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-4">
          <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
            {state.description}
          </p>
          
          {/* Famous Places Preview */}
          <div className="flex items-center gap-2 mb-3">
            <div className="flex -space-x-2">
              {state.famousPlaces.slice(0, 3).map((place, i) => (
                <div
                  key={place.id}
                  className="w-8 h-8 rounded-full border-2 border-background overflow-hidden"
                >
                  <img
                    src={place.image}
                    alt={place.name}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
            <span className="text-xs text-muted-foreground">
              {state.famousPlaces.length} attractions
            </span>
          </div>

          {/* CTA */}
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-primary group-hover:text-primary/80 transition-colors">
              Explore
            </span>
            <ArrowRight className="w-4 h-4 text-primary transition-transform group-hover:translate-x-1" />
          </div>
        </div>
      </div>
    </Link>
  );
};

export default StateCard;
