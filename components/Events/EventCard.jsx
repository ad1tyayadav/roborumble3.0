"use client";
import React from "react";

// Change 1: 'onOpenModal' prop yahan add kiya
const EventCard = ({ event, isActive, onOpenModal }) => {
  return (
    <div
      className={`relative w-full h-full bg-[#000a28] border border-cyan-500/30 rounded-xl overflow-hidden flex flex-col transition-all duration-500 ${
        isActive
          ? "scale-100 opacity-100 shadow-[0_0_30px_rgba(0,255,153,0.3)]" 
          : "scale-90 opacity-40 blur-[1px]" 
      }`}
    >
      {/* Image Section */}
      <div className="relative h-[70%] w-full overflow-hidden group">
        <div className="absolute inset-0 bg-gradient-to-t from-[#000a28] to-transparent z-10" />
        <img
          src={event.image}
          alt={event.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute top-2 sm:top-3 right-2 sm:right-3 z-20 bg-black/80 border border-[#00FF00] px-1.5 sm:px-2 py-0.5 sm:py-1 rounded text-[8px] sm:text-[10px] text-[#00FF00] font-bold shadow-[0_0_10px_#00FF00]">
          PRIZE: {event.prize}
        </div>
      </div>

      {/* Title Section */}
      <div className="h-[15%] flex items-center justify-center bg-[#000a28] px-2">
        <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-white font-[Oswald] uppercase tracking-widest drop-shadow-md text-center line-clamp-2">
          {event.title}
        </h3>
      </div>

      {/* View Button Section */}
      <div className="h-[15%] px-4 pb-4 flex items-end">
        <button 
          // Change 2: Yeh line click ko handle karegi
          onClick={() => onOpenModal(event)} 
          className="w-full py-2 border border-[#00FF00] text-[#00FF00] hover:bg-[#00FF00] hover:text-black font-bold uppercase text-xs tracking-[0.2em] rounded transition-all duration-300 shadow-[0_0_10px_rgba(0,255,0,0.2)]"
        >
          VIEW
        </button>
      </div>
    </div>
  );
};

export default EventCard;