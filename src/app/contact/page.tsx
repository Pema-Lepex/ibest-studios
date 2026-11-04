import type { Metadata } from "next";
import Contact from "@/components/Contact";
import ContactDetails from "@/components/ContactDetails";
import Cursor from "@/components/Cursor";
import Nav from "@/components/Nav";
import PageHeader from "@/components/PageHeader";
import Providers from "@/components/Providers";
import VideoModal from "@/components/VideoModal";

export const metadata: Metadata = {
  title: "Contact us — iBEST Studios",
  description: "Visit, call or email iBEST Studios in Changzamtog, Thimphu, Bhutan — animation, film, VFX, design, writing and music.",
};

export default function ContactPage() {
  return (
    <Providers intro={false}>
      <Nav />
      <main>
        <PageHeader eyebrow="Contact" title="Contact us." accent="Let's talk.">
          We&apos;d love to hear from you. Get in touch with our team!
        </PageHeader>
        <ContactDetails />
      </main>
      <Contact />
      <VideoModal />
      <Cursor />
    </Providers>
  );
}
