"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Loading from "./components/Loading";
import Hero from "./components/Hero";
import MatrixBackground from "./components/MatrixBackground";

export default function Home() {
  const [phase, setPhase] = useState<'loading' | 'intro'>('loading');
  const router = useRouter();

  useEffect(() => {
    // Phase 1: Loading Screen (3 seconds)
    if (phase === 'loading') {
      const timer = setTimeout(() => {
        setPhase('intro');
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [phase]);

  return (
    <main className="relative min-h-screen w-full flex flex-col items-center justify-center overflow-hidden">
        {phase === 'loading' && <Loading />}
        
        {phase === 'intro' && (
           <>
             {/* Matrix Background (Red/Granting Access) */}
             <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0 }}>
               <MatrixBackground color="#FF0000" text="STATUS: GRANTING ACCESS TO THE TERMINAL" />
             </div>
             <Hero onComplete={() => router.push('/home')} />
           </>
        )}
    </main>
  );
}
