
import React from 'react';
import { Play, Music } from 'lucide-react';
import { cn } from '@/lib/utils';

interface PlaylistCardProps {
  id: string;
  title: string;
  description: string;
  coverArt: string;
  trackCount: number;
  onClick?: (id: string) => void;
}

const PlaylistCard = ({
  id,
  title,
  description,
  coverArt,
  trackCount,
  onClick = () => {},
}: PlaylistCardProps) => {
  const handleClick = () => {
    onClick(id);
  };

  return (
    <div 
      className="group track-hover rounded-xl overflow-hidden bg-card cursor-pointer"
      onClick={handleClick}
    >
      <div className="relative aspect-video overflow-hidden rounded-t-lg">
        {/* Cover Art */}
        <img 
          src={coverArt} 
          alt={title} 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end">
          <div className="p-4 w-full">
            <h3 className="text-white font-medium text-lg line-clamp-1">{title}</h3>
            <div className="flex items-center text-white/80 text-sm mt-1">
              <Music className="w-3 h-3 mr-1" />
              <span>{trackCount} tracks</span>
            </div>
          </div>
        </div>
        
        {/* Play Button */}
        <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button
            className="w-9 h-9 rounded-full flex items-center justify-center glass bg-white/20 hover:bg-brand-blue/90 transition-colors"
            aria-label="Play playlist"
          >
            <Play className="w-4 h-4 text-white ml-0.5" />
          </button>
        </div>
      </div>
      
      {/* Playlist Info */}
      <div className="p-3">
        <p className="text-sm text-muted-foreground line-clamp-2">{description}</p>
      </div>
    </div>
  );
};

export default PlaylistCard;
