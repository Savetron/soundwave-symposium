
import React, { useState } from 'react';
import Navigation from '@/components/ui/navigation';
import HeroSection from '@/components/ui/hero-section';
import FeaturedTrack from '@/components/ui/featured-track';
import PlaylistCard from '@/components/ui/playlist-card';
import Player from '@/components/ui/player';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Music, TrendingUp, Calendar, Filter } from 'lucide-react';

// Mock data for featured tracks
const featuredTracks = [
  {
    id: '1',
    title: 'Midnight Glow',
    artist: 'Electronic Dreams',
    coverArt: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=2574&auto=format&fit=crop',
    duration: '3:24',
    genre: 'Electronic',
    mood: 'Uplifting'
  },
  {
    id: '2',
    title: 'Urban Rhythm',
    artist: 'City Beats',
    coverArt: 'https://images.unsplash.com/photo-1501386761578-eac5c94b800a?q=80&w=2670&auto=format&fit=crop',
    duration: '2:56',
    genre: 'Hip-Hop',
    mood: 'Energetic'
  },
  {
    id: '3',
    title: 'Gentle Wind',
    artist: 'Nature Sounds',
    coverArt: 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?q=80&w=2670&auto=format&fit=crop',
    duration: '4:12',
    genre: 'Ambient',
    mood: 'Calm'
  },
  {
    id: '4',
    title: 'Sunset Drive',
    artist: 'Coastal Vibes',
    coverArt: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?q=80&w=2670&auto=format&fit=crop',
    duration: '3:45',
    genre: 'Indie',
    mood: 'Relaxed'
  },
  {
    id: '5',
    title: 'Digital Dawn',
    artist: 'Future Sound',
    coverArt: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=2670&auto=format&fit=crop',
    duration: '3:18',
    genre: 'Electronic',
    mood: 'Focused'
  },
  {
    id: '6',
    title: 'City Lights',
    artist: 'Urban Jazz',
    coverArt: 'https://images.unsplash.com/photo-1504898770365-14faca6a7320?q=80&w=2727&auto=format&fit=crop',
    duration: '4:02',
    genre: 'Jazz',
    mood: 'Smooth'
  },
  {
    id: '7',
    title: 'Mountain Echo',
    artist: 'Wild Symphony',
    coverArt: 'https://images.unsplash.com/photo-1446057032654-9d8885db76c6?q=80&w=2728&auto=format&fit=crop',
    duration: '5:16',
    genre: 'Orchestral',
    mood: 'Epic'
  },
  {
    id: '8',
    title: 'Neon Dreams',
    artist: 'Synthwave Collective',
    coverArt: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?q=80&w=2669&auto=format&fit=crop',
    duration: '3:37',
    genre: 'Synthwave',
    mood: 'Nostalgic'
  }
];

// Mock data for playlists
const playlists = [
  {
    id: 'p1',
    title: 'Focus & Concentration',
    description: 'Background music to help you stay focused and productive',
    coverArt: 'https://images.unsplash.com/photo-1551817958-20204d6ab212?q=80&w=2670&auto=format&fit=crop',
    trackCount: 42
  },
  {
    id: 'p2',
    title: 'YouTube Ready',
    description: 'Copyright-free tracks perfect for content creation',
    coverArt: 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?q=80&w=2674&auto=format&fit=crop',
    trackCount: 38
  },
  {
    id: 'p3',
    title: 'Corporate & Presentations',
    description: 'Professional background music for business videos',
    coverArt: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=2532&auto=format&fit=crop',
    trackCount: 27
  },
  {
    id: 'p4',
    title: 'Cinematic Soundscapes',
    description: 'Emotional orchestral pieces for dramatic scenes',
    coverArt: 'https://images.unsplash.com/photo-1485579149621-3123dd979885?q=80&w=2731&auto=format&fit=crop',
    trackCount: 31
  }
];

const Index = () => {
  const [currentTrack, setCurrentTrack] = useState<typeof featuredTracks[0] | null>(null);
  const [playingTrackId, setPlayingTrackId] = useState<string | null>(null);

  // Handle track play/pause
  const handlePlayPause = (trackId: string) => {
    if (playingTrackId === trackId) {
      // If already playing, toggle off
      setPlayingTrackId(null);
      setCurrentTrack(null);
    } else {
      // Start playing new track
      setPlayingTrackId(trackId);
      const track = featuredTracks.find(t => t.id === trackId);
      if (track) {
        setCurrentTrack(track);
      }
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <HeroSection />
      
      {/* Featured Tracks Section */}
      <section className="py-16 px-4 md:px-6">
        <div className="container mx-auto">
          <div className="mb-8">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-6">
              <div>
                <div className="inline-block px-3 py-1 rounded-full bg-brand-blue/10 text-brand-blue text-xs font-medium mb-2">
                  Explore Our Collection
                </div>
                <h2 className="text-3xl font-bold">Featured Tracks</h2>
              </div>
              
              <Tabs defaultValue="trending" className="w-full md:w-auto">
                <TabsList className="bg-secondary">
                  <TabsTrigger value="trending" className="data-[state=active]:bg-white">
                    <TrendingUp className="w-4 h-4 mr-2" />
                    Trending
                  </TabsTrigger>
                  <TabsTrigger value="latest" className="data-[state=active]:bg-white">
                    <Calendar className="w-4 h-4 mr-2" />
                    Latest
                  </TabsTrigger>
                  <TabsTrigger value="all" className="data-[state=active]:bg-white">
                    <Music className="w-4 h-4 mr-2" />
                    All
                  </TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
            
            <div className="flex flex-wrap items-center gap-2 mb-6">
              <Button variant="outline" size="sm" className="rounded-full">
                <Filter className="w-4 h-4 mr-2" />
                Filters
              </Button>
              <Button variant="outline" size="sm" className="rounded-full bg-secondary/50">Electronic</Button>
              <Button variant="outline" size="sm" className="rounded-full bg-secondary/50">Ambient</Button>
              <Button variant="outline" size="sm" className="rounded-full bg-secondary/50">Pop</Button>
              <Button variant="outline" size="sm" className="rounded-full bg-secondary/50">Hip-Hop</Button>
              <Button variant="outline" size="sm" className="rounded-full bg-secondary/50">Rock</Button>
            </div>
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {featuredTracks.map(track => (
              <FeaturedTrack
                key={track.id}
                {...track}
                isPlaying={playingTrackId === track.id}
                onPlayPause={handlePlayPause}
              />
            ))}
          </div>
          
          <div className="flex justify-center mt-10">
            <Button variant="outline" size="lg" className="rounded-full">
              Browse All Tracks
            </Button>
          </div>
        </div>
      </section>
      
      {/* Curated Playlists Section */}
      <section className="py-16 px-4 md:px-6 bg-secondary/30">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between mb-10">
            <div>
              <div className="inline-block px-3 py-1 rounded-full bg-brand-blue/10 text-brand-blue text-xs font-medium mb-2">
                Ready-Made Collections
              </div>
              <h2 className="text-3xl font-bold">Curated Playlists</h2>
            </div>
            
            <Button variant="outline" className="mt-4 md:mt-0">
              View All Playlists
            </Button>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {playlists.map(playlist => (
              <PlaylistCard
                key={playlist.id}
                {...playlist}
              />
            ))}
          </div>
        </div>
      </section>
      
      {/* Call to Action */}
      <section className="py-20 px-4 md:px-6 relative overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-brand-blue/5 filter blur-3xl"></div>
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-brand-highlight/5 filter blur-3xl"></div>
        </div>
        
        <div className="container mx-auto max-w-4xl text-center relative">
          <div className="inline-block px-3 py-1 rounded-full bg-brand-blue/10 text-brand-blue text-xs font-medium mb-4">
            Start Creating Today
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-balance">
            Unlimited Music for Your Creative Projects
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Get access to thousands of high-quality tracks with simple licensing for all your content needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="rounded-full bg-brand-blue hover:bg-brand-blue/90">
              Start Free Trial
            </Button>
            <Button size="lg" variant="outline" className="rounded-full">
              Explore Pricing Plans
            </Button>
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="py-12 px-4 md:px-6 bg-card">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-brand-blue to-brand-highlight">
                SoundWave
              </h3>
              <p className="text-muted-foreground mb-4">
                Premium royalty-free music for creators and businesses.
              </p>
            </div>
            
            <div>
              <h4 className="font-medium mb-4">Platform</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Browse Music</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Licensing</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Pricing</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">For Artists</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-medium mb-4">Company</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">About Us</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Careers</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Blog</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Contact</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-medium mb-4">Support</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Help Center</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Terms of Service</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Copyright</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-border mt-12 pt-6 flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} SoundWave. All rights reserved.
            </p>
            <div className="flex space-x-4 mt-4 md:mt-0">
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd"></path>
                </svg>
              </a>
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"></path>
                </svg>
              </a>
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd"></path>
                </svg>
              </a>
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"></path>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </footer>
      
      {/* Audio Player */}
      <Player currentTrack={currentTrack} />
    </div>
  );
};

export default Index;
