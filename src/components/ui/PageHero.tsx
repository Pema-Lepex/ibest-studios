"use client";

import { motion } from "framer-motion";

interface PageHeroProps {
  eyebrow: string;
  title: string;
  /** Words in the title rendered in the gold gradient. */
  highlight?: string[];
  subtitle?: string;
}

/**
 * The compact hero every inner page opens on — keeps /service, /experience,
 * /team, /job and /contact sharing one entrance rhythm.
 */
export default function PageHero({
  eyebrow,
  title,
  highlight = [],
  subtitle,
}: PageHeroProps) {
  const words = title.split(" ");
  const lifted = new Set(highlight.map((w) => w.toLowerCase()));

  return (
    <section className="relative overflow-hidden border-b border-cream/5 bg-ink-950 pb-16 pt-16 grain sm:pb-24 sm:pt-24">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-0 h-72 w-[36rem] -translate-x-1/2 rounded-full bg-gold-500/8 blur-[110px]"
      />

      <div className="relative mx-auto max-w-[1600px] px-5 sm:px-8 lg:px-12">
        <motion.span
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.25em] text-gold-500 sm:text-sm"
        >
          <span className="h-px w-8 bg-gold-500/60" aria-hidden="true" />
          {eyebrow}
        </motion.span>

        <h1 className="display mt-6 max-w-4xl text-[clamp(2.5rem,7vw,6rem)] text-cream">
          {words.map((word, i) => (
            <span
              key={`${word}-${i}`}
              className="inline-flex overflow-hidden pb-[0.1em]"
            >
              <motion.span
                initial={{ y: "110%" }}
                animate={{ y: "0%" }}
                transition={{
                  duration: 1,
                  delay: 0.15 + i * 0.07,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className={
                  lifted.has(word.toLowerCase().replace(/[^a-z0-9]/gi, ""))
                    ? "text-gradient-gold"
                    : ""
                }
              >
                {word}
              </motion.span>
              {i < words.length - 1 && <span>&nbsp;</span>}
            </span>
          ))}
        </h1>

        {subtitle && (
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.45 }}
            className="mt-7 max-w-2xl text-base leading-relaxed text-mist sm:text-lg 3xl:text-xl"
          >
            {subtitle}
          </motion.p>
        )}
      </div>
    </section>
  );
}
