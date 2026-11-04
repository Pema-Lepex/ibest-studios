"use client";

import { AnimatePresence, motion, useInView } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { site, works, type Category } from "@/data/site";
import { Container, Reveal } from "./motion";
import VideoLoop from "./VideoLoop";
import { playVideo } from "./VideoModal";
import Viewfinder from "./Viewfinder";

const FILTERS: ("All" | Category)[] = ["All", "Animation", "Music Video", "Film", "Campaign"];
const ADVANCE_MS = 18000;
const PREVIEW_START = 20;

function Equalizer() {
  return (
    <span className="flex h-3.5 items-end gap-[2px]" aria-hidden>
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          className="w-[3px] rounded-full bg-sun"
          animate={{ height: ["30%", "100%", "45%", "80%", "30%"] }}
          transition={{ repeat: Infinity, duration: 1, delay: i * 0.15 }}
        />
      ))}
    </span>
  );
}

// A screening room: one monitor plays the selected film muted; the playlist beside it is pure type.
export default function Works() {
  const [filter, setFilter] = useState<(typeof FILTERS)[number]>("All");
  const [index, setIndex] = useState(0);
  const [auto, setAuto] = useState(true);
  const [expanded, setExpanded] = useState(false);
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { margin: "-20%" });

  const list = works.filter((w) => filter === "All" || w.category === filter);
  const current = list[Math.min(index, list.length - 1)];

  useEffect(() => {
    if (!auto || !inView) return;
    const t = setInterval(() => setIndex((i) => (i + 1) % list.length), ADVANCE_MS);
    return () => clearInterval(t);
  }, [auto, inView, list.length]);

  const pick = (i: number) => {
    setIndex(i);
    setAuto(false);
  };

  return (
    <section ref={ref} className="relative bg-navy pb-24 sm:pb-32">
      <Container>
        <div className="flex flex-col justify-between gap-6 border-t border-cream/10 pt-14 lg:flex-row lg:items-end">
          <Reveal>
            <p className="mb-2 flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.28em] text-cream/60">
              <span className="size-1.5 animate-blink rounded-full bg-red" /> Now screening
            </p>
            <h3 className="font-display text-[clamp(1.8rem,4vw,3rem)] font-extrabold tracking-tight">The screening room</h3>
            <p className="mt-2 text-cream/65">Music videos, campaigns, films and animation from our channel.</p>
          </Reveal>
          <div className="no-scrollbar -mx-5 flex gap-2 overflow-x-auto px-5 sm:mx-0 sm:flex-wrap sm:px-0">
            {FILTERS.map((f) => (
              <button
                key={f}
                onClick={() => {
                  setFilter(f);
                  setIndex(0);
                  setExpanded(false);
                }}
                className={`relative isolate shrink-0 rounded-full border px-4 py-2 text-sm font-medium transition ${
                  f === filter ? "border-sun text-navy" : "border-cream/20 text-cream/75 hover:border-cream/50"
                }`}
              >
                {f === filter && <motion.span layoutId="work-pill" className="absolute inset-0 -z-10 rounded-full bg-sun" />}
                {f}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)] lg:gap-8">
          {/* monitor */}
          <div>
            <div className="relative aspect-video overflow-hidden rounded-3xl bg-abyss shadow-2xl shadow-black/40 ring-1 ring-cream/10">
              <VideoLoop key={current.id} id={current.id} start={PREVIEW_START} className="absolute inset-0" label={current.title} />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-abyss/60 via-transparent to-transparent" />
              <Viewfinder title={`${current.category} · ${current.year}`} cam={current.channel === "Educare" ? "Educare" : "iBEST"} />
            </div>
            <AnimatePresence mode="wait">
              <motion.div
                key={current.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.3 }}
                className="mt-5 flex flex-wrap items-center justify-between gap-4"
              >
                <div className="min-w-0">
                  <h4 className="font-display text-[clamp(1.4rem,2.6vw,2rem)] font-extrabold leading-tight">{current.title}</h4>
                  <p className="mt-1 font-mono text-[11px] uppercase tracking-widest text-cream/55">
                    {current.category} · {current.year} · {current.views} views
                  </p>
                </div>
                <button
                  onClick={() => playVideo(current.id)}
                  className="flex shrink-0 items-center gap-2 rounded-full bg-red py-2 pl-2 pr-5 font-semibold text-white transition hover:bg-ember"
                >
                  <span className="flex size-8 items-center justify-center rounded-full bg-white text-red">
                    <svg viewBox="0 0 24 24" className="ml-0.5 size-3.5 fill-current">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </span>
                  Watch with sound
                </button>
              </motion.div>
            </AnimatePresence>
            <div className="mt-4 h-1 overflow-hidden rounded-full bg-cream/10">
              {auto && inView && (
                <motion.div
                  key={`${current.id}-${filter}`}
                  className="h-full rounded-full bg-gradient-to-r from-orange to-sun"
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ duration: ADVANCE_MS / 1000, ease: "linear" }}
                />
              )}
            </div>
          </div>

          {/* playlist — titles only */}
          <div className="rounded-3xl bg-deep/70 p-2 ring-1 ring-cream/10">
            <ol className={`no-scrollbar space-y-1 overflow-y-auto ${expanded ? "" : "max-h-[22rem]"} lg:max-h-[34rem]`}>
              {list.map((w, i) => {
                const active = w.id === current.id;
                return (
                  <li key={w.id}>
                    <button
                      onClick={() => pick(i)}
                      className={`flex w-full items-center gap-4 rounded-2xl px-4 py-3 text-left transition ${
                        active ? "bg-cream/10" : "hover:bg-cream/5"
                      }`}
                      aria-current={active}
                    >
                      <span className={`w-6 shrink-0 font-mono text-xs ${active ? "text-sun" : "text-cream/40"}`}>
                        {active ? <Equalizer /> : String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className={`block truncate font-semibold ${active ? "text-sun" : "text-cream"}`}>{w.title}</span>
                        <span className="block font-mono text-[10px] uppercase tracking-widest text-cream/45">
                          {w.category} · {w.year}
                        </span>
                      </span>
                      <span className="shrink-0 font-mono text-[10px] text-cream/45">{w.views}</span>
                    </button>
                  </li>
                );
              })}
            </ol>
            {list.length > 6 && (
              <button onClick={() => setExpanded((e) => !e)} className="w-full rounded-2xl py-2 text-sm text-cream/60 hover:text-cream lg:hidden">
                {expanded ? "Show less" : `Show all ${list.length}`}
              </button>
            )}
          </div>
        </div>

        <div className="mt-10 flex justify-center">
          <a href={site.socials.youtube} target="_blank" rel="noreferrer" className="rounded-full bg-red px-6 py-3 font-semibold text-white transition hover:bg-ember">
            Subscribe on YouTube ↗
          </a>
        </div>
      </Container>
    </section>
  );
}
