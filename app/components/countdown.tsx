"use client";

import React, { useState, useEffect } from 'react';

const Countdown = ({ targetDate }: { targetDate: string }) => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0, hours: 0, minutes: 0, seconds: 0
  });

  useEffect(() => {
    const timer = setInterval(() => {
      const target = new Date(targetDate).getTime();
      const now = new Date().getTime();
      const distance = target - now;

      if (distance < 0) {
        clearInterval(timer);
        return;
      }

      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000),
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  const TimeBlock = ({ value, label }: { value: number, label: string }) => (
    <div className="flex flex-col items-center px-2 md:px-4 lg:px-6">
      <span className="text-2xl md:text-4xl lg:text-6xl font-black font-mono text-white tracking-tighter" 
            style={{ textShadow: '0 0 15px rgba(230, 97, 255, 0.5)' }}>
        {value.toString().padStart(2, '0')}
      </span>
      <span className="text-[8px] md:text-[10px] font-mono text-[#E661FF] uppercase tracking-[0.15em] md:tracking-[0.3em] mt-1 md:mt-2">
        {label}
      </span>
    </div>
  );

  return (
    <div className="flex items-center justify-center divide-x divide-white/10 py-2 md:py-4">
      <TimeBlock value={timeLeft.days} label="Days" />
      <TimeBlock value={timeLeft.hours} label="Hours" />
      <TimeBlock value={timeLeft.minutes} label="Mins" />
      <TimeBlock value={timeLeft.seconds} label="Secs" />
    </div>
  );
};

export { Countdown };
export default Countdown;