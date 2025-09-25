import { useRef, useEffect } from 'react';

export const AutoMusicPlayer = ({ shouldPlay, sound }: { shouldPlay: boolean, sound: string}) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (!audioRef.current) {
      audioRef.current = new Audio(sound);
      audioRef.current.loop = true;
    }
  }, []);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (shouldPlay) {
      audio.play().catch(error => {
        console.error("Audio play failed:", error);
      });
    } else {
      audio.pause();
    }
  }, [shouldPlay]);

  return null;
}