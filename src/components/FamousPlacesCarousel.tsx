import { useState, useCallback } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { FamousPlace } from '@/data/statesData';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface FamousPlacesCarouselProps {
  places: FamousPlace[];
}

const FamousPlacesCarousel = ({ places }: FamousPlacesCarouselProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToPrevious = useCallback(() => {
    setCurrentIndex((prev) => (prev === 0 ? places.length - 1 : prev - 1));
  }, [places.length]);

  const goToNext = useCallback(() => {
    setCurrentIndex((prev) => (prev === places.length - 1 ? 0 : prev + 1));
  }, [places.length]);

  if (places.length === 0) return null;

  return (
    <div className="space-y-4">
      {/* Main Carousel */}
      <div className="relative overflow-hidden rounded-2xl">
        <div
          className="flex transition-transform duration-500 ease-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {places.map((place) => (
            <div key={place.id} className="w-full flex-shrink-0">
              <div className="relative aspect-[16/9]">
                <img
                  src={place.image}
                  alt={place.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-transparent to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="font-display text-2xl font-semibold text-primary-foreground mb-2">
                    {place.name}
                  </h3>
                  <p className="text-primary-foreground/80 text-sm">
                    {place.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Navigation Buttons */}
        {places.length > 1 && (
          <>
            <Button
              variant="ghost"
              size="icon"
              onClick={goToPrevious}
              className="absolute left-3 top-1/2 -translate-y-1/2 bg-background/80 backdrop-blur-sm hover:bg-background/90 shadow-md"
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={goToNext}
              className="absolute right-3 top-1/2 -translate-y-1/2 bg-background/80 backdrop-blur-sm hover:bg-background/90 shadow-md"
            >
              <ChevronRight className="h-5 w-5" />
            </Button>
          </>
        )}
      </div>

      {/* Thumbnail Navigation */}
      <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
        {places.map((place, index) => (
          <button
            key={place.id}
            onClick={() => setCurrentIndex(index)}
            className={cn(
              "flex-shrink-0 w-20 h-14 rounded-lg overflow-hidden transition-all duration-200",
              index === currentIndex
                ? "ring-2 ring-primary ring-offset-2 ring-offset-background"
                : "opacity-60 hover:opacity-100"
            )}
          >
            <img
              src={place.image}
              alt={place.name}
              className="w-full h-full object-cover"
            />
          </button>
        ))}
      </div>
    </div>
  );
};

export default FamousPlacesCarousel;
