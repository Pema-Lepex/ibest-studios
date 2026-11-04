"use client";

import { motion, useScroll, useTransform } from "motion/react";
import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import { showreelId, showreelStart, site } from "@/data/site";
import { isConstrained, whenPageIdle } from "./idle";
import { SplitText } from "./motion";
import { useIntro } from "./Providers";
import VideoLoop from "./VideoLoop";
import { playVideo } from "./VideoModal";

const HeroScene = dynamic(() => import("./three/HeroScene"), { ssr: false });

// fixed star positions so server and client markup match
const STARS = Array.from({ length: 40 }, (_, i) => ({
  left: `${(i * 37.7) % 100}%`,
  top: `${(i * 23.3) % 70}%`,
  size: 1 + (i % 3),
  delay: `${(i % 7) * 0.4}s`,
}));

export default function Hero() {
  const { scrollTo } = useIntro();
  const [scene, setScene] = useState(false);
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const sceneY = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "-15%"]);
  const fade = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const bgScale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);

  // the 3D scene is the heaviest download on the site, so it waits until the page is usable
  useEffect(() => {
    if (isConstrained()) return;
    return whenPageIdle(() => setScene(true));
  }, []);

  return (
    <section id="top" ref={ref} className="relative overflow-hidden bg-gradient-to-b from-abyss via-deep to-navy">
      {/* the showreel runs behind everything, tinted navy so the copy stays readable */}
      <motion.div style={{ scale: bgScale }} className="pointer-events-none absolute inset-0">
        <VideoLoop id={showreelId} start={showreelStart} quiet zoom={1.25} poster="/img/hero-poster.webp" priority className="absolute inset-0" />
      </motion.div>
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-abyss/80 via-deep/55 to-navy/90 lg:bg-gradient-to-r lg:from-abyss/90 lg:via-deep/60 lg:to-deep/30" />
        <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-navy to-transparent" />
        {STARS.map((s, i) => (
          <span key={i} className="star" style={{ left: s.left, top: s.top, width: s.size, height: s.size, animationDelay: s.delay }} />
        ))}
        <div className="absolute right-[8%] top-[14%] size-40 rounded-full bg-sun/15 blur-3xl sm:size-72" />
      </div>

      <div className="relative mx-auto grid grid-cols-1 min-h-[100svh] max-w-7xl grid-rows-[auto_1fr] items-center gap-2 px-5 pb-24 pt-20 sm:px-8 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)] lg:grid-rows-1 lg:gap-8 lg:px-12 lg:pb-20 lg:pt-24">
        {/* 3D: top on phones, right on laptops */}
        <motion.div
          style={{ y: sceneY }}
          className="relative order-1 h-[40svh] min-h-[260px] w-full sm:h-[46svh] lg:order-2 lg:h-[72vh] lg:max-h-[720px]"
        >
          {scene ? (
            <HeroScene />
          ) : (
            // eslint-disable-next-line @next/next/no-img-element
            <img src="/img/logo-original.webp" alt="" className="rise absolute left-1/2 top-1/2 h-32 w-auto -translate-x-1/2 -translate-y-1/2 sm:h-44" />
          )}
        </motion.div>

        <motion.div style={{ y: textY, opacity: fade }} className="relative order-2 lg:order-1">
          <div
            className="rise mb-5 inline-flex items-center gap-2 rounded-full border border-cream/15 bg-cream/5 py-1.5 pl-1.5 pr-4 backdrop-blur"
          >
            <span className="rounded-full bg-red px-2.5 py-1 font-mono text-[10px] font-semibold uppercase tracking-widest text-white">
              Since {site.founded}
            </span>
            <span className="text-xs text-cream/80 sm:text-sm">
              Animation · Film · VFX<span className="hidden sm:inline"> · {site.location}</span>
            </span>
          </div>

          <h1 className="font-display text-[clamp(2.75rem,9vw,5.5rem)] font-extrabold lg:text-[clamp(3.25rem,5.6vw,6rem)] leading-[0.92] tracking-tight">
            <SplitText text="Ideas for" play className="block" />
            <span className="relative inline-block">
              <SplitText text="generations." play delay={0.1} className="block text-sun" />
              <svg viewBox="0 0 300 20" className="absolute -bottom-2 left-0 h-3 w-full text-red sm:h-4" preserveAspectRatio="none" aria-hidden>
                <motion.path
                  d="M3 15 C 60 3, 120 3, 170 10 S 260 18, 297 6"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="5"
                  strokeLinecap="round"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ delay: 0.5, duration: 0.9, ease: "easeInOut" }}
                />
              </svg>
            </span>
          </h1>

          <p style={{ animationDelay: "0.15s" }} className="rise mt-6 max-w-xl text-base leading-relaxed text-cream/80 sm:text-lg">
            We are {site.name} — Bhutan&apos;s home of animation, film and visual storytelling. The team behind{" "}
            <em className="not-italic text-cream">The Legend of Pemi Tshewang Tashi</em>, <em className="not-italic text-cream">Dzimitogu</em>{" "}
            and the 1,000+ episodes on <span className="font-semibold text-orange">Educare Skill</span>.
          </p>

          <div style={{ animationDelay: "0.2s" }} className="rise mt-8 flex flex-wrap items-center gap-3">
            <button
              onClick={() => playVideo(showreelId)}
              className="group flex items-center gap-3 rounded-full bg-red py-2 pl-2 pr-6 font-semibold text-white shadow-xl shadow-red/30 transition hover:-translate-y-0.5 hover:bg-ember"
            >
              <span className="relative flex size-10 items-center justify-center rounded-full bg-white text-red">
                <span className="absolute inset-0 animate-ping rounded-full bg-white/50" />
                <svg viewBox="0 0 24 24" className="relative ml-0.5 size-4 fill-current">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </span>
              Watch our showreel
            </button>
            <button
              onClick={() => scrollTo("#work")}
              className="rounded-full border border-cream/30 px-6 py-[0.85rem] font-semibold transition hover:border-sun hover:text-sun"
            >
              Explore our work
            </button>
          </div>
        </motion.div>
      </div>

      <motion.button
        initial={false}
        onClick={() => playVideo(showreelId)}
        className="absolute bottom-20 right-5 z-10 hidden items-center gap-2 rounded-full bg-abyss/50 py-1.5 pl-3 pr-4 font-mono text-[10px] uppercase tracking-widest text-cream/80 ring-1 ring-cream/15 backdrop-blur transition hover:text-cream sm:flex lg:right-12"
      >
        <span className="size-1.5 animate-blink rounded-full bg-red" /> Showreel · Tap for sound
      </motion.button>

      <motion.button
        initial={false}
        onClick={() => scrollTo("#work")}
        className="absolute bottom-16 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 font-mono text-[10px] uppercase tracking-[0.3em] text-cream/60 lg:flex"
      >
        Scroll
        <span className="flex h-9 w-5 justify-center rounded-full border border-cream/40 pt-1.5">
          <motion.span className="size-1.5 rounded-full bg-sun" animate={{ y: [0, 12, 0] }} transition={{ repeat: Infinity, duration: 1.6 }} />
        </span>
      </motion.button>

    </section>
  );
}
