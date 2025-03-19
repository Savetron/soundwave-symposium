
import React, { useState } from 'react';
import { Play, Pause, Clock, Heart, Plus, Tag } from 'lucide-react';
import { cn } from '@/lib/utils';

interface FeaturedTrackProps {
  id: string;
  title: string;
  artist: string;
  coverArt: string;
  duration: string;
  genre: string;
  mood: string;
  isPlaying?: boolean;
  onPlayPause?: (id: string) => void;
}

const FeaturedTrack = ({
  id,
  title,
  artist,
  coverArt,
  duration,
  genre,
  mood,
  isPlaying = false,
  onPlayPause = () => {},
}: FeaturedTrackProps) => {
  const [isHovered, setIsHovered] = useState(false);

  const handlePlayPause = (e: React.MouseEvent) => {
    e.stopPropagation();
    onPlayPause(id);
  };

  return (
    <div 
      className="group track-hover rounded-xl overflow-hidden bg-card"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative aspect-square overflow-hidden rounded-lg">
        {/* Cover Art */}
        <img 
          src={coverArt} 
          alt={`${title} by ${artist}`} 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        
        {/* Play Button Overlay */}
        <div className={cn(
          "absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 transition-opacity duration-300",
          (isHovered || isPlaying) && "opacity-100"
        )}>
          <button
            className={cn(
              "w-12 h-12 rounded-full flex items-center justify-center glass transition-all duration-300",
              isPlaying ? "bg-brand-blue/90" : "bg-white/80 hover:bg-brand-blue/90"
            )}
            onClick={handlePlayPause}
            aria-label={isPlaying ? "Pause" : "Play"}
          >
            {isPlaying ? (
              <Pause className="w-5 h-5 text-white" />
            ) : (
              <Play className="w-5 h-5 ml-0.5 text-foreground group-hover:text-white" />
            )}
          </button>
        </div>
        
        {/* Waveform if playing */}
        {isPlaying && (
          <div className="absolute bottom-2 left-2 right-2 h-8 flex items-end justify-center space-x-0.5">
            {[...Array(13)].map((_, i) => (
              <div 
                key={i}
                className="waveform-bar bg-white/80 w-1 rounded-full playing"
                style={{
                  height: `${20 + Math.random() * 60}%`,
                  animationName: 'wave',
                  animationDuration: `${1 + Math.random() * 0.5}s`,
                  animationIterationCount: 'infinite',
                  animationDelay: `${i * 0.05}s`
                }}
              ></div>
            ))}
          </div>
        )}
      </div>
      
      {/* Track Info */}
      <div className="p-3">
        <div className="flex justify-between items-start mb-1">
          <h3 className="font-medium line-clamp-1 group-hover:text-brand-blue transition-colors">{title}</h3>
          <div className="flex space-x-1">
            <button className="p-1 rounded-full hover:bg-secondary/80 transition-colors" aria-label="Add to favorites">
              <Heart className="w-4 h-4" />
            </button>
            <button className="p-1 rounded-full hover:bg-secondary/80 transition-colors" aria-label="Add to playlist">
              <Plus className="w-4 h-4" />
            </button>
          </div>
        </div>
        <p className="text-sm text-muted-foreground">{artist}</p>
        
        {/* Tags */}
        <div className="flex flex-wrap gap-1 mt-2">
          <div className="inline-flex items-center text-xs px-2 py-0.5 rounded-full bg-secondary">
            <Tag className="w-3 h-3 mr-1" />
            {genre}
          </div>
          <div className="inline-flex items-center text-xs px-2 py-0.5 rounded-full bg-secondary">
            {mood}
          </div>
          <div className="inline-flex items-center text-xs px-2 py-0.5 rounded-full bg-secondary">
            <Clock className="w-3 h-3 mr-1" />
            {duration}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturedTrack;
