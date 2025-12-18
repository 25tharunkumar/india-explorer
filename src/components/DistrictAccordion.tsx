import { MapPin, Calendar, Landmark } from 'lucide-react';
import { District, Event } from '@/data/statesData';
import EventBadge from '@/components/EventBadge';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

interface DistrictAccordionProps {
  districts: District[];
  allEvents: Event[];
}

const DistrictAccordion = ({ districts, allEvents }: DistrictAccordionProps) => {
  // Group events by district
  const eventsByDistrict = allEvents.reduce((acc, event) => {
    if (!acc[event.district]) {
      acc[event.district] = [];
    }
    acc[event.district].push(event);
    return acc;
  }, {} as Record<string, Event[]>);

  return (
    <Accordion type="single" collapsible className="space-y-3">
      {districts.map((district) => {
        const districtEvents = eventsByDistrict[district.name] || [];
        
        return (
          <AccordionItem
            key={district.name}
            value={district.name}
            className="border rounded-xl bg-card overflow-hidden"
          >
            <AccordionTrigger className="px-5 py-4 hover:no-underline hover:bg-muted/50 transition-colors">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-primary" />
                </div>
                <div className="text-left">
                  <h3 className="font-medium text-foreground">{district.name}</h3>
                  <p className="text-sm text-muted-foreground">
                    {districtEvents.length} events
                  </p>
                </div>
              </div>
            </AccordionTrigger>
            <AccordionContent className="px-5 pb-5">
              {districtEvents.length > 0 ? (
                <div className="space-y-3 mt-2">
                  {districtEvents.map((event) => (
                    <div
                      key={event.id}
                      className="flex items-start gap-3 p-3 rounded-lg bg-muted/50"
                    >
                      <div className="w-8 h-8 rounded-md bg-background flex items-center justify-center flex-shrink-0">
                        <Calendar className="w-4 h-4 text-primary" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <h4 className="font-medium text-sm">{event.title}</h4>
                          <EventBadge type={event.type} />
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">
                          {event.startDate} • {event.time}
                        </p>
                        <p className="text-xs text-muted-foreground mt-0.5">
                          {event.location}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-6">
                  <Landmark className="w-8 h-8 mx-auto text-muted-foreground mb-2" />
                  <p className="text-sm text-muted-foreground">
                    No upcoming events in this district
                  </p>
                </div>
              )}
            </AccordionContent>
          </AccordionItem>
        );
      })}
    </Accordion>
  );
};

export default DistrictAccordion;
