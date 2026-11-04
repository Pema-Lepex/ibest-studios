"use client";

import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import dynamic from "next/dynamic";
import { useRef, useState } from "react";
import { pipeline } from "@/data/site";
import LazyMount from "./LazyMount";

const PipelineScene = dynamic(() => import("./three/PipelineScene"), { ssr: false });

const LABELS = ["Wireframe", "Clay", "Shaded", "Rigged", "Final render"];

// Scroll-driven: Dr. Carrot (from Educare Skill) is built stage by stage, like a real production.
export default function Pipeline() {
  const ref = useRef<HTMLElement>(null);
  const progress = useRef(0);
  const [stage, setStage] = useState(0);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });

  useMotionValueEvent(scrollYProgress, "change", (p) => {
    progress.current = Math.min(0.999, Math.max(0, p));
    setStage(Math.min(4, Math.floor(progress.current * 5)));
  });

  const step = pipeline[stage];

  return (
    <section ref={ref} className="relative h-[420svh] bg-deep">
      <div className="sticky top-0 h-[100svh] overflow-hidden">
        <div className="mx-auto grid grid-cols-1 h-full max-w-7xl grid-rows-[1fr_auto] px-5 pb-6 pt-20 sm:px-8 md:grid-cols-2 md:grid-rows-1 md:items-center md:gap-10 md:pb-0 lg:px-12">
          {/* scene */}
          <div className="relative min-h-0 md:order-2 md:h-[75vh]">
            <div className="absolute inset-0 rounded-[2rem] bg-[radial-gradient(circle_at_50%_55%,rgba(42,143,214,0.35),transparent_65%)]" />
            <LazyMount className="absolute inset-0">
              <PipelineScene progress={progress} />
            </LazyMount>
            <div className="pointer-events-none absolute inset-x-2 top-2 flex items-center justify-between font-mono text-[10px] uppercase tracking-widest text-cream/60">
              <span className="hidden sm:inline">Viewport · Perspective</span>
              <AnimatePresence mode="wait">
                <motion.span
                  key={stage}
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 6 }}
                  className="ml-auto rounded-full bg-sun px-3 py-1 font-semibold text-navy"
                >
                  {LABELS[stage]}
                </motion.span>
              </AnimatePresence>
            </div>
          </div>

          {/* copy */}
          <div className="md:order-1">
            <p className="mb-4 flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.28em] text-cream/65">
              <span className="font-semibold text-red">03</span>
              <span className="h-px w-10 bg-cream/30" />
              How a frame is made
            </p>
            <div className="mb-5 flex gap-1.5">
              {pipeline.map((p, i) => (
                <span key={p.no} className="h-1.5 flex-1 overflow-hidden rounded-full bg-cream/15">
                  <motion.span className="block h-full rounded-full bg-gradient-to-r from-orange to-sun" animate={{ width: i <= stage ? "100%" : "0%" }} transition={{ duration: 0.5 }} />
                </span>
              ))}
            </div>
            <div className="min-h-[190px] sm:min-h-[210px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={stage}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -24 }}
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                >
                  <span className="font-display text-5xl font-extrabold text-sky md:text-7xl">{step.no}</span>
                  <h2 className="mt-1 font-display text-[clamp(1.8rem,4vw,3.25rem)] font-extrabold leading-tight tracking-tight">{step.title}</h2>
                  <p className="mt-3 max-w-md text-sm leading-relaxed text-cream/75 sm:text-base">{step.body}</p>
                </motion.div>
              </AnimatePresence>
            </div>
            <p className="mt-2 hidden font-mono text-[10px] uppercase tracking-[0.3em] text-cream/45 md:block">Keep scrolling to render ↓</p>
          </div>
        </div>
      </div>
    </section>
  );
}
