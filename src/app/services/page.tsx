import type { Metadata } from "next";
import Contact from "@/components/Contact";
import Cursor from "@/components/Cursor";
import Nav from "@/components/Nav";
import PageHeader from "@/components/PageHeader";
import Pipeline from "@/components/Pipeline";
import ProjectCta from "@/components/ProjectCta";
import Providers from "@/components/Providers";
import ServiceDetails from "@/components/ServiceDetails";
import Services from "@/components/Services";
import VideoModal from "@/components/VideoModal";

export const metadata: Metadata = {
  title: "Services — iBEST Studios",
  description:
    "2D & 3D animation, VFX, design & illustration, photography & film, content writing, visual editing, music & sound — all under one roof at iBEST Studios, Thimphu.",
};

export default function ServicesPage() {
  return (
    <Providers intro={false}>
      <Nav />
      <main>
        <PageHeader eyebrow="Services" title="Every craft," accent="under one roof.">
          Animation, film, VFX, design, writing, editing and sound — from the first line of a script to the final render.
        </PageHeader>
        <Services />
        <ServiceDetails />
        <Pipeline />
        <ProjectCta />
      </main>
      <Contact />
      <VideoModal />
      <Cursor />
    </Providers>
  );
}
