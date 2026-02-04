import React from 'react';

const AboutUs = () => {
  return (
    // min-h-screen ensures it takes full height, py-20 adds breathing room for mobile
    <div className="min-h-screen bg-[#020617] text-white flex flex-col items-center justify-center relative overflow-hidden font-sans py-12 md:py-20">

      {/* Background Glow Effects */}
      <div className="absolute top-[-10%] left-[-10%] w-64 h-64 md:w-96 md:h-96 bg-green-900/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-64 h-64 md:w-96 md:h-96 bg-emerald-900/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">

        {/* HEADER SECTION - Text changed to White */}
        <div className="text-center mb-12 md:mb-20">
          <h2 className="text-4xl md:text-7xl font-black text-white tracking-[0.2em] uppercase drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]">
            About Us
          </h2>
          {/* Accent line under About Us */}
          <div className="h-[2px] w-24 bg-green-500 mx-auto mt-4 shadow-[0_0_10px_#22c55e]"></div>
        </div>

        {/* CONTENT GRID: Stacks on mobile, side-by-side on desktop */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-10 md:gap-16 lg:gap-20">

          {/* LEFT SIDE: TEXT CONTENT */}
          <div className="w-full md:w-1/2 space-y-6 text-center md:text-left order-2 md:order-1">
            <div className="space-y-2">
              <p className="text-green-500 font-bold tracking-[0.3em] uppercase text-xs md:text-sm">
                UIET CSJM University Techfest
              </p>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white tracking-tight leading-tight">
                ROBO RUMBLE <span className="text-green-500 drop-shadow-[0_0_10px_rgba(34,197,94,0.6)]">'26</span>
              </h1>
              {/* Divider Line (Green) - Centered on mobile, left on desktop */}
              <div className="w-20 h-1.5 bg-green-600 mx-auto md:mx-0 mt-4 rounded-full shadow-[0_0_10px_#16a34a]"></div>
            </div>

            {/* Main Paragraph - Adjusted for better mobile reading */}
            <p className="text-gray-300 text-sm md:text-base lg:text-lg leading-relaxed text-center md:text-justify max-w-2xl mx-auto md:mx-0">
              Robo Rumble is the flagship technical fest of <span className="text-white font-semibold">UIET, CSJM University</span>.
              It is a battleground where metal meets mind, bringing together the finest innovators across the country to push the boundaries of robotics.
            </p>

            {/* Second Paragraph */}
            <div className="pt-2 sm:pt-4">
              <h3 className="text-lg md:text-xl font-bold text-white mb-2 uppercase tracking-widest">
                Empyrean Technogenesis
              </h3>
              <p className="text-gray-400 text-xs md:text-sm lg:text-base leading-relaxed text-center md:text-justify max-w-2xl mx-auto md:mx-0">
                From high-octane robot wars to complex autonomous challenges, Robo Rumble '26 symbolizes the fusion of
                human intellect and advanced systems. Join us in this mechanical odyssey.
              </p>
            </div>
          </div>

          {/* RIGHT SIDE: LOGO / IMAGE */}
          <div className="w-full md:w-1/2 lg:w-1/3 flex justify-center items-center relative order-1 md:order-2">
            {/* Pulsing Background Glow for Logo */}
            <div className="absolute inset-0 bg-green-500/20 blur-[60px] md:blur-[100px] rounded-full animate-pulse" />

            <div className="relative z-10 p-2 border-2 border-green-500/30 rounded-2xl backdrop-blur-sm">
              <img
                src="images/robo--logo.jpeg"
                alt="Robo Rumble Logo"
                className="w-48 sm:w-64 md:w-full max-w-[400px] rounded-xl object-contain drop-shadow-[0_0_20px_rgba(34,197,94,0.4)] hover:scale-105 transition-transform duration-500 ease-out"
              />
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default AboutUs;