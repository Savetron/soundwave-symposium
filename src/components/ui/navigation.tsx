
import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { Search, Music, Menu, X, User } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Navigation = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Handle scroll effect for the nav bar
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 20;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [scrolled]);

  return (
    <header className={cn(
      'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
      scrolled ? 'glass py-3' : 'bg-transparent py-5'
    )}>
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-brand-blue to-brand-highlight">
              SoundWave
            </span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#" className="text-sm font-medium hover:text-brand-blue transition-colors">Discover</a>
            <a href="#" className="text-sm font-medium hover:text-brand-blue transition-colors">Genres</a>
            <a href="#" className="text-sm font-medium hover:text-brand-blue transition-colors">Playlists</a>
            <a href="#" className="text-sm font-medium hover:text-brand-blue transition-colors">For Artists</a>
            <a href="#" className="text-sm font-medium hover:text-brand-blue transition-colors">Pricing</a>
          </nav>

          {/* Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <button className="p-2 rounded-full hover:bg-secondary transition-colors" aria-label="Search">
              <Search className="w-5 h-5" />
            </button>
            <Button variant="outline" size="sm" className="rounded-full">
              Sign In
            </Button>
            <Button size="sm" className="rounded-full bg-brand-blue hover:bg-brand-blue/90">
              Start Free Trial
            </Button>
          </div>

          {/* Mobile menu button */}
          <button 
            className="md:hidden p-2 rounded-full hover:bg-secondary transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={cn(
        "fixed inset-0 z-40 bg-background/95 backdrop-blur-sm transform transition-transform duration-300 ease-in-out",
        mobileMenuOpen ? "translate-x-0" : "translate-x-full"
      )}>
        <div className="flex flex-col h-full p-6">
          <div className="flex justify-between items-center mb-8">
            <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-brand-blue to-brand-highlight">
              SoundWave
            </span>
            <button 
              className="p-2 rounded-full hover:bg-secondary transition-colors"
              onClick={() => setMobileMenuOpen(false)}
              aria-label="Close menu"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          <div className="flex flex-col space-y-6">
            <a href="#" className="text-xl font-medium hover:text-brand-blue transition-colors">Discover</a>
            <a href="#" className="text-xl font-medium hover:text-brand-blue transition-colors">Genres</a>
            <a href="#" className="text-xl font-medium hover:text-brand-blue transition-colors">Playlists</a>
            <a href="#" className="text-xl font-medium hover:text-brand-blue transition-colors">For Artists</a>
            <a href="#" className="text-xl font-medium hover:text-brand-blue transition-colors">Pricing</a>
          </div>
          <div className="mt-auto flex flex-col space-y-4">
            <button className="flex items-center space-x-2 p-2 hover:text-brand-blue transition-colors">
              <Search className="w-5 h-5" />
              <span>Search</span>
            </button>
            <Button variant="outline" className="rounded-full w-full">
              <User className="w-4 h-4 mr-2" />
              Sign In
            </Button>
            <Button className="rounded-full w-full bg-brand-blue hover:bg-brand-blue/90">
              Start Free Trial
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navigation;
