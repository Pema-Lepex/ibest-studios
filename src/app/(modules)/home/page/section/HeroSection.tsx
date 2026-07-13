"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import {
  AnimatePresence,
  motion,
  useScroll,
  useTransform,
} from "framer-motion";
import { ArrowUpRight, Play } from "lucide-react";
import {
  WorkPemiTshewangTashi,
  WorkDziMitoGu,
  WorkSamphel3,
  WorkAchoKhegpa,
  WorkDragonTales,
} from "@/assets";
import { Button } from "@/components/ui";

/**
 * Every image in this project is promo art with a title, a logo or a URL baked
 * into it. Running one full-bleed behind the headline puts two competing sets
 * of type on top of each other, no matter how hard it's scrimmed.
 *
 * So the artwork is framed rather than used as a backdrop: the headline sits on
 * clean ink, and the stills play in a card beside it, where their own titles
 * read as intended. A heavily blurred copy of the current still still tints the
 * canvas behind everything, which keeps the cinematic depth without the clash.
 */
const FRAMES = [
  {
    image: WorkPemiTshewangTashi,
    title: "Legend of Pemi Tshewang Tashi",
    kind: "2D Animation",
  },
  { image: WorkDziMitoGu, title: "Dzi Mito Gu", kind: "Visual Effects" },
  { image: WorkSamphel3, title: "Samphel 3", kind: "3D Animation" },
  { image: WorkAchoKhegpa, title: "Acho Khegpa", kind: "3D Animation" },
  {
    image: WorkDragonTales,
    title: "Dragon Tales",
    kind: "Animated Infographics",
  },
];

const FRAME_MS = 4500;
const DISCIPLINES = ["2D Animation", "3D Animation", "VFX", "Film", "Design"];

export default function HeroSection() {
  const [index, setIndex] = useState(0);
  const { scrollY } = useScroll();

  const contentY = useTransform(scrollY, [0, 900], [0, 70]);
  const contentOpacity = useTransform(scrollY, [0, 600], [1, 0]);
  const artY = useTransform(scrollY, [0, 900], [0, 140]);

  useEffect(() => {
    const id = setInterval(
      () => setIndex((i) => (i + 1) % FRAMES.length),
      FRAME_MS,
    );
    return () => clearInterval(id);
  }, []);

  const frame = FRAMES[index];

  return (
    <section className="relative flex min-h-svh w-full items-center overflow-hidden bg-ink-950 pt-28 pb-20 grain sm:pt-32">
      {/* Ambient wash — the same still, blurred past legibility, purely for
          colour and depth. No z-index games: it's first in the DOM, and the
          layers after it carry `relative` so they stack above naturally. */}
      <AnimatePresence>
        <motion.div
          key={index}
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.28 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 2 }}
          className="absolute inset-0"
        >
          <Image
            src={frame.image}
            alt=""
            fill
            priority={index === 0}
            sizes="100vw"
            className="scale-110 object-cover blur-3xl"
          />
        </motion.div>
      </AnimatePresence>
      <div className="absolute inset-0 bg-ink-950/70" />
      <div className="absolute inset-0 bg-linear-to-t from-ink-950 via-transparent to-ink-950/60" />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-32 top-1/3 h-96 w-96 rounded-full bg-gold-500/10 blur-[120px]"
      />

      <div className="relative mx-auto grid w-full max-w-[1600px] items-center gap-14 px-5 sm:px-8 lg:grid-cols-[1.05fr_1fr] lg:gap-16 lg:px-12">
        {/* Copy */}
        <motion.div style={{ y: contentY, opacity: contentOpacity }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.25 }}
            className="mb-7 inline-flex items-center gap-3 rounded-full border border-cream/15 bg-cream/5 px-4 py-2 backdrop-blur-sm"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-pulse-ring rounded-full bg-gold-500" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-gold-500" />
            </span>
            <span className="text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-cream sm:text-xs">
              Multimedia production · Bhutan
            </span>
          </motion.div>

          {/* Each line rises out from behind a clipping mask. */}
          <h1 className="display text-[clamp(2.75rem,7vw,6.5rem)] text-cream">
            {["We give life", "to stories."].map((line, i) => (
              <span key={line} className="block overflow-hidden pb-[0.08em]">
                <motion.span
                  initial={{ y: "110%" }}
                  animate={{ y: "0%" }}
                  transition={{
                    duration: 1.1,
                    delay: 0.4 + i * 0.12,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className={`block ${i === 1 ? "text-gradient-gold" : ""}`}
                >
                  {line}
                </motion.span>
              </span>
            ))}
          </h1>

          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1.2, delay: 0.95, ease: [0.16, 1, 0.3, 1] }}
            className="mt-7 h-px w-full max-w-sm origin-left bg-linear-to-r from-gold-500 to-transparent"
          />

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 1 }}
            className="mt-7 max-w-lg text-base leading-relaxed text-mist sm:text-lg"
          >
            A multimedia production studio built on creative storytelling — from
            the first storyboard to the final frame.
          </motion.p>

          <motion.ul
            initial="hidden"
            animate="visible"
            variants={{
              visible: {
                transition: { staggerChildren: 0.07, delayChildren: 1.15 },
              },
            }}
            className="mt-7 flex flex-wrap gap-x-2.5 gap-y-2"
          >
            {DISCIPLINES.map((d) => (
              <motion.li
                key={d}
                variants={{
                  hidden: { opacity: 0, y: 12 },
                  visible: { opacity: 1, y: 0 },
                }}
                className="rounded-full border border-cream/10 px-3.5 py-1.5 text-[0.7rem] uppercase tracking-widest text-mist transition-colors hover:border-gold-500/50 hover:text-gold-500"
              >
                {d}
              </motion.li>
            ))}
          </motion.ul>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 1.3 }}
            // items-start: the magnetic button is wrapped in an inline-block, so
            // without it the outline button stretches to full width on mobile
            // and the two CTAs come out different sizes.
            className="mt-10 flex flex-col items-start gap-4 sm:flex-row sm:items-center"
          >
            <Button
              href="/experience"
              size="lg"
              magnetic
              icon={<ArrowUpRight className="h-5 w-5" />}
            >
              View our work
            </Button>
            <Button
              href="/experience#reel"
              variant="outline"
              size="lg"
              icon={<Play className="h-4 w-4 fill-current" />}
            >
              Watch the reel
            </Button>
          </motion.div>
        </motion.div>

        {/* Artwork */}
        <motion.div
          style={{ y: artY }}
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.1, delay: 0.55, ease: [0.16, 1, 0.3, 1] }}
          className="relative"
        >
          {/* The deck must be measured against the card, not the whole column —
              h-full on the column would push these below the card's lower edge
              instead of tucking them behind it. */}
          <div className="relative aspect-video">
            <div
              aria-hidden="true"
              className="absolute inset-x-4 -top-3 h-full rounded-2xl border border-cream/10 bg-ink-800/50"
            />
            <div
              aria-hidden="true"
              className="absolute inset-x-8 -top-6 h-full rounded-2xl border border-cream/5 bg-ink-800/30"
            />

            <div className="absolute inset-0 overflow-hidden rounded-2xl border border-cream/15 bg-ink-900 shadow-2xl shadow-ink-950/60">
              <AnimatePresence mode="sync">
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 1.06 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{
                    opacity: { duration: 1.1 },
                    scale: { duration: 5, ease: "linear" },
                  }}
                  className="absolute inset-0"
                >
                  <Image
                    src={frame.image}
                    alt={frame.title}
                    fill
                    priority={index === 0}
                    sizes="(max-width: 1024px) 100vw, 45vw"
                    className="object-cover"
                  />
                </motion.div>
              </AnimatePresence>

              {/* Caption sits on a scrim at the base of the card only. */}
              <div className="absolute inset-x-0 bottom-0 bg-linear-to-t from-ink-950 via-ink-950/70 to-transparent p-5 pt-16">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.5 }}
                  >
                    <p className="text-[0.65rem] uppercase tracking-widest text-gold-500">
                      {frame.kind}
                    </p>
                    <p className="mt-1 font-raleway text-base font-bold text-cream sm:text-lg">
                      {frame.title}
                    </p>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>

          {/* Frame indicators */}
          <div className="mt-5 flex items-center gap-2.5">
            {FRAMES.map((f, i) => (
              <button
                key={f.title}
                type="button"
                onClick={() => setIndex(i)}
                aria-label={`Show ${f.title}`}
                aria-current={i === index}
                className="group py-2"
              >
                <span
                  className={`block h-0.5 transition-all duration-500 ${
                    i === index
                      ? "w-10 bg-gold-500"
                      : "w-5 bg-cream/25 group-hover:bg-cream/60"
                  }`}
                />
              </button>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Scroll hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 1 }}
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 lg:flex"
      >
        <span className="text-[0.65rem] uppercase tracking-[0.25em] text-faint">
          Scroll
        </span>
        <span className="flex h-9 w-5 justify-center rounded-full border border-cream/20 pt-1.5">
          <span className="h-1.5 w-0.5 animate-scroll-hint rounded-full bg-gold-500" />
        </span>
      </motion.div>
    </section>
  );
}
