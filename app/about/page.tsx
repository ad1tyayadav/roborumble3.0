"use client";

import { useState, useEffect } from "react";
import MatrixBackground from "../components/MatrixBackground";
import { SlotText } from "../components/SlotText";
import Footer from "../components/Footer";
import { useAudio } from "../hooks/useAudio";

// --- Types ---
interface CardData {
  title: string;
  icon: string;
  shortDesc: string;
  fullDesc: string;
  specs: string[];
}

// --- Internal Component: AboutCard ---
const AboutCard = ({ data, delay }: { data: CardData; delay: number }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Preload audio
  const playOpenSound = useAudio('audio.wav', 0.15);
  const playCloseSound = useAudio('audio.wav', 0.15);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const handleClick = () => {
    if (showDetails || isLoading) return; // Prevent re-opening
    setIsLoading(true);
    playOpenSound();
    
    setTimeout(() => {
      setIsLoading(false);
      setShowDetails(true);
    }, 600);
  };

  const handleClose = (e: React.MouseEvent) => {
    e.stopPropagation();
    playCloseSound();
    setShowDetails(false);
    setIsHovered(false);
    setIsLoading(false);
  };

  return (
    <div 
      className="relative group cursor-pointer" 
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Main Preview Card */}
      <div 
        className="relative p-8 bg-black/40 border-l-4 border-t border-[#00F0FF]/50 hover:bg-[#00F0FF]/10 transition-all duration-500 backdrop-blur-sm h-full"
        style={{ clipPath: 'polygon(0 0, 90% 0, 100% 10%, 100% 100%, 10% 100%, 0 90%)' }}
      >
        <div className="text-[#00F0FF] font-mono text-[10px] mb-4 opacity-50 tracking-tighter uppercase">
          // SUBJECT_ID: {data.title.replace(/\s+/g, '_')}
        </div>
        <div className="w-14 h-14 mb-6 border border-[#00F0FF]/40 flex items-center justify-center bg-[#00F0FF]/10 text-3xl shadow-[0_0_15px_rgba(0,240,255,0.2)]">
          {data.icon}
        </div>
        <h3 className="text-2xl font-black text-white mb-4 font-mono tracking-tighter uppercase group-hover:text-[#00F0FF] transition-colors">
          {data.title}
        </h3>
        <p className="text-gray-500 font-mono text-xs leading-relaxed uppercase">
          {data.shortDesc}
        </p>
        {isHovered && <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#00F0FF]/20 to-transparent h-[20%] w-full animate-scan pointer-events-none" />}
      </div>

      {/* Expanded Large Dialog Box */}
      {(isLoading || showDetails) && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-2 md:p-4 lg:p-12 pointer-events-none">
          <div className="absolute inset-0 bg-black/95 backdrop-blur-xl" />
          
          <div className="relative w-full max-w-sm md:max-w-3xl lg:max-w-5xl bg-[#050505] border border-[#FF003C] p-1 shadow-[0_0_80px_rgba(255,0,60,0.4)] pointer-events-auto overflow-hidden animate-glitch-entry">
            {/* Top Red Status Bar */}
            <div className="bg-[#FF003C] text-black px-3 md:px-6 py-2 flex justify-between items-center font-mono text-[9px] md:text-[11px] font-black uppercase tracking-widest">
              <div className="flex gap-2 md:gap-4">
                <span className="animate-pulse">● ACCESSING_CORE_DATA</span>
                <span className="hidden md:inline">NODE_DECRYPTED</span>
              </div>
              {/* Desktop Close Button */}
              <button onClick={handleClose} className="hidden md:block hover:bg-black hover:text-[#FF003C] px-2 md:px-4 py-1 transition-all border border-black font-bold text-[8px] md:text-[11px]">
                [ CLOSE ]
              </button>
            </div>

            <div className="p-4 md:p-8 lg:p-16 max-h-[60vh] md:max-h-[70vh] overflow-y-auto">
              {isLoading ? (
                <div className="h-[400px] flex flex-col items-center justify-center space-y-6">
                  <div className="w-1 bg-[#FF003C] h-24 animate-pulse" />
                  <p className="text-[#FF003C] font-mono text-xl animate-pulse tracking-[0.7em] font-black">DECRYPTING...</p>
                </div>
              ) : (
                <div className="grid md:grid-cols-2 gap-16">
                  <div className="space-y-8">
                    <div className="aspect-video bg-zinc-950 border border-[#FF003C]/30 relative flex items-center justify-center group overflow-hidden">
                       <span className="text-9xl opacity-20 filter blur-[2px]">{data.icon}</span>
                       <div className="absolute inset-0 border-[30px] border-transparent border-t-[#FF003C]/5 border-l-[#FF003C]/5" />
                    </div>
                    <div className="grid grid-cols-2 gap-6 font-mono text-[8px] md:text-[10px]">
                      <div className="p-4 border border-[#FF003C]/20 bg-red-950/5">
                        <p className="text-zinc-600 mb-1">STATUS</p>
                        <p className="text-[#FF003C] font-bold">VERIFIED</p>
                      </div>
                      <div className="p-4 border border-[#FF003C]/20 bg-red-950/5">
                        <p className="text-zinc-600 mb-1">SECURITY</p>
                        <p className="text-[#FF003C] font-bold">LEVEL_4</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col">
                    <h4 className="text-3xl md:text-4xl lg:text-5xl font-black text-white font-mono mb-4 uppercase tracking-tighter">
                      {data.title}
                    </h4>
                    <div className="h-1.5 w-32 bg-[#FF003C] mb-8" />
                    <p className="text-zinc-400 font-mono text-xs md:text-sm lg:text-base leading-relaxed mb-10 first-letter:text-3xl first-letter:text-[#FF003C]">
                      {data.fullDesc}
                    </p>
                    <div className="mt-auto pt-8 border-t border-zinc-900">
                      <h5 className="text-[#00F0FF] font-mono text-[8px] md:text-[10px] mb-4 uppercase tracking-[0.3em] font-bold">Protocol Specs:</h5>
                      <div className="grid grid-cols-1 gap-2">
                        {data.specs.map((spec, i) => (
                          <div key={i} className="text-zinc-500 font-mono text-[10px] md:text-xs flex gap-2">
                            <span className="text-[#FF003C]">/</span> {spec}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}
              
              {/* Mobile Close Button at Bottom */}
              <div className="md:hidden border-t border-[#FF003C]/30 p-4">
                <button 
                  onClick={handleClose}
                  className="w-full bg-[#FF003C] text-black py-3 font-black font-mono text-xs uppercase tracking-widest hover:bg-[#FF003C]/80 transition-all"
                >
                  [ CLOSE ]
                </button>
              </div>
            </div>
            <div className="absolute bottom-0 w-full p-2 text-[7px] text-zinc-800 font-mono flex justify-between">
              <span>EST_CONN: 0x882.11</span>
              <span>ROBO_RUMBLE_v3.0_SECURE</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// --- Default Export: AboutPage ---
export default function AboutPage() {
  const cards: CardData[] = [
    {
      title: "OUR MISSION",
      icon: "🎯",
      shortDesc: "Foster innovation and hands-on engineering excellence",
      fullDesc: "To foster a culture of innovation and hands-on engineering among students, providing a platform to test their skills against the best. We believe in learning by doing, competing by creating, and evolving through collaboration.",
      specs: ["Neural-Net Integration", "Collaborative Frameworks", "Peer-to-Peer Benchmarking"]
    },
    {
      title: "THE TECHNOLOGY",
      icon: "⚡",
      shortDesc: "Cutting-edge robotics, AI, IoT, and embedded systems",
      fullDesc: "Focusing on autonomous robotics, IoT, AI, and embedded systems. We celebrate cutting-edge tech in every event. From line-following bots to AI-powered autonomous systems, we push the boundaries of what's possible.",
      specs: ["NVIDIA Jetson Edge", "RTK-GPS Navigation", "Low-Latency Telemetry"]
    },
    {
      title: "FUTURE VISION",
      icon: "🚀",
      shortDesc: "Building tomorrow's makers and problem solvers",
      fullDesc: "Building a community of makers and problem solvers who will drive the technological advancements of tomorrow. We're not just organizing events; we're cultivating the next generation of engineers and innovators.",
      specs: ["Incubation Program", "Industry 5.0 Alignment", "Sustainable Prototyping"]
    }
  ];

  return (
    <main className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Background Matrix Effect */}
      <MatrixBackground color="#043352ff" text="" />
      
      {/* Navbar Overlay */}

      <div className="relative z-10 pt-40 pb-20 container mx-auto px-4 md:px-8">
        {/* Page Header */}
        <div className="mb-20 text-center">
          <div className="flex items-center justify-center gap-4 mb-4">
             <div className="h-[2px] w-20 bg-[#FF003C]" />
             <span className="text-[#FF003C] font-mono text-xs md:text-sm font-bold tracking-[0.2em] md:tracking-[0.4em] uppercase">INITIATING_ARCHIVE_RECALL</span>
          </div>
          <h1 className="text-4xl md:text-6xl lg:text-8xl font-black font-mono tracking-tighter uppercase leading-[0.85] mb-8 break-words">
            {/* Multi-layered Glitch Effect - Simplified */}
            <div className="relative inline-block glitch-container">
              {/* Red glitch layer */}
              <span className="absolute top-0 left-0 text-[#FF003C] mix-blend-screen opacity-70 glitch-layer-red" style={{ transform: 'translate(-0.02em, 0.02em)' }}>
                ABOUT THE
              </span>
              {/* Cyan glitch layer */}
              <span className="absolute top-0 left-0 text-[#00F0FF] mix-blend-screen opacity-60 glitch-layer-cyan" style={{ transform: 'translate(0.03em, -0.02em)' }}>
                ABOUT THE
              </span>
              {/* Main white layer */}
              <span className="relative text-white">
                ABOUT THE
              </span>
            </div>
            <br />
            <div className="flex justify-center w-full">
              <SlotText text="LEGACY_" className="text-4xl md:text-6xl lg:text-8xl" />
            </div>
          </h1>
          <div className="max-w-2xl mx-auto">
            <p className="text-zinc-500 text-lg leading-relaxed font-mono border-l-2 border-[#FF003C] pl-6 py-2 bg-gradient-to-r from-[#FF003C]/5 to-transparent">
              Robo Rumble evolved from a local collegiate meet into a premier technology frontier. 
              Now in its third cycle, we explore the intersection of human creativity and robotic precision.
            </p>
          </div>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-32">
          {cards.map((card, i) => (
            <AboutCard key={i} data={card} delay={i * 0.2} />
          ))}
        </div>

        {/* Timeline Summary */}
        <div className="bg-zinc-950/50 border border-white/5 p-6 md:p-10 lg:p-16 backdrop-blur-xl relative overflow-hidden"
             style={{ clipPath: 'polygon(40px 0, 100% 0, 100% calc(100% - 40px), calc(100% - 40px) 100%, 0 100%, 0 40px)' }}>
          <div className="relative z-10 grid md:grid-cols-2 gap-8 md:gap-16 items-center">
            <div className="space-y-4 md:space-y-6 text-center md:text-left">
              <h3 className="text-2xl md:text-3xl lg:text-4xl font-black text-white font-mono uppercase tracking-tighter break-words">
                Engineering <span className="text-[#00F0FF]">Excellence</span> Since 2024
              </h3>
              <p className="text-zinc-500 font-mono text-xs md:text-sm leading-relaxed">
                A massive gathering of 1000+ innovators across the region.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 md:p-6 bg-zinc-900 border border-[#FF003C] text-center col-span-2">
                <div className="text-3xl md:text-4xl lg:text-5xl font-black text-white font-mono mb-2">2026</div>
                <div className="text-[10px] md:text-xs text-[#FF003C] uppercase font-black font-mono tracking-[0.3em] md:tracking-[0.5em] animate-pulse">EVOLUTION</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />

      <style jsx global>{`
        @keyframes scan { 0% { top: -20%; } 100% { top: 120%; } }
        .animate-scan { position: absolute; animation: scan 2.5s linear infinite; }
        @keyframes glitch-entry {
          0% { opacity: 0; transform: scale(0.98) skewX(-5deg); }
          50% { opacity: 1; transform: scale(1.02) skewX(2deg); }
          100% { transform: scale(1) skewX(0); }
        }
        .animate-glitch-entry { animation: glitch-entry 0.4s ease-out forwards; }
        
        /* Normal Glitch Effect */
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
      `}</style>
    </main>
  );
}