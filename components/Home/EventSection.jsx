"use client"
import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

const initialEvents = [
  {
    id: 1,
    title: "ROBO WAR",
    description: "Combat robotics championship. Destroy the opponent in our arena.",
    prize: "20,000",
    image: "/images/robo-war.jpeg",
    link: "/events"
  },
  {
    id: 2,
    title: "AEROMODELLING",
    description: "Showcase RC planes and drones in a test of maneuverability.",
    prize: "20,000",
    image: "/images/aeromodelling.jpeg",
    link: "/events"
  },
  {
    id: 3,
    title: "ROBO OBSTACLE",
    description: "Navigate through treacherous terrain, hurdles, and mazes.",
    prize: "20,000",
    image: "/images/robo-race.jpeg",
    link: "/events"
  },
  {
    id: 4,
    title: "ROBO SOCCER",
    description: "High-octane race where line-following bots compete.",
    prize: "20,000",
    image: "/images/robo-soccer.jpeg",
    link: "/events"
  },
];

const EventsSection = () => {
  const [events, setEvents] = useState(initialEvents);

  const handleCardClick = (index) => {
    if (index === 0) return;
    const newOrder = [
      ...events.slice(index),
      ...events.slice(0, index)
    ];
    setEvents(newOrder);
  };

  return (
    <section className="bg-[#020410] py-10 md:py-20 px-4 min-h-screen flex flex-col justify-center items-center font-orbitron overflow-hidden relative">

      {/* Background Glow */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-[#00ff9f]/5 to-transparent pointer-events-none"></div>

      {/* Main Title - Responsive sizing */}
      <div className="flex flex-col items-center justify-center mb-10">
        <div className="h-[3px] w-full max-w-[300px] md:max-w-[400px] bg-gradient-to-r from-transparent via-[#2fbf2f] to-transparent opacity-50"></div>
        <div className="relative z-10 mt-3 text-center">
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-black text-white uppercase tracking-widest drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]">
            EVENTS
          </h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-center relative z-10">

        {/* === CONTENT SIDE === 
            On Mobile: Appears below the gallery (order-2)
            On Desktop: Appears on the left (lg:order-1)
        */}
        <div className="md:col-span-5 flex flex-col justify-center space-y-4 md:space-y-6 z-20 px-2 order-2 md:order-1">
          <h2 className="text-3xl md:text-5xl font-black text-white uppercase leading-tight tracking-wide">
            {events[0].title}
          </h2>

          <p className="text-slate-400 text-sm md:text-base border-l-2 border-[#2fbf2f] pl-4 max-w-md">
            {events[0].description}
          </p>

          <div className="transform -skew-x-12 inline-block bg-white px-4 py-2 w-fit">
            <p className="transform skew-x-12 text-black font-bold text-sm tracking-wider">
              PRIZES: ₹ {events[0].prize}
            </p>
          </div>

          <Link href={events[0].link} className="group relative inline-flex items-center gap-2 px-6 py-3 border border-[#00ff9f] text-[#2fbf2f] w-fit font-bold uppercase tracking-widest text-xs hover:text-black transition-all">
            <span className="absolute inset-0 bg-[#2fbf2f] translate-y-full group-hover:translate-y-0 transition-transform"></span>
            <span className="relative z-10 flex items-center gap-2">
              Know More <ArrowRight className="w-4 h-4" />
            </span>
          </Link>
        </div>

        {/* === GALLERY SIDE === 
            On Mobile: Appears first (order-1) and shorter height
            On Desktop: Takes up more space (lg:col-span-7)
        */}
        <div className="md:col-span-7 h-[250px] sm:h-[350px] md:h-[400px] lg:h-[450px] flex relative z-10 order-1 md:order-2">
          {events.map((event, index) => {
            const isActive = index === 0;
            return (
              <div
                key={event.id}
                onClick={() => handleCardClick(index)}
                className={`
                  relative h-full cursor-pointer transition-all duration-500 ease-in-out overflow-hidden border-l border-white/10
                  transform -skew-x-6 md:-skew-x-12
                  ${isActive ? 'flex-[2.5] md:flex-[3]' : 'flex-[1]'}
                  ${index !== 0 ? '-ml-2 md:-ml-4' : ''}
                `}
                style={{ zIndex: 10 - index }}
              >
                <div className="absolute inset-0 h-full w-full transform skew-x-6 md:skew-x-12 scale-150">
                  <img src={event.image} alt={event.title} className="w-full h-full object-cover" />
                  <div className={`absolute inset-0 bg-black transition-opacity ${isActive ? 'opacity-10' : 'opacity-60'}`}></div>
                </div>

                {!isActive && (
                  <div className="absolute bottom-10 left-0 w-full flex justify-center transform skew-x-6 md:skew-x-12">
                    <h3 className="text-white text-[10px] md:text-xs font-bold uppercase [writing-mode:vertical-lr] md:[writing-mode:horizontal-tb]">
                      {event.title}
                    </h3>
                  </div>
                )}

                {isActive && (
                  <div className="absolute inset-0 border-2 border-[#00ff9f] z-50 pointer-events-none shadow-[0_0_20px_rgba(0,255,159,0.4)]"></div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default EventsSection;