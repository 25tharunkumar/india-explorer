import { ArrowRight, MapPin, Calendar, Compass, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import SearchBar from '@/components/SearchBar';
import StateCard from '@/components/StateCard';
import { statesData } from '@/data/statesData';
import { Button } from '@/components/ui/button';

const Index = () => {
  const totalEvents = statesData.reduce((acc, state) => acc + state.events.length, 0);
  const totalPlaces = statesData.reduce((acc, state) => acc + state.famousPlaces.length, 0);

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-gradient-to-br from-secondary/50 via-background to-green-muted" />
        <div className="absolute inset-0 opacity-30" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%231a5d3a' fill-opacity='0.08'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />

        <div className="container relative pt-20 pb-24">
          <div className="max-w-3xl mx-auto text-center">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/80 text-secondary-foreground text-sm font-medium mb-6 animate-fade-up">
              <Sparkles className="w-4 h-4" />
              Discover Incredible India
            </div>

            {/* Heading */}
            <h1 className="font-display text-4xl md:text-6xl font-bold text-foreground mb-6 animate-fade-up" style={{ animationDelay: '0.1s' }}>
              Explore the{' '}
              <span className="text-gradient">Beauty & Culture</span>
              {' '}of India
            </h1>

            {/* Description */}
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto animate-fade-up" style={{ animationDelay: '0.2s' }}>
              Plan your perfect journey across 12 magnificent states. Discover famous landmarks, 
              attend vibrant festivals, and create unforgettable memories.
            </p>

            {/* Search Bar */}
            <div className="max-w-xl mx-auto mb-8 animate-fade-up" style={{ animationDelay: '0.3s' }}>
              <SearchBar />
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center justify-center gap-4 animate-fade-up" style={{ animationDelay: '0.4s' }}>
              <Link to="/states">
                <Button variant="hero" size="lg" className="gap-2">
                  Start Exploring
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
              <Link to="/events">
                <Button variant="subtle" size="lg" className="gap-2">
                  <Calendar className="w-4 h-4" />
                  View All Events
                </Button>
              </Link>
            </div>

            {/* Stats */}
            <div className="flex items-center justify-center gap-8 mt-12 animate-fade-up" style={{ animationDelay: '0.5s' }}>
              <div className="text-center">
                <p className="text-3xl font-bold text-primary">{statesData.length}</p>
                <p className="text-sm text-muted-foreground">States</p>
              </div>
              <div className="w-px h-10 bg-border" />
              <div className="text-center">
                <p className="text-3xl font-bold text-primary">{totalPlaces}</p>
                <p className="text-sm text-muted-foreground">Attractions</p>
              </div>
              <div className="w-px h-10 bg-border" />
              <div className="text-center">
                <p className="text-3xl font-bold text-primary">{totalEvents}+</p>
                <p className="text-sm text-muted-foreground">Events</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured States */}
      <section className="py-20 bg-background">
        <div className="container">
          <div className="flex items-end justify-between mb-10">
            <div>
              <h2 className="font-display text-3xl font-bold text-foreground mb-2">
                Popular Destinations
              </h2>
              <p className="text-muted-foreground">
                Start your journey with these incredible states
              </p>
            </div>
            <Link to="/states">
              <Button variant="ghost" className="gap-2">
                View All
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {statesData.slice(0, 8).map((state, index) => (
              <StateCard key={state.id} state={state} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-muted/30">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl font-bold text-foreground mb-3">
              Plan Your Perfect Trip
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Everything you need to explore India's diverse states and attend amazing events
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: MapPin,
                title: 'Explore States',
                description: 'Discover 12 beautiful states with detailed information about capitals, attractions, and local culture.',
              },
              {
                icon: Calendar,
                title: 'Track Events',
                description: 'Stay updated with festivals, cultural events, tech conferences, and food festivals across India.',
              },
              {
                icon: Compass,
                title: 'Smart Itineraries',
                description: 'Get AI-generated travel plans optimized to help you attend all events efficiently.',
              },
            ].map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div
                  key={index}
                  className="relative p-6 rounded-2xl bg-card border border-border hover:shadow-elegant transition-all duration-300 group"
                >
                  <div className="w-14 h-14 rounded-xl bg-gradient-hero flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                    <Icon className="w-7 h-7 text-primary-foreground" />
                  </div>
                  <h3 className="font-display text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-hero text-primary-foreground">
        <div className="container text-center">
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
            Ready to Explore India?
          </h2>
          <p className="text-primary-foreground/80 max-w-xl mx-auto mb-8">
            Start planning your journey today and discover the incredible diversity of India's states, cultures, and events.
          </p>
          <Link to="/states">
            <Button variant="gold" size="xl" className="gap-2">
              Get Started Now
              <ArrowRight className="w-5 h-5" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-border bg-background">
        <div className="container">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <Compass className="w-5 h-5 text-primary" />
              <span className="font-display font-semibold">BharatDarshan</span>
            </div>
            <p className="text-sm text-muted-foreground">
              © 2025 BharatDarshan. Explore India with love.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
