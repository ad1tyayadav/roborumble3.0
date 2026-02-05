import Image from "next/image";
import HeroSection from "../../components/HeroSection";
import HeroSectionNew from "../../components/HeroSectionNew";
import AboutUs from "../../components/Home/AboutUs";
import EventsSection from "../../components/Home/EventSection";
import Sponsors from "../../components/Home/Sponors";

export default function Home() {
  return (
    <main className="flex flex-col min-h-screen bg-[#01020a]">
      <HeroSection />
      {/* <HeroSectionNew /> */}

      <div className="relative z-20">
        <AboutUs />
        <EventsSection />
        <Sponsors />

      </div>

    </main>

  );
}
