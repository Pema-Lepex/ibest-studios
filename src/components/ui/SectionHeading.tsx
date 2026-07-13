"use client";

import { Reveal, TextReveal } from "@/components/motion";

interface SectionHeadingProps {
  /** Small all-caps label above the title, e.g. "What we do". */
  eyebrow?: string;
  title: string;
  /** Words in the title to render in the gold gradient. */
  highlight?: string[];
  subtitle?: string;
  align?: "left" | "center";
  className?: string;
}

/**
 * The one heading block every section uses, so rhythm and type scale stay
 * identical across pages. Eyebrow slides in, title reveals word by word.
 */
export default function SectionHeading({
  eyebrow,
  title,
  highlight = [],
  subtitle,
  align = "center",
  className = "",
}: SectionHeadingProps) {
  const centered = align === "center";

  return (
    <div
      className={`flex flex-col ${
        centered ? "items-center text-center" : "items-start text-left"
      } ${className}`}
    >
      {eyebrow && (
        <Reveal direction="up" distance={16}>
          <span className="mb-5 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.25em] text-gold-500 sm:text-sm">
            <span className="h-px w-8 bg-gold-500/60" aria-hidden="true" />
            {eyebrow}
          </span>
        </Reveal>
      )}

      <TextReveal
        as="h2"
        text={title}
        highlight={highlight}
        className="display text-3xl text-cream xs:text-4xl sm:text-5xl md:text-6xl 3xl:text-7xl"
      />

      {subtitle && (
        <Reveal direction="up" delay={0.15}>
          <p
            className={`mt-6 text-base leading-relaxed text-mist sm:text-lg 3xl:text-xl ${
              centered ? "mx-auto max-w-2xl" : "max-w-2xl"
            }`}
          >
            {subtitle}
          </p>
        </Reveal>
      )}
    </div>
  );
}
