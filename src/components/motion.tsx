"use client";

import { motion, type Variants } from "motion/react";

const ease = [0.22, 1, 0.36, 1] as const;

export function Container({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <div className={`mx-auto w-full max-w-7xl px-5 sm:px-8 lg:px-12 ${className}`}>{children}</div>;
}

// Masked word-by-word reveal for headlines.
export function SplitText({
  text,
  className = "",
  delay = 0,
  play,
}: {
  text: string;
  className?: string;
  delay?: number;
  play?: boolean;
}) {
  const words = text.split(" ");
  // above-the-fold headlines animate with CSS, so they appear without waiting for JavaScript
  if (play) {
    return (
      <span className={className} aria-label={text}>
        {words.map((w, i) => (
          <span key={i} className="inline-block overflow-hidden pb-[0.1em] align-bottom" aria-hidden>
            <span className="rise-word inline-block whitespace-pre" style={{ animationDelay: `${delay + i * 0.05}s` }}>
              {w}
              {i < words.length - 1 ? " " : ""}
            </span>
          </span>
        ))}
      </span>
    );
  }
  const trigger =
    play === undefined ? { whileInView: "show", viewport: { once: true, margin: "-8%" } } : { animate: play ? "show" : "hidden" };
  return (
    <motion.span initial="hidden" {...trigger} className={className} aria-label={text}>
      {words.map((w, i) => (
        <span key={i} className="inline-block overflow-hidden pb-[0.1em] align-bottom" aria-hidden>
          <motion.span
            className="inline-block"
            variants={{
              hidden: { y: "110%", rotate: 4 },
              show: { y: 0, rotate: 0, transition: { duration: 0.85, ease, delay: delay + i * 0.06 } },
            }}
          >
            {w}
            {i < words.length - 1 ? " " : ""}
          </motion.span>
        </span>
      ))}
    </motion.span>
  );
}

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 36 },
  show: (i: number = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.75, ease, delay: i * 0.08 } }),
};

export function Reveal({ children, className = "", i = 0 }: { children: React.ReactNode; className?: string; i?: number }) {
  return (
    <motion.div variants={fadeUp} custom={i} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-6%" }} className={className}>
      {children}
    </motion.div>
  );
}

export function Eyebrow({ no, light = false, children }: { no: string; light?: boolean; children: React.ReactNode }) {
  return (
    <Reveal
      className={`mb-5 flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.28em] ${light ? "text-navy/70" : "text-cream/65"}`}
    >
      <span className="font-semibold text-red">{no}</span>
      <span className={`h-px w-10 ${light ? "bg-navy/30" : "bg-cream/30"}`} />
      {children}
    </Reveal>
  );
}

export const h2Class =
  "font-display text-[clamp(2.2rem,6.5vw,3.75rem)] font-extrabold leading-[0.95] tracking-tight lg:text-[clamp(3rem,4.4vw,4.75rem)]";
