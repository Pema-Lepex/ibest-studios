import type { Metadata } from "next";
import About from "@/components/About";
import Contact from "@/components/Contact";
import Cursor from "@/components/Cursor";
import Nav from "@/components/Nav";
import PageHeader from "@/components/PageHeader";
import Providers from "@/components/Providers";
import VideoModal from "@/components/VideoModal";

export const metadata: Metadata = {
  title: "Our story — iBEST Studios",
  description:
    "iBEST Studios is a multimedia production company in Thimphu, Bhutan, founded in 2014 by Tharchen — animation, film, VFX, design, writing and music.",
};

export default function AboutPage() {
  return (
    <Providers intro={false}>
      <Nav />
      <main>
        <PageHeader eyebrow="Our story" title="Ideas for generations," accent="since 2014.">
          The people, values and journey behind Bhutan&apos;s home of animation and film.
        </PageHeader>
        <About />
      </main>
      <Contact />
      <VideoModal />
      <Cursor />
    </Providers>
  );
}
