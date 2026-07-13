"use client";

import Link from "next/link";
import Image from "next/image";
import { StudiosLogo } from "@/assets";
import { Reveal, Marquee } from "@/components/motion";
import { Button } from "@/components/ui";
import { ArrowUpRight, Mail, MapPin } from "lucide-react";

const SITEMAP = [
  {
    heading: "Studio",
    links: [
      { label: "Home", href: "/" },
      { label: "Our story", href: "/#story" },
      { label: "Team", href: "/team" },
      { label: "Careers", href: "/job" },
    ],
  },
  {
    heading: "Services",
    links: [
      { label: "Visual effects", href: "/service#vfx" },
      { label: "2D & 3D animation", href: "/service#animation" },
      { label: "Design & illustration", href: "/service#design" },
      { label: "Content writing", href: "/service#content" },
    ],
  },
  {
    heading: "Explore",
    links: [
      { label: "Our work", href: "/experience" },
      { label: "Download app", href: "/download" },
      { label: "Contact", href: "/contact" },
    ],
  },
];

const SOCIALS = [
  { label: "Facebook", href: "https://www.facebook.com/ibestedutainment" },
  { label: "YouTube", href: "https://www.youtube.com/@ibeststudios" },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden border-t border-cream/10 bg-ink-900">
      {/* Warm bloom behind the CTA, so the footer doesn't read as a dead zone. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 left-1/2 h-80 w-152 -translate-x-1/2 rounded-full bg-gold-500/10 blur-[100px]"
      />

      {/* Closing CTA */}
      <section className="relative mx-auto max-w-[1600px] px-5 pb-16 pt-20 text-center sm:px-8 sm:pt-24 lg:px-12">
        <Reveal>
          <p className="mb-6 text-xs font-semibold uppercase tracking-[0.25em] text-gold-500 sm:text-sm">
            Have a story to tell?
          </p>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="display mx-auto max-w-4xl text-4xl text-cream sm:text-6xl lg:text-7xl">
            Let&apos;s bring it{" "}
            <span className="text-gradient-gold">to life.</span>
          </h2>
        </Reveal>
        <Reveal delay={0.2}>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button
              href="/contact"
              size="lg"
              magnetic
              icon={<ArrowUpRight className="h-5 w-5" />}
            >
              Start a project
            </Button>
            <Button href="/experience" variant="outline" size="lg">
              See our work
            </Button>
          </div>
        </Reveal>
      </section>

      {/* Scrolling capability strip */}
      <div className="relative border-y border-cream/10 py-6">
        <Marquee speed={45}>
          {["Animation", "VFX", "Illustration", "Film", "Design", "Sound", "Storytelling"].map(
            (word) => (
              <span
                key={word}
                className="display flex items-center gap-8 px-8 text-2xl uppercase text-cream/15 sm:text-4xl"
              >
                {word}
                <span className="text-gold-500/40">✦</span>
              </span>
            ),
          )}
        </Marquee>
      </div>

      {/* Sitemap */}
      <div className="relative mx-auto max-w-[1600px] px-5 py-16 sm:px-8 lg:px-12">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-5">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-3">
              <Image src={StudiosLogo} alt="" width={44} height={44} className="h-11 w-11" />
              <span className="font-raleway text-lg font-extrabold uppercase tracking-[0.15em] text-cream">
                iBEST<span className="text-gold-500">.</span>
              </span>
            </Link>

            <p className="mt-5 max-w-sm text-sm leading-relaxed text-mist">
              A multimedia production studio in Bhutan built on creative
              storytelling — animation, VFX, design, and live-action film.
            </p>

            <div className="mt-6 space-y-3 text-sm">
              <a
                href="mailto:infoibeststudios@gmail.com"
                className="flex items-center gap-3 text-mist transition-colors hover:text-gold-500"
              >
                <Mail className="h-4 w-4 shrink-0 text-gold-500" />
                <span className="break-all">infoibeststudios@gmail.com</span>
              </a>
              <p className="flex items-center gap-3 text-mist">
                <MapPin className="h-4 w-4 shrink-0 text-gold-500" />
                Thimphu, Bhutan
              </p>
            </div>
          </div>

          {/* Link columns */}
          {SITEMAP.map((section) => (
            <nav key={section.heading} aria-label={section.heading}>
              <h3 className="text-xs font-semibold uppercase tracking-[0.18em] text-cream">
                {section.heading}
              </h3>
              <ul className="mt-5 space-y-3">
                {section.links.map((link) => (
                  <li key={link.href + link.label}>
                    <Link
                      href={link.href}
                      className="link-underline text-sm text-mist transition-colors hover:text-gold-500"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="mt-16 flex flex-col items-center justify-between gap-6 border-t border-cream/10 pt-8 sm:flex-row">
          <p className="text-center text-xs text-faint sm:text-left">
            © {year} iBEST Studios. All rights reserved.
          </p>

          <div className="flex items-center gap-6">
            {SOCIALS.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-1 text-xs uppercase tracking-widest text-mist transition-colors hover:text-gold-500"
              >
                {social.label}
                <ArrowUpRight className="h-3 w-3 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
