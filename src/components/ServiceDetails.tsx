"use client";

import { motion } from "motion/react";
import { services } from "@/data/site";
import { Container, Eyebrow, SplitText, h2Class } from "./motion";
import VideoLoop from "./VideoLoop";
import { playVideo } from "./VideoModal";

const ease = [0.22, 1, 0.36, 1] as const;

// One "case reel" per craft: the service on one side, a real iBEST piece playing on the other.
export default function ServiceDetails() {
  return (
    <section className="relative overflow-x-clip bg-navy py-20 sm:py-28">
      <div className="cloud-pattern pointer-events-none absolute inset-0" />
      <Container className="relative">
        <Eyebrow no="02">Case reels</Eyebrow>
        <h2 className={h2Class}>
          <SplitText text="Every craft," className="block" />
          <SplitText text="proven on screen." className="block text-sun" delay={0.1} />
        </h2>

        <div className="mt-14 space-y-16 sm:mt-20 sm:space-y-24">
          {services.map((s, i) => {
            const flip = i % 2 === 1;
            return (
              <article
                key={s.key}
                id={`service-${s.key}`}
                className="grid grid-cols-1 items-center gap-6 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)] lg:gap-14"
              >
                <motion.div
                  initial={{ opacity: 0, x: flip ? 40 : -40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-10%" }}
                  transition={{ duration: 0.8, ease }}
                  className={flip ? "lg:order-2" : ""}
                >
                  <button
                    onClick={() => playVideo(s.example.id)}
                    className="group relative block aspect-video w-full overflow-hidden rounded-[1.75rem] bg-abyss text-left shadow-2xl shadow-black/40 ring-1 ring-cream/10"
                    aria-label={`Watch ${s.example.title}`}
                  >
                    <VideoLoop id={s.example.id} start={s.example.start} className="absolute inset-0 transition duration-700 group-hover:scale-105" label={s.example.title} />
                    <span className="pointer-events-none absolute inset-0 bg-gradient-to-t from-abyss/80 via-transparent to-transparent" />
                    <span className="absolute inset-x-4 bottom-4 flex items-end justify-between gap-3 sm:inset-x-6 sm:bottom-5">
                      <span className="min-w-0">
                        <span className="block font-mono text-[10px] uppercase tracking-widest text-sun">From our reel</span>
                        <span className="block truncate font-display text-lg font-bold sm:text-xl">{s.example.title}</span>
                      </span>
                      <span className="flex shrink-0 items-center gap-2 rounded-full bg-white/95 py-1.5 pl-1.5 pr-4 text-sm font-semibold text-navy transition group-hover:scale-105">
                        <span className="flex size-7 items-center justify-center rounded-full bg-red text-white">
                          <svg viewBox="0 0 24 24" className="ml-0.5 size-3 fill-current">
                            <path d="M8 5v14l11-7z" />
                          </svg>
                        </span>
                        <span className="hidden sm:inline">Watch with sound</span>
                        <span className="sm:hidden">Watch</span>
                      </span>
                    </span>
                  </button>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-10%" }}
                  transition={{ duration: 0.8, delay: 0.1, ease }}
                  className={flip ? "lg:order-1" : ""}
                >
                  <div className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.28em] text-cream/55">
                    <span className="font-display text-4xl font-extrabold tracking-normal text-sky sm:text-5xl">{String(i + 1).padStart(2, "0")}</span>
                    <span className="h-px w-10 bg-cream/25" />
                    {s.short}
                  </div>
                  <h3 className="mt-4 font-display text-[clamp(1.8rem,3.6vw,3rem)] font-extrabold leading-[1.02] tracking-tight">{s.title}</h3>
                  <p className="mt-4 max-w-lg leading-relaxed text-cream/75">{s.body}</p>
                  <div className="mt-6 flex flex-wrap gap-2">
                    {s.tags.map((t) => (
                      <span key={t} className="rounded-full border border-cream/15 px-3 py-1.5 text-xs font-medium text-cream/85">
                        {t}
                      </span>
                    ))}
                  </div>
                </motion.div>
              </article>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
