"use Client";
import { Slider1, Slider2, Slider3, Slider15, Slider16 } from "@/assets";
import Carousel from "@/components/Carousel";
import { SlideProps } from "@/types/CommonProps";
import RecentViewSection from "./section/RecentViewSection";

const MainHome: React.FC = () => {
  const slides: SlideProps[] = [
    { id: 1, img: Slider1, title: "Beautiful Landscape" },
    { id: 2, img: Slider2, title: "City Night Lights" },
    { id: 3, img: Slider3, title: "Mountain Adventure" },
    { id: 4, img: Slider15, title: "Mountain Adventure" },
    { id: 5, img: Slider16, title: "Mountain Adventure" },
  ];
  return (
    <div>
      <section className="relative space-y-4" id="about-carousel">
        <Carousel slides={slides} />
      </section>
      <RecentViewSection/>
    </div>
  );
};
export default MainHome;
