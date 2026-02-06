"use client";
import React, { useEffect, useRef } from 'react';

interface MatrixBackgroundProps {
    color?: string; // e.g. '#00F0FF' or '#FF0000'
    text?: string;  // e.g. "STATUS: TERMINAL ACTIVE"
}

const MatrixBackground = ({ color = '#024d02ff', text = 'STATUS: TERMINAL ACTIVE' }: MatrixBackgroundProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas dimensions to full screen
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas(); // Initial sizing

    // Configuration
    const fontSize = 16;
    const columnSpacing = 24; // Increased from 16 to 24 for lower density
    const font = `${fontSize}px monospace`;
    // Characters provided by the user
    const chars = "1234567890qwertyuiopasdfghjklzxcvbnm,./';[]!@#$%^&*()-=_+";
    const charArray = chars.split('');

    // Array to track the y coordinate of each drop
    let drops: number[] = [];
    
    const initDrops = () => {
      const columns = Math.floor(canvas.width / columnSpacing);
      drops = [];
      for(let i = 0; i < columns; i++) {
        drops[i] = Math.floor(Math.random() * -canvas.height); // Start at random heights above screen
      }
    };
    
    initDrops();

    const handleResize = () => {
        resizeCanvas();
        initDrops();
    };
    window.removeEventListener('resize', resizeCanvas); // Remove the simple one
    window.addEventListener('resize', handleResize);

    const draw = () => {
      // translucent black background to create trail effect
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = color; 
      ctx.font = font;

      for (let i = 0; i < drops.length; i++) {
        const textStr = charArray[Math.floor(Math.random() * charArray.length)];
        ctx.fillText(textStr, i * columnSpacing, drops[i] * fontSize);

        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
    };

    const interval = setInterval(draw, 33);

    return () => {
      clearInterval(interval);
      window.removeEventListener('resize', handleResize);
    };
  }, [color]); // Re-run effect if color changes

  return (
    <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0, background: '#000' }}>
      <canvas ref={canvasRef} style={{ display: 'block' }} />
      {text && (
        <>
          <div style={{
            position: 'absolute',
            top: '40px',
            left: '40px',
            color: color,
            fontFamily: 'monospace',
            fontSize: '20px',
            textShadow: `0 0 10px ${color}`,
            zIndex: 1
          }}>
            {text}<span className="blink">_</span>
          </div>
          <style jsx>{`
            .blink { animation: blinker 1s linear infinite; }
            @keyframes blinker { 50% { opacity: 0; } }
          `}</style>
        </>
      )}
    </div>
  );
};

export default MatrixBackground;
