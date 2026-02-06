"use client";
import React, { useEffect, useRef } from 'react';

const MatrixBackground = () => {
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
    const font = `${fontSize}px monospace`;
    // Characters provided by the user
    const chars = "1234567890qwertyuiopasdfghjklzxcvbnm,./';[]!@#$%^&*()-=_+";
    const charArray = chars.split('');

    // Calculate columns
    let columns = Math.floor(canvas.width / fontSize);
    
    // Array to track the y coordinate of each drop
    // initialized to 1 (top of screen)
    let drops: number[] = [];
    
    const initDrops = () => {
      columns = Math.floor(canvas.width / fontSize);
      drops = [];
      for(let i = 0; i < columns; i++) {
        drops[i] = Math.floor(Math.random() * -canvas.height); // Start at random heights above screen
      }
    };
    
    initDrops();

    // Handle resize re-initialization carefully to avoid jarring resets if possible, 
    // but for simple matrix effect, resizing usually just expands/contracts.
    // simpler to just let current drops continue or add new ones?
    // Let's just update columns count on resize in the draw loop logically, 
    // or just reset drops on substantial resize.
    // For this implementation, we'll re-init drops on resize to keep it simple and correct.
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

      ctx.fillStyle = '#FF003C'; // Green text
      ctx.font = font;

      for (let i = 0; i < drops.length; i++) {
        // Pick a random character
        const text = charArray[Math.floor(Math.random() * charArray.length)];
        
        // Draw the character
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        // Reset drop to top randomly after it has crossed the screen
        // Adding a randomness to the reset to scatter the drops
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }

        // Increment y coordinate
        drops[i]++;
      }
    };

    // Animation Loop
    const interval = setInterval(draw, 33); // approx 30fps

    return () => {
      clearInterval(interval);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: -1, background: '#000' }}>
      <canvas ref={canvasRef} style={{ display: 'block' }} />
      <div style={{
        position: 'absolute',
        top: '40px',
        left: '40px',
        color: '#00E5FF',
        fontFamily: 'monospace',
        fontSize: '20px',
        textShadow: '0 0 10px #00ff41',
        zIndex: 1
      }}>
        STATUS: TERMINAL ACTIVE<span className="blink">_</span>
      </div>
      <style jsx>{`
        .blink { animation: blinker 1s linear infinite; }
        @keyframes blinker { 50% { opacity: 0; } }
      `}</style>
    </div>
  );
};

export default MatrixBackground;