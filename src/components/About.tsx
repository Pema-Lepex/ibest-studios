"use client";

import { animate, motion, useInView, useScroll, useTransform } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { site, stats, values } from "@/data/site";
import { Container, Eyebrow, Reveal, SplitText, h2Class } from "./motion";

function Counter({ to, suffix, plain }: { to: number; suffix: string; plain?: boolean }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10%" });
  const from = plain ? to - 10 : 0;
  const [v, setV] = useState(from);
  useEffect(() => {
    if (!inView) return;
    const c = animate(from, to, { duration: 1.8, ease: [0.22, 1, 0.36, 1], onUpdate: (x) => setV(Math.round(x)) });
    return () => c.stop();
  }, [inView, to, from]);
  return (
    <span ref={ref} className="tabular-nums">
      {plain ? v : v.toLocaleString()}
      <span className="text-red">{suffix}</span>
    </span>
  );
}

export default function About() {
  const photo = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: photo, offset: ["start end", "end start"] });
  const imgY = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);

  return (
    <section id="studio" className="relative overflow-x-clip bg-cream pb-20 pt-14 text-navy sm:pb-28 sm:pt-20">
      <Container>
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:items-center lg:gap-16">
          <div>
            <Eyebrow no="★" light>
              Who we are
            </Eyebrow>
            <h2 className={h2Class}>
              <SplitText text="A creative family" className="block" />
              <SplitText text="from Thimphu." className="block text-red" delay={0.1} />
            </h2>
            <Reveal i={1} className="mt-6 space-y-4 text-base leading-relaxed text-navy/80 sm:text-lg">
              <p>
                <strong className="text-navy">iBEST STUDIOS</strong> is a multimedia production company that focuses on creative
                storytelling. Over the years we have developed deep expertise in 2D and 3D animation, illustration, graphic design,
                content writing, visual effects, sound and background scoring, music and live-action film.
              </p>
              <p>
                We strive for excellence by seeking continuous improvement — and we enjoy and love what we do, and take immense pride in
                our creations.
              </p>
            </Reveal>
            <Reveal i={2} className="mt-8 flex flex-wrap gap-2">
              {values.map((v, i) => (
                <motion.span
                  key={v}
                  initial={{ opacity: 0, scale: 0.6 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + i * 0.08, type: "spring", damping: 12 }}
                  className={`rounded-full px-4 py-2 text-sm font-semibold ${
                    ["bg-navy text-cream", "bg-red text-white", "bg-sun text-navy", "bg-sky text-white", "bg-orange text-white"][i % 5]
                  }`}
                >
                  {v}
                </motion.span>
              ))}
            </Reveal>
          </div>

          <div ref={photo} className="relative">
            <Reveal className="relative aspect-[4/3] overflow-hidden rounded-[2rem] bg-navy shadow-2xl shadow-navy/25">
              <motion.img
                style={{ y: imgY, scale: 1.18 }}
                src="/img/studio/team.webp"
                alt="The iBEST Studios team — Together we achieve more"
                loading="lazy"
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-navy/90 to-transparent p-5 pt-16 sm:p-7">
                <p className="font-display text-xl font-bold text-cream sm:text-2xl">Together we achieve more.</p>
                <p className="text-sm text-cream/75">The iBEST family — animators, artists, filmmakers, writers & developers.</p>
              </div>
            </Reveal>
            {/* spinning founded seal */}
            <motion.div
              initial={{ scale: 0, rotate: -90 }}
              whileInView={{ scale: 1, rotate: 0 }}
              viewport={{ once: true }}
              transition={{ type: "spring", damping: 12, delay: 0.3 }}
              className="absolute -right-2 -top-8 size-24 sm:-right-6 sm:size-32"
            >
              <svg viewBox="0 0 200 200" className="h-full w-full animate-[spin_16s_linear_infinite]">
                <defs>
                  <path id="seal" d="M100,100 m-74,0 a74,74 0 1,1 148,0 a74,74 0 1,1 -148,0" />
                </defs>
                <circle cx="100" cy="100" r="98" className="fill-sun" />
                <text className="fill-navy font-mono text-[17px] font-semibold uppercase tracking-[0.3em]">
                  <textPath href="#seal">Ideas for generations · est 2014 ·</textPath>
                </text>
              </svg>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/img/emblem.png" alt="" className="absolute left-1/2 top-1/2 h-1/3 -translate-x-1/2 -translate-y-1/2" />
            </motion.div>
          </div>
        </div>

        <div className="mt-16 grid grid-cols-2 gap-3 sm:mt-20 sm:gap-4 lg:grid-cols-4">
          {stats.map((s, i) => (
            <Reveal key={s.label} i={i} className="rounded-3xl border border-navy/10 bg-white p-5 shadow-sm sm:p-7">
              <div className="font-display text-[clamp(2rem,5vw,3.5rem)] font-extrabold leading-none tracking-tight">
                <Counter to={s.value} suffix={s.suffix} plain={s.plain} />
              </div>
              <p className="mt-2 text-sm text-navy/65">{s.label}</p>
            </Reveal>
          ))}
        </div>
        <Reveal className="mt-6 text-sm text-navy/60">
          Founded in August {site.founded} by <strong className="text-navy">{site.founder}</strong>, CEO &amp; Founder.
        </Reveal>
      </Container>
    </section>
  );
}
