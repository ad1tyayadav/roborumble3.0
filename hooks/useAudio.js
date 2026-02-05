"use client"

import { useCallback } from 'react';

export const useAudio = (url, volume = 0.5) => {
  const play = useCallback(() => {
    try {
      const audio = new Audio(url);
      audio.volume = volume;
      audio.play().catch((err) => {
        // Ignore audio playback errors (common if user hasn't interacted with page)
        console.warn("Audio playback failed:", err);
      });
    } catch (error) {
       console.warn("Audio initialization failed:", error);
    }
  }, [url, volume]);

  return play;
};
