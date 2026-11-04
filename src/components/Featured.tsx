"use client";

import { motion, useMotionValueEvent, useScroll, useTransform } from "motion/react";
import { useRef, useState, useSyncExternalStore } from "react";
import { productions, type Production } from "@/data/site";
import { Container, Eyebrow, SplitText, h2Class } from "./motion";
import VideoLoop from "./VideoLoop";
import { playVideo } from "./VideoModal";

function useMediaQuery(query: string) {
  return useSyncExternalStore(
    (cb) => {
      const m = window.matchMedia(query);
      m.addEventListener("change", cb);
      return () => m.removeEventListener("change", cb);
    },
    () => window.matchMedia(query).matches,
    () => false,
  );
}

function Card({ p, i, total, desktop, playing }: { p: Production; i: number; total: number; desktop: boolean; playing: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  // cards shrink slightly as the next one stacks on top
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1 - (total - i) * 0.025]);

  const action = () => (p.video ? playVideo(p.video) : p.link && window.open(p.link, "_blank", "noopener"));

  return (
    <div ref={ref} className="md:sticky" style={{ top: `calc(5.5rem + ${i * 14}px)` }}>
      <motion.article
        style={desktop ? { scale } : undefined}
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-10%" }}
        className="grid grid-cols-1 origin-top overflow-hidden rounded-[1.75rem] border border-cream/10 bg-deep shadow-2xl shadow-black/40 md:grid-cols-[minmax(0,1.25fr)_minmax(0,1fr)]"
      >
        <button onClick={action} className="group relative aspect-video overflow-hidden md:aspect-auto md:min-h-[420px]" aria-label={`Watch ${p.title}`}>
          {p.video ? (
            <VideoLoop id={p.video} start={p.start} enabled={playing} className="absolute inset-0 transition duration-700 group-hover:scale-[1.03]" label={p.title} />
          ) : (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={p.poster} alt={p.title} loading="lazy" className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-105" />
          )}
          <span className="absolute inset-0 bg-gradient-to-t from-deep/70 via-transparent to-transparent md:bg-gradient-to-r md:from-transparent md:via-transparent md:to-deep/40" />
          {p.video && (
            <span className="absolute left-4 top-4 flex items-center gap-2 rounded-full bg-abyss/60 px-3 py-1 font-mono text-[10px] uppercase tracking-widest text-cream backdrop-blur">
              <span className="size-1.5 animate-blink rounded-full bg-red" /> Now showing
            </span>
          )}
          <span className="absolute bottom-6 left-5 flex items-center gap-2 rounded-full bg-white/95 py-1.5 pl-1.5 pr-4 text-sm font-semibold text-navy shadow-lg transition group-hover:scale-105">
            <span className="flex size-8 items-center justify-center rounded-full text-white" style={{ background: p.accent }}>
              <svg viewBox="0 0 24 24" className="ml-0.5 size-3.5 fill-current">
                <path d="M8 5v14l11-7z" />
              </svg>
            </span>
            {p.video ? "Watch with sound" : "Watch on Facebook"}
          </span>
        </button>
        <div className="flex flex-col justify-center p-6 sm:p-8 lg:p-12">
          <div className="flex flex-wrap items-center gap-2 font-mono text-[11px] uppercase tracking-widest text-cream/60">
            <span className="text-sun">{String(i + 1).padStart(2, "0")}</span>
            <span>{p.kind}</span>
            {p.year && <span>· {p.year}</span>}
          </div>
          <h3 className="mt-3 font-display text-[clamp(1.75rem,3.6vw,3rem)] font-extrabold leading-[1.02] tracking-tight">{p.title}</h3>
          {p.badge && (
            <span className="mt-4 w-fit rounded-full px-3 py-1 text-xs font-semibold text-navy" style={{ background: p.accent === "#e3262b" ? "#ffc928" : p.accent }}>
              ★ {p.badge}
            </span>
          )}
          <p className="mt-4 leading-relaxed text-cream/75">{p.body}</p>
          <span className="mt-6 h-1 w-16 rounded-full" style={{ background: p.accent }} />
        </div>
      </motion.article>
    </div>
  );
}

export default function Featured() {
  // cards stack (sticky) from tablet up; phones get a simple list so tall cards never get trapped
  const desktop = useMediaQuery("(min-width: 768px)");
  // which stacked card is on top, so the ones covered underneath stop playing
  const stack = useRef<HTMLDivElement>(null);
  const [top, setTop] = useState(0);
  const { scrollY } = useScroll();
  useMotionValueEvent(scrollY, "change", () => {
    const cards = stack.current ? [...stack.current.children] : [];
    // the top card is the last one that has reached its sticky position
    let last = 0;
    cards.forEach((c, i) => {
      const stickyTop = parseFloat(getComputedStyle(c).top) || 0;
      if (c.getBoundingClientRect().top <= stickyTop + 2) last = i;
    });
    setTop(last);
  });
  return (
    <section id="work" className="relative bg-navy pb-10 pt-20 sm:pt-28">
      <div className="cloud-pattern pointer-events-none absolute inset-0" />
      <Container className="relative">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <Eyebrow no="01">Featured productions</Eyebrow>
            <h2 className={h2Class}>
              <SplitText text="Stories we've" className="block" />
              <SplitText text="brought to screen." className="block text-sun" delay={0.1} />
            </h2>
          </div>
          <p className="max-w-sm text-cream/70">
            Feature films, animated series and music videos — produced, animated and finished in our studio in Thimphu.
          </p>
        </div>

        <div ref={stack} className="mt-12 space-y-6 sm:mt-16 md:space-y-8 md:pb-[10vh]">
          {productions.map((p, i) => (
            <Card key={p.title} p={p} i={i} total={productions.length} desktop={desktop} playing={!desktop || i === top} />
          ))}
        </div>
      </Container>
    </section>
  );
}
