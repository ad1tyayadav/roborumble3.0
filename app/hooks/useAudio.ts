import { useState, useEffect } from 'react';

export const useAudio = (src: string, volume: number = 0.5) => {
    const [audio, setAudio] = useState<HTMLAudioElement | null>(null);

    useEffect(() => {
        const defaultAudio = new Audio(src);
        defaultAudio.volume = volume;
        defaultAudio.preload = 'auto'; // Force preloading
        setAudio(defaultAudio);

        // Cleanup not strictly necessary for simple Audio objects but good practice in some contexts
        return () => {
            defaultAudio.pause();
            defaultAudio.src = "";
        };
    }, [src, volume]);

    const play = () => {
        if (audio) {
            audio.currentTime = 0; // Reset to start
            audio.play().catch((err) => console.error("Audio play error:", err));
        }
    };

    return play;
};
