
import React from 'react';
import { Button } from '@/components/ui/button';
import { Music, Headphones, Zap } from 'lucide-react';

const HeroSection = () => {
  return (
    <section className="relative w-full min-h-screen flex items-center pt-16 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-brand-blue/10 filter blur-3xl animate-pulse-slow"></div>
        <div className="absolute top-1/3 right-1/3 w-80 h-80 rounded-full bg-brand-highlight/10 filter blur-3xl animate-pulse-slow delay-1000"></div>
      </div>

      {/* Animated Circles */}
      <div className="absolute top-1/4 right-[5%] w-20 h-20 rounded-full border border-brand-blue/30 animate-float"></div>
      <div className="absolute bottom-1/4 left-[10%] w-16 h-16 rounded-full border border-brand-highlight/30 animate-float" style={{ animationDelay: '1s' }}></div>
      <div className="absolute top-1/3 left-[15%] w-12 h-12 rounded-full border border-brand-blue/20 animate-float" style={{ animationDelay: '2s' }}></div>

      <div className="container mx-auto px-4 md:px-6 relative">
        <div className="flex flex-col md:flex-row items-center">
          {/* Content */}
          <div className="w-full md:w-1/2 text-center md:text-left space-y-6 animate-fade-up" style={{ animationDelay: '0.1s' }}>
            <div className="inline-block px-3 py-1 rounded-full bg-brand-blue/10 text-brand-blue text-xs font-medium mb-2">
              The Future of Royalty-Free Music
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-balance leading-tight">
              Unleash the Perfect <span className="bg-clip-text text-transparent bg-gradient-to-r from-brand-blue to-brand-highlight">Sound</span> for Your Creation
            </h1>
            <p className="text-lg text-muted-foreground max-w-lg mx-auto md:mx-0">
              High-quality royalty-free music for all your projects. One subscription, unlimited possibilities.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start pt-4">
              <Button size="lg" className="rounded-full bg-brand-blue hover:bg-brand-blue/90">
                Start Free Trial
              </Button>
              <Button size="lg" variant="outline" className="rounded-full">
                Explore Library
              </Button>
            </div>

            {/* Features */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8 pt-4">
              <div className="flex flex-col items-center md:items-start space-y-2 p-4 rounded-xl transition-all">
                <div className="w-10 h-10 flex items-center justify-center rounded-full bg-brand-blue/10 text-brand-blue">
                  <Music className="w-5 h-5" />
                </div>
                <h3 className="font-medium">Unlimited Downloads</h3>
                <p className="text-sm text-muted-foreground text-balance">Access thousands of tracks</p>
              </div>
              <div className="flex flex-col items-center md:items-start space-y-2 p-4 rounded-xl transition-all">
                <div className="w-10 h-10 flex items-center justify-center rounded-full bg-brand-blue/10 text-brand-blue">
                  <Headphones className="w-5 h-5" />
                </div>
                <h3 className="font-medium">Premium Quality</h3>
                <p className="text-sm text-muted-foreground text-balance">Studio-grade audio files</p>
              </div>
              <div className="flex flex-col items-center md:items-start space-y-2 p-4 rounded-xl transition-all">
                <div className="w-10 h-10 flex items-center justify-center rounded-full bg-brand-blue/10 text-brand-blue">
                  <Zap className="w-5 h-5" />
                </div>
                <h3 className="font-medium">Commercial License</h3>
                <p className="text-sm text-muted-foreground text-balance">Use in any project</p>
              </div>
            </div>
          </div>

          {/* Hero Image */}
          <div className="w-full md:w-1/2 mt-12 md:mt-0 animate-fade-up" style={{ animationDelay: '0.3s' }}>
            <div className="relative mx-auto max-w-md">
              <div className="aspect-square rounded-3xl overflow-hidden glass neo p-6 mb-4 relative transform rotate-1">
                <div className="absolute inset-0 bg-gradient-to-br from-brand-blue/10 to-brand-highlight/10"></div>
                <div className="absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-white/20 to-transparent"></div>
                <div className="h-full rounded-2xl overflow-hidden bg-gray-100 relative">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-16 h-16 rounded-full bg-brand-blue/90 flex items-center justify-center shadow-lg">
                      <svg className="w-6 h-6 text-white ml-1" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M8.5 8.5V15.5L15.5 12L8.5 8.5Z" fill="currentColor" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                  </div>
                </div>
                
                {/* Waveform visualization */}
                <div className="absolute bottom-10 left-10 right-10 h-20 flex items-end space-x-1">
                  {[...Array(30)].map((_, i) => (
                    <div 
                      key={i}
                      className={`waveform-bar bg-white/70 w-1 rounded-full transform transition-all duration-200 playing`}
                      style={{
                        height: `${20 + Math.random() * 60}%`,
                        animationName: 'wave',
                        animationDuration: `${1 + Math.random() * 0.7}s`,
                        animationIterationCount: 'infinite',
                        animationDelay: `${i * 0.05}s`
                      }}
                    ></div>
                  ))}
                </div>
              </div>
              
              <div className="absolute -bottom-10 -right-10 w-40 h-40 rounded-2xl glass neo rotate-6 p-4 animate-float" style={{ animationDelay: '1s' }}>
                <div className="h-full rounded-xl bg-gradient-to-br from-brand-blue/20 to-brand-highlight/20 flex items-center justify-center">
                  <Music className="w-10 h-10 text-brand-blue" />
                </div>
              </div>
              
              <div className="absolute -top-8 -left-8 w-32 h-32 rounded-2xl glass neo -rotate-6 p-3 animate-float" style={{ animationDelay: '1.5s' }}>
                <div className="h-full rounded-xl bg-gradient-to-br from-brand-highlight/20 to-brand-blue/20 flex items-center justify-center">
                  <Headphones className="w-8 h-8 text-brand-highlight" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
