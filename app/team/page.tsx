"use client";

import { useState } from "react";
import MatrixBackground from "../components/MatrixBackground";
import { SlotText } from "../components/SlotText";
import Footer from "../components/Footer";
import Image from "next/image";
import { Linkedin, Mail, ShieldCheck, Cpu, Terminal } from "lucide-react";
import { useAudio } from "../hooks/useAudio";

// --- Types ---
interface TeamMember {
  name: string;
  role: string;
  dept: string;
  image: string;
  bio?: string;
}

// --- Internal Component: AssetCard ---
const AssetCard = ({ member, delay }: { member: TeamMember; delay: number }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Preload audio
  const playOpenSound = useAudio('audio.wav', 0.1);
  const playCloseSound = useAudio('audio.wav', 0.1);

  const handleClick = () => {
    if (showDetails || isLoading) return;
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
  };

  return (
    <div
      className="relative group cursor-crosshair"
      onClick={handleClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Asset Preview Card */}
      <div
        className="relative p-6 bg-black/40 border-l-2 border-t border-[#00F0FF]/30 hover:bg-[#00F0FF]/5 transition-all duration-500 backdrop-blur-sm h-full"
        style={{ clipPath: 'polygon(0 0, 95% 0, 100% 10%, 100% 100%, 5% 100%, 0 90%)' }}
      >
        <div className="text-[#00F0FF] font-mono text-[8px] mb-4 opacity-50 tracking-tighter uppercase">
          // ASSET_LOG: {member.name.split(' ')[0]}
        </div>

        <div className="relative w-32 h-32 mx-auto mb-6 transition-all duration-500 overflow-hidden border border-white/10 p-1">
          <Image src={member.image} alt={member.name} fill className="object-cover" />
          <div className="absolute inset-0 border border-[#00F0FF]/20 group-hover:border-[#00F0FF] transition-colors" />
        </div>

        <div className="text-center">
          <h3 className="text-xl font-black text-white font-mono uppercase tracking-tighter group-hover:text-[#00F0FF] transition-colors">
            {member.name}
          </h3>
          <p className="text-[#00F0FF] font-mono text-[10px] mt-1 font-bold tracking-widest uppercase">
            {member.role}
          </p>
        </div>

        {isHovered && <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#00F0FF]/10 to-transparent h-[20%] w-full animate-scan pointer-events-none" />}
      </div>

      {/* Profile Decryption Dialog */}
      {(isLoading || showDetails) && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-2 md:p-4 lg:p-12 pointer-events-none">
          <div className="absolute inset-0 bg-black/95 backdrop-blur-xl" />

          <div className="relative w-full max-w-sm md:max-w-3xl lg:max-w-4xl bg-[#050505] border border-[#FF003C] p-1 shadow-[0_0_80px_rgba(255,0,60,0.4)] pointer-events-auto overflow-hidden animate-glitch-entry">
            {/* Top Alert Bar */}
            <div className="bg-[#FF003C] text-black px-3 md:px-6 py-2 flex justify-between items-center font-mono text-[9px] md:text-[11px] font-black uppercase tracking-widest">
              <div className="flex gap-2 md:gap-4">
                <span className="animate-pulse">● CORE_TEAM_ASSET</span>
                <span className="hidden md:inline">ID_VERIFIED_LEVEL_A</span>
              </div>
              {/* Desktop Close Button */}
              <button onClick={handleClose} className="hidden md:block hover:bg-black hover:text-[#FF003C] px-2 md:px-4 py-1 transition-all border border-black text-[8px] md:text-[11px]">
                [ CLOSE ]
              </button>
            </div>

            <div className="p-4 md:p-8 lg:p-16 max-h-[60vh] md:max-h-[70vh] overflow-y-auto">
              {isLoading ? (
                <div className="h-[300px] flex flex-col items-center justify-center space-y-6">
                  <div className="w-1 bg-[#FF003C] h-24 animate-pulse" />
                  <p className="text-[#FF003C] font-mono text-xl animate-pulse tracking-[0.7em] font-black uppercase">Deciphering Profile...</p>
                </div>
              ) : (
                <div className="grid md:grid-cols-2 gap-12 items-center">
                  <div className="relative aspect-square w-full bg-zinc-950 border border-[#FF003C]/30 overflow-hidden group">
                    <Image src={member.image} alt={member.name} fill className="object-cover opacity-80 group-hover:opacity-100 transition-opacity" />
                    <div className="absolute inset-0 border-[30px] border-transparent border-t-[#FF003C]/5 border-l-[#FF003C]/5" />
                    <div className="absolute bottom-4 right-4 flex gap-4">
                      <Linkedin className="text-white hover:text-[#FF003C] cursor-pointer" size={20} />
                      <Mail className="text-white hover:text-[#FF003C] cursor-pointer" size={20} />
                    </div>
                  </div>

                  <div className="flex flex-col">
                    <h4 className="text-5xl font-black text-white font-mono mb-4 uppercase tracking-tighter">
                      {member.name}
                    </h4>
                    <div className="h-1.5 w-24 bg-[#FF003C] mb-8" />
                    <div className="space-y-4 font-mono">
                      <div className="flex items-center gap-3">
                        <ShieldCheck className="text-[#FF003C]" size={18} />
                        <span className="text-[#FF003C] text-sm font-bold uppercase">{member.role}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <Cpu className="text-zinc-600" size={18} />
                        <span className="text-zinc-400 text-xs">{member.dept}</span>
                      </div>
                      <p className="text-zinc-500 text-sm leading-relaxed pt-4 border-t border-zinc-900 uppercase italic">
                        Operational status: active. Coordinating robotics deployment for RR_v3.0.
                      </p>
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
            <div className="absolute bottom-0 w-full p-2 text-[7px] text-zinc-800 font-mono flex justify-between bg-zinc-950/50">
              <span>EST_CONN: 0xTEAM_{member.name.split(' ')[0].toUpperCase()}</span>
              <span>RR_SECURITY_OVERRIDE_ENABLED</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// --- Main TeamPage ---
export default function TeamPage() {
  const studentCoordinators = [
    { name: "Raju Ranjan Yadav", role: "Lead Student Coordinator", dept: "Robo Rumble Core", image: "/Raju.jpeg" },
    { name: "Devanshu Verma", role: "Technical Student Coordinator", dept: "Robo Rumble Core", image: "/devanshu.jpeg" },
    { name: "Qaaid Iqbal Badri", role: "Strategic Student Coordinator", dept: "Robo Rumble Core", image: "/qaaid.jpeg" },
    { name: "Ayush kanoujiya", role: "Student Coordinator", dept: "Robo Rumble Core", image: "/Ayush.jpeg" },
  ];

  const eventManagement = [
    { name: "Nikhil Shines", role: "Event Manager", dept: "Management", image: "/Nikhil.jpeg" },
    { name: "Mukesh Yadav", role: "Event Manager", dept: "Management", image: "/mukesh.jpeg" },
    { name: "Vaishnavi Pal", role: "Event Manager", dept: "Management", image: "/Vaishnavi2.jpeg" },
  ];

  const technicalLeads = [
    { name: "Anant Tirupati", role: "Technical Lead", dept: "Technical", image: "/skull.png" },
    { name: "Aakshant Kumar", role: "Technical Lead", dept: "Technical", image: "/skull.png" },
  ];

  const mediaPR = [
    { name: "Lucky Kumar", role: "Media PR Head", dept: "Media & PR", image: "/lucky.jpeg" },
    { name: "Mukesh Nishad", role: "Media PR Head", dept: "Media & PR", image: "/skull.png" },
  ];

  return (
    <main className="min-h-screen bg-black text-white relative overflow-hidden">
      <MatrixBackground color="#003B00" text="" />

      <div className="relative z-10 pt-40 pb-20 container mx-auto px-4 md:px-8">
        {/* Header */}
        <div className="mb-20 text-center">
          <div className="flex items-center justify-center gap-2 md:gap-4 mb-4">
            <div className="h-[2px] w-12 md:w-20 bg-[#00F0FF]" />
            <span className="text-[#00F0FF] font-mono text-xs md:text-sm font-bold tracking-[0.2em] md:tracking-[0.4em] uppercase">INITIATING_CORE_CREW_RECALL</span>
          </div>
          <h1 className="text-4xl md:text-6xl lg:text-8xl font-black font-mono tracking-tighter uppercase leading-[0.85] mb-8 break-words">
            <div className="relative inline-block glitch-container">
              <span className="absolute top-0 left-0 text-[#FF003C] mix-blend-screen opacity-70 glitch-layer-red" style={{ transform: 'translate(-0.02em, 0.02em)' }}>
                THE CREW
              </span>
              <span className="absolute top-0 left-0 text-[#00F0FF] mix-blend-screen opacity-60 glitch-layer-cyan" style={{ transform: 'translate(0.03em, -0.02em)' }}>
                THE CREW
              </span>
              <span className="relative text-white">THE CREW</span>
            </div>
            <br />
            <div className="flex justify-center w-full">
              <SlotText text="CORE_UNITS_" className="text-4xl md:text-6xl lg:text-8xl" />
            </div>
          </h1>
        </div>

        {/* Sections */}
        <div className="space-y-24">
          <section>
            <h2 className="text-xs font-mono font-bold text-white tracking-[0.5em] uppercase mb-10 border-b border-white/20 pb-4 flex items-center gap-4">
              <Terminal size={14} /> // Student_Coordinators
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
              {studentCoordinators.map((s, i) => <AssetCard key={i} member={s} delay={i * 0.1} />)}
            </div>
          </section>

          <section>
            <h2 className="text-xs font-mono font-bold text-white tracking-[0.5em] uppercase mb-10 border-b border-white/20 pb-4 flex items-center gap-4">
              <Terminal size={14} /> // Event_Management
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
              {eventManagement.map((s, i) => <AssetCard key={i} member={s} delay={i * 0.1} />)}
            </div>
          </section>

          <section>
            <h2 className="text-xs font-mono font-bold text-white tracking-[0.5em] uppercase mb-10 border-b border-white/20 pb-4 flex items-center gap-4">
              <Terminal size={14} /> // Technical_Lead
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
              {technicalLeads.map((s, i) => <AssetCard key={i} member={s} delay={i * 0.1} />)}
            </div>
          </section>

          <section>
            <h2 className="text-xs font-mono font-bold text-white tracking-[0.5em] uppercase mb-10 border-b border-white/20 pb-4 flex items-center gap-4">
              <Terminal size={14} /> // Media_&_PR
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
              {mediaPR.map((s, i) => <AssetCard key={i} member={s} delay={i * 0.1} />)}
            </div>
          </section>
        </div>
      </div>

      <Footer />

      <style jsx global>{`
        @keyframes scan { 0% { top: -20%; } 100% { top: 120%; } }
        .animate-scan { position: absolute; animation: scan 2s linear infinite; }
        @keyframes glitch-entry {
          0% { opacity: 0; transform: scale(0.98) skewX(-5deg); filter: brightness(2); }
          50% { opacity: 1; transform: scale(1.02) skewX(2deg); filter: brightness(1.2); }
          100% { transform: scale(1) skewX(0); filter: brightness(1); }
        }
        .animate-glitch-entry { animation: glitch-entry 0.4s ease-out forwards; }
        .glitch-container { animation: glitch-skew 3s infinite; }
        @keyframes glitch-skew {
          0%, 100% { transform: skew(0deg); }
          20% { transform: skew(0deg); }
          21% { transform: skew(-0.6deg); }
          22% { transform: skew(0deg); }
        }
        .glitch-layer-red { animation: glitch-clip-red 2.5s infinite; }
        .glitch-layer-cyan { animation: glitch-clip-cyan 2s infinite; }
        @keyframes glitch-clip-red {
          0%, 100% { clip-path: inset(0 0 0 0); }
          11% { clip-path: inset(22% 0 58% 0); }
          12% { clip-path: inset(0 0 0 0); }
          51% { clip-path: inset(42% 0 28% 0); }
          52% { clip-path: inset(0 0 0 0); }
        }
        @keyframes glitch-clip-cyan {
          0%, 100% { clip-path: inset(0 0 0 0); }
          16% { clip-path: inset(32% 0 48% 0); }
          17% { clip-path: inset(0 0 0 0); }
          66% { clip-path: inset(12% 0 68% 0); }
          67% { clip-path: inset(0 0 0 0); }
        }
      `}</style>
    </main>
  );
}