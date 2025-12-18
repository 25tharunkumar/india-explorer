import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, MapPin, Calendar, Users } from 'lucide-react';
import Header from '@/components/Header';
import FamousPlacesCarousel from '@/components/FamousPlacesCarousel';
import EventTable from '@/components/EventTable';
import DistrictAccordion from '@/components/DistrictAccordion';
import TimelinePlanner from '@/components/TimelinePlanner';
import { statesData } from '@/data/statesData';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const StateDetail = () => {
  const { stateId } = useParams();
  const state = statesData.find((s) => s.id === stateId);

  if (!state) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container py-20 text-center">
          <h1 className="font-display text-3xl font-bold text-foreground mb-4">
            State Not Found
          </h1>
          <Link to="/states">
            <Button variant="subtle" className="gap-2">
              <ArrowLeft className="w-4 h-4" />
              Back to States
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="relative h-[400px] overflow-hidden">
        <img
          src={state.image}
          alt={state.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/90 via-foreground/40 to-transparent" />
        
        {/* Content Overlay */}
        <div className="absolute inset-0 flex items-end">
          <div className="container pb-10">
            <Link to="/states">
              <Button variant="ghost" size="sm" className="mb-4 text-primary-foreground/80 hover:text-primary-foreground hover:bg-primary-foreground/10">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to States
              </Button>
            </Link>
            
            <h1 className="font-display text-4xl md:text-5xl font-bold text-primary-foreground mb-3">
              {state.name}
            </h1>
            
            <div className="flex flex-wrap items-center gap-4 text-primary-foreground/80">
              <span className="flex items-center gap-1.5">
                <MapPin className="w-4 h-4" />
                Capital: {state.capital}
              </span>
              <span className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4" />
                {state.events.length} Events
              </span>
              <span className="flex items-center gap-1.5">
                <Users className="w-4 h-4" />
                {state.districts.length} Districts
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="container py-10">
        <div className="grid lg:grid-cols-3 gap-10">
          {/* Left Column - Main Content */}
          <div className="lg:col-span-2 space-y-10">
            {/* About */}
            <section>
              <h2 className="font-display text-2xl font-semibold mb-4">About {state.name}</h2>
              <p className="text-muted-foreground leading-relaxed">{state.description}</p>
            </section>

            {/* Famous Places */}
            <section>
              <h2 className="font-display text-2xl font-semibold mb-4">Famous Attractions</h2>
              <FamousPlacesCarousel places={state.famousPlaces} />
            </section>

            {/* Tabs for Events and Districts */}
            <Tabs defaultValue="events" className="w-full">
              <TabsList className="w-full justify-start mb-6 bg-muted/50">
                <TabsTrigger value="events" className="gap-2">
                  <Calendar className="w-4 h-4" />
                  Events
                </TabsTrigger>
                <TabsTrigger value="districts" className="gap-2">
                  <MapPin className="w-4 h-4" />
                  Districts
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="events">
                <EventTable events={state.events} />
              </TabsContent>
              
              <TabsContent value="districts">
                <DistrictAccordion districts={state.districts} allEvents={state.events} />
              </TabsContent>
            </Tabs>
          </div>

          {/* Right Column - Timeline */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <TimelinePlanner events={state.events} stateName={state.name} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StateDetail;
