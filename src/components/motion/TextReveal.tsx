"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";

interface TextRevealProps {
  text: string;
  className?: string;
  /** Words rendered in the gold→ember gradient, matched case-insensitively. */
  highlight?: string[];
  delay?: number;
  stagger?: number;
  as?: "h1" | "h2" | "h3" | "p";
}

const containerVariants = (stagger: number, delay: number): Variants => ({
  hidden: {},
  visible: { transition: { staggerChildren: stagger, delayChildren: delay } },
});

const wordVariants: Variants = {
  hidden: { y: "110%" },
  visible: {
    y: "0%",
    transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] },
  },
};

/**
 * Headline treatment: each word rises out from behind a clipping mask, so the
 * line assembles itself left to right. Words listed in `highlight` get the
 * gold gradient.
 */
export default function TextReveal({
  text,
  className = "",
  highlight = [],
  delay = 0,
  stagger = 0.06,
  as: Tag = "h2",
}: TextRevealProps) {
  const reduced = useReducedMotion();
  const words = text.split(" ");
  const lifted = new Set(highlight.map((w) => w.toLowerCase()));

  const isLifted = (word: string) =>
    // Strip punctuation so "stories." still matches a "stories" highlight.
    lifted.has(word.toLowerCase().replace(/[^a-z0-9]/gi, ""));

  if (reduced) {
    return (
      <Tag className={className}>
        {words.map((word, i) => (
          <span key={i} className={isLifted(word) ? "text-gradient-gold" : ""}>
            {word}
            {i < words.length - 1 ? " " : ""}
          </span>
        ))}
      </Tag>
    );
  }

  return (
    <Tag className={className}>
      <motion.span
        className="inline"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.4 }}
        variants={containerVariants(stagger, delay)}
      >
        {words.map((word, i) => (
          // The outer span is the mask; overflow-hidden clips the word until it
          // travels up into place. pb keeps descenders (g, y) from being cut.
          <span
            key={i}
            className="inline-flex overflow-hidden pb-[0.12em] align-bottom"
          >
            <motion.span
              variants={wordVariants}
              className={isLifted(word) ? "text-gradient-gold" : ""}
            >
              {word}
            </motion.span>
            {i < words.length - 1 && <span>&nbsp;</span>}
          </span>
        ))}
      </motion.span>
    </Tag>
  );
}
