import Careers from "@/components/Careers";
import Contact from "@/components/Contact";
import Cursor from "@/components/Cursor";
import Educare from "@/components/Educare";
import Featured from "@/components/Featured";
import Hero from "@/components/Hero";
import Nav from "@/components/Nav";
import Providers from "@/components/Providers";
import ServicesTeaser from "@/components/ServicesTeaser";
import Testimonials from "@/components/Testimonials";
import VideoModal from "@/components/VideoModal";
import Works from "@/components/Works";

export default function Home() {
  return (
    <Providers intro={false}>
      <Nav />
      <main>
        <Hero />
        <Featured />
        <Works />
        <ServicesTeaser />
        <Educare />
        <Testimonials />
        <Careers />
      </main>
      <Contact />
      <VideoModal />
      <Cursor />
    </Providers>
  );
}
