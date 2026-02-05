"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import MatrixBackground from "../../../components/MatrixBackground";
import { Trophy, Users, Info, Shield, Zap, Cpu, Bot, Gamepad2, Mic, Rocket, Magnet, Download } from "lucide-react";
import { BiFootball } from "react-icons/bi";
import { SlotText } from "../../../components/SlotText";
import { useAudio } from "../../../hooks/useAudio";
import { events } from "../../../src/data/events";

// --- Internal Component: Animated Backgrounds ---
const CardBackground = ({ category, image }) => {
  // Priority: Image Background
  if (image) {
    return (
      <div className="absolute inset-0 z-0 select-none">
        <Image
          src={image}
          alt={category}
          fill
          className="object-cover opacity-60 group-hover:scale-110 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"></div>
      </div>
    );
  }

  // Robotics: Scrolling Grid
  if (category === 'Robotics') {
    return (
      <div className="absolute inset-0 z-0 opacity-20">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#00F0FF_1px,transparent_1px),linear-gradient(to_bottom,#00F0FF_1px,transparent_1px)] bg-[size:40px_40px] animate-grid-scroll"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black"></div>
      </div>
    );
  }
  // Gaming: Glitch/Noise
  if (category === 'Gaming') {
    return (
      <div className="absolute inset-0 z-0 opacity-20 overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-30 animate-noise"></div>
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-[#E661FF]/20 to-[#00F0FF]/20 mix-blend-overlay"></div>
        <div className="absolute w-[200%] h-[10px] bg-[#E661FF]/50 top-1/4 animate-scan-fast blur-md"></div>
        <div className="absolute w-[200%] h-[5px] bg-[#00F0FF]/50 bottom-1/3 animate-scan-fast-reverse blur-md"></div>
      </div>
    );
  }
  // Aerial: Sky/Flow
  if (category === 'Aerial') {
    return (
      <div className="absolute inset-0 z-0 opacity-20">
        <div className="absolute inset-0 bg-gradient-to-b from-[#00F0FF]/10 to-transparent"></div>
        {/* Simulated Clouds/Wind with moving gradients */}
        <div className="absolute -inset-[100%] bg-[radial-gradient(circle,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:20px_20px] animate-wind-flow"></div>
      </div>
    );
  }
  // Data/Innovation: Particles/Nodes
  if (category === 'Innovation' || category === 'Seminar') {
    return (
      <div className="absolute inset-0 z-0 opacity-30">
        <div className="absolute inset-0 bg-[radial-gradient(#FFD700_1px,transparent_1px)] bg-[size:20px_20px] opacity-30"></div>
        <div className="absolute inset-0 bg-gradient-radial from-[#FFD700]/10 to-transparent animate-pulse"></div>
      </div>
    );
  }
  // Defence: Radar/Hazard
  if (category === 'Defence' || category === 'Exhibition') {
    return (
      <div className="absolute inset-0 z-0 opacity-20">
        <div className="absolute inset-0 bg-[repeating-linear-gradient(45deg,transparent,transparent_10px,#FF003C_10px,#FF003C_11px)] opacity-10"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,black_100%)]"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] h-[150%] border-t-2 border-[#FF003C]/50 rounded-full animate-radar-spin mask-image-radar"></div>
      </div>
    )
  }

  // Default
  return <div className="absolute inset-0 z-0 bg-zinc-900/50"></div>;
};

// --- Internal Component: EventCard ---
const EventCard = ({ event, index }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('about');
  const router = useRouter();

  // Preload audio (using local file path if available, or placeholder)
  const playOpenSound = useAudio('/audio.wav', 0.1);
  const playCloseSound = useAudio('/audio.wav', 0.1);

  const handleOpen = () => {
    setActiveTab('about');
    setIsHovered(true);
    setIsLoading(true);
    playOpenSound();
    setTimeout(() => {
      setIsLoading(false);
      setShowDetails(true);
    }, 600);
  };

  const handleClose = (e) => {
    e.stopPropagation();
    playCloseSound();
    setShowDetails(false);
    setIsHovered(false);
    setIsLoading(false);
  };

  const Icon = event.icon;

  return (
    <div className="relative group cursor-crosshair h-full" onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)} onClick={handleOpen}>
      {/* Main Preview Card */}
      <div
        className="relative p-8 border-l-4 border-t border-[#00F0FF]/30 transition-all duration-500 overflow-hidden h-full flex flex-col justify-between bg-black/80 backdrop-blur-md"
        style={{ clipPath: 'polygon(0 0, 92% 0, 100% 8%, 100% 100%, 8% 100%, 0 92%)' }}
      >
        {/* Animated Background Layer */}
        <CardBackground category={event.category} image={event.image} />

        {/* Hover Overlay */}
        <div className={`absolute inset-0 bg-[#00F0FF]/10 z-0 transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`} />

        {/* Content Layer (z-10 to stay above bg) */}
        <div className="relative z-10 flex flex-col h-full">
          <div className="flex justify-between items-start mb-6">
            <div className="w-12 h-12 border border-[#00F0FF]/40 flex items-center justify-center bg-black/50 text-[#00F0FF] shadow-[0_0_15px_rgba(0,240,255,0.2)] backdrop-blur-sm">
              <Icon size={24} />
            </div>
            <span className="text-[#00F0FF] font-mono text-[10px] opacity-70 tracking-widest uppercase bg-black/50 px-2 py-1">
              [{event.category}]
            </span>
          </div>

          <h3 className="text-2xl font-black text-white mb-3 font-orbitron tracking-tighter uppercase group-hover:text-[#00F0FF] transition-colors drop-shadow-md">
            {event.title}
          </h3>

          <p className="text-gray-400 font-mono text-xs leading-relaxed uppercase mb-6 line-clamp-2 drop-shadow-sm">
            {event.desc}
          </p>

          <div className="flex justify-between items-center pt-4 border-t border-white/10 mt-auto">
            <span className="text-[#00F0FF] font-mono text-xs font-bold drop-shadow-md">{event.prize}</span>
            <span className="text-white font-mono text-[9px] opacity-60 group-hover:opacity-100 transition-opacity underline">VIEW_SPECS</span>
          </div>
        </div>

        {/* Grid Scan Effect (Overlay) */}
        {isHovered && <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#00F0FF]/20 to-transparent h-[20%] w-full animate-scan pointer-events-none z-20" />}
      </div>

      {/* FULL SCREEN MISSION BRIEFING DIALOG */}
      {(isLoading || showDetails) && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-2 md:p-4 lg:p-12 pointer-events-none">
          <div className="absolute inset-0 bg-black/95 backdrop-blur-xl" />

          <div
            className="relative w-full max-w-sm md:max-w-3xl lg:max-w-5xl bg-[#050505] border border-[#FF003C] p-1 shadow-[0_0_80px_rgba(255,0,60,0.4)] pointer-events-auto overflow-hidden animate-glitch-entry"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header Status Bar */}
            <div className="bg-[#FF003C] text-black px-3 md:px-6 py-2 flex justify-between items-center font-mono text-[9px] md:text-[11px] font-black uppercase tracking-widest">
              <div className="flex gap-2 md:gap-4">
                <span className="animate-pulse">● MISSION_INTEL: {event.id.toUpperCase()}</span>
              </div>
              {/* Desktop Close Button */}
              <button onClick={handleClose} className="hidden md:block hover:bg-black hover:text-[#FF003C] px-2 md:px-4 py-1 transition-all border border-black font-bold text-[8px] md:text-[11px]">
                [ CLOSE ]
              </button>
            </div>

            <div className="p-4 md:p-8 lg:p-16 max-h-[60vh] md:max-h-[70vh] overflow-y-auto custom-scrollbar">
              {isLoading ? (
                <div className="h-[450px] flex flex-col items-center justify-center space-y-6">
                  <div className="w-1 bg-[#FF003C] h-24 animate-pulse" />
                  <p className="text-[#FF003C] font-mono text-xl animate-pulse tracking-[0.7em] font-black uppercase">Retrieving Ruleset...</p>
                </div>
              ) : (
                <div className="flex flex-col md:flex-row gap-8 h-full">
                  {/* Left Side: Navigation & Quick Stats */}
                  <div className="w-full md:w-1/3 flex flex-col gap-6">
                    <div className="aspect-video bg-zinc-950 border border-[#FF003C]/30 relative flex items-center justify-center p-6 overflow-hidden">
                      {event.image ? (
                        <Image src={event.image} alt={event.title} fill className="object-cover opacity-80" />
                      ) : (
                        <Icon size={60} className="text-[#FF003C] opacity-80 relative z-10" />
                      )}
                      <div className="absolute inset-0 border-[20px] border-transparent border-t-[#FF003C]/5 border-l-[#FF003C]/5 z-20" />
                    </div>

                    <div className="flex flex-col gap-2">
                      <button
                        onClick={() => setActiveTab('about')}
                        className={`px-4 py-3 text-left font-mono text-xs font-bold uppercase tracking-wider border-l-2 transition-all ${activeTab === 'about' ? 'border-[#00F0FF] bg-[#00F0FF]/10 text-[#00F0FF]' : 'border-zinc-800 text-zinc-500 hover:text-zinc-300 hover:border-zinc-600'}`}
                      >
                          // About_Event
                      </button>
                      <button
                        onClick={() => setActiveTab('rules')}
                        className={`px-4 py-3 text-left font-mono text-xs font-bold uppercase tracking-wider border-l-2 transition-all ${activeTab === 'rules' ? 'border-[#FF003C] bg-[#FF003C]/10 text-[#FF003C]' : 'border-zinc-800 text-zinc-500 hover:text-zinc-300 hover:border-zinc-600'}`}
                      >
                          // Rules_&_Regs
                      </button>
                      <button
                        onClick={() => setActiveTab('register')}
                        className={`px-4 py-3 text-left font-mono text-xs font-bold uppercase tracking-wider border-l-2 transition-all ${activeTab === 'register' ? 'border-[#E661FF] bg-[#E661FF]/10 text-[#E661FF]' : 'border-zinc-800 text-zinc-500 hover:text-zinc-300 hover:border-zinc-600'}`}
                      >
                          // Register_Combat
                      </button>
                    </div>
                  </div>

                  {/* Right Side: Dynamic Content */}
                  <div className="w-full md:w-2/3 bg-white/5 border border-white/10 p-6 md:p-8 min-h-[300px] relative">
                    {/* About Tab */}
                    {activeTab === 'about' && (
                      <div className="space-y-6 animate-glitch-entry">
                        <h4 className="text-3xl font-black text-white font-orbitron uppercase tracking-tighter leading-tight">
                          {event.title}
                        </h4>
                        <div className="h-1 w-20 bg-[#00F0FF]" />
                        <p className="text-zinc-400 font-mono text-sm leading-relaxed">
                          {event.desc}
                        </p>
                        <div className="grid grid-cols-2 gap-4 mt-4">
                          <div className="p-3 border border-[#00F0FF]/20 bg-[#00F0FF]/5">
                            <p className="text-zinc-500 text-[10px] uppercase mb-1">Squad Size</p>
                            <p className="text-[#00F0FF] font-bold font-mono text-sm">{event.teamSize}</p>
                          </div>
                          <div className="p-3 border border-[#00F0FF]/20 bg-[#00F0FF]/5">
                            <p className="text-zinc-500 text-[10px] uppercase mb-1">Bounty</p>
                            <p className="text-[#00F0FF] font-bold font-mono text-sm">{event.prize}</p>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Rules Tab */}
                    {activeTab === 'rules' && (
                      <div className="space-y-6 animate-glitch-entry">
                        <h4 className="text-2xl font-black text-[#FF003C] font-orbitron uppercase tracking-tight flex items-center gap-3">
                          <Shield size={24} /> Engagement_Protocol
                        </h4>
                        <div className="space-y-3">
                          {event.rules.map((rule, i) => (
                            <div key={i} className="flex gap-4 p-3 bg-black/40 border-l border-[#FF003C]/30 hover:bg-[#FF003C]/5 transition-colors">
                              <span className="text-[#FF003C] font-mono font-bold text-xs">0{i + 1}.</span>
                              <p className="text-zinc-300 font-mono text-xs leading-relaxed">{rule}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Register Tab */}
                    {activeTab === 'register' && (
                      <div className="flex flex-col items-center justify-center h-full text-center space-y-6 animate-glitch-entry py-8">
                        <Rocket size={48} className="text-[#E661FF] animate-bounce" />
                        <div>
                          <h4 className="text-2xl font-black text-white font-orbitron uppercase mb-2">
                            Ready for Deployment?
                          </h4>
                          <p className="text-zinc-400 font-mono text-xs max-w-xs mx-auto">
                            Initialize your squad registration sequence. Slots are filling up fast.
                          </p>
                        </div>
                        <Link href={`/register?eventId=${event.id}`}>
                          <button
                            className="w-full max-w-xs py-4 bg-[#E661FF] text-black font-black font-orbitron tracking-widest hover:bg-white transition-colors uppercase text-sm flex items-center justify-center gap-2"
                            style={{ clipPath: 'polygon(0 0, 95% 0, 100% 30%, 100% 100%, 5% 100%, 0 70%)' }}>
                            <Zap size={16} /> REGISTER_NOW
                          </button>
                        </Link>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Mobile Close Button at Bottom */}
              <div className="md:hidden border-t border-[#FF003C]/30 p-4 mt-8">
                <button
                  onClick={handleClose}
                  className="w-full bg-[#FF003C] text-black py-3 font-black font-mono text-xs uppercase tracking-widest hover:bg-[#FF003C]/80 transition-all"
                >
                  [ CLOSE ]
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// --- Main Page ---
export default function EventsPage() {
  return (
    <main className="min-h-screen bg-black text-white relative overflow-hidden">
      <MatrixBackground color="#003B00" />

      <div className="relative z-10 pt-40 pb-32 container mx-auto px-4 md:px-8">
        {/* Page Header */}
        <div className="mb-20 text-center">
          <div className="flex items-center justify-center gap-2 md:gap-4 mb-4">
            <div className="h-[2px] w-12 md:w-20 bg-[#00F0FF]" />
            <span className="text-[#00F0FF] font-mono text-xs md:text-sm font-bold tracking-[0.2em] md:tracking-[0.4em] uppercase">SYSTEM_ARENA_INITIALIZED</span>
          </div>
          <h1 className="text-6xl md:text-9xl font-black font-orbitron tracking-tighter uppercase leading-[0.8] mb-8">
            {/* Multi-layered Glitch Effect on EVENT */}
            <div className="relative inline-block glitch-container">
              {/* Red glitch layer */}
              <span className="absolute top-0 left-0 text-[#FF003C] mix-blend-screen opacity-70 glitch-layer-red" style={{ transform: 'translate(-0.02em, 0.02em)' }}>
                EVENT
              </span>
              {/* Cyan glitch layer */}
              <span className="absolute top-0 left-0 text-[#00F0FF] mix-blend-screen opacity-60 glitch-layer-cyan" style={{ transform: 'translate(0.03em, -0.02em)' }}>
                EVENT
              </span>
              {/* Main white layer */}
              <span className="relative text-white">
                EVENT
              </span>
            </div>
            <br />
            <div className="flex justify-center w-full">
              <SlotText text="ARENA_" className="text-6xl md:text-9xl" />
            </div>
          </h1>
          <p className="text-zinc-500 text-lg font-mono max-w-2xl mx-auto border-l-2 border-[#00F0FF] pl-6 py-2 bg-gradient-to-r from-[#00F0FF]/5 to-transparent mt-8">
            Choose your battlefield. Engage in high-precision robotics, aerial maneuvers, or digital warfare.
          </p>
        </div>

        {/* Dynamic Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {events.map((event, i) => (
            <EventCard 
                key={event.id} 
                event={event} 
                index={i} 
            />
          ))}
        </div>
      </div>

      <style jsx global>{`
        @keyframes scan { 0% { top: -20%; } 100% { top: 120%; } }
        .animate-scan { position: absolute; animation: scan 2s linear infinite; }
        @keyframes glitch-entry {
          0% { opacity: 0; transform: scale(0.97) skewX(-4deg); filter: brightness(2); }
          50% { opacity: 1; transform: scale(1.03) skewX(2deg); filter: brightness(1.2); }
          100% { transform: scale(1) skewX(0); filter: brightness(1); }
        }
        .animate-glitch-entry { animation: glitch-entry 0.4s ease-out forwards; }
        
        .glitch-container {
          animation: glitch-skew 3s infinite;
        }
        @keyframes glitch-skew {
          0%, 100% { transform: skew(0deg); }
          20% { transform: skew(0deg); }
          21% { transform: skew(-0.6deg); }
          22% { transform: skew(0deg); }
          60% { transform: skew(0deg); }
          61% { transform: skew(0.6deg); }
          62% { transform: skew(0deg); }
        }
        
        .glitch-layer-red {
          animation: glitch-clip-red 2.5s infinite;
        }
        .glitch-layer-cyan {
          animation: glitch-clip-cyan 2s infinite;
        }
        
        @keyframes glitch-clip-red {
          0%, 100% { clip-path: inset(0 0 0 0); }
          10% { clip-path: inset(0 0 0 0); }
          11% { clip-path: inset(22% 0 58% 0); }
          12% { clip-path: inset(0 0 0 0); }
          50% { clip-path: inset(0 0 0 0); }
          51% { clip-path: inset(42% 0 28% 0); }
          52% { clip-path: inset(0 0 0 0); }
        }
        
        @keyframes glitch-clip-cyan {
          0%, 100% { clip-path: inset(0 0 0 0); }
          15% { clip-path: inset(0 0 0 0); }
          16% { clip-path: inset(32% 0 48% 0); }
          17% { clip-path: inset(0 0 0 0); }
          65% { clip-path: inset(0 0 0 0); }
          66% { clip-path: inset(12% 0 68% 0); }
          67% { clip-path: inset(0 0 0 0); }
        }

        @keyframes grid-scroll {
            0% { background-position: 0 0; }
            100% { background-position: 40px 40px; }
        }
        .animate-grid-scroll { animation: grid-scroll 2s linear infinite; }

        @keyframes wind-flow {
            0% { transform: translateY(0) rotate(0deg); opacity: 0.2; }
            50% { opacity: 0.5; }
            100% { transform: translateY(-20px) rotate(5deg); opacity: 0.2; }
        }
        .animate-wind-flow { animation: wind-flow 10s ease-in-out infinite alternate; }

        @keyframes radar-spin {
            from { transform: translate(-50%, -50%) rotate(0deg); }
            to { transform: translate(-50%, -50%) rotate(360deg); }
        }
        .animate-radar-spin { animation: radar-spin 4s linear infinite; }

        @keyframes scan-fast { 0% { top: -10%; } 100% { top: 110%; } }
        .animate-scan-fast { animation: scan-fast 1s linear infinite; }
        .animate-scan-fast-reverse { animation: scan-fast 1.5s linear infinite reverse; }

        @keyframes noise { 0% { transform: translate(0,0); } 10% { transform: translate(-5%,-5%); } 20% { transform: translate(-10%,5%); } 30% { transform: translate(5%,-10%); } 40% { transform: translate(-5%,15%); } 50% { transform: translate(-10%,5%); } 60% { transform: translate(15%,0); } 70% { transform: translate(0,10%); } 80% { transform: translate(-15%,0); } 90% { transform: translate(10%,5%); } 100% { transform: translate(5%,0); } }
        .animate-noise { animation: noise 2s steps(10) infinite; }

        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.05);
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #FF003C;
          border-radius: 10px;
        }
      `}</style>
    </main>
  );
}
