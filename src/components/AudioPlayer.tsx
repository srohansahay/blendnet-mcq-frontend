import React, { useState, useRef } from 'react';
import {FaPlay, FaPause} from 'react-icons/fa';

interface AudioPlayerProps {
  url: string;
}

const AudioPlayer: React.FC<AudioPlayerProps> = ({ url }) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  const handleSeek = (time: number) => {
    if (audioRef.current) {
      audioRef.current.currentTime = time;
      setCurrentTime(time);
    }
  };

  return (
    <div>
      <audio ref={audioRef} src={url} onTimeUpdate={handleTimeUpdate}></audio>
      <div>
        <button onClick={togglePlay}>{isPlaying ? <FaPause/> : <FaPlay/>}</button>
        <input
          type="range"
          min={0}
          max={audioRef.current ? audioRef.current.duration : 0}
          value={currentTime}
          onChange={(e) => handleSeek(parseInt(e.target.value))}
        />
      </div>
    </div>
  );
};

export default AudioPlayer;
