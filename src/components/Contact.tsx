"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { educare, nav, showreelId, site } from "@/data/site";
import { Container, SplitText } from "./motion";
import { useIntro } from "./Providers";
import VideoLoop from "./VideoLoop";

export default function Contact() {
  const { scrollTo, go } = useIntro();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end end"] });
  const rotate = useTransform(scrollYProgress, [0, 1], [-120, 0]);

  return (
    <footer id="contact" ref={ref} className="relative overflow-hidden bg-abyss pt-20 sm:pt-28">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[85%] opacity-30">
        <VideoLoop id={showreelId} start={40} quiet zoom={1.25} className="absolute inset-0" />
        <div className="absolute inset-0 bg-gradient-to-b from-abyss/40 via-abyss/70 to-abyss" />
      </div>
      <div className="cloud-pattern pointer-events-none absolute inset-0" />
      <Container className="relative">
        <p className="mb-5 font-mono text-[11px] uppercase tracking-[0.28em] text-cream/65">
          <span className="text-red">06</span> — Contact
        </p>
        <h2 className="font-display text-[clamp(2.6rem,9vw,7.5rem)] font-extrabold leading-[0.9] tracking-tight">
          <SplitText text="Got a story?" className="block" />
          <SplitText text="Let's make it move." className="block text-sun" delay={0.1} />
        </h2>

        <div className="mt-12 grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)] lg:items-end">
          <div className="space-y-6">
            <a
              href={`mailto:${site.email}`}
              className="group inline-flex max-w-full items-center gap-3 rounded-full bg-red py-2 pl-5 pr-2 font-semibold text-white shadow-xl shadow-red/25 transition hover:bg-ember sm:pl-7 sm:text-xl"
            >
              <span className="truncate">{site.email}</span>
              <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-white text-red transition group-hover:rotate-45 sm:size-12">↗</span>
            </a>
            <p className="text-cream/70">
              iBEST Studios · {site.location}
              <br />
              Animation, film, VFX, design, content and sound — tell us about your project.
            </p>
            <div className="flex flex-wrap gap-2">
              {[
                ["YouTube", site.socials.youtube],
                ["Instagram", site.socials.instagram],
                ["Facebook", site.socials.facebook],
                ["Educare Skill", educare.url],
              ].map(([l, h]) => (
                <a key={l} href={h} target="_blank" rel="noreferrer" className="rounded-full border border-cream/20 px-4 py-2 text-sm font-medium transition hover:border-sun hover:text-sun">
                  {l}
                </a>
              ))}
            </div>
          </div>

          <motion.button
            style={{ rotate }}
            onClick={() => scrollTo("#top")}
            className="relative size-32 justify-self-start sm:size-40 lg:justify-self-end"
            aria-label="Back to top"
          >
            <svg viewBox="0 0 200 200" className="h-full w-full animate-[spin_18s_linear_infinite]">
              <defs>
                <path id="foot-circle" d="M100,100 m-80,0 a80,80 0 1,1 160,0 a80,80 0 1,1 -160,0" />
              </defs>
              <text className="fill-cream font-mono text-[15px] uppercase tracking-[0.32em]">
                <textPath href="#foot-circle">Back to top · Ideas for generations ·</textPath>
              </text>
            </svg>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/img/logo-original.webp" alt="" className="absolute left-1/2 top-1/2 h-14 -translate-x-1/2 -translate-y-1/2 sm:h-16" />
          </motion.button>
        </div>
      </Container>

      <div className="relative mt-16 border-t border-cream/10">
        <Container className="flex flex-col gap-6 py-8 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-3">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/img/logo-original.webp" alt="iBEST Studios" loading="lazy" width={512} height={512} className="h-16 w-16" />
            <p className="text-sm text-cream/55">
              © {new Date().getFullYear()} iBEST STUDIOS | All rights reserved | Developed By{" "}
              <a href="https://ibesttechnologies.bt" target="_blank" rel="noopener noreferrer" className="underline hover:text-sun">
                iBEST TECHNOLOGIES
              </a>
            </p>
          </div>
          <nav className="flex flex-wrap gap-x-5 gap-y-2 text-sm text-cream/75" aria-label="Footer">
            {nav.map((n) => (
              <button key={n.href} onClick={() => go(n.href)} className="hover:text-sun">
                {n.label}
              </button>
            ))}
          </nav>
        </Container>
      </div>
    </footer>
  );
}
