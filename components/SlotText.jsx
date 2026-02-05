"use client"

import React, { useState, useEffect } from 'react';

export const SlotText = ({ text, className = "" }) => {
  const [displayText, setDisplayText] = useState("");
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*()";

  useEffect(() => {
    let currentIteration = 0;
    const maxIterations = 10;
    const interval = setInterval(() => {
      const scrambled = text
        .split("")
        .map((char, index) => {
          if (char === " " || char === "_") return char;
          if (currentIteration >= maxIterations + index) return char;
          return characters.charAt(Math.floor(Math.random() * characters.length));
        })
        .join("");

      setDisplayText(scrambled);
      currentIteration++;

      if (currentIteration > maxIterations + text.length) {
        clearInterval(interval);
      }
    }, 50);

    return () => clearInterval(interval);
  }, [text]);

  return <span className={className}>{displayText}</span>;
}
