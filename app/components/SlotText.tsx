"use client";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&";

const SlotChar = ({ targetChar, delay }: { targetChar: string; delay: number }) => {
  const [displayChar, setDisplayChar] = useState("A"); // Start with a static character to prevent hydration mismatch

  useEffect(() => {
    // Phase 1: Rapidly shuffle characters
    const interval = setInterval(() => {
      setDisplayChar(CHARS[Math.floor(Math.random() * CHARS.length)]);
    }, 50);

    // Phase 2: Lock onto the target character after the delay
    const timeout = setTimeout(() => {
      clearInterval(interval);
      setDisplayChar(targetChar);
    }, 1000 + delay * 200);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [targetChar, delay]);

  return (
    <motion.span
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="inline-block"
      style={{ minWidth: "1ch" }}
    >
      {displayChar}
    </motion.span>
  );
};

export const SlotText = ({ text, className = "" }: { text: string; className?: string }) => {
  return (
    <div className={`flex font-bold tracking-widest text-white uppercase font-mono ${className}`}>
      {text.split("").map((char, i) => (
        <SlotChar key={i} targetChar={char} delay={i} />
      ))}
    </div>
  );
};