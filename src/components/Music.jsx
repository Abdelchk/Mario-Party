import { useRef, useEffect, useState } from "react";
import backgroundMusic from "../assets/sounds/title_screen.mp3";

export default function Music() {

    const musicRef = useRef(null);
    const [isMusicPlaying, setIsMusicPlaying] = useState(false);

    useEffect(() => {
        const music = new Audio(backgroundMusic);
        music.loop = true;
        music.volume = 0.4;
        musicRef.current = music;
      
        return () => {
          music.pause();
        };
      }, []);
      
    
    return (
        <button
            style={{
                position: 'fixed',
                top: '10px',
                right: '10px',
                zIndex: 1000
            }}
            onClick={() => {
                if (musicRef.current) {
                if (isMusicPlaying) {
                    musicRef.current.pause();
                } else {
                    musicRef.current.play();
                }
                setIsMusicPlaying(!isMusicPlaying);
                }
            }}
        >
        {isMusicPlaying ? '🔊' : '🔈'}
        </button>
    );
    }