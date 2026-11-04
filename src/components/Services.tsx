"use client";

import { AnimatePresence, motion, useInView } from "motion/react";
import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import { services } from "@/data/site";
import LazyMount from "./LazyMount";
import { Container, Eyebrow, SplitText, h2Class } from "./motion";

const ServiceScene = dynamic(() => import("./three/ServiceScene"), { ssr: false });

const DURATION = 4500;

export default function Services() {
  const [index, setIndex] = useState(0);
  const [auto, setAuto] = useState(true);
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { margin: "-25%" });

  // auto-advance until the visitor picks a service themselves
  useEffect(() => {
    if (!auto || !inView) return;
    const t = setInterval(() => setIndex((i) => (i + 1) % services.length), DURATION);
    return () => clearInterval(t);
  }, [auto, inView]);

  const s = services[index];

  return (
    <section id="services" ref={ref} className="relative overflow-x-clip bg-cream py-20 text-navy sm:py-28">
      <Container>
        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <div>
            <Eyebrow no="01" light>
              Explore in 3D
            </Eyebrow>
            <h2 className={h2Class}>
              <SplitText text="Pick a craft," className="block" />
              <SplitText text="spin the tools." className="block text-red" delay={0.1} />
            </h2>
          </div>
          <p className="max-w-md text-navy/70">Tap a service to bring its tool to the stage — drag to turn it around.</p>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-6 sm:mt-14 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] lg:gap-12">
          <div className="relative aspect-square overflow-hidden rounded-[2rem] bg-gradient-to-br from-navy via-sea to-sky shadow-2xl shadow-navy/30 sm:aspect-[4/3]">
            <div className="cloud-pattern absolute inset-0" />
            <LazyMount className="absolute inset-0">
              <ServiceScene active={s.key} />
            </LazyMount>
            <span className="pointer-events-none absolute left-5 top-5 rounded-full bg-cream/15 px-3 py-1 font-mono text-[10px] uppercase tracking-widest text-cream/80 backdrop-blur">
              Drag to rotate
            </span>
            <span className="pointer-events-none absolute bottom-3 right-5 font-display text-7xl font-extrabold text-cream/15 sm:text-8xl">
              0{index + 1}
            </span>
          </div>

          <div className="flex flex-col">
            <div className="no-scrollbar -mx-5 flex gap-2 overflow-x-auto px-5 sm:mx-0 sm:flex-wrap sm:px-0">
              {services.map((k, i) => (
                <button
                  key={k.key}
                  onClick={() => {
                    setIndex(i);
                    setAuto(false);
                  }}
                  className={`relative isolate shrink-0 rounded-full border px-4 py-2 text-sm font-semibold transition ${
                    i === index ? "border-navy text-cream" : "border-navy/15 bg-white text-navy/75 hover:border-navy/40"
                  }`}
                >
                  {i === index && <motion.span layoutId="service-pill" className="absolute inset-0 -z-10 rounded-full bg-navy" />}
                  {k.short}
                </button>
              ))}
            </div>

            <div className="mt-8 min-h-[240px] lg:mt-12">
              <AnimatePresence mode="wait">
                <motion.div
                  key={s.key}
                  initial={{ opacity: 0, x: 24 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -24 }}
                  transition={{ duration: 0.35 }}
                >
                  <h3 className="font-display text-[clamp(1.8rem,3.5vw,3rem)] font-extrabold leading-tight tracking-tight">{s.title}</h3>
                  <p className="mt-4 max-w-lg leading-relaxed text-navy/75">{s.body}</p>
                  <div className="mt-6 flex flex-wrap gap-2">
                    {s.tags.map((t) => (
                      <span key={t} className="rounded-lg bg-navy/5 px-3 py-1.5 text-xs font-medium text-navy/80">
                        {t}
                      </span>
                    ))}
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="mt-auto pt-6">
              <div className="h-1 w-full overflow-hidden rounded-full bg-navy/10">
                {auto && inView && (
                  <motion.div
                    key={index}
                    className="h-full rounded-full bg-red"
                    initial={{ width: 0 }}
                    animate={{ width: "100%" }}
                    transition={{ duration: DURATION / 1000, ease: "linear" }}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
