
import React, { useState, useRef, useEffect } from 'react';
import { Slider } from '@/components/ui/slider';
import { cn } from '@/lib/utils';
import { 
  Play, 
  Pause, 
  SkipBack, 
  SkipForward, 
  Volume2, 
  Volume1, 
  VolumeX,
  Repeat,
  Shuffle,
  Heart,
  ListMusic,
  Share2,
  Plus
} from 'lucide-react';

interface PlayerProps {
  currentTrack?: {
    id: string;
    title: string;
    artist: string;
    coverArt: string;
    duration: string;
    audioSrc?: string;
  } | null;
}

const Player = ({ currentTrack }: PlayerProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(80);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [isExpanded, setIsExpanded] = useState(false);
  
  const audioRef = useRef<HTMLAudioElement>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  
  // Format time in MM:SS
  const formatTime = (time: number) => {
    if (isNaN(time)) return '0:00';
    
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };
  
  // Handle play/pause
  const togglePlayPause = () => {
    if (!audioRef.current) return;
    
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    
    setIsPlaying(!isPlaying);
  };
  
  // Handle volume change
  const handleVolumeChange = (value: number[]) => {
    const newVolume = value[0];
    setVolume(newVolume);
    
    if (audioRef.current) {
      audioRef.current.volume = newVolume / 100;
    }
  };
  
  // Handle seeking
  const handleProgressChange = (value: number[]) => {
    const newProgress = value[0];
    setProgress(newProgress);
    
    if (audioRef.current && duration) {
      const newTime = (newProgress / 100) * duration;
      audioRef.current.currentTime = newTime;
      setCurrentTime(newTime);
    }
  };
  
  // Start progress interval when playing
  const startProgressInterval = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    
    intervalRef.current = setInterval(() => {
      if (audioRef.current) {
        const currentProgress = (audioRef.current.currentTime / duration) * 100;
        setProgress(currentProgress);
        setCurrentTime(audioRef.current.currentTime);
        
        if (audioRef.current.ended) {
          setIsPlaying(false);
          setProgress(0);
          setCurrentTime(0);
        }
      }
    }, 100);
  };
  
  // Effect for handling audio events
  useEffect(() => {
    const audio = audioRef.current;
    
    if (audio) {
      // Set initial volume
      audio.volume = volume / 100;
      
      // Event listeners
      const handleLoadedMetadata = () => {
        setDuration(audio.duration);
      };
      
      const handlePlay = () => {
        setIsPlaying(true);
        startProgressInterval();
      };
      
      const handlePause = () => {
        setIsPlaying(false);
        if (intervalRef.current) clearInterval(intervalRef.current);
      };
      
      const handleEnded = () => {
        setIsPlaying(false);
        setProgress(0);
        setCurrentTime(0);
        if (intervalRef.current) clearInterval(intervalRef.current);
      };
      
      // Add event listeners
      audio.addEventListener('loadedmetadata', handleLoadedMetadata);
      audio.addEventListener('play', handlePlay);
      audio.addEventListener('pause', handlePause);
      audio.addEventListener('ended', handleEnded);
      
      // Clean up
      return () => {
        audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
        audio.removeEventListener('play', handlePlay);
        audio.removeEventListener('pause', handlePause);
        audio.removeEventListener('ended', handleEnded);
        
        if (intervalRef.current) clearInterval(intervalRef.current);
      };
    }
  }, [audioRef, volume, duration]);
  
  // Reset player when track changes
  useEffect(() => {
    setProgress(0);
    setCurrentTime(0);
    setIsPlaying(false);
    
    if (intervalRef.current) clearInterval(intervalRef.current);
    
    // Auto-play new track after a short delay
    if (currentTrack?.audioSrc) {
      const timer = setTimeout(() => {
        if (audioRef.current) {
          audioRef.current.play()
            .then(() => setIsPlaying(true))
            .catch(e => console.error('Error playing audio:', e));
        }
      }, 300);
      
      return () => clearTimeout(timer);
    }
  }, [currentTrack]);
  
  // If no track, show minimized player
  if (!currentTrack) {
    return null;
  }
  
  return (
    <>
      {/* Hidden audio element */}
      <audio 
        ref={audioRef} 
        src={currentTrack.audioSrc || "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"} 
        preload="metadata" 
      />
      
      <div className={cn(
        "fixed bottom-0 left-0 right-0 z-40 transition-all duration-300 transform",
        isExpanded ? "h-80" : "h-20"
      )}>
        {/* Expanded Player */}
        <div className={cn(
          "absolute inset-0 glass border-t border-gray-200 dark:border-gray-800 transform transition-all duration-300",
          isExpanded ? "translate-y-0" : "translate-y-full"
        )}>
          <div className="container mx-auto h-full p-6 flex gap-6">
            {/* Cover Art */}
            <div className="hidden md:block w-48 h-48 relative rounded-lg overflow-hidden neo">
              <img 
                src={currentTrack.coverArt} 
                alt={currentTrack.title} 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                <button
                  className="w-12 h-12 rounded-full flex items-center justify-center glass bg-white/20 hover:bg-brand-blue/90 transition-colors"
                  onClick={togglePlayPause}
                  aria-label={isPlaying ? "Pause" : "Play"}
                >
                  {isPlaying ? (
                    <Pause className="w-6 h-6 text-white" />
                  ) : (
                    <Play className="w-6 h-6 ml-0.5 text-white" />
                  )}
                </button>
              </div>
            </div>
            
            {/* Track Info and Controls */}
            <div className="flex-1 flex flex-col">
              <div className="mb-4">
                <h3 className="text-xl font-medium">{currentTrack.title}</h3>
                <p className="text-muted-foreground">{currentTrack.artist}</p>
              </div>
              
              {/* Progress Bar */}
              <div className="mb-4">
                <Slider
                  value={[progress]}
                  max={100}
                  step={0.1}
                  onValueChange={handleProgressChange}
                  className="mb-2"
                />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>{formatTime(currentTime)}</span>
                  <span>{formatTime(duration)}</span>
                </div>
              </div>
              
              {/* Controls */}
              <div className="flex items-center justify-center mb-6">
                <button className="p-2 rounded-full hover:bg-background transition-colors" aria-label="Shuffle">
                  <Shuffle className="w-5 h-5" />
                </button>
                <button className="p-2 rounded-full hover:bg-background transition-colors" aria-label="Previous">
                  <SkipBack className="w-6 h-6" />
                </button>
                <button
                  className="w-12 h-12 mx-4 rounded-full flex items-center justify-center bg-brand-blue hover:bg-brand-blue/90 transition-colors"
                  onClick={togglePlayPause}
                  aria-label={isPlaying ? "Pause" : "Play"}
                >
                  {isPlaying ? (
                    <Pause className="w-6 h-6 text-white" />
                  ) : (
                    <Play className="w-6 h-6 ml-0.5 text-white" />
                  )}
                </button>
                <button className="p-2 rounded-full hover:bg-background transition-colors" aria-label="Next">
                  <SkipForward className="w-6 h-6" />
                </button>
                <button className="p-2 rounded-full hover:bg-background transition-colors" aria-label="Repeat">
                  <Repeat className="w-5 h-5" />
                </button>
              </div>
              
              {/* Volume and Actions */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2 w-32">
                  <button className="p-1" aria-label="Volume">
                    {volume === 0 ? (
                      <VolumeX className="w-4 h-4" />
                    ) : volume < 50 ? (
                      <Volume1 className="w-4 h-4" />
                    ) : (
                      <Volume2 className="w-4 h-4" />
                    )}
                  </button>
                  <Slider
                    value={[volume]}
                    max={100}
                    step={1}
                    onValueChange={handleVolumeChange}
                  />
                </div>
                
                <div className="flex items-center space-x-3">
                  <button className="p-1 rounded-full hover:bg-background transition-colors" aria-label="Add to favorites">
                    <Heart className="w-5 h-5" />
                  </button>
                  <button className="p-1 rounded-full hover:bg-background transition-colors" aria-label="Add to playlist">
                    <Plus className="w-5 h-5" />
                  </button>
                  <button className="p-1 rounded-full hover:bg-background transition-colors" aria-label="Share">
                    <Share2 className="w-5 h-5" />
                  </button>
                  <button className="p-1 rounded-full hover:bg-background transition-colors" aria-label="Playlist">
                    <ListMusic className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Compact Player */}
        <div 
          className={cn(
            "absolute inset-0 glass border-t border-gray-200 dark:border-gray-800 cursor-pointer",
            isExpanded && "opacity-0 pointer-events-none"
          )}
          onClick={() => setIsExpanded(true)}
        >
          <div className="container mx-auto h-full px-4 md:px-6 flex items-center">
            {/* Track Info */}
            <div className="flex items-center flex-1 min-w-0">
              <div className="w-12 h-12 rounded-md overflow-hidden mr-3 flex-shrink-0">
                <img 
                  src={currentTrack.coverArt} 
                  alt={currentTrack.title} 
                  className="w-full h-full object-cover"
                />
              </div>
              
              <div className="min-w-0">
                <h4 className="font-medium truncate">{currentTrack.title}</h4>
                <p className="text-sm text-muted-foreground truncate">{currentTrack.artist}</p>
              </div>
            </div>
            
            {/* Playback Controls */}
            <div className="flex items-center space-x-2">
              <button className="p-1 rounded-full hover:bg-secondary transition-colors" aria-label="Previous">
                <SkipBack className="w-5 h-5" />
              </button>
              <button
                className="w-10 h-10 rounded-full flex items-center justify-center bg-brand-blue hover:bg-brand-blue/90 transition-colors"
                onClick={(e) => {
                  e.stopPropagation();
                  togglePlayPause();
                }}
                aria-label={isPlaying ? "Pause" : "Play"}
              >
                {isPlaying ? (
                  <Pause className="w-5 h-5 text-white" />
                ) : (
                  <Play className="w-5 h-5 ml-0.5 text-white" />
                )}
              </button>
              <button className="p-1 rounded-full hover:bg-secondary transition-colors" aria-label="Next">
                <SkipForward className="w-5 h-5" />
              </button>
            </div>
            
            {/* Progress Bar - Mobile Hidden */}
            <div className="hidden md:block flex-1 mx-4 max-w-md">
              <Slider
                value={[progress]}
                max={100}
                step={0.1}
                onValueChange={(v) => {
                  // Prevent expanding the player
                  event?.stopPropagation();
                  handleProgressChange(v);
                }}
              />
            </div>
            
            {/* Action Buttons - Hidden on small screens */}
            <div className="hidden md:flex items-center space-x-2">
              <button 
                className="p-1 rounded-full hover:bg-secondary transition-colors"
                onClick={(e) => {
                  e.stopPropagation();
                }}
                aria-label="Add to favorites"
              >
                <Heart className="w-5 h-5" />
              </button>
              <button 
                className="p-1 rounded-full hover:bg-secondary transition-colors"
                onClick={(e) => {
                  e.stopPropagation();
                  setIsExpanded(true);
                }}
                aria-label="Expand player"
              >
                <svg width="20" height="20" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M7.5 2L7.5 13M2 7.5L13 7.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>
          </div>
          
          {/* Mobile Progress Bar */}
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-secondary/50 md:hidden">
            <div 
              className="h-full bg-brand-blue" 
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>
      </div>
      
      {/* Player Backdrop - only visible when expanded */}
      {isExpanded && (
        <div 
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-30"
          onClick={() => setIsExpanded(false)}
        ></div>
      )}
    </>
  );
};

export default Player;
