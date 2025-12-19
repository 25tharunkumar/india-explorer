import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, MapPin, Calendar, Compass, Heart, LucideIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useMyEvents } from '@/hooks/useMyEvents';

interface NavLink {
  href: string;
  label: string;
  icon: LucideIcon;
  badge?: number;
  hasWarning?: boolean;
}

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const { totalEventsCount, hasConflicts } = useMyEvents();

  const navLinks: NavLink[] = [
    { href: '/', label: 'Home', icon: Compass },
    { href: '/states', label: 'Explore States', icon: MapPin },
    { href: '/events', label: 'Events', icon: Calendar },
    { href: '/itinerary', label: 'My Events', icon: Heart, badge: totalEventsCount, hasWarning: hasConflicts },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-hero flex items-center justify-center shadow-md group-hover:shadow-lg transition-shadow">
            <Compass className="w-5 h-5 text-primary-foreground" />
          </div>
          <span className="font-display text-xl font-semibold text-foreground">
            Bharat<span className="text-primary">Darshan</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const isActive = location.pathname === link.href;
            return (
              <Link key={link.href} to={link.href}>
                <Button
                  variant="ghost"
                  className={cn(
                    "gap-2 font-medium relative",
                    isActive && "bg-secondary text-primary"
                  )}
                >
                  <Icon className="w-4 h-4" />
                  {link.label}
                  {link.badge && link.badge > 0 && (
                    <span className={cn(
                      "absolute -top-1 -right-1 min-w-[18px] h-[18px] rounded-full text-[10px] font-bold flex items-center justify-center",
                      link.hasWarning 
                        ? "bg-destructive text-destructive-foreground" 
                        : "bg-primary text-primary-foreground"
                    )}>
                      {link.badge}
                    </span>
                  )}
                </Button>
              </Link>
            );
          })}
        </nav>

        {/* Mobile Menu Button */}
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden border-t border-border bg-background">
          <nav className="container py-4 flex flex-col gap-2">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = location.pathname === link.href;
              return (
                <Link
                  key={link.href}
                  to={link.href}
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Button
                    variant="ghost"
                    className={cn(
                      "w-full justify-start gap-3 relative",
                      isActive && "bg-secondary text-primary"
                    )}
                  >
                    <Icon className="w-4 h-4" />
                    {link.label}
                    {link.badge && link.badge > 0 && (
                      <span className={cn(
                        "ml-auto min-w-[20px] h-[20px] rounded-full text-[11px] font-bold flex items-center justify-center",
                        link.hasWarning 
                          ? "bg-destructive text-destructive-foreground" 
                          : "bg-primary text-primary-foreground"
                      )}>
                        {link.badge}
                      </span>
                    )}
                  </Button>
                </Link>
              );
            })}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;