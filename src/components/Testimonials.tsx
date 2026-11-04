"use client";

import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { partners, testimonials } from "@/data/site";
import { Container, Eyebrow, SplitText, h2Class } from "./motion";

export default function Testimonials() {
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  const t = testimonials[i];
  const go = (d: number) => setI((x) => (x + d + testimonials.length) % testimonials.length);

  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => setI((x) => (x + 1) % testimonials.length), 7000);
    return () => clearInterval(id);
  }, [paused]);

  return (
    <section className="relative overflow-hidden bg-navy py-20 sm:py-28" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
      <div className="cloud-pattern pointer-events-none absolute inset-0" />
      <Container className="relative">
        <Eyebrow no="04">Kind words</Eyebrow>
        <h2 className={h2Class}>
          <SplitText text="What our partners say" />
        </h2>

        <div className="relative mt-10 grid grid-cols-1 gap-8 lg:mt-14 lg:grid-cols-[auto_minmax(0,1fr)] lg:gap-14">
          <span className="font-display text-[7rem] font-extrabold leading-[0.6] text-red sm:text-[10rem]" aria-hidden>
            &ldquo;
          </span>
          <div>
            <div className="min-h-[300px] sm:min-h-[250px]">
              <AnimatePresence mode="wait">
                <motion.figure
                  key={i}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -24 }}
                  transition={{ duration: 0.45 }}
                >
                  <blockquote className="font-display text-[clamp(1.2rem,2.4vw,2rem)] font-semibold leading-snug text-cream">{t.quote}</blockquote>
                  <figcaption className="mt-6 flex items-center gap-3">
                    <span className="flex size-11 items-center justify-center rounded-full bg-sun font-display text-lg font-extrabold text-navy">
                      {t.name.replace(/^(Dr|Mr|Mrs|Dasho)\s/, "").charAt(0)}
                    </span>
                    <span>
                      <span className="block font-semibold">{t.name}</span>
                      <span className="block text-sm text-cream/65">{t.role}</span>
                    </span>
                  </figcaption>
                </motion.figure>
              </AnimatePresence>
            </div>
            <div className="mt-8 flex items-center gap-4">
              <button onClick={() => go(-1)} className="flex size-11 items-center justify-center rounded-full border border-cream/25 transition hover:bg-cream hover:text-navy" aria-label="Previous testimonial">
                ←
              </button>
              <button onClick={() => go(1)} className="flex size-11 items-center justify-center rounded-full border border-cream/25 transition hover:bg-cream hover:text-navy" aria-label="Next testimonial">
                →
              </button>
              <div className="ml-2 flex gap-1.5">
                {testimonials.map((_, k) => (
                  <button
                    key={k}
                    onClick={() => setI(k)}
                    className={`h-1.5 rounded-full transition-all ${k === i ? "w-8 bg-sun" : "w-3 bg-cream/30"}`}
                    aria-label={`Testimonial ${k + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </Container>

      <div className="relative mt-20 overflow-hidden border-y border-cream/10 py-6">
        <div className="flex w-max gap-10 motion-safe:animate-marquee">
          {[...partners, ...partners].map((p, k) => (
            <span key={k} className="flex items-center gap-10 whitespace-nowrap font-display text-2xl font-bold text-cream/45 sm:text-4xl">
              {p}
              <span className="text-orange">✦</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
