import React from "react";
import HeroSection from "@/components/home/HeroSection";
import PowerSection from "@/components/home/PowerSection";
import ServicesSection from "@/components/home/ServicesSection";
import TeamSection from "@/components/home/TeamSection";
import CTASection from "@/components/home/CTASection";

const Home = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <HeroSection />
      <PowerSection />
      <ServicesSection />
      <TeamSection />
      <CTASection />
    </div>
  );
};

export default Home;
