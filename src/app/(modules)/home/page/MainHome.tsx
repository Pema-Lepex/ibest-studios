"use client";

import HeroSection from "./section/HeroSection";
import OurStorySection from "./section/OurStorySection";
import ServiceSection from "../../service/page/section/ServiceSection";
import OurWorksSection from "./section/OurWorksSection";
import RecentNewsSection from "./section/RecentNewsSection";

const MainHome: React.FC = () => {
  return (
    <>
      <HeroSection />
      <OurStorySection />
      <ServiceSection />
      <OurWorksSection />
      <RecentNewsSection />
    </>
  );
};

export default MainHome;
